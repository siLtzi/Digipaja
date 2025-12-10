import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";

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
        <Navbar locale={locale} />
        <SmoothScrollProvider>
          <main>
            {children}
          </main>
        </SmoothScrollProvider>
      </div>
    </NextIntlClientProvider>
  );
}