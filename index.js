const express=require('express');
const cors=require('cors');
require('dotenv').config()
const mongoose=require('mongoose');

const app=express();
app.use(cors())
app.use(express.json());
//import uri
const uri=process.env.URI;
//create a connection to the database
mongoose.connect(uri)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));
//import functions from the route file
// const studentRoute=require('./route/student.route')
//import the model
// const Student=require('./models/student.model')
// //use the route file
//  studentRoute(app,Student)
const authRoute=require('./route/authRoute.js')
app.use('/api/auth',authRoute)
app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})