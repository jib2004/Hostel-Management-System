import mongoose from "mongoose";

const defaulterSchemer = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    reason:{
        type:String,
        required:true, 
        min:1,
        max:100,
        trim:true,
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    },
    studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true ,
    unique:true
}, // Existing reference
})


const DefaulterModel = mongoose.model('defaulters', defaulterSchemer)

export default DefaulterModel