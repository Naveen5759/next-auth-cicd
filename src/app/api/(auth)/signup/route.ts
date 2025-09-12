import connectDB from "@/db/db";
import { hashPassword } from "@/helpers/jwtAuth";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await connectDB();
  const body = await request.json();
  const { username, email, password } = body;
  if (!username || !email || !password) {
    console.log("Missing fields:", { username, email, password });
    return NextResponse.json(
      { message: "Please provide all the fields" },
      { status: 400 }
    );
  }
  const user = await User.findOne({ email });
  if (user) {
    console.log("Email already exists:", email);
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }


  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const createdUser = await newUser.save();

  console.log("Created User:", createdUser);
  return NextResponse.json({
    message: "User created successfully",
    success: true,
    createdUser 
  },
  { status: 201 });
}
