import Hero from "@/components/Hero";
import Brothers from "@/components/Brothers";
import BrothersReveal from "@/components/BrothersReveal";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
      {/* Custom animated brothers section */}
      <BrothersReveal>
        <Brothers locale={locale} />
      </BrothersReveal>
      <WhyUs locale={locale} />
      <Process locale={locale} />
      <Services locale={locale} />
      <Pricing locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
