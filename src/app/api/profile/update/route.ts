import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/getUserFromToken";

interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  avatar?: string;
}

export async function PATCH(req: Request) {
  await connectDB();

  const userId: string | null = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body: UpdateProfileRequest = await req.json();
  const { name, bio, avatar } = body;

  // Optional debug log (remove in production)
  console.log("Update request body:", { name, bio, avatar });

  try {
    const updateFields: Partial<{
      name: string;
      bio: string;
      avatar: string;
    }> = {};

    if (name !== undefined) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    if (avatar !== undefined) updateFields.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Profile updated", user },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update profile error:", err);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
