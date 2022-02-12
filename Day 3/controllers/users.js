const User = require('../modeles/user');
const jwt = require('jsonwebtoken');

// const bcrypt = require('bcrypt');
// const router = require('../routes/users');

const { SECRET } = process.env;


const findAll = ()=>{
    return User.find({});
}
const findFirstName = ({firstName})=>{
    return User.findOne({firstName});
};
const creat = (user)=>{
    return User.create(user);
};

// const logIn = async ({userName,password})=>{
//     const user = await User.findOne({userName}).exec();
//     user.comparePassword(1111111)
//     bcrypt.compare(password,user.password).then(console.log)
//     return 1
// }

// const logIn = async ({userName,password})=>{
//     const user = await User.findOne({userName});
//     return user.comparePassword(password);
// }

const logIn = async({userName,password})=>{
    const user = await User.findOne({userName}).exec();
    const valid = await user.comparePassword(password);
    if(!valid) throw "UN-AUTH"
        return jwt.sign({
            userName,userId: user.id
        },SECRET,{expiresIn : '1h'})
    
}


const deleteId = (id)=>{
    return User.deleteOne({_id:id})
}
module.exports = {
    creat,
    findFirstName,
    findAll,
    deleteId,
    logIn,

}