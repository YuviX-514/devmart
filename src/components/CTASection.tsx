"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CTASection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const checkLogin = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setIsLoggedIn(true);
        setUserName(data.user.name.split(" ")[0]);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkLogin();

    window.addEventListener("tokenUpdated", checkLogin);
    return () => window.removeEventListener("tokenUpdated", checkLogin);
  }, []);

  return (
    <div className="max-w-5xl mx-auto text-center space-y-6 px-4">
      {isLoggedIn ? (
        <>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Welcome back, {userName}! 👋
          </h2>
          <p className="text-gray-400 text-lg">
            Explore the latest arrivals and exclusive deals just for you.
          </p>
          <Link href="/products">
            <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:scale-105 transition-transform duration-300">
              <span className="block rounded-full bg-black px-8 py-3 text-lg font-semibold text-white hover:text-purple-700 transition-colors duration-300">
                Browse Products
              </span>
            </div>
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of tech lovers upgrading their lives with{" "}
            <span className="font-semibold text-white">DevMart</span>.
          </p>
          <Link href="/auth/signup">
            <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:scale-105 transition-transform duration-300">
              <span className="block rounded-full bg-black px-8 py-3 text-lg font-semibold text-white hover:text-purple-700 transition-colors duration-300">
                Create Account
              </span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
