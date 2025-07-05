"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setSuccess("🎉 Account created successfully!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setError("❌ Something went wrong. Try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl border border-neutral-800 bg-zinc-950 p-8 shadow-xl"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Create a DevSync Account
          </h1>
          <p className="text-sm text-neutral-400">
            Start building, collaborating, and launching today.
          </p>
        </div>

        {/* Name fields */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <Label htmlFor="first">First Name</Label>
            <Input
              id="first"
              name="first"
              value={formData.first}
              onChange={handleChange}
              placeholder="Tyler"
              required
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="last">Last Name</Label>
            <Input
              id="last"
              name="last"
              value={formData.last}
              onChange={handleChange}
              placeholder="Durden"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Password"
            required
          />
        </div>

        {/* Error Message */}
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

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-100 transition"
        >
          Create Account →
        </button>

        {/* Switch to Login */}
        <p className="text-sm text-neutral-400 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>

        {/* OAuth Buttons */}
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
