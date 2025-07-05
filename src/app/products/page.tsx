"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let url = "https://dummyjson.com/products?limit=100";
        if (category) {
          url = `https://dummyjson.com/products/category/${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <main className="pt-24 max-w-7xl mx-auto px-6">
  <h1 className="text-4xl font-extrabold mb-10 text-white tracking-tight text-center">
    {category ? `${category} Products` : "All Products"}
  </h1>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map((p) => (
      <Link key={p.id} href={`/products/${p.id}`}>
        <div className="rounded-2xl border border-neutral-800 bg-zinc-900/70 backdrop-blur-md p-4 shadow-lg hover:shadow-purple-600/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-40 w-full object-contain rounded-xl transition duration-300 group-hover:scale-105"
          />
          <h3 className="mt-4 text-base font-semibold text-white line-clamp-2">
            {p.title}
          </h3>
          <p className="text-purple-400 font-bold mt-2 text-lg">
            ₹ {(p.price * 80).toFixed(2)}
          </p>
        </div>
      </Link>
    ))}
  </div>
</main>

  );
}
