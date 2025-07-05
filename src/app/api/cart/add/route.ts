import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, title, price, thumbnail, quantity } = await req.json();

    const existingItem = user.cart.find((item: { id: any }) => item.id === id);

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ id, title, price, thumbnail, quantity });
    }

    await user.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
