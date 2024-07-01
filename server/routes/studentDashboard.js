import { studentVerify } from "../JWTVerifyUsers/studentVerify.js";
import express from 'express'
import  Hostel  from '../model/hostelModel.js';
import { paymentModel } from "../model/paymentModel.js";
import  Student  from '../model/studentModel.js'
import ComplaintModel from "../model/complaintModel.js";

const studentDashboard = express.Router()



studentDashboard.get("/hostel",studentVerify,async(req,res)=>{
    try {
        const hostelOptions = await Hostel.find()

        res.status(200).json(hostelOptions)
    } catch (error) {
        res.status(500).json({message: error})
    }
})



studentDashboard.get("/hostel/:id",studentVerify,async(req,res)=>{
    const {id} = req.params
    try {
        const hostelOptions = await Hostel.findById(id)

        res.status(200).json(hostelOptions)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

studentDashboard.post("/payment",studentVerify,async (req,res)=>{
    const {reference,name,email,hostel,plan,amountPaid,date,studentId} = req.body
    

    try {
        const emailExist = await paymentModel.findOne({email})
        if(
            emailExist){
            return res.status(400).json({message:'You Have Already Registered!'})
          }
        
        const student =await Student.findOne({email})
        if(!student){
            return res.status(404).json({message:"Email Not Found"})
        }
        student.isPaid = true
        student.hostelName = hostel
        await student.save()

        const hostelName = await Hostel.findOne({name:hostel})
        if(!hostelName){
            return res.status(404).json({message:"Hostel Not Found"})
        }
        hostelName.selectedSpace = hostelName.selectedSpace + 1
        await hostelName.save()

        const newPayment = await paymentModel.create({
            reference,
            name,
            email,
            hostel,
            plan:hostelName.plan,
            amountPaid,
            date,
            studentId: student._id
        })
       

        await newPayment.save()
        res.status(201).json(newPayment)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

studentDashboard.post('/complaint/:id',studentVerify, async(req,res)=>{
    const {id} = req.params
    const {name,hostel,room,complaint,status,studentId} = req.body
    if(!room || !complaint){
        return res.status(400).json({message:"Please Fill All Fields!"})
    }

    const student = await Student.findById(id)
    if(!student){
        return res.status(404).json({message:"Student Not Found!"})
    }

    if(student.isPaid === false){
        return res.status(400).json({message:"You Have Not Paid Your Fees!"})
    }

    try {
         const complaintMade = await ComplaintModel.create({
            name:student.name,
            hostel:student.hostelName,
            room,
            complaint, 
            status,
            studentId: student._id
         })
         student.isComplained = true
         await student.save()
         await complaintMade.save()
         res.status(201).json(complaintMade)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

studentDashboard.get('/payment/:id',studentVerify,async(req,res)=>{
    const {id} = req.params
    try{
        const studentPaid = await Student.findById(id)
        if(studentPaid.isPaid === false){
            return res.status(400).json({message:"You Have Not Paid Your Fees!"})
        }
        const payment = await paymentModel.find({studentId:id})
        res.status(200).json(payment)
    }catch(error){
        res.status(500).json({message: error})
    }
})

studentDashboard.get('/complaint/:id',studentVerify,async (req,res)=>{
    const {id} = req.params
    
    try {
        const complaint = await ComplaintModel.findOne({studentId:id})
        res.status(200).json(complaint)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

studentDashboard.put('/studentComplaint/:id',studentVerify,async (req,res)=>{
    const {id} = req.params
    
    try{
        const complaintMade = await ComplaintModel.findOneAndDelete({studentId:id})
       
        const student = await Student.findByIdAndUpdate(id)
        student.isComplained = false
        await student.save()
        await complaintMade.save()
        res.status(200).json(student)
    }catch(error){
        res.status(500).json({message: error})
    }
})

studentDashboard.put('/complaint/:id',studentVerify,async (req,res)=>{
    const {id} = req.params
    
    try{
        const complaintStatus = await ComplaintModel.findByIdAndUpdate(id)
        complaintStatus.status = false
      await complaintStatus.save()
        res.status(200).json(complaintStatus)
    }catch(error){
        res.status(500).json({message: error})
    }
})

studentDashboard.get('/:id',studentVerify,async (req,res)=>{
    const {id} = req.params
    try {
        const studentInfo = await Student.findById(id)
        res.status(200).json(studentInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default studentDashboard