const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
        userId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref : 'user'
        },
        title: {
            type: String,
            required: true,
            minLaength: 5,
            maxLength: 20
        },
        status:{
            type: String,
            default : ['to-do', 'in progress', 'done'],
        },
        tags: {
            type:String,
            maxLength: 10,
        }
})

const TodoModel = mongoose.model('todo',todoSchema);
module.exports = TodoModel;
