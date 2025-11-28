import Hero from "@/components/Hero";
import Brothers from "@/components/Brothers";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
      <Brothers locale={locale} />
    </main>
  );
}
