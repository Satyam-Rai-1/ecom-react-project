
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
    }
})
const UserModel= mongoose.model('users',UserSchema);
module.exports=UserModel;