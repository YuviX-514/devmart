export default {
  darkMode: "class", // 🌑 REQUIRED!
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
  extend: {
    colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    animation: {
      blob: "blob 6s infinite",
    },
    keyframes: {
      blob: {
        "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
        "33%": { transform: "translate(30px, -50px) scale(1.1)" },
        "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
      },
    },
  },
},

  plugins: [],
};
