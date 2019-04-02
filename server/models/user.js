const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "secret:over-flow")
    .toString();

  user.tokens.push({ access, token });

  return user.save().then(() => token);
};

userSchema.methods.toJSON = function() {
  const user = this;
  // const userObject = user.toObject();
  return _.pick(user, ["email", "_id"]);
};

userSchema.statics.findByToken = function(token) {
  let user = this;
  let decoded;
  try {
    decoded = jwt.verify(token, "secret:over-flow");
  } catch (err) {
    console.log("error", err);
  }
  console.log("user", decoded);
  return user.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};



userSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function(email, password) {
  const user = this;
  return user.findOne({ email }).then(data => {
    if (!data) return Promise.reject();
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, data.password, (err, res) => {
        if (res) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  });
};

const users = mongoose.model("users", userSchema);

module.exports = { users };
