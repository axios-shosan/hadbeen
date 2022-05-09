const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    required: true,
  },
  password: String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
