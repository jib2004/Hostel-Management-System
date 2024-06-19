import express from 'express'
import Admin from '../model/adminModel.js';
import { cookieAuth } from '../JWTVerifyUsers/verify.js';
import  Student  from '../model/studentModel.js'
import DefaulterModel from '../model/defaultersModel.js';



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


adminDashboard.get('/student/:id', cookieAuth,async (req,res)=>{
    const {id} = req.params
    try {
        const studentInfo = await Student.findById(id).select("-password")
        res.status(200).json(studentInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

adminDashboard.put('/student/block/:id',cookieAuth,async(req,res)=>{
    const {id} = req.params
    try {
        const blockStudent = await Student.findByIdAndUpdate(id).select("-password")
        
        blockStudent.isBlocked = !blockStudent.isBlocked
        await blockStudent.save()
        res.status(200).json({message:"Student Blocked Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

adminDashboard.delete('/student/:id',cookieAuth, async(req,res)=>{
    
    const {id} = req.params
    try{
        const removeStudent = await Student.findByIdAndDelete(id)
        const defaulterRemove = await DefaulterModel.findOneAndDelete({studentId:id})
        if (!removeStudent) {
            return res.status(404).json({ message: 'User not found' });
          } 
          res.status(200).json({ message: 'User deleted successfully' });
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Internal server error' });
    }
})

// adminDashboard.get('/search',cookieAuth,(req,res)=>{
//     const {query} = req.query
//     try {
//         const searchQuery = {name:{$eq:query}}
//         const student = Student.find(searchQuery).select("-password")
//         if(!student){
//             res.status(400).json({message:"Not found"})
//         }
//         res.status(200).json(student)
 
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

adminDashboard.post('/defaulter/:id',cookieAuth,async(req,res)=>{
    const {name,reason,price,date} = req.body
    const {id} = req.params
    if(!name || !reason || !price){
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({ message: 'Student not found' });
        }
        const defaulter = new DefaulterModel({
                name:student.name,
                reason,
                price,
                date,
                profilePicture:student.profilePicture,
                studentId: student._id, // Important: Store the student's ID for reference
        })

        student.defaulter = true
        await student.save() //Save the updated student document

        const saveDefaulter = await defaulter.save()
        res.status(200).json(saveDefaulter);

        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

adminDashboard.get("/defaulters",cookieAuth,async (req,res)=>{
        try {
            const defaulters = await DefaulterModel.find()
            res.status(200).json(defaulters)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal server Error"})
        }
})

adminDashboard.get("/defaulter/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const defaulter =await DefaulterModel.findById(id)
        res.status(200).json(defaulter)
    } catch (error) {
        res.status(500).json({message:"Internal server Error"})
    }
})

adminDashboard.delete("/defaulter/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const defaulter =await DefaulterModel.findByIdAndDelete(id)
        const studentId =defaulter.studentId
        const student = await Student.findById(studentId)
        
        if(student){
          student.defaulter = false
          await student.save()
        }
        res.status(200).json(defaulter)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server Error"})
    }
    

})

export default adminDashboard