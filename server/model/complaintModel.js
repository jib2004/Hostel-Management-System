import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
    hostel:{
        type:String,
        require:true,
    },
    room:{
        type:String,
        require:true,
        
    },
    complaint:{
        type:String,
        require:true,
        min:0,
        max:250
    },
    service:{
        type:String,
        require:true,
        
    },
    status:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        unique:true,
        require: true ,
    }
})

const ComplaintModel = mongoose.model("complaint", complaintSchema)

export default ComplaintModel
