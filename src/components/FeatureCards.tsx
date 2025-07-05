// src/components/FeatureCards.tsx
"use client";

import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaSyncAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={30} className="text-indigo-400" />,
    title: "Fast Delivery",
    description: "Get your tech delivered at lightning speed to your doorstep.",
  },
  {
    icon: <FaShieldAlt size={30} className="text-indigo-400" />,
    title: "Secure Payments",
    description: "We offer multiple secure payment options for peace of mind.",
  },
  {
    icon: <FaSyncAlt size={30} className="text-indigo-400" />,
    title: "Easy Returns",
    description: "Hassle-free returns within 10 days of delivery. No questions asked!",
  },
];

export default function FeatureCards() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 shadow-md hover:shadow-xl transition"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}