const express = require('express');
const userController = require('../controllers/users')
const auth = require('../middlewares/auth')

const router = express.Router();

router.use(auth());

router.get('/',(req,res,next)=>{

    userController.findAll().then((user)=> res.json(user))
})
// router.get('/:firstname',(req,res,next)=>{
//     const {firstname} = req.params;
//     userController.findFirstName(firstname).then((user)=>{
//             if(!user && uaer !== firstname){
//                 res.status(404).end()
//                 return;
//             }
//             res.json(user);
//         }).catch((e)=>{
//             res.status(500).json(e);
//         })
    
// })

// console.log(typeof userController)

router.get('/',(req,res,next)=>{
    const user = req.body;
    
})

router.post('/',(req,res,next)=>{
    const User = req.body;
    userController.creat(User).then((user)=>{
        return res.json(user)
    }).catch((e)=>{
        return res.status(422).json(e);
    })
    
})

router.post('/login',(req,res,next)=>{
    const userCred = req.body;
    userController.logIn(userCred)
    .then(data => res.json(data))
    .catch(e => {
        console.log(e);
        res.status(401).json(e);
    })
})

router.delete('/:id',(req,res,next)=>{
    const {id} = req.params;
    userController.deleteId(id).then((user)=>{
        if(!id){
            res.status(404).json("NOT_FOUND")
            return;
        }
        res.json(user);
    }).catch((e)=>res.status(422).json(e));
})
module.exports = router;