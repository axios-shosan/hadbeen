const express = require("express");
require('dotenv').config()
const app = express();

const userRoute = require("./routers/user");

const todosRoute = require("./routers/todo");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

require("./database.config.js").connect();

app.use("/user", userRoute);

//
app.use("/todo", todosRoute);

app.listen(3000, console.log("server listening on port 3000"));
