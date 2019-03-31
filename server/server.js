const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");

const { users } = require("./models/user");
const { Todo } = require("./models/todo");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  const todo = new Todo({
    surname: req.body.surname
  });

  todo
    .save()
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then(data => {
      res.send({ data });
    })
    .catch(err => res.send(err));
});

app.get("/todos/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(data => {
      res.send({ data });
    })
    .catch(err => res.send(err));
});

app.listen(3000, () => console.log("application running on port 3000"));
