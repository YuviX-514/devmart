"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
  credentials: "include", // 💥💥 MUST for sending/receiving cookies
});



      const data = await res.json();

      if (res.ok) {
        setSuccess("🎉 Logged in successfully!");

        // 🧠 Save token and notify Navbar
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("tokenUpdated"));

        setTimeout(() => {
          router.push("/"); // redirect to home
        }, 1500);
      } else {
        setError(data.error || "❌ Invalid credentials");
      }
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl border border-neutral-800 bg-zinc-950 p-8 shadow-xl"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Log in to DevSync
          </h1>
          <p className="text-sm text-neutral-400">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 p-2 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 bg-green-100 border border-green-400 p-2 rounded text-sm">
            {success}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-100 transition"
        >
          Log in →
        </button>
        <div>
          <p className="text-sm text-neutral-400 text-center">
            Dont't have an account?{" "}
            <Link href="/auth/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* OAuth Options */}
        <div className="space-y-2 pt-4">
          {["Continue with GitHub", "Continue with Google"].map((provider) => (
            <button
              key={provider}
              type="button"
              className="w-full rounded-md bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 transition"
            >
              {provider}
            </button>
          ))}
        </div>
      </form>
    </main>
  );
}
