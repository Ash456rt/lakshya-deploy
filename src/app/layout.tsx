import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { SITE_URL } from "@/lib/site";

const TITLE =
  "Laksya Groups — Web Development, Consultancy & Global Services | Bengaluru";
const DESCRIPTION =
  "Laksya Groups is a Bengaluru-based multi-service company offering web & app development, business consultancy, import & export, customer support, transport & logistics, tours & travel, and professional training through Laksya Academy.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Laksya Groups — Bengaluru",
  },
  description: DESCRIPTION,
  keywords: [
    "Laksya Groups",
    "web development company Bengaluru",
    "app development India",
    "business consultancy Bengaluru",
    "import export company India",
    "customer support services",
    "transport logistics India",
    "tours and travel Bengaluru",
    "Laksya Academy training",
    "technology consulting Bengaluru",
    "Next.js development India",
    "React app development",
    "IT company Bengaluru",
    "startup consultancy India",
    "digital transformation services",
  ],
  verification: {
    google: "A0hSyyGtpIy06RtZHlsRWFgXJ5qflDfnuo-RLAvWwuk",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Laksya Groups — Web Development, Consultancy & Global Services",
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Laksya Groups",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Laksya Groups — Web Development, Consultancy, Import & Export, Tours & Travel, Laksya Academy | Bengaluru, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laksya Groups — Web Development, Consultancy & Global Services",
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#030712" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="A0hSyyGtpIy06RtZHlsRWFgXJ5qflDfnuo-RLAvWwuk" />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-950 text-white">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SGR6KY1CMC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SGR6KY1CMC');
          `}
        </Script>

        {children}

        {/* JSON-LD Structured Data — Organization + WebSite + LocalBusiness */}
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
                  alternateName: "Lakshya Groups",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/laksya-logo.png`,
                    width: 1240,
                    height: 799,
                  },
                  description:
                    "Laksya Groups is a multi-service conglomerate offering web & app development, business consultancy, import & export, customer support, transport & logistics, tours & travel, and professional training.",
                  email: "admin@lakshyagroups.in",
                  telephone: "+919902841875",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "36/2, Beml Layout, Margondanahalli",
                    addressLocality: "Bengaluru",
                    addressRegion: "Karnataka",
                    postalCode: "560036",
                    addressCountry: "IN",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+919902841875",
                    email: "admin@lakshyagroups.in",
                    contactType: "customer service",
                    availableLanguage: ["English", "Hindi"],
                  },
                  sameAs: [
                    "https://x.com/lakshyagroups",
                    "https://linkedin.com/company/lakshya-groups",
                    "https://instagram.com/lakshyagroups",
                    "https://youtube.com/@lakshyagroups",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "Laksya Groups",
                  url: SITE_URL,
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${SITE_URL}/blog?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${SITE_URL}/#localbusiness`,
                  name: "Laksya Groups",
                  image: `${SITE_URL}/laksya-logo.png`,
                  url: SITE_URL,
                  telephone: "+919902841875",
                  email: "admin@lakshyagroups.in",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "36/2, Beml Layout, Margondanahalli",
                    addressLocality: "Bengaluru",
                    addressRegion: "Karnataka",
                    postalCode: "560036",
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 12.9984,
                    longitude: 77.6865,
                  },
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "09:00",
                      closes: "18:00",
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: "Saturday",
                      opens: "10:00",
                      closes: "14:00",
                    },
                  ],
                  priceRange: "₹₹",
                  areaServed: ["IN", "US", "UK", "AE", "SG"],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
