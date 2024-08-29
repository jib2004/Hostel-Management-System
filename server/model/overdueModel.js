import mongoose from "mongoose";

const overdueSchema = new mongoose.Schema({
    reference:{
        type:Object,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    hostel:{
        type:String,
        require:true
    },
    plan:{
        type:String,
        require:true
    },
    amountPaid:{
        type:Number,
        require:true
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

    const overdueModel = mongoose.model('overdue',overdueSchema)
    export default overdueModel