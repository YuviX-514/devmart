"use client"
import { motion } from "framer-motion";
import { FaGamepad, FaBriefcase, FaPlane, FaCamera } from "react-icons/fa";
const purposes = [
  {
    title: "For Gamers",
    icon: <FaGamepad size={28} className="text-purple-400" />,
    description: "Top-tier gear for high FPS, zero lag, and total immersion.",
  },
  {
    title: "For Work & Study",
    icon: <FaBriefcase size={28} className="text-blue-400" />,
    description: "Efficient tools to boost your productivity and multitask smarter.",
  },
  {
    title: "For Travel",
    icon: <FaPlane size={28} className="text-green-400" />,
    description: "Compact, lightweight tech for creators and wanderers on the move.",
  },
  {
    title: "For Creators",
    icon: <FaCamera size={28} className="text-pink-400" />,
    description: "Gadgets built for photography, content creation, and magic.",
  },
];

export default function PurposeGrid() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-white">
        Shop by Purpose 🎯
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {purposes.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-center shadow hover:shadow-xl transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
