const express = require("express");

const app = express();

const userRoute = require("./routers/user");

require("./database.config.js").connect();

app.use("/user", userRoute);

app.listen(3000, console.log("server listening on port 3000"));
