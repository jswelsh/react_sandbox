import {FC} from 'react'
import { useState, useEffect } from "react"

import axios from "axios"
import {
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'

type IEditTodo = {
  match:{
    params:{
      id:string
    }
  }
  history:string[]
}

const EditTodo: FC<IEditTodo> = ({ match: {params: id}, history }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoDesc, setTodoDesc] = useState<string>("");
  const [todoResponsible, setTodoResponsible] = useState<string>("");
  const [todoPriority, setTodoPriority] = useState<string>("low");
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/todos/${id}`)
      .then(res => {
        const {
          todoCompleted,
          todoDesc,
          todoPriority,
          todoResponsible
        } = res.data;
        setTodoCompleted(todoCompleted);
        setTodoDesc(todoDesc);
        setTodoPriority(todoPriority);
        setTodoResponsible(todoResponsible);
      })
      .then(() => setIsLoading(false))
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      todoDesc,
      todoResponsible,
      todoPriority,
      todoCompleted
    };

    axios
      .post(`http://localhost:4000/todos/update/${id}`, newTodo)
      .then(res => console.log(res.data))
      .then(() => history.push("/"));
  };

  const deleteTodo = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/todos/delete/${id}`)
      .then(res => console.log(res.data))
      .then(() => history.push("/"));
  };

  return !isLoading ? (
    <div style={{ marginTop: 20 }}>
      <h3>Edit Todo</h3>
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
        <FormControl component="fieldset">
          <FormLabel component="legend">labelPlacement</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue={todoPriority}>
            <FormControlLabel
              value="low"
              control={<Radio color="primary" />}
              label="Low"
              labelPlacement="end"
            />
            <FormControlLabel
              value="medium"
              control={<Radio color="primary" />}
              label="Medium"
              labelPlacement="end"
            />
            <FormControlLabel
              value="high"
              control={<Radio color="primary" />}
              label="High"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            className="form-check-input"
            name="completedCheckbox"
            id="completedCheckbox"
            // value={todoCompleted}
            checked={todoCompleted}
            onChange={e => setTodoCompleted(!todoCompleted)}
          />
          <label htmlFor="completedCheckbox" className="form-check-label">
            Completed
          </label>
        </div>
        <br />
        <br />
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Edit Todo" />

          <input
            type="button"
            className="btn btn-danger float-right"
            value="Delete Todo"
            onClick={deleteTodo}
          />
        </div>
      </form>
    </div>
  ) : (
    <div>Getting Todo</div>
  );
}

export default EditTodo