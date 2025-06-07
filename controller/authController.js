require('dotenv').config()
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require('../models/userModel')
const secretKey=process.env.SECRET_KEY;

const register=async(req,res)=>{
    try{
        const {email,password}=req.body;//= email:email,password:password {email:email}
        if(!email || !password){
            return res.status(400).json({message:'Please provide email and password'})
        }
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newUser=new User({email,password:hashedpassword})
        const token=jwt.sign({id:newUser._id},secretKey,{expiresIn:'30m'})
        const savedUser=await newUser.save()
        if(savedUser){
            return res.status(200).json({message:'User created successfully',token})
        }
        else{
            return res.status(500).json({message:'Error creating user'})
        }
    }
    catch(err){
        console.log('problem:',err)
        return res.status(500).json({message:'Error creating user'})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:'Please provide email and password'})
        }
        const findUser=await User.findOne({email})
        console.log("Found user:", findUser);
        if(!findUser){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const passwordIsMatch=bcrypt.compare(password, findUser.password);
        if(!passwordIsMatch){
            return res.status(400).json({message:'Wrong password'})
        }
        const token=jwt.sign({id:findUser._id},secretKey,{expiresIn:'30m'})
        res.status(200).json({token})
    } catch (error) {
        console.log("Problem",error)
        res.status(400).json({message:'Cannot login,please check ...!'})
    }
}
const profile=async(req,res)=>{
    try{
        const userInfo=await User.findById(req.user.id)
        console.log('userInfo:',userInfo)
        if(!userInfo){
            return res.status(400).json({message:'User not found'})
        }
        res.status(200).json({userInfo})
        console.log('userInfo:',userInfo)
    }
    catch(error){
        console.log('problem:',error)
        return res.status(500).json({message:'server error'})
    }
}
module.exports={register,login,profile};