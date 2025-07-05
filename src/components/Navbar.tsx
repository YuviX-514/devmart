"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const itemCount = 0;

  const checkLogin = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      setIsLoggedIn(res.ok && !!data.user);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    checkLogin();
    window.addEventListener("tokenUpdated", checkLogin);
    return () => window.removeEventListener("tokenUpdated", checkLogin);
  }, []);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.dispatchEvent(new Event("tokenUpdated"));
      alert("🛑 Logged out successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  if (!hasMounted) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-gradient-to-r from-purple-900 via-black to-black text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
      href="/"
      className="flex items-center gap-3 group text-xl font-extrabold tracking-tight select-none"
    >
      <Image
        src="/logo.png"
        alt="DevMart"
        width={36}
        height={36}
        className="rounded-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <span
        className="text-2xl font-extrabold 
        bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 
        bg-clip-text text-transparent 
        transition-transform duration-300 ease-in-out 
        group-hover:scale-110 
        group-hover:drop-shadow-[0_0_8px_rgba(255,192,203,0.7)]
        group-hover:brightness-125"
      >
        DevMart
      </span>
    </Link>

        {/* Nav Links */}
        <nav className="hidden gap-8 md:flex text-sm font-medium">
  {["Home", "Products", "About", "Contact"].map((item) => {
    const path = item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
    return (
      <Link
        key={item}
        href={path}
        className="text-gray-400 hover:text-white transition-transform duration-300 transform-gpu hover:scale-110 origin-center"
      >
        {item}
      </Link>
    );
  })}
</nav>


        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <Link href="/cart" className="relative group">
            <ShoppingCart size={26} className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth UI */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-full border border-neutral-700 p-1 hover:ring-4 hover:ring-purple-600 transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-purple-600"
                aria-label="User menu"
              >
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full shadow-lg"
                  priority
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#1f1f1f]/90 backdrop-blur-md py-3 shadow-xl ring-1 ring-purple-600 z-50">
                  <Link
                    href="/profile"
                    className="block px-5 py-2 text-sm text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-5 py-2 text-sm text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-200 rounded-md"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-5 py-2 text-sm text-red-400 hover:bg-red-700 hover:text-white transition-colors duration-200 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-6">
              <Link
  href="/auth/login"
  className="
    px-4 py-2
    rounded-md
    text-gray-300
    font-semibold
    border
    border-gray-500
    hover:border-purple-500
    hover:text-purple-500
    bg-transparent
    transition-colors
    duration-300
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-purple-400
    focus:ring-offset-2
  "
>
  Login
</Link>

              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full text-white font-semibold hover:from-pink-500 hover:to-yellow-400 hover:scale-105 transition-transform duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
