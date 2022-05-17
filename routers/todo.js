const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware/auth.js");
const { createTodo, getOneTodo, getAllTodos, getAllTodosByUser, updateTodo, deleteTodo} = require("../controllers/todo");

router.route("/").get(isAdmin,getAllTodos).post(isLoggedIn, createTodo);
router.get("/all",isLoggedIn,getAllTodosByUser);
router.get("/:id",isLoggedIn, getOneTodo);
router.route("/:id").all(isAdmin).put(updateTodo).delete(deleteTodo);


module.exports = router;
