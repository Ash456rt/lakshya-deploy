import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-full">
          404 Error
        </span>
        <h1 className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-400 text-lg mb-8">
          The page you are looking for does not exist or has been moved. Let us
          get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-colors"
          >
            Read Our Blog
          </Link>
          <Link
            href="/#contact"
            className="px-8 py-3 rounded-full border-2 border-white/20 hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
