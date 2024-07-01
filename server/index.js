import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
 
import { connectDB } from './connectDB/connectDB.js'
import  studentRoute  from './routes/auth.js'
import adminRoute from './routes/adminAuth.js'
import adminDashboard from './routes/adminDashboard.js'
import studentDashboard from './routes/studentDashboard.js'


const app = express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
})) 
app.use(cookieParser())
dotenv.config()
connectDB(process.env.MONGODB_URL)


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/api/auth/",studentRoute)
app.use("/api/auth/",adminRoute)
app.use("/admin/",adminDashboard)
app.use("/student/",studentDashboard)

app.listen(5000,()=>{
    console.log('Server is running')
})