"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Link from "next/link";

export default function ThankYouPage() {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!redirected) {
        router.push("/");
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [redirected, router]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 🎊 Confetti */}
      {dimensions.width > 0 && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={300}
          gravity={0.3}
          recycle={false}
        />
      )}

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#111] text-white text-center p-8 rounded-xl shadow-2xl border border-neutral-800 max-w-lg w-full z-10"
        >
          <motion.h1
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-lime-400 to-yellow-300 mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🎉 Order Placed!
          </motion.h1>

          <p className="text-neutral-400 mb-6">
            You’ll be redirected to the homepage shortly...
          </p>

          <Link
            href="/"
            onClick={() => setRedirected(true)}
            className="inline-block text-sm text-purple-500 underline hover:text-purple-300 transition"
          >
            ← Go back manually
          </Link>
        </motion.div>
      </main>

      <footer className="text-center py-4 border-t border-neutral-800 text-zinc-400 text-sm">
        © {new Date().getFullYear()} DevMart. All rights reserved.
      </footer>
    </div>
  );
}
