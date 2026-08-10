import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal", "/admin", "/api", "/auth"],
      },
    ],
    sitemap: "https://laksya-groups.vercel.app/sitemap.xml",
  };
}
