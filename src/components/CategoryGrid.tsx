"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Smartphones",
    img: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp",
    query: "smartphones",
  },
  {
    name: "Laptops",
    img: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp",
    query: "laptops",
  },
  {
    name: "Fragrances",
    img: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
    query: "fragrances",
  },
  {
    name: "Groceries",
    img: "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
    query: "groceries",
  },
];

export default function CategoryGrid() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
      {categories.map((cat, idx) => (
        <Link key={idx} href={`/products?category=${cat.query}`} passHref>
          <div className="relative group overflow-hidden rounded-2xl shadow-md border border-zinc-800 bg-zinc-900 hover:scale-105 hover:shadow-xl transition-transform duration-300">
            <Image
              src={cat.img}
              alt={cat.name}
              width={500}
              height={200}
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end justify-center p-2">
              <h3 className="text-white text-lg font-bold drop-shadow-lg">{cat.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
