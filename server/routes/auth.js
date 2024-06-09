import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  Student  from '../model/studentModel.js'

const studentRoute = express.Router()

studentRoute.post("/student",async (req,res)=>{
    const {
        name,
        email,
        password,
        emergencyContactName,
        phoneNumber,
        emergencyPhoneNumber,
        address,
        gender ,
        profilePicture} = req.body

    if(!name || !email || !password || !emergencyContactName || !phoneNumber || !emergencyPhoneNumber || !address || !gender ){
       return res.status(400).json("Kindly Fill The Required Field")
        
    }

    const hashedPassword = bcryptjs.hashSync(password,10)
    const newStudent = new Student({
        name,
        email,
        password:hashedPassword,
        emergencyContactName,
        phoneNumber,
        emergencyPhoneNumber, 
        address,
        gender,
        profilePicture
    })


    try{
    await newStudent.save()
     res.json("Sign-up Successful")

    }catch(e){
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
            return res.status(404).json("User does not exist")
        }

        const verifyPassword = bcryptjs.compareSync(password,studentEmail.password)

        if(!verifyPassword){
            res.status(400).json("Incorrect Password")
        }

        const token = jwt.sign({"id": studentEmail._id}, process.env.JWT_SECRET_KEY,{}) // payload, jwt_key, time it expires {expiresIn: 5m}

        res.cookie("token",token,{
            httpOnly:true // it is not available to javascript
        }).json(studentEmail._doc)
        
    } catch (error) {
        console.log(error)
    }
})


export default studentRoute


//Note refresh token lasts longer than the access token
