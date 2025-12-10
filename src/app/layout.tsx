import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

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
});

// 2. Define the new Saira font
const saira = localFont({
  src: "../../public/fonts/Saira-Regular.woff2", // Adjust if inside a subfolder
  variable: "--font-saira",
  weight: "400",      // "Regular" is usually weight 400
  style: "normal",
});

export const metadata: Metadata = {
  title: "Digipaja – modern websites for growing businesses",
  description:
    "Digipaja is a two-brother studio building fast, modern websites for Finnish companies.",
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
        {children}
      </body>
    </html>
  );
}