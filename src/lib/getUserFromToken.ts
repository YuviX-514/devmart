import jwt from "jsonwebtoken";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function getUserFromToken(req: Request) {
  try {
    // ✅ 1. Try Authorization header
    const authHeader = req.headers.get("authorization");
    const token = 
      authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1]
        ? authHeader.split(" ")[1]
        :(await cookies()).get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById((decoded as any)._id).select("-password");

    return user;
  } catch (err) {
    return null;
  }
}
