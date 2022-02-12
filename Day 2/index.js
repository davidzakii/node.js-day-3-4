const express = require('express');
const fs = require('fs');
const app =express();
app.use(express.static('./images'))
app.use(express.json());
app.get('/todos',(req,res,next)=>{
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    res.json(data);
});
app.get('/todos/:id',(req,res,next)=>{
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    const todo = data.find(el=>+el.ID === +id)
    res.json(todo);
})
app.post('/todos',(req,res,next)=>{
    const { title } = req.body;
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    let ID =1;
    if(data.length === 0){
        ID =1;
    }else{
    ID = +data[data.length - 1].ID + 1; 
    }
    const todo = { title,ID };
    data.push(todo);
    console.log(data)
    fs.writeFileSync('./data.json',JSON.stringify(data));
    res.json(todo)
});

app.patch('/todos/:id',(req,res,next)=>{
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    const idEdit = data.find(todo=>+todo.ID === +id);
    const {title} = req.body;
    idEdit.title = title;
    fs.writeFileSync('./data.json',JSON.stringify(data));
    res.json(idEdit)
});
app.delete('/todos/:id',(req,res,next)=>{
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    const todo = data.filter(todo=> +todo.ID !== +id)
    todo[0].id = 1;
    for(let i =0;i<todo.length;i++){
        todo[0].id = i+1;
    }
    console.log(todo)
    fs.writeFileSync('./data.json',JSON.stringify(todo));
    res.json(id)
})
app.listen(3001,()=>{
    console.log('App is up and running on : localhost:3001')
})