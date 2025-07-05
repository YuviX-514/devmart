"use client";

import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity } = useCart();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text drop-shadow-lg">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6 mt-10">
  {/* 🛒 Bouncy Cart Icon */}
  <div className="animate-bounce text-6xl">🛒</div>

  <p className="text-gray-400 text-xl">
    Oops! Your cart is feeling kinda lonely 😢
  </p>

  {/* Call to Action Button */}
  <Link href="/products">
    <button className="px-6 py-2 border border-purple-500 text-purple-400 rounded-md font-semibold 
                       hover:scale-105 hover:text-purple-300 hover:border-purple-400 transition-all duration-300">
      🛍️ Explore Products
    </button>
  </Link>

  {/* Optional sticker-style emoji */}
  <div className="text-4xl mt-2 animate-wiggle-slow">🧸</div>
</div>
      
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#1a1a1a] border border-neutral-800 hover:border-purple-600 p-4 rounded-xl shadow-lg transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4">
  <Link href={`/products/${item.id}`} className="flex items-center gap-4 group">
    <Image
      src={item.thumbnail || "/placeholder.png"}
      alt={item.title || "product image"}
      width={80}
      height={80}
      className="rounded-lg object-contain bg-zinc-900 p-2 border border-neutral-700 group-hover:scale-105 transition"
    />
    <div>
      <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-purple-400 transition">
        {item.title}
      </h3>
      <p className="text-green-400 font-bold mt-1">
        ₹ {item.price.toFixed(2)}
      </p>
    </div>
  </Link>
</div>


                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-red-400 border border-red-400 px-3 py-1 rounded hover:text-red-300 hover:border-red-300 transition-all"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-green-400 border border-green-400 px-3 py-1 rounded hover:text-green-300 hover:border-green-300 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 Total + Checkout */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-6 border-neutral-800">
            <div className="text-2xl font-bold tracking-wide text-green-400">
              Total: ₹ {totalAmount.toFixed(2)}
            </div>
            <Link href="/checkout">
  <button
    className="px-6 py-3 border border-green-500 text-green-400 rounded-lg font-semibold 
               hover:bg-[#1f4037] hover:text-white transition-all duration-300 
               shadow-sm hover:shadow-md"
  >
    🧾 Place Order →
  </button>
</Link>

          </div>
        </>
      )}
    </div>
  );
}
