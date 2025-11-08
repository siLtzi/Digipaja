import {getTranslations} from 'next-intl/server';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Contact from '@/components/Contact';

export default async function Page({
  params
}: {
  params: Promise<{ locale: 'fi' | 'en' }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <Work locale={locale} />
      <Contact locale={locale} />
    </>
  );
}

