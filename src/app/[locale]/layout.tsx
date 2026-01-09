import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";

const BASE_URL = "https://digipajaoulu.fi";
const locales = ["fi", "en"] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    return {};
  }
  
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
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  
  // Validate locale - return 404 for invalid locales (like icon-192.png)
  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }
  
  // Now we know locale is valid
  const locale = localeParam as Locale;
  
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-black text-zinc-50 overflow-x-hidden relative">
        {/* Navbar is fixed → floats over content, no padding needed */}
        <Navbar locale={locale} />

        <main>{children}</main>
        <Footer locale={locale} />
        
        {/* GDPR Cookie Consent Banner */}
        <CookieConsent locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
