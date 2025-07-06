import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

interface RegisterRequestBody {
  first: string;
  last: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: RegisterRequestBody = await req.json();
    const { first, last, email, password } = body;

    // 🧠 Validate
    if (!first || !last || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 👤 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // ✅ Create user (NO manual bcrypt)
    const newUser = await User.create({
      name: `${first} ${last}`,
      email,
      password,
      bio: "Hey, I'm using DevMart", // DevMart mention sahi hai
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Signup failed. Server error." },
      { status: 500 }
    );
  }
}
