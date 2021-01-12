import { useState, FC } from "react"
import axios from "axios"
import {
  Container,
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
  Slider
} from '@material-ui/core'

type ICreateTodo = {
  history:string[]
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

const CreateTodo: FC<ICreateTodo> = ({ history }) => {
  const [todoDesc, setTodoDesc] = useState("");
  const [todoResponsible, setTodoResponsible] = useState("");
  const [todoPriority, setTodoPriority] = useState("");
  const todoCompleted = false;

  const onSubmit = (e:any) => {
    e.preventDefault();

    const newTodo = {
      todoDesc,
      todoResponsible,
      todoPriority,
      todoCompleted
    }

    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then(res => console.log(res.data))
      .then(() => history.push("/"))
  }

  return (
    <Container style={{ 'margin':'auto' }} maxWidth="sm">
    <Paper style={{marginTop:48}}>
      <Grid container justify='space-between' style={{padding:24}}>
        <Typography
          children='Edit Todo'
          variant='h3'
          
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
      </Grid>
      </Paper>
    </Container>
   /*  <div style={{ marginTop: 20 }}>
      <h3>Create Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={todoDesc}
            onChange={e => setTodoDesc(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input
            type="text"
            className="form-control"
            value={todoResponsible}
            onChange={e => setTodoResponsible(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={todoPriority === "Low"}
              onChange={e => setTodoPriority(e.target.value)}
            />
            <label htmlFor="priorityLow" className="form-check-label">
              Low
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={todoPriority === "Medium"}
              onChange={e => setTodoPriority(e.target.value)}
            />
            <label htmlFor="priorityMedium" className="form-check-label">
              Medium
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={todoPriority === "High"}
              onChange={e => setTodoPriority(e.target.value)}
            />
            <label htmlFor="priorityHigh" className="form-check-label">
              High
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Todo"
          />
        </div>
      </form>
    </div> */
  )
}

export default CreateTodo