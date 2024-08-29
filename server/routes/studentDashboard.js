import { studentVerify } from "../JWTVerifyUsers/studentVerify.js";
import express from 'express'
import  Hostel  from '../model/hostelModel.js';
import { paymentModel } from "../model/paymentModel.js";
import  Student  from '../model/studentModel.js'
import ComplaintModel from "../model/complaintModel.js";
import CheckOutModel from "../model/checkOutModel.js";
import withdrawModel from "../model/withdrawalRequestMKodel.js";

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
    const {reference,name,email,hostel,amountPaid,date} = req.body
    

    try {
        const emailExist = await paymentModel.findOne({email})
        if(emailExist){
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

studentDashboard.put('/room/:id',studentVerify,async(req,res)=>{
    const {id} = req.params
})

studentDashboard.post('/complaint/:id',studentVerify, async(req,res)=>{
    const {id} = req.params
    const {name,hostel,room,complaint,service,status,date,studentId} = req.body
    if(!room || !complaint || !service){
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
            service,
            status,
            date,
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

studentDashboard.delete('/studentComplaint/:id', studentVerify, async (req, res) => {
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
  });

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

studentDashboard.post('/checkOut/:id',studentVerify,async(req,res)=>{
        const {id} = req.params
        const {name,hostel,room,dateOfLeave,dateOfArrival,reasonForLeave,isApproved,studentId} = req.body
        if(!name|| !hostel || !room || !dateOfLeave || !dateOfArrival || !reasonForLeave){
         return res.status(400).json({message:'Kindly fill all fields'})
        }
        const student = await Student.findById(id)

        try {
            const checkOut = await CheckOutModel.create({
                name,
                hostel,
                room,
                dateOfLeave,
                dateOfArrival,
                reasonForLeave,
                studentId:student._id
            }) 
            student.isCheckOut = true
            await student.save()
            await checkOut.save()
            res.status(200).json(checkOut)
        } catch (error) {
            res.status(500).json({message:'Internal Server Error', errorMessage:error})
        }
})

studentDashboard.get('/checkOut/:id',studentVerify,  async (req,res)=>{
    const {id} = req.params
    try {
        const student = await Student.findById(id)
        const checkOut = await CheckOutModel.find({studentId:student._id})
        if(!checkOut){
            return res.status(404).json({message:'No CheckOut Found'})
        }
        res.status(200).json(checkOut)

    } catch (error) {
        res.status(500).json({message:'Internal Server Error', errorMessage:error})
    }
})

studentDashboard.delete('/checkOut/:id',studentVerify,async(req,res)=>{
    const {id} = req.params
    try {
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({message:'No Student Found'})
        }
        student.isCheckOut = false
        await student.save()
        const userId = student._id
        const checkOut = await CheckOutModel.findByIdAndDelete(userId)
        if(!checkOut){
            return res.status(404).json({message:'No CheckOut Found'})
        }

        res.status(200).json({message:'CheckOut Deleted Successfully'})
    
    } catch (error) {
        res.status(500).json({message:'Internal Server Error', errorMessage:error})
    }
})  

studentDashboard.get('/logout',(req,res)=>{
    res.clearCookie('token').json({message:"Successfully Logged Out"})
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

studentDashboard.put('/deposit/:id',studentVerify,async(req,res)=>{
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

studentDashboard.post('/withdraw/:id',studentVerify,async(req,res)=>{
    const {id} = req.params
    const {name,email,accountNumber,amountToWithdraw} = req.body
    if(!name || !email || !accountNumber|| !amountToWithdraw){
        return res.status(400).json('Kindly fill all fields')
    }
    const student = await Student.findById(id)
    const totalAmountInAccount = student.amountDeposited.reduce((a,c)=> a + c, 0)
    if(!student){
        return res.status(404).json('User not found')
    }
    if(student.amountDeposited[student.amountDeposited.length - 1] === 0 || amountToWithdraw > totalAmountInAccount){
        return res.status(400).json('Insufficient Balance')
    }

    if(student.amountDeposited.length === 0){
        return res.status(400).json('No amount deposited')
    }
    const withdrawMade = await withdrawModel.find({studentId:student._id})
    if(withdrawMade[0]?.isSent){
            const updateWithdrawal = await withdrawModel.findByIdAndUpdate(withdrawMade[0]._id,{
                amountToWithdraw,
                accountNumber,
                isSent:false,
            })
            return res.status(200).json(updateWithdrawal)
    }
  
        try {
            const withdraw = await withdrawModel.create({
                name,
                email,
                amountToWithdraw,
                accountNumber,
                studentId:student._id
            })
    
            res.status(201).json(withdraw)
        } catch (error) {
            res.status(500).json(error)
        }
})
 
export default studentDashboard