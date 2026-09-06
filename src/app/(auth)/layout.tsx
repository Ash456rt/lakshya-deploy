"use client";

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-amber-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-amber-700/10 blur-[120px]" />
      </div>

      <Link href="/" className="mb-10 relative">          {/* Clean text mark on auth pages too */}
          <span className="text-amber-400 font-semibold text-xl tracking-tight"
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
          >
            Lakshya
            <span className="text-white">Groups</span>
          </span>
      </Link>

      <div className="w-full max-w-md glass-dark rounded-2xl p-8 relative">
        {children}
      </div>
    </main>
  );
}
