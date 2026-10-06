"use client";

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-blue-deep/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-brand-blue-deep/10 blur-[120px]" />
      </div>

      <Link href="/" className="mb-10 relative">          {/* Brand logo on the portal's front door */}
          <img
            src="/laksya-logo-300.webp"
            alt="Lakshya Groups"
            width={300}
            height={193}
            className="h-12 w-auto object-contain"
          />
      </Link>

      <div className="w-full max-w-md glass-dark rounded-2xl p-8 relative">
        {children}
      </div>
    </main>
  );
}
