const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  todoDesc: {
    type: String
  },
  todoResponsible: {
    type: String
  },
  todoPriority: {
    type: String
  },
  todoCompleted: {
    type: Boolean
  },
  dueDate: {
    type: Date
  }
});

module.exports = mongoose.model("Todo", Todo);