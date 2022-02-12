const express = require('express');
const fs = require('fs');
const todosController = require('../controllers/todos')

const router = express.Router();

router.get('/',(req,res,next)=>{
    todosController.findAll().then((todo)=> res.json(todo))
});
router.get('/:id',(req,res,next)=>{
    const {id} = req.params;
    todosController.findOne(id).then((todo)=>{
        if(!todo){
            res.status(404).end()
            return;
        }
            res.json(todo);
    }).catch((e)=>{
        res.status(500).json(e);
    });
})
router.post('/',(req,res,next)=>{
    const {title,userId} = req.body;
    const user = req.user;
    todosController.creat({title,userId: user.id}).then(todo=>{
        return res.json(todo)}
    )
    .catch(e=>{
        return res.status(422).json(e);
    })
    ;
});
router.patch('/:id',(req,res,next)=>{
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    const idEdit = data.find(e => +e.id === +id);
    const {title} = req.body;
    idEdit.title = title;
    fs.writeFileSync('./data.json',JSON.stringify(data))
    res.json(idEdit);
});
router.delete('/:id',(req,res,next)=>{
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf-8'}));
    const todo = data.filter((el)=> +el.id !== +id);
    todo[0].id =1;
    for(let i =0;i<todo.length;i++){
        todo[i].id = i+1;
    }
    // todo[0].id = 1;
    console.log(todo)
    fs.writeFileSync('./data.json',JSON.stringify(todo));
    res.json(id)
})

console.log(typeof router)
module.exports = router;