import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laksya Groups | Innovating Tomorrow, Delivering Excellence Today",
  description:
    "A multi-service conglomerate empowering businesses with cutting-edge technology, strategic consulting, and global solutions. Services include App & Web Development, Consultancy, Import & Export, Customer Support, Transport, Tours & Travel, and Laksya Academy.",
  keywords: [
    "Laksya Groups",
    "technology consulting",
    "app development",
    "web development",
    "import export",
    "customer support",
    "transport logistics",
    "tours travel",
    "business consultancy",
  ],
  openGraph: {
    title: "Laksya Groups | Innovating Tomorrow, Delivering Excellence Today",
    description:
      "A multi-service conglomerate empowering businesses with cutting-edge technology, strategic consulting, and global solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Laksya Groups",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksya Groups | Innovating Tomorrow, Delivering Excellence Today",
    description:
      "A multi-service conglomerate empowering businesses with cutting-edge technology, strategic consulting, and global solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}
