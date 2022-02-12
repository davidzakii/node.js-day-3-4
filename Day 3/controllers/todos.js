const fs = require('fs');
const Todo = require('../modeles/todos')

const findAll = ()=>{
    return Todo.find({})
}
const findOne = (id)=>{
    return Todo.findById(id).populate('userId');
}
const creat = (title,userId)=>{
    const todo = {title,userId};
    return Todo.create(todo);
}
module.exports = {
    findOne,creat,findAll
}