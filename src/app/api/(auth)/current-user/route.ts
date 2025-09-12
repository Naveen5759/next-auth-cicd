import { NextRequest, NextResponse } from "next/server";
import getCurrentUserId from "@/helpers/currentUserId";
import User from "@/models/userModel";
import connectDB from "@/db/db";

export async function GET(request:NextRequest){
        await connectDB();
try {
    const currentUserId = await getCurrentUserId(request);
    const currentUser = await User.findById(currentUserId).select("-password -__v");
    return NextResponse.json({
        message:"Successfully fetched current user",
        user: currentUser
    });
} catch (error) {
    return NextResponse.json({
        message:"Failed to fetch current user",
        error
    },{
        status:500
    })
}
}