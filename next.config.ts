import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/lakshya-deploy",
        destination: "/lakshya-deploy/index.html",
        permanent: true,
      },
      {
        source: "/travels",
        destination: "/travels/index.html",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
