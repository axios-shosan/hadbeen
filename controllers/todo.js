const Todo = require("../models/todo");

exports.createTodo = async (req,res) => {
    try {
        const {title, description} = req.body;
        const todo = new Todo({
            title, 
            description, 
            user : req.user._id,
        });

        await todo.save();

        if(!todo)
           return res.status(401).json({message: "todo n'a pas était créé"});
        
        res.status(200).json({todo: todo}); 
    } catch (error) {
        res.status(400).json({
            message : "error in create todo controller",
            error: error
        });
    }
}

exports.getOneTodo = async (req,res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo)
          return res.status(401).json({message: "aucun todo avec cet id"});

        res.status(200).json({todo: todo});  

    } catch (error) {
        res.status(400).json({
            message : "error in get one todo controller",
            error: error
        });
    }
} 

exports.getAllTodos = async (req,res) => {
    try {
        const todos = await Todo.find({});

        if(!todos)
          return res.status(401).json({message: "aucun todo trouvé"});

        res.status(200).json({todos: todos});  

    } catch (error) {
        res.status(400).json({
            message : "error in get all todos controller",
            error: error
        });
    }
} 

//ne marche pas
exports.getAllTodosByUser = async (req,res) => {
    try {
        if (!req.user) 
            return res.status(400).json({message: "cet utilisateur n'a aucun todo"});

        const todos = await Todo.find({user: req.user._id});

        res.status(200).json({todos: todos});

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message : "error in get all todos by user controller",
            error: error
        });
    }
}

exports.updateTodo = async (req,res) => {
    try {
        const todo = await Todo.findOneAndUpdate (
            {id: req.params.id},
            {$set: req.body},
            {new : true}
        );

        if(!todo)
          return res.status(401).json({message: "aucun todo avec cet id"});

        res.status(200).json({todos: todo});  

    } catch (error) {
        res.status(400).json({
            message : "error in update todo controller",
            error: error
        });
    }
} 

exports.deleteTodo = async (req,res) => {
    try {
        await Todo.findOneAndDelete ({_id:  req.params.id});

        res.status(200).json({message: 'Supprimé avec succés'});  

    } catch (error) {
        res.status(400).json({
            message : "error in delete todo controller",
            error: error
        });
    }
} 