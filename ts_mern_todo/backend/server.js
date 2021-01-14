const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const todoRoutes = express.Router()
const PORT = 4000
let Todo = require("./todo.model")

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:<password>@cluster0.iaykh.mongodb.net/<dbname>?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())



client.connect(err => {
  const collection = client.db("test").collection("devices")
  // perform actions on the collection object
  client.close()
});





// mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true })
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("mongoDB connection successful");
});

todoRoutes.route("/").get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route("/add").post(function(req, res) {
  let todo = new Todo(req.body);
  todo.save((err, todo) => {
    if (err) {
      console.log(err);
      res.status(400).send("adding todo failed");
    } else {
      res.status(200).json({ todo: "todo added" });
    }
  });
});

todoRoutes.route("/delete/:id").post(function(req, res) {
  Todo.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
      res.status(400).send("deleting todo failed");
    } else {
      res.status(200).json({ todo: "todo deleted" });
    }
  });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).send("todo not found");
    } else {
      const {
        todoDesc,
        todoCompleted,
        todoResponsible,
        todoPriority,
        dueDate
      } = req.body;
      todo.todoDesc = todoDesc;
      todo.todoCompleted = todoCompleted;
      todo.todoResponsible = todoResponsible;
      todo.todoPriority = todoPriority;
      todo.dueDate = dueDate;
      todo.save((err, todo) => {
        if (err) {
          console.log(err);
          res.status(400).send("updating todo failed");
        } else {
          res.status(200).json({ todo: "todo updated" });
        }
      });
    }
  });
});

app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log("Server running on PORT: " + PORT);
});
