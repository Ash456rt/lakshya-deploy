import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// Relaxed CSP for the legacy static sites under /public (they load Google Fonts).
const LEGACY_CSP = [
  "default-src 'self' https: data:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Legacy static sites (under /public) keep a relaxed CSP so their
      // Google Fonts and other https resources keep working. Defined after
      // the catch-all so the more specific source takes precedence.
      {
        source: "/lakshya-deploy/:path*",
        headers: [{ key: "Content-Security-Policy", value: LEGACY_CSP }],
      },
      {
        source: "/travels/:path*",
        headers: [{ key: "Content-Security-Policy", value: LEGACY_CSP }],
      },
    ];
  },
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
