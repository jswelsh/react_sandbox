import { useState, useEffect } from "react";
import axios from "axios"

import Todo from "./Todo"
import { Grid } from "@material-ui/core";
type ITodo = {
  todoCompleted:boolean
  todoResponsible:string
  todoPriority:string
  todoDesc:string
  _id:string
}
export default function TodosList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchTodos() {
    axios
      .get("http://localhost:4000/todos")
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchTodos();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : todos.length ? (
    <div>
      <h3>Todos List</h3>
        <Grid
          container
          spacing={2}
          justify='space-between'
          direction='row'
          style={{padding:32}}
        >
          {todos.map((todo:ITodo) => {
          return (
          <Todo
            key={todo._id}
            // todoCompleted={todo.todoCompleted}
            todoResponsible={todo.todoResponsible}
            todoPriority={todo.todoPriority}
            todoDesc={todo.todoDesc}
            _id={todo._id}  
          />)
          })}
        </Grid>
    </div>
  ) : (
    <div>There are no Todos yet</div>
  );
}