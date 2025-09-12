import connectDB from "@/db/db";
import { generateToken } from "@/helpers/jwtAuth";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
        await connectDB();
  const reqBody = await request.json();
  const { userId, username, email } = reqBody;
  if (!userId || !username || !email) {
    return NextResponse.json(
      { message: "Please provide all the fields" },
      { status: 400 }
    );
  }
  const user = await User.findByIdAndUpdate(userId,{username,email},{new:true});
  if(!user){
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }
  const updatedToken = generateToken({
    id: user._id,
    email: user.email,
    role: user.role
  });
  // q: should we update token as well?
  // a: If the username or email is part of the token payload, then yes, we should update the token as well.
  //update the token
const response = NextResponse.json({
    message: "User updated successfully",
    success: true,
    user
  });
  response.cookies.set("token",updatedToken,{
    httpOnly:true,
  })
  return response;
};
