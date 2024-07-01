import mongoose from 'mongoose' 

const hostelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    plan:{
        type:String,
        require:true
    },
    numOfFloors:{
        type:Number,
        require:true,
    },
    roomsPerFloor:{
        type:Number,
        require:true,
    },
    capacity:{
        type:Number,
        require:true,
    },
    numOfKitchens:{
        type:Number,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
    },
    selectedSpace:{
        type:Number,
        default:0
    },
    dateOfCreation:{
        type:Date,
        default: Date.now()
    },
    
},)

 const Hostel = mongoose.model('hostel',hostelSchema)

export default Hostel