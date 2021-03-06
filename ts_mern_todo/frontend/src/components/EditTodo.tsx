import { useEffect, useState, FC } from 'react'
import DateFnsUtils from '@date-io/date-fns'

import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

import axios from "axios"
import {
  Checkbox,
  FormControlLabel,
  Button,
  Paper, Typography, TextField, Slider, Container, Grid, FormControl
} from '@material-ui/core'

type IEditTodo = {
  match:{
    params:{
      id:string
    }
  }
  history:string[]
}

const EditTodo: FC<IEditTodo> = ({ match: {params: {id}}, history }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [todoDesc, setTodoDesc] = useState<string>("")
  const [todoResponsible, setTodoResponsible] = useState<string>("")
  const [todoPriority, setTodoPriority] = useState<string>("")
  const [todoCompleted, setTodoCompleted] = useState<boolean>()
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  useEffect(() => {
    axios
      .get(`http://localhost:4000/todos/${id}`)
      .then(res => {
        const {
          todoCompleted,
          todoDesc,
          todoPriority,
          todoResponsible,
          dueDate
        } = res.data
        setTodoCompleted(todoCompleted)
        setTodoDesc(todoDesc)
        setTodoPriority(todoPriority)
        setTodoResponsible(todoResponsible)
        setDueDate(new Date(dueDate))
      })
      .then(() => setIsLoading(false))
      .catch(err => {
        console.log(err)
      })
  }, [id])

  const onSubmit = (e:any) => {
    e.preventDefault()
    const newTodo = {
      todoDesc,
      todoResponsible,
      todoPriority,
      todoCompleted,
      dueDate
    }

    axios
      .post(`http://localhost:4000/todos/update/${id}`, newTodo)
      .then(res => console.log(res.data))
      .then(() => history.push("/"))
  };

  const deleteTodo = (e:any) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/todos/delete/${id}`)
      .then(res => console.log(res.data))
      .then(() => history.push("/"))
  }
  const marks = [
    {
      value: 1,
      label: 'Low',
    },
    {
      value: 2,
      label: 'Medium',
    },
    {
      value: 3,
      label: 'High',
    }
  ]
  return !isLoading ? (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Container style={{ 'margin':'auto' }} maxWidth="sm">
    <Paper style={{marginTop:48}}>
      <Grid container justify='space-between' style={{padding:24}}>
        <Typography
          children='Edit Todo'
          variant='h3'
          
        />
        <FormControlLabel
          label="Completed"
          labelPlacement="end"
          control={
          <Checkbox
            checked={todoCompleted}
            onChange={() => setTodoCompleted(!todoCompleted)}
            color="primary"/>}
        />
      </Grid>
      <Container maxWidth='xs'>
      <TextField
        label="Responsible:"
        value={todoResponsible}
        onChange={e => setTodoResponsible(e.target.value)}
        id="standard-full-width"
        placeholder="Who needs to do it?"
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <DateTimePicker value={dueDate} onChange={setDueDate} />

        <TextField
          label="Description:"
          value={todoDesc}
          onChange={e => setTodoDesc(e.target.value)}
          fullWidth
          id="standard-full-width"
          placeholder="What do you need todo?"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Container>
      <Container maxWidth="xs">
      <Typography id="discrete-slider" gutterBottom>
        Priority
      </Typography>
      <Slider
        defaultValue={1}
        value={
          todoPriority === 'High'?
          3 :
          todoPriority === 'Medium' ?
          2
          : 1}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={(event,value) => setTodoPriority(
          (value === 3) ?
          'High':
          (value === 2) ?
          'Medium'
          : 'Low')}
        step={1}
        marks={marks}
        min={1}
        max={3}
      />
      </Container>
    
      <Grid container justify='space-evenly' style={{padding:24}}>
        <Button
          children='Submit Todo'
          variant="contained"
          onClick={onSubmit}
          color="default"
        />
        <Button
          children='Delete Todo'
          variant="contained"
          onClick={deleteTodo}
          color="default"
        />
      </Grid>
      </Paper>
    </Container>
  </MuiPickersUtilsProvider>
  ) : (
    <div>Getting Todo</div>
  )
}

export default EditTodo