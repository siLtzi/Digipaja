import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const goldman = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay/Goldman-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay/Goldman-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-goldman",
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
          antialiased bg-[#08090C] text-zinc-50
        `}
      >
        {children}
      </body>
    </html>
  );
}
