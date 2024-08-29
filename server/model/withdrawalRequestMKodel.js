import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    amountToWithdraw:{
        type:Number,
        require:true
    },
    accountNumber:{
        type:Number,
        require:true
    },
    isSent:{
        type:Boolean,
        default:false
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        require: true 
    
    }
})

const withdrawModel = mongoose.model('withdraw',withdrawalSchema)
export default withdrawModel