import Container from './Container';
import { getTranslations } from 'next-intl/server';

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{desc}</p>
    </div>
  );
}

export default async function Services({ locale }: { locale: 'fi' | 'en' }) {
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <section id="services"
  className="
    relative
    min-h-screen
    flex items-center justify-center
    py-20
  "
>
      <Container>
        <h2 className="text-2xl font-semibold">{t('title')}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card title={t('items.web.title')}  desc={t('items.web.desc')} />
          <Card title={t('items.shop.title')} desc={t('items.shop.desc')} />
          <Card title={t('items.care.title')} desc={t('items.care.desc')} />
          {/* add more cards later; grid will flow */}
        </div>
      </Container>
    </section>
  );
}
