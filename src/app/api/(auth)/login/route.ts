
import connectDB from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { generateToken, isPasswordValid } from "@/helpers/jwtAuth";
export async function POST(request:NextRequest){
        await connectDB();
    const reqBody = await request.json()
    const {email,password} = reqBody;

    if(!email || !password){
        return NextResponse.json({
            message:"Please provide all the fields",
            success:false
        },{
            status:400
        })
    }

    const user = await User.findOne({email})
    if(!user){  
        return NextResponse.json({
            message:"User not found",
            success:false
        },{
            status:404
        })
    }

    const isPasswordCorrect: boolean = await isPasswordValid(password,user.password)
    if(!isPasswordCorrect){
        return NextResponse.json({
            message:"Invalid password",
            success:false
        },{
            status:401
        })
    }

    const token = generateToken({
        id:user._id,
        email:user.email,
        role:user.role
    })

    const response = NextResponse.json({
        message:"Login successful",
        success:true
    })

    response.cookies.set("token",token,{
        httpOnly:true,
    })

    return response
    
}