
import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    isAdmin:{
        type: Boolean,
        default: false
    },
    name:{
        type:String,
        required:true,
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
    emergencyContactName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
    },
    emergencyPhoneNumber:{
        type:String,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
        
    },
    gender:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
defaulter:{
    type:Boolean,
    default:false
},
isBlocked:{
    type:Boolean,
    default:false
},
inHostel:{
    type:Boolean,
    default:false
},
hostelName:{
    type:String,
    default:""
},
isPaid:{
    type:Boolean,
    default:false
},
isComplained:{
    type:Boolean,
    default:false
},
isCheckOut:{
    type:Boolean,
    default:false
},
room:{
    type:String,
    default:""
},
amountDeposited:{
    type:Array,
    default:[]  
},
isEvicted:{
    type:Boolean,
    default:false
},
otp:{
    type:String,
    default:""
},
isVerified:{
    type:Boolean,
    default:false
}

},
{timeStamp:true}

) 

const Student = mongoose.model('Student',studentSchema)

export default Student


