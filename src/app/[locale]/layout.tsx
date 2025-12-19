import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
        {/* Navbar is fixed (or sticky) → reserve space */}
        <Navbar locale={locale} />

        {/* If Navbar is fixed, you NEED padding-top here.
            Adjust pt-20 to match your navbar height. */}
        <div className="pt-20">
          <SmoothScrollProvider>
            <main>{children}</main>
            <Footer locale={locale} />
          </SmoothScrollProvider>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
