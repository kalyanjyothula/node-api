const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");

const { users } = require("./models/user");
const { Todo } = require("./models/todo");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
/* --------------- post apis ------------------------*/

app.post("/todos", (req, res) => {
  const todo = new Todo({
    surname: req.body.surname
  });

  todo
    .save()
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.post("/users", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  const user = new users(body);

  user
    .save()
    .then(data => {
      return data.generateAuthToken();
    })
    .then(token => res.header('x-auth', token).send(user))
    .catch(err => res.send(err));
});

/* -------------------- get apis -------------------------------*/

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

/* ----------------------- patch apis ------------------------*/

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  let body = _.pick(req.body, ["surname"]);

  if (!ObjectID.isValid(id)) {
    return res.send();
  }
  //body.surname = req.body.surname;

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).send();
      }
      res.send({ data });
    })
    .catch(err => res.send(err));
});

/* ---------------------- delete apis ---------------------------------*/

app.delete("/todos/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.listen(port, () => console.log("application running on port ", port));
