// /app/api/auth/me/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req: Request) {
  await connectDB();

  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userId).select("-password -__v");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return full user data including bio!
  return NextResponse.json({ user });
}
