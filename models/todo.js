const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    }
});

module.exports = mongoose.model('Todo',todoSchema);