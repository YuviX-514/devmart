"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteCarousel from "./InfiniteCarousel";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export default function HeroSection() {
  const [images, setImages] = useState<string[]>([]);
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("https://dummyjson.com/products?limit=20");
      const data = await res.json();
      const imgUrls: string[] = data.products.map((item: Product) => item.thumbnail);
      const productIds: number[] = data.products.map((item: Product) => item.id);
      setImages(imgUrls);
      setIds(productIds);
    }

    fetchImages();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-black text-white">
      {/* 🔮 Blurred Magical Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-indigo-800/20 to-black blur-3xl" />

      {/* 🧠 Hero Content */}
      <div className="mx-auto max-w-7xl px-6 py-32 text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-xl"
        >
          Power Up Your Tech Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300"
        >
          Discover premium gadgets, gear, and tools crafted for creators, gamers, and future builders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/products"
            className="inline-block rounded-full px-8 py-3 bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Browse Products
          </Link>
          <Link
            href="/about">
            <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 hover:scale-105 transition-transform duration-300">
            <span className="block rounded-full bg-black px-8 py-3 text-lg font-semibold text-whitetransition-colors duration-300">
              Learn more
            </span>
          </div>
          </Link>
        </motion.div>
      </div>

      {/* 🖼️ Carousel */}
      {images.length > 0 && (
        <main className="pb-20 px-4">
          <h2 className="text-3xl font-bold text-center pb-6 text-white">
            <main className="pb-24 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* ✨ Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Why DevMart?</h3>
      <p className="text-gray-400 text-sm">
        We source the latest, coolest tech from trusted suppliers so you don’t have to hunt.
      </p>
    </motion.div>

    {/* ✨ Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Loved by the Community</h3>
      <p className="text-gray-400 text-sm">
        20K+ satisfied techies worldwide. See what the hype is all about.
      </p>
    </motion.div>

    {/* ✨ Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Secure & Fast Checkout</h3>
      <p className="text-gray-400 text-sm">
        Shop confidently with 256-bit SSL & lightning-fast payment processing.
      </p>
    </motion.div>
  </div>

  {/* 🌟 Trust badge / stats */}
  <div className="mt-16 text-center space-y-3">
    <h3 className="text-lg font-semibold text-gray-400">Trusted by top brands & indie creators</h3>
    <div className="flex justify-center gap-6 flex-wrap text-gray-500 text-sm">
      <span>✅ 100% Authentic</span>
      <span>🚚 24-48hr Delivery</span>
      <span>🔁 Hassle-free Returns</span>
      <span>🔒 SSL Secure Checkout</span>
    </div>
  </div>
</main>

          </h2>
          <InfiniteCarousel images={images} productIds={ids} speed={60} />
        </main>
      )}
    </section>
  );
}
