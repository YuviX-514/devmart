"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, bio, avatar }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        toast.success("✅ Profile updated!");
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        toast.error(data.error || "❌ Update failed");
      }
    } catch (err) {
      toast.error("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl border border-neutral-800 bg-zinc-950 p-8 shadow-xl text-white"
      >
        <h1 className="text-2xl font-bold text-center">✏️ Edit Profile</h1>

        <div>
          <label className="text-sm">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Bio</label>
          <textarea
            className="w-full mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm">Avatar URL</label>
          <input
            type="text"
            className="w-full mt-1 p-2 bg-zinc-900 border border-zinc-700 rounded"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        {avatar && (
          <img
            src={avatar}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full mx-auto border border-zinc-700 mt-4"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded bg-purple-600 hover:bg-purple-700 py-2 font-semibold text-white transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
