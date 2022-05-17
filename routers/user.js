const express = require("express");
const router = express.Router();


//importer les controllers
const { getAllusers, createUser , register, login} = require("../controllers/user");

router.route("/").get(getAllusers).post(createUser);
router.post("/register",register);
router.post("/login",login);
module.exports = router;
