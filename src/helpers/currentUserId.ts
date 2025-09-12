import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
export interface JwtPayload {
    id: string;
}
export default async function getCurrentUserId(request:NextRequest){

        try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return;
        }
const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
const userId = await User.findById(decodedToken.id).select("-password");
        return userId;
    } catch (error:unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error("Failed to fetch current user ID: " + errorMessage);
    }
}