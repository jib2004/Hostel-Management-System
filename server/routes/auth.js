import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  Student  from '../model/studentModel.js'
import nodemailer from 'nodemailer'
import { generateOtp } from '../OTP-generator/otp-generator.js'
import { authenticator } from 'otplib';

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

studentRoute.put('/forgot-password',async(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json('Email is required')
    }
    const otp = generateOtp()
    try {
        const isStudent = await Student.findOne({email})
        if(!isStudent){
            return res.status(404).json('Email not found')
        }
   
        isStudent.otp = otp
        await isStudent.save()
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, 
        secure: true,
            auth:{
                user: process.env.GMAIL_EMAIL,
                pass:process.env.GMAIL_PASSWORD
            }
        })
         
        const info = await transporter.sendMail({
            from:`"Wonder Boy" ${process.env.GMAIL_EMAIL}`,
            to: email,
            subject:`OTP-password `,
            text:`This is a one-time password ${otp}`
            
        })
         .catch(e=>console.log(e))

        res.status(200).json("Check your email for an OTP")
         
    } catch (error) {
        res.status(500).json(error)
    }
})



studentRoute.put('/verify-otp',async(req,res)=>{
    const {email,otp} = req.body

    try {
        const isStudent = await Student.findOne({email})
        if(!isStudent){
            return res.status(404).json('Email not found')
        }
        if(isStudent.otp !== otp){
            return res.status(400).json('Invalid OTP')
        }
        isStudent.isVerified = true
        await isStudent.save()
        res.status(200).json('Otp Valid')
        

    } catch (error) {
        res.status(500).json(error)
    }
})

studentRoute.put('/change-password',async (req,res)=>{
    const {email,password} = req.body
    if(!email,!password){
        return res.status(400).json('Email and password are required')
    }
    try {
        const hashPassword = bcryptjs.hashSync(password,10)
        const student = await Student.findOneAndUpdate({email},{password:hashPassword,otp:"",isVerified:false})
        if(!student){
            return res.status(404).json('Email not found')
        }
        res.status(200).json('Password Changed')
    } catch (error) {
        res.status(500).json(error)
    }
})

export default studentRoute
//Note refresh token lasts longer than the access token
