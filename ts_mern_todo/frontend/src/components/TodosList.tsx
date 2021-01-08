import { useState, useEffect } from "react";
import axios from "axios"

import Todo from "./Todo"
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
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsibility</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo:ITodo) => {
            console.log(todo)
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
        </tbody>
      </table>
    </div>
  ) : (
    <div>There are no Todos yet</div>
  );
}