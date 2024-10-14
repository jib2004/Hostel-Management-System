import nodemailer from 'nodemailer'
import { generateOtp } from '../OTP-generator/otp-generator.js'


export async function main(req,res) {
    const {email} = req.body
    if(!email){
        return res.status(400).json('Email is required')
    }
    try {
        const isStudent = await Student.findOne({email})
        if(!isStudent){
            return res.status(404).json('Email not found')
        }
        const otp = generateOtp()
        console.log(otp)
        res.cookie('otp',otp)
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
         
    } catch (error) {
        res.status(500).json(error)
    }
}

