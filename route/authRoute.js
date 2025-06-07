const express = require('express');
const router=express.Router()
const authController=require('../controller/authController.js')
const authMiddleware=require('../middleware/authMiddleware.js')

router.post('/login',authController.login)
router.post('/register',authController.register)
router.get('/profile',authMiddleware,authController.profile)

module.exports=router;