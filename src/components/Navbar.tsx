"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const itemCount = 0;

  const checkLogin = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      setIsLoggedIn(res.ok && !!data.user);
    } catch (err) {
      console.error("Failed to check login:", err);
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
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        alert("Logout failed. Please try again.");
        return;
      }
      window.dispatchEvent(new Event("tokenUpdated"));
      alert("🛑 Logged out successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(value)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.products as Product[]);
        setShowSearchDropdown(true);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }

    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setShowSearchDropdown(false);
    setSidebarOpen(false);
  };

  if (!hasMounted) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-gradient-to-r from-purple-900 via-black to-black text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 relative">
        {/* Hamburger - only mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
        >
          <Menu size={28} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group text-xl font-extrabold tracking-tight select-none"
        >
          <Image
            src="/favicon.jpg"
            alt="DevMart"
            width={50}
            height={36}
            className="rounded-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,192,203,0.7)] group-hover:brightness-125">
            DevMart
          </span>
        </Link>

        {/* Nav Links - only desktop */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {["Home", "Products", "About", "Contact"].map((item) => {
            const path =
              item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
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

        {/* Search Bar - only desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:block relative w-64"
        >
          <div className="flex items-center bg-neutral-800 rounded-md px-3 py-1">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="ml-2 w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
            />
          </div>

          {showSearchDropdown && searchResults.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-[#1f1f1f] backdrop-blur-md border border-purple-600 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
              {searchResults.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-200"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchDropdown(false);
                    }}
                  >
                    <Image
                      src={product.thumbnail || "/placeholder.png"}
                      alt={product.title}
                      width={30}
                      height={30}
                      className="rounded object-cover"
                    />
                    <span>{product.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-6 ml-4">
          {/* Cart - always visible */}
          <Link href="/cart" className="relative group">
            <ShoppingCart
              size={26}
              className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
            />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth UI - desktop only */}
          <div className="hidden md:flex gap-6">
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
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-md text-gray-300 font-semibold border border-gray-500 hover:border-purple-500 hover:text-purple-500 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-full text-white font-semibold hover:from-pink-500 hover:to-yellow-400 hover:scale-105 transition-transform duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar only for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => {
          setSidebarOpen(false);
          setDropdownOpen(false);
        }}
      ></div>

      <aside
  className={`fixed top-0 left-0 h-screen w-64 bg-neutral-900/90 backdrop-blur-md text-white z-50 transform transition-transform duration-300 md:hidden ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  {/* Header */}
  <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-700">
    <Link
      href="/"
      className="flex items-center gap-2"
      onClick={() => setSidebarOpen(false)}
    >
      <Image
        src="/favicon.jpg"
        alt="DevMart"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="text-xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
        DevMart
      </span>
    </Link>
    <button
      onClick={() => {
        setSidebarOpen(false);
        setDropdownOpen(false);
      }}
      className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
    >
      <X size={28} />
    </button>
  </div>

  {/* Search */}
  <form onSubmit={handleSearchSubmit} className="relative mt-4 mx-4">
    <div className="flex items-center bg-neutral-800 rounded-md px-3 py-2">
      <Search className="text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="ml-2 w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
      />
    </div>
    {showSearchDropdown && searchResults.length > 0 && (
      <ul className="absolute top-full left-0 mt-2 w-full bg-[#1f1f1f] border border-purple-600 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
        {searchResults.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-200"
              onClick={() => {
                setSearchQuery("");
                setShowSearchDropdown(false);
                setSidebarOpen(false);
              }}
            >
              <Image
                src={product.thumbnail || "/placeholder.png"}
                alt={product.title}
                width={30}
                height={30}
                className="rounded object-cover"
              />
              <span>{product.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </form>

  {/* Links */}
  <nav className="flex flex-col gap-2 mt-6 px-4">
    {["Home", "Products", "About", "Contact"].map((item) => {
      const path =
        item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
      return (
        <Link
          key={item}
          href={path}
          className="py-2 text-gray-300 hover:bg-purple-700 hover:text-white rounded transition-colors duration-200"
          onClick={() => setSidebarOpen(false)}
        >
          {item}
        </Link>
      );
    })}
  </nav>

  {/* Avatar at Bottom Always */}
  {isLoggedIn && (
    <div className="absolute bottom-0 w-full px-4 py-4 mb-6 border-t border-neutral-700">
      <div className="flex items-center gap-3">
        <Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          alt="User"
          width={36}
          height={36}
          className="rounded-full shadow-lg"
        />
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="text-gray-300 text-sm"
        >
          Account
        </button>
      </div>

      {/* Dropdown (above avatar) */}
      {dropdownOpen && (
        <div className="mt-3 flex flex-col gap-2">
          <Link
            href="/profile"
            onClick={() => setSidebarOpen(false)}
            className="block w-full text-left px-4 py-2 rounded bg-purple-700 text-white"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            onClick={() => setSidebarOpen(false)}
            className="block w-full text-left px-4 py-2 rounded bg-purple-700 text-white"
          >
            Settings
          </Link>
          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="block w-full text-left px-4 py-2 rounded bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}

  {!isLoggedIn && (
    <div className="absolute bottom-0 w-full px-4 py-6 border-t border-neutral-700">
      <Link
        href="/auth/login"
        onClick={() => setSidebarOpen(false)}
        className="block w-full text-center px-4 py-2 rounded border border-gray-500 text-gray-300 hover:border-purple-500 hover:text-purple-400 transition-colors duration-300"
      >
        Login
      </Link>
      <Link
        href="/auth/signup"
        onClick={() => setSidebarOpen(false)}
        className="mt-2 block w-full text-center px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-pink-500 hover:to-yellow-400 transition-colors duration-300"
      >
        Sign Up
      </Link>
    </div>
  )}
    </aside>

    </header>
  );
}
