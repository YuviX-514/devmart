"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🧠 Load cart on mount
  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/cart/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok && Array.isArray(data.cart)) {
          setCart(data.cart);
        } else {
          setCart([]);
        }
      } catch (err) {
        console.error("❌ Failed to load cart:", err);
      }
    }

    loadCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    const existing = cart.find((c) => c.id === item.id);
    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = cart.map((c) =>
        c.id === item.id
          ? { ...c, quantity: c.quantity + item.quantity }
          : c
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
      console.error("❌ Failed to add to DB cart:", err);
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    const existingItem = cart.find((i) => i.id === id);
    if (!existingItem) return;

    const newQty = existingItem.quantity + delta;

    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
      .filter((item) => item.quantity > 0); // Remove if qty becomes 0

    setCart(updatedCart);

    try {
      await fetch("/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...existingItem, quantity: delta }),
      });
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ Safe consumer hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
