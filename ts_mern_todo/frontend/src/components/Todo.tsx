import { Grid, Paper, Typography, Button } from '@material-ui/core'
import {FC} from 'react'
import { Link } from "react-router-dom"

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
      style={{height:200, padding:16}}
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start">
      <Grid container item justify='space-between'>
        <Typography
          children={todoResponsible}
          variant={'h5'}/>
        <Typography
          children={dueDate.slice(0,10)}
          variant={'h5'}/>
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
