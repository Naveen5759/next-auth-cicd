import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;
const EXPIRES_IN = "1d"; // Token expiration time

export function generateToken(payload: object): string {
  try {
    const token = jwt.sign(
      {
        ...payload,
      },
      SECRET_KEY,
      {
        expiresIn: EXPIRES_IN,
      }
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
}

export function verifyToken(token: string): object | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as object;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function isPasswordValid(
  password1: string,
  password2: string
): Promise<boolean> {
  return await bcrypt.compare(password1, password2);
}
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
