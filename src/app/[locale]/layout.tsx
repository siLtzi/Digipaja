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

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-black text-zinc-50">
        {/* 1. Navbar OUTSIDE SmoothScrollProvider → truly fixed */}
        <Navbar locale={locale} />

        {/* 2. Only the scrollable content is smoothed */}
        <SmoothScrollProvider>
          {/* Padding-top so content doesn't hide behind fixed navbar */}
          <main>
            {children}
          </main>
        </SmoothScrollProvider>
      </div>
    </NextIntlClientProvider>
  );
}
