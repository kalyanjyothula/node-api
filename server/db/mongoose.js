const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/Sampledb");
mongoose.Promise = global.Promise;
module.exports = {
  mongoose
};
