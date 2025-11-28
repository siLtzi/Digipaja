import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  // Load translations for this locale
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScrollProvider>
        {/* Everything inside here is now scroll-smoothed */}
        <div className="min-h-screen bg-black text-zinc-50">
          <Navbar locale={locale} />

          {/* Padding so content clears the fixed navbar */}
          <main className="pt-16">
            {children}
          </main>
        </div>
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
