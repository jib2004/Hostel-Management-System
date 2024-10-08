import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  Student  from '../model/studentModel.js'

const studentRoute = express.Router()

studentRoute.post("/student",async (req,res)=>{
    const {
        isAdmin,
        name,
        email,
        password,
        emergencyContactName,
        phoneNumber,
        emergencyPhoneNumber,
        address,
        gender ,
        profilePicture,
        defaulter,
        isBlocked,
        inHostel,
        hostelName,
        isPaid,
        isComplained,
        room,
        isEvicted,
        amountDeposited
    } = req.body

    if(!name || !email || !password || !emergencyContactName || !phoneNumber || !emergencyPhoneNumber || !address || !gender ){
       return res.status(400).json({message:"Kindly Fill The Required Field"})
        
    }

    if(email){
        const emailExist = await Student.findOne({email})
        if(emailExist){
        return res.status(400).json({message:"Email Already exists"})
        }
    }

    if(phoneNumber){
        const phoneNumberExist = await Student.findOne({phoneNumber})
        if(phoneNumberExist){
        return res.status(400).json({message:"Phone Number Already exists"})
        }
    } 
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newStudent = new Student({
        isAdmin,
        name,
        email,
        password:hashedPassword,
        emergencyContactName,
        phoneNumber,
        emergencyPhoneNumber, 
        address,
        gender,
        profilePicture,
        defaulter,
        isBlocked,
        inHostel,
        hostelName,
        isPaid,
        isComplained,
        room,
        amountDeposited,
        isEvicted
    })
    try{
    await newStudent.save()
     res.json({message:"Sign-up Successful"})
    }catch(e){
        console.log(e)
        return res.status(500).json({message: e.message})
    }
})

studentRoute.post("/login", async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json("Kindly enter your email or password")
    }
    try {
        const studentEmail = await Student.findOne({email})
        if(!studentEmail){
            return res.status(404).json({message:"User does not exist"})
        }
        const verifyPassword = bcryptjs.compareSync(password,studentEmail.password)
        if(!verifyPassword){
            res.status(400).json({message:"Incorrect Password"})
        }
        const token = jwt.sign({"id": studentEmail._id}, process.env.JWT_SECRET_KEY,{expiresIn:"1d"}) // payload, jwt_key, time it expires {expiresIn: 5m}
        res.cookie("token",token,{
            httpOnly:true // it is not available to javascript
        }).json(studentEmail._doc)
    } catch (error) { 
        console.log(error) 
    }
})

export default studentRoute
//Note refresh token lasts longer than the access token
