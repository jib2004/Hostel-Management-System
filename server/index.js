import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
 
import { connectDB } from './connectDB/connectDB.js'
import  studentRoute  from './routes/auth.js'
import adminRoute from './routes/adminAuth.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
dotenv.config()
connectDB(process.env.MONGODB_URL)


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/api/auth/",studentRoute)
app.use("/api/auth/",adminRoute)

app.listen(5000,()=>{
    console.log('Server is running')
})