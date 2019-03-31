const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { users } = require("../server/models/user");

const id = "5c9f71d100325a0fe20f8919";
if (!ObjectID.isValid(id)) {
  console.log("invalid Id");
}

// users
//   .find({
//     _id: id
//   })
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

users
  .findById(id)
  .then(data => console.log(data))
  .catch(err => console.log(err));
