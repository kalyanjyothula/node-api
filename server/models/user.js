const mongoose = require("mongoose");

const users = mongoose.model("users", {
  name: {
    type: String
  },
  age: {
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

module.exports = { users };
