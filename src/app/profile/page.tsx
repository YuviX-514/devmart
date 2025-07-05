"use client";

import { useUser } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    // Wrap loading in the same main container to reserve space
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
        <p className="text-white text-center">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-neutral-800 bg-zinc-950 p-8 shadow-xl text-white text-center">
        <Image
          src={user.avatar ?? "/default.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="mx-auto rounded-full border border-neutral-700"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-neutral-400">{user.email ?? "Email not set"}</p>
        <p className="text-sm text-neutral-500">{user.bio ?? "No bio added yet."}</p>

        <Link
          href="/profile/edit"
          className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
        >
          Edit Profile ✏️
        </Link>
      </div>
    </main>
  );
}

