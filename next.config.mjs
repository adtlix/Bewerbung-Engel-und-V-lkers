/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Das three.js-Ökosystem liefert ESM/JSX-Quellen aus, die Next transpilieren muss.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
};

export default nextConfig;
