import { useState, useEffect } from "react";
import axios from "axios"

import Todo from "./Todo"
type Itodo = {
  todoDesc:String
  todoResponsible:String
  todoPriority:String
  todoCompleted:Boolean
  id:string
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
          {todos.map((todo:Itodo) => {
            return <Todo key={todo.id} todo={todo} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div>There are no Todos yet</div>
  );
}