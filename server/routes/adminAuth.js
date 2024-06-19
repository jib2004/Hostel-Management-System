import express from 'express'
import Admin from '../model/adminModel.js';
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"



const adminRoute = express.Router()

adminRoute.post('/adminRegister',async (req,res)=>{
    const {isAdmin,name,email,password,phoneNumber} = req.body

    if(!name||!email||!password||!phoneNumber){
        return res.status(400).json({messsage:"Kindly Fill all the fields"})
    }
    if(password.length < 8){
        return res.status(400).json({messsage:"Password too short"})    
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const adminUser = new Admin({
        isAdmin,
        name,
        email,
        password:hashedPassword,
        phoneNumber
    })
    try{
        await adminUser.save()
         res.status(200).json(adminUser)  
    }catch(e){
        console.log(e)
    }
})

adminRoute.post("/adminLogin",async (req,res)=>{
    const {email,password} = req.body
    if(!email||!password){
        return res.status(400).json({message:"Please fill all field"})
    }

    try {
        const adminUser = await Admin.findOne({email})
        if(!adminUser){
            return res.status(404).json("User does not exist")
        }
        const validPassword = bcryptjs.compareSync(password,adminUser.password)
        if(!validPassword){
            return res.status(400).json({message:"Password Incorrect"})
        }
        const token = jwt.sign({id:adminUser._id, admin:adminUser.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        
        res.status(201).cookie("token",token,{
            httpOnly : true
        }).json(adminUser._doc)
    } catch (error) {
        console.log(error)
    }


})



export default adminRoute