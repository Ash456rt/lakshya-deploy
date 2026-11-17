import type { NextConfig } from "next";

// GitHub Pages serves project sites under /<repo>/, so the Pages build needs a
// basePath while the Hostinger build must stay at the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
