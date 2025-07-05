"use client";

import Link from "next/link";
import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-gray-400 border-t border-zinc-800 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 🌟 Brand Info */}
        <div>
          <Link
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent"
          >
            DevMart
          </Link>
          <p className="mt-2 text-sm text-zinc-500">
            Premium gadgets & futuristic gear curated for modern creators. ✨
          </p>
        </div>

        {/* 🔗 Quick Links */}
        {/* 🔗 Quick Links */}
<div>
  <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">
    Quick Links
  </h3>
  <ul className="space-y-2">
    {["Products", "About", "Contact", "Privacy"].map((item) => (
      <li key={item}>
        <Link
          href={`/${item.toLowerCase()}`}
          className="block px-2 py-1 text-gray-400 rounded-md hover:text-purple-400 hover:scale-110 transform transition duration-300"
        >
          {item}
        </Link>
      </li>
    ))}
  </ul>
</div>


        {/* 🌐 Social Links */}
        <div>
  <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">
    Follow Us
  </h3>
  <div className="flex gap-6">
    {/** Twitter */}
    <Link
      href="#"
      
      aria-label="Twitter"
      className="text-gray-400 hover:text-purple-400 transition transform duration-300 hover:scale-110"
    >
      <FaTwitter size={35} />
    </Link>

    {/** GitHub */}
    <Link
      href="https://github.com/YuviX-514"
      target="_blank"
      aria-label="GitHub"
      className="text-gray-400 hover:text-purple-400 transition transform duration-300 hover:scale-110"
    >
      <FaGithub size={35} />
    </Link>

    {/** Instagram */}
    <Link
      href="#"
      aria-label="Instagram"
      className="text-gray-400 hover:text-purple-400 transition transform duration-300 hover:scale-110"
    >
      <FaInstagram size={35} />
    </Link>
  </div>
        </div>

      </div>

      {/* 🔒 Bottom Text */}
      {/* 🔒 Bottom Text */}
<div className="mt-10 text-center text-xl text-zinc-600 space-y-1">
  <div>&copy; {new Date().getFullYear()} DevMart. All rights reserved.</div>
  <div>
    Made with ❤️ by{" "}
    <span className="text-purple-400 font-semibold">Yuvraj Singh : Lucifer</span>
  </div>
</div>

    </footer>
  );
}
