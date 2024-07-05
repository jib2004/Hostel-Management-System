import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    hostel:{
        type:String,
        require:true
    },
    room:{
        type:String,
        require:true
    },
    dateOfLeave:{
        type:Date,
        require:true
    },
    dateOfArrival:{
        type:Date,
        require:true
    },
    reasonForLeave:{
        type:String,
        require:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        unique:true,
        require: true
    }
})

const CheckOutModel = mongoose.model('CheckOut',checkOutSchema)

export default CheckOutModel