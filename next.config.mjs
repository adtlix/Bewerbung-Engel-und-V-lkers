/** @type {import('next').NextConfig} */

// Beim GitHub-Pages-Build (BUILD_TARGET=pages) erzeugen wir einen rein statischen
// Export. Die Seite läuft komplett client-seitig (R3F/WebGL via ssr:false),
// daher ist `output: 'export'` problemlos möglich.
const isPages = process.env.BUILD_TARGET === "pages";

// Pages serviert Projekt-Sites unter /<repo-name>/. Der Workflow reicht den
// exakten Repo-Namen via PAGES_BASE_PATH herein (case-sensitive auf Pages!).
const basePath =
  isPages && process.env.PAGES_BASE_PATH ? `/${process.env.PAGES_BASE_PATH}` : "";

const nextConfig = {
  reactStrictMode: true,
  // Das three.js-Ökosystem liefert ESM/JSX-Quellen aus, die Next transpilieren muss.
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
  ...(isPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath || undefined,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
