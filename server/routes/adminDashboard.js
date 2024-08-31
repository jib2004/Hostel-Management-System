import express from 'express'
import Admin from '../model/adminModel.js';
import { cookieAuth } from '../JWTVerifyUsers/verify.js';
import  Student  from '../model/studentModel.js'
import DefaulterModel from '../model/defaultersModel.js';
import  Hostel  from '../model/hostelModel.js';
import { paymentModel } from '../model/paymentModel.js';
import CheckOutModel from '../model/checkOutModel.js';
import ComplaintModel from '../model/complaintModel.js';
import withdrawModel from "../model/withdrawalRequestMKodel.js";


const adminDashboard = express.Router()

adminDashboard.get('/hostel',cookieAuth,async(req,res)=>{
    try {
     const hostel = await Hostel.find()
     res.status(200).json(hostel)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", errorMessage:error})
    }
})

adminDashboard.get('/paymentMade',cookieAuth,async (req,res)=>{
    try {
        const payment = await paymentModel.find()
        
        res.status(200).json(payment)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", errorMessage:error})
    }
})

adminDashboard.get("/complaint",cookieAuth, async(req,res)=>{
    try {
        const complaint = await ComplaintModel.find()
        res.status(200).json(complaint)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", errorMessage:error})
    }
})

adminDashboard.get('/checkout',cookieAuth,async(req,res)=>{
    try{
        const checkout = await CheckOutModel.find()
        res.status(200).json(checkout)
    }catch(e){
        res.status(500).json({message:"Internal Server Error", errorMessage:e})
    }
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

adminDashboard.get('/search',cookieAuth,(req,res)=>{
    const searchTerm = req.query.search
    try {
        // const searchQuery = {name:{$eq:query}}
        const student = Student.find({name:{$eq:searchTerm}})
        if(!student){
            res.status(400).json({message:"Not found"})
        }
        res.status(200).json(student)
 
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
})  

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

adminDashboard.post('/hostel',cookieAuth,async (req,res)=>{
    const {name,plan,numOfFloors,roomsPerFloor,capacity,numOfKitchens,price,description,selectedSpace,dateOfCreation} = req.body
    if(!name || !plan || !numOfFloors ||!roomsPerFloor||!capacity||!numOfKitchens||!price||!description){
        return res.status(400).json({message:"Please fill all the fields"})
    }

    try {
        const newHostel =await Hostel.create({
            name,
            plan,
            numOfFloors,
            roomsPerFloor,
            capacity,
            numOfKitchens,
            price,
            description,
            selectedSpace,
            dateOfCreation
        })
        await newHostel.save()

        res.status(201).json(newHostel)
    } catch (error) {
        res.status(500).json({title:"Internal Server Error",message:error })
    }
})

adminDashboard.get('/hostels',cookieAuth,async(req,res)=>{
    try {
        const hostels = await Hostel.find()
        res.status(200).json(hostels)
    } catch (error) {
        res.status(500).json({title:"Internal Server Error",message:error })
    }
})

adminDashboard.put('/complaint/:id',cookieAuth,async(req,res)=>{
    const {id} = req.params

    try {
        const complain = await ComplaintModel.findByIdAndUpdate(id,{status:true})
        res.status(200).json(complain)
    } catch (error) {
        console.log(error)
    }
})

adminDashboard.delete('/complaint/:id',cookieAuth,async (req,res)=>{
    const { id } = req.params;
  
    try {
      const student = await Student.findByIdAndUpdate(id, { isComplained: false });
  
      if (!student) {
        // Handle case where student is not found:
        return res.status(404).json({ message: 'Student not found' });
      }
  
      await ComplaintModel.findOneAndDelete({ studentId: id });
  
      res.status(200).json(student);
    } catch (error) {
      console.error('Error deleting complaint:', error); // Log specific error
      res.status(500).json({ message: 'Internal server error' }); // Generic error for client
    }

})

adminDashboard.get('/withdrawal-requests',cookieAuth,async(req,res)=>{
    try {
        const withdrawalRequest = await withdrawModel.find()
        res.status(200).json(withdrawalRequest)
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
})

adminDashboard.put('/deposit/:id',cookieAuth,async(req,res)=>{
    const {id} = req.params
    const {amount} = req.body
    try {
        const student = await Student.findByIdAndUpdate(id)
        if(!student.amountDeposited){
            student.amountDeposited = Array(Number(amount))
        }else{
            student.amountDeposited.push(Number(amount))
        }
        await student.save()
        res.status(200).json({
            message:'Deposited Successfully',
            updatedValue:student
        })
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

adminDashboard.put('/approved/:id',cookieAuth,async(req,res)=>{
    const {id} =  req.params
    try {
        const approve = await withdrawModel.findByIdAndUpdate(id,{isSent:true})
        res.status(200).json(approve);
       
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

adminDashboard.get('/logout',cookieAuth,async(req,res)=>{
    res.clearCookie('token').json({message:"Successfully Logged Out"})
})
export default adminDashboard