const mongoose = require('mongoose');

const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
        userName : {
            type : String,
            unique : true,
            required: true,
            minLength: 8,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        firstName: {
            type : String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 15,
            trim: true,
        },
        lastName: {
            type : String,
            required: true,
            minLength: 3,
            maxLength: 15,
            trim: true,
        },
        dob :{
            type : Date,
        }
    },
{ timestamps: true })

userSchema.pre("save",function(){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
    console.log(this)
})
// userSchema.methods.comparePassword = function(password){
//     const self = this;
//     console.log({password,self})
// }
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password)
}

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;