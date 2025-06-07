const  mongoose  = require("mongoose")

const studentSchema=new mongoose.Schema({
   firstname:{type:String,required:true,maxlength:10},
   lastname:{type:String,required:true,maxlength:10},
   gender:{type:String,enum:['Male','Female'],required:true},
   age:{type:Number,required:true},
   email:{type:String,required:true,unique:true},
   phone:{type:String,required:true,unique:true}
})
module.exports=mongoose.model('Student',studentSchema,'students');