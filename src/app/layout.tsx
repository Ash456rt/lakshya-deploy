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

import { SITE_URL } from "@/lib/site";

const TITLE = "Laksya Groups | Innovating Tomorrow, Delivering Excellence Today";
const DESCRIPTION =
  "A multi-service conglomerate empowering businesses with cutting-edge technology, strategic consulting, and global solutions. Services include App & Web Development, Consultancy, Import & Export, Customer Support, Transport, Tours & Travel, and Laksya Academy.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Laksya Groups",
  },
  description: DESCRIPTION,
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
  verification: {
    google: "cn4_9cBODH294-lbinkjOOPzoqlTvUOmxKxe1e3wUXc",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Laksya Groups",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Laksya Groups — Innovating Tomorrow, Delivering Excellence Today",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Laksya Groups",
                  url: SITE_URL,
                  logo: `${SITE_URL}/laksya-logo.png`,
                  description:
                    "A multi-service conglomerate empowering businesses with cutting-edge technology, strategic consulting, and global solutions.",
                  email: "admin@lakshyagroups.in",
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "admin@lakshyagroups.in",
                    contactType: "customer service",
                    availableLanguage: ["English", "Hindi"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "Laksya Groups",
                  url: SITE_URL,
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
