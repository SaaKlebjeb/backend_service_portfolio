const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const auth=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:'Unauthorized'})
        }
        const token=authHeader.split(' ')[1];
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decoded;//after decoding the token, we get the user id {id:"xxxxxxx"}
        console.log('decoded:',req.user)
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(401).json({message:'Unauthorized'})
        }
        next()
    } catch (error) {
        console.log('error:',error)
        return res.status(404).json({message:'not found'})
    }
}
module.exports=auth;