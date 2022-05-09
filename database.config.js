const mongoose = require("mongoose");

exports.connect = async function () {
  await mongoose.connect("mongodb://localhost:27017/hadbeen");
};
