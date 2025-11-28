import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  // params is a Promise in Next 15 – unwrap it:
  const { locale } = await params;

  // Load translations for this locale
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
