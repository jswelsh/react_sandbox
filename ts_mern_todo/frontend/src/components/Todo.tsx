import {FC} from 'react'
import { Link } from "react-router-dom"

type ITodo = {
  // todoCompleted:boolean
  todoResponsible:string
  todoPriority:string
  todoDesc:string
  _id:string
}

const Todo: FC<ITodo> = ({
  todoResponsible,
  // todoCompleted,
  todoPriority,
  todoDesc,
  _id
}) => {
  console.log(_id)
  return (
    <tr>
      <td>{todoDesc}</td>
      <td>
        {todoResponsible}
      </td>
      <td>
        {todoPriority}
      </td>
      <td>
        <Link to={`/edit/${_id}`}>Edit</Link>
      </td>
    </tr>
  );
}
export default Todo

/*  className={todoCompleted ? "completed" : ""}
className={todoCompleted ? "completed" : ""}
className={todoCompleted ? "completed" : ""} */