import mongoose from 'mongoose'



const adminSchema = new mongoose.Schema({
    isAdmin:{
        type: Boolean,
        default: true,

    },
    name:{
        type:String,
        required:true,
        min:3,
        max:20,
        trim:true,
    },

    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
    }
},
{timeStamp:true}
)

const Admin = mongoose.model("admin", adminSchema)

export default Admin