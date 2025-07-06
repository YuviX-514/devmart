"use client";

import { useUser } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
        <div className="animate-pulse text-neutral-700 text-center">
          <div className="h-24 w-24 rounded-full bg-zinc-800 mx-auto mb-4"></div>
          <div className="h-6 w-40 bg-zinc-800 mx-auto mb-2"></div>
          <div className="h-4 w-32 bg-zinc-800 mx-auto mb-1"></div>
          <div className="h-3 w-48 bg-zinc-800 mx-auto"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-neutral-800 bg-zinc-950 p-8 shadow-xl text-white text-center">
        <Image
          src={user.avatar?.trim() ? user.avatar : "/default.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="mx-auto rounded-full border border-neutral-700"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-neutral-400">{user.email?.trim() || "Email not set"}</p>
        <p className="text-sm text-neutral-500">{user.bio?.trim() || "No bio added yet."}</p>

        <Link href="/profile/edit">
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">
            Edit Profile ✏️
          </button>
        </Link>
      </div>
    </main>
  );
}
