import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

// Toggle this to enable/disable custom cursor site-wide
const ENABLE_CUSTOM_CURSOR = true;

const BASE_URL = "https://digipajaoulu.fi";

// 1. Define the Goldman font (existing)
const goldman = localFont({
  src: [
    {
      path: "../../public/fonts/Goldman-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Goldman-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-goldman",
  display: "swap",
  preload: true,
});

// 2. Define the new Saira font
const saira = localFont({
  src: "../../public/fonts/Saira-Regular.woff2",
  variable: "--font-saira",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#08090C" },
    { media: "(prefers-color-scheme: dark)", color: "#08090C" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Digipaja – Modernit verkkosivut yrityksille | Web-kehitys Oulu",
    template: "%s | Digipaja",
  },
  description:
    "Digipaja rakentaa moderneja, nopeita ja hakukoneystävällisiä verkkosivuja suomalaisille yrityksille. Erikoistunut Next.js, React ja Sanity CMS -kehitykseen Oulussa.",
  keywords: [
    "verkkosivut",
    "web-kehitys",
    "kotisivut yritykselle",
    "Next.js",
    "React",
    "verkkokauppa",
    "Oulu",
    "web design",
    "SEO",
    "nopeat verkkosivut",
    "moderni web-kehitys",
    "Sanity CMS",
    "responsiiviset sivut",
  ],
  authors: [{ name: "Digipaja", url: BASE_URL }],
  creator: "Digipaja",
  publisher: "Digipaja",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fi_FI",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Digipaja",
    title: "Digipaja – Modernit verkkosivut yrityksille",
    description: "Rakenna yrityksellesi modernit, nopeat ja hakukoneystävälliset verkkosivut. Erikoistunut Next.js ja React -kehitykseen.",
    images: [
      {
        url: "/image/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digipaja – Modernit verkkosivut yrityksille",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digipaja – Modernit verkkosivut yrityksille",
    description: "Rakenna yrityksellesi modernit, nopeat ja hakukoneystävälliset verkkosivut.",
    images: ["/image/og-image.png"],
    creator: "@digipaja",
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
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "fi-FI": `${BASE_URL}/fi`,
      "en-US": `${BASE_URL}/en`,
    },
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/Digipaja.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/Digipaja.svg" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`
          ${goldman.variable} 
          ${saira.className} 
          antialiased bg-[#08090C] text-zinc-50
        `}
      >
        <CustomCursor enabled={ENABLE_CUSTOM_CURSOR} />
        {children}
      </body>
    </html>
  );
}