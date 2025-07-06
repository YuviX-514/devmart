/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "tailwindcss.com", "cdn.dummyjson.com", "dummyjson.com"],
  },
  eslint: {
  ignoreDuringBuilds: true,
},
typescript: {
  ignoreBuildErrors: true,
}
};

module.exports = nextConfig;
