import express from 'express'
import Admin from '../model/adminModel.js';
import { cookieAuth } from '../JWTVerifyUsers/verify.js';
import  Student  from '../model/studentModel.js'


const adminDashboard = express.Router()

adminDashboard.get("/",(req,res)=>{
    res.json("Working Yesss")
})

adminDashboard.get("/students",cookieAuth,async (req,res)=>{
    try {
        const students = await Student.find().select("-password")
           // Check for retrieved students
    if (!students) {
        return res.status(404).json({ message: 'No students found' });
      }
  
      // Send successful response with students data
      res.status(200).json(students);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default adminDashboard