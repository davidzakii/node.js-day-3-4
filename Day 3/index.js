const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todosRoutes = require('./routes/todos');
const userssRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/NODEJS_DAY_3_LAB');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./static'));

app.use('/users',userssRoutes);
app.use('/todos',todosRoutes);

app.use('*',(req,res,next)=>{
    res.status(404).json('Error : NOT_FOUND')
})
app.use((err,req,res,next)=>{
    res.json(err)
})

app.listen(3003,()=>{
    console.log('app is up and running on: localhost 3003')
})