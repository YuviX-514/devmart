"use client";

export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  description: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // 🔐 Check if user is logged in
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      }
    }

    checkLogin();
  }, []);

  // 📦 Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        toast.error("❌ Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading || isLoggedIn === null)
    return <div className="text-white p-10">⏳ Loading product...</div>;

  if (!product?.id) {
    return (
      <div className="text-red-400 p-10">
        ❌ Product not found. Check the URL.
      </div>
    );
  }

  const itemInCart = cart.find((item) => item.id === String(product.id));
  const currentQty = itemInCart?.quantity || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-32 text-white">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* 🖼 Product Image */}
        <Image
          src={product.thumbnail || "/placeholder.png"}
          alt={product.title}
          width={500}
          height={500}
          className="w-full max-w-sm rounded-2xl border border-zinc-800 shadow-xl transition-transform duration-300 hover:scale-105"
        />

        {/* 📝 Product Details */}
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            {product.title}
          </h1>

          <p className="text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-green-400 tracking-wide">
            ₹ {(product.price * 80).toFixed(2)}
          </p>

          <div className="flex items-center gap-4 pt-4">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  addToCart({
                    id: String(product.id),
                    title: product.title,
                    price: +(product.price * 80).toFixed(2),
                    thumbnail: product.thumbnail,
                    quantity: 1,
                  });

                  toast.success(`${product.title} added to cart 🛒`, {
                    style: {
                      background: "#111",
                      color: "#fff",
                      border: "1px solid #444",
                    },
                  });
                }}
                className="border border-green-400 text-green-400 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-green-500 hover:text-green-300"
              >
                Add to Cart
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="border border-red-400 text-red-400 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-red-500 hover:text-red-300"
              >
                Login to Add
              </Link>
            )}

            {currentQty > 0 && (
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg shadow-sm">
                <button
                  onClick={() =>
                    addToCart({
                      id: String(product.id),
                      title: product.title,
                      price: +(product.price * 80).toFixed(2),
                      thumbnail: product.thumbnail,
                      quantity: -1,
                    })
                  }
                  className="text-red-400 border border-red-400 px-3 py-1 rounded hover:text-red-300 hover:border-red-300 transition"
                >
                  -
                </button>
                <span className="text-green-400 font-bold min-w-[20px] text-center">
                  {currentQty}
                </span>
                <button
                  onClick={() =>
                    addToCart({
                      id: String(product.id),
                      title: product.title,
                      price: +(product.price * 80).toFixed(2),
                      thumbnail: product.thumbnail,
                      quantity: 1,
                    })
                  }
                  className="text-green-400 border border-green-400 px-3 py-1 rounded hover:text-green-300 hover:border-green-300 transition"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
