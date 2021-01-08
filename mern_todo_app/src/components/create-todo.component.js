import React, { Component, useState, useCallback } from "react";

const CreateTodo = props => {
  const [todo_description, setTodo_description] = useState()
  const [todo_responsible, setTodo_responsible] = useState()
  const [todo_priority, setTodo_priority] = useState()
  const [todo_completed, setTodo_completed] = useState()
  const onChangeTodoDescription = useCallback((e) => {
    setTodo_description(e.target.value)
  })
  const onChangeTodoResponsible = useCallback((e) => {
    setTodo_responsible(e.target.value)
  })
  const onChangeTodoPriority = useCallback((e) => {
    setTodo_priority(e.target.value)
  })
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log(`Form submitted:`)
    console.log(`Todo Description: ${todo_description}`)
    console.log(`Todo Responsible: ${todo_responsible}`)
    console.log(`Todo Priority: ${todo_priority}`)
    setTodo_description("")
    setTodo_responsible("")
    setTodo_priority("")
    setTodo_completed(false)
  })
  return (
  <div style={{ marginTop: 10 }}>
    <h3>Create New Todo</h3>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Description: </label>
        <input type="text" className="form-control" value={todo_description} onChange={onChangeTodoDescription} />
      </div>
      <div className="form-group">
        <label>Responsible: </label>
        <input type="text" className="form-control" value={todo_responsible} onChange={onChangeTodoResponsible} />
      </div>
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low" checked={todo_priority === "Low"} onChange={onChangeTodoPriority} />
          <label className="form-check-label">Low</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={todo_priority === "Medium"} onChange={onChangeTodoPriority} />
          <label className="form-check-label">Medium</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={todo_priority === "High"} onChange={onChangeTodoPriority} />
          <label className="form-check-label">High</label>
        </div>
      </div>
      <div className="form-group">
        <input type="submit" value="Create Todo" className="btn btn-primary" />
      </div>
    </form>
  </div>
  )
};

export default CreateTodo;