"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

type CartItem = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; // 👈 add this
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🧠 Load user's cart from DB on first mount
  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/cart/me", { credentials: "include" });
        const data = await res.json();
        setCart(data.cart || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    }

    loadCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    const existing = cart.find((c) => c.id === item.id);

    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = cart.map((c) =>
        c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c
      );
    } else {
      updatedCart = [...cart, item];
    }

    setCart(updatedCart);

    try {
      await fetch("/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error("DB cart update failed:", err);
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter((item) => item.quantity > 0); // remove if 0 qty

    setCart(updatedCart);

    const item = cart.find((i) => i.id === id);
    if (!item) return;

    try {
      await fetch("/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, quantity: delta }),
      });
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(p0?: never[]) {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
