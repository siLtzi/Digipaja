import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <>
      {/* cast for components */}
      <Hero locale={locale as "fi" | "en"} />
      <Services locale={locale as "fi" | "en"} />
      <Work locale={locale as "fi" | "en"} />
      <Contact locale={locale as "fi" | "en"} />
    </>
  );
}
