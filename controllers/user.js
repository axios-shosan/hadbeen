const User = require("../models/user.js");

exports.getAllusers = (req, res) => {
  console.log("getting all users");
  res.send("hello");
};

exports.createUser = async (req, res) => {
  const data = {
    name: "hadjer",
    age: 20,
    password: "hadjer",
  };
  const user = new User(data);

  await user.save();

  res.json(user._doc);
};
