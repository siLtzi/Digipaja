import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay/ClashDisplay-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/ClashDisplay/ClashDisplay-Semibold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashDisplay/ClashDisplay-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-clash-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digipaja – modern websites for growing businesses",
  description:
    "Digipaja is a two-brother studio building fast, modern websites for Finnish companies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          ${poppins.variable} ${clashDisplay.variable}
          antialiased bg-zinc-950 text-zinc-50
        `}
      >
        {children}
      </body>
    </html>
  );
}
