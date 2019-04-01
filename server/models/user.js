const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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
  return _.pick(user, ['email', '_id']);
}

userSchema.statics.findByToken = function(token) {
  let user = this;
  let decoded;
   try{
     decoded = jwt.verify(token,"secret:over-flow")
   }
   catch(err) {
    console.log('error',err)
   }
   console.log('user', decoded);
   return user.findOne({
     _id: decoded._id,
     'tokens.token': token,
     'tokens.access': 'auth',
   });
}
 
const users = mongoose.model("users", userSchema);


module.exports = { users };
