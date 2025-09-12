import { ROLES } from "@/constants/userConstants";
import mongoose from "mongoose";


const userSchema  = new mongoose.Schema({
    username:{
    type:String,
    required:[true,"Please provide username"],
    unique:true
    },
    password:{
    type:String,
    required:[true,"Please provide password"]
    },
    email:{
    type:String,
    required:[true,"Please provide email"],
    unique:true
    },
    role:{
        type:String,
        enum:Object.values(ROLES),
        default:ROLES.USER
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,


    
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User