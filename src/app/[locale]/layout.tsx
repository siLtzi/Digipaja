import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";

const BASE_URL = "https://digipajaoulu.fi";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: "fi" | "en" }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    alternates: {
      languages: {
        "fi": `${BASE_URL}/fi`,
        "en": `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/fi`,
      },
    },
    other: {
      "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE", // Replace with actual code
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-black text-zinc-50 overflow-x-hidden relative">
        {/* Navbar is fixed → floats over content, no padding needed */}
        <Navbar locale={locale} />

        <SmoothScrollProvider>
          <main>{children}</main>
          <Footer locale={locale} />
        </SmoothScrollProvider>
        
        {/* GDPR Cookie Consent Banner */}
        <CookieConsent locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
