import { Grid, Paper, Typography, Button } from '@material-ui/core'
import { getMinutes } from 'date-fns';
import {FC} from 'react'
import { Link } from "react-router-dom"

const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateFormatter = (mode:string,date:string) => {
  let dateObj = new Date(date)
  if(mode === 'getTime') {
    return dateObj.getHours() + ':' + dateObj.getMinutes()
  }
  if(mode === 'getDate') {
    return months[dateObj.getMonth()] + ' ' + dateObj.getDate()  + ' ' + dateObj.getFullYear()
  }
  
}

type ITodo = {
  // todoCompleted:boolean
  todoResponsible:string
  todoPriority:string
  todoDesc:string
  dueDate:string
  _id:string
}

const Todo: FC<ITodo> = ({
  todoResponsible,
  // todoCompleted,
  todoPriority,
  todoDesc,
  dueDate,
  _id
}) => {
  
  return (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Paper>
      <Grid
      style={{height:300, padding:16}}
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start">
      <Grid container item direction='row' justify='space-between'>
        <Typography
          children={todoResponsible}
          variant={'h5'}/>
        <Grid item direction='column' >
          <Typography
            children={dateFormatter('getDate', dueDate)}
            variant={'h5'}/>
          <Grid item container justify='flex-end'>
            <Typography
              children={dateFormatter('getTime', dueDate)}
              variant={'h5'}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          children={todoDesc}
          variant='body1'/>
      </Grid>
        <Grid item container justify='space-between'>
        <Button
          size='large'
          color='primary'
          disabled
          children={'Priority: '+todoPriority}/>
        <Button
          size='large'
          color='primary'
          component={Link}
          to={`/edit/${_id}`}
          children='Edit'/>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
  )
}
export default Todo
