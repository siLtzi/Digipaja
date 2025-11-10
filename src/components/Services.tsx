import Container from "./Container";
import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";

function WebIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 3.2 3.8 6.7 3.8 9s-1.3 5.8-3.8 9c-2.5-3.2-3.8-6.7-3.8-9S9.5 6.2 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function ShopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 8h16l-1.2 10.2A2 2 0 0 1 16.8 20H7.2A2 2 0 0 1 5.2 18.2L4 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 8l2.5-4h13L21 8M9 12h6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function CareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Card({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-zinc-200/50 dark:border-zinc-800
        bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl
        shadow-sm transition-all
        hover:-translate-y-0.5 hover:shadow-lg
      "
    >
      <div className="relative p-6 text-center">
        <div className="mb-4 mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200">
          {icon}
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default async function Services({ locale }: { locale: "fi" | "en" }) {
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <section
      id="services"
      className="relative min-h-screen flex items-center justify-center py-20 text-center"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col items-center">
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* changed: keep max 3 cols at large screens and center the grid tracks */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {[
            {
              title: t("items.web.title"),
              desc: t("items.web.desc"),
              icon: <WebIcon className="h-5 w-5" />,
            },
            {
              title: t("items.shop.title"),
              desc: t("items.shop.desc"),
              icon: <ShopIcon className="h-5 w-5" />,
            },
            {
              title: t("items.care.title"),
              desc: t("items.care.desc"),
              icon: <CareIcon className="h-5 w-5" />,
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i} y={20}>
              <Card title={item.title} desc={item.desc} icon={item.icon} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
