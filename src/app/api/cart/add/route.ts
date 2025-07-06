import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/getUserFromToken";

interface AddToCartRequest {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: AddToCartRequest = await req.json();
    const { id, title, price, thumbnail, quantity } = body;

    const existingItem = user.cart.find(
      (item: CartItem) => item.id === id
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      user.cart.push({
        id,
        title,
        price,
        thumbnail,
        quantity,
      });
    }

    await user.save();

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
