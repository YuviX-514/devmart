"use client";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    const confirmed = confirm("Are you sure you want to place the order?");
    if (!confirmed) return;

    try {
      await fetch("/api/cart/clear", {
        method: "POST",
        credentials: "include",
      });
      setCart([])

      toast.success("🎉 Order placed successfully!");
      router.push("/thank-you");
    } catch (err) {
      toast.error("Failed to place order 😢");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-white">
  <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text drop-shadow-lg">
    🧾 Checkout
  </h1>

  {cart.map((item) => (
    <div
      key={item.id}
      className="flex items-center gap-4 border border-zinc-800 rounded-lg p-4 mb-4 bg-[#1a1a1a] hover:border-purple-500 transition-all"
    >
      <Image
        src={item.thumbnail}
        alt={item.title || "Product"}
        width={70}
        height={70}
        className="rounded-lg bg-zinc-900 p-1 border border-zinc-700"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-zinc-400">
          ₹ {item.price} × {item.quantity}
        </p>
      </div>
      <div className="text-green-400 font-bold text-lg">
        ₹ {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  ))}

  <hr className="my-6 border-zinc-700" />

  <h2 className="text-2xl font-bold text-green-400 mb-6">
    Total: ₹ {total.toFixed(2)}
  </h2>

  <button
    onClick={placeOrder}
    className="px-6 py-3 border border-purple-500 text-purple-400 rounded-lg font-semibold 
              hover:bg-purple-700 hover:text-white transition-all duration-300 shadow-md"
  >
    ✅ Confirm & Place Order
  </button>
</div>

  );
}
