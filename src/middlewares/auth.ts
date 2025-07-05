import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function authenticate(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }

  return user; // means success
}
