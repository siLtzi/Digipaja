import Container from "./Container";
import { getTranslations } from "next-intl/server";

const projects = [
  { title: "Acme Corp", tag: "Next.js + CMS" },
  { title: "North Wind", tag: "Landing + Analytics" },
  { title: "Bold Coffee", tag: "Shopify Store" },
];

export default async function Work({ locale }: { locale: "fi" | "en" }) {
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <section id="work"
      className="
    relative
    min-h-screen
    flex items-center justify-center
    py-20
  "
    >
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{t("title")}</h2>
          <a
            href={`/${locale}#contact`}
            className="text-sm underline opacity-80 hover:opacity-100"
          >
            {t("cta")}
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p) => (
            <div
              key={p.title}
              className="
                rounded-2xl p-6
                bg-white/20 dark:bg-black/20
                backdrop-blur-sm
                shadow-sm
              "
            >
              <div className="aspect-video rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm" />
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {p.tag}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
