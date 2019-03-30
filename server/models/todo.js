const mongoose = require("mongoose");

const Todo = mongoose.model("todos", {
  name: {
    type: String
  },
  weight: {
    type: Number
  },
  surname: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  id: {
    type: String,
    default: "unknown"
  }
});

module.exports = { Todo };

