const mongoose=require('mongoose');
const userSchmera=new mongoose.Schema({
    email:{type:String,requried:true,unique:true},
    password:{type:String,requried:true},
})
module.exports=mongoose.model('User',userSchmera,'users');