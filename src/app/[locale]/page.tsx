import Hero from "@/components/sections/Hero/index";
import Brothers from "@/components/sections/Brothers/index";
import BrothersReveal from "@/components/sections/Brothers/Content";
import WhyUs from "@/components/sections/WhyUs/index";
import Process from "@/components/sections/Process/index";
import Services from "@/components/sections/Services/index";
import Work from "@/components/Work/index";
import Pricing from "@/components/sections/Pricing/index";
import Contact from "@/components/sections/Contact/index"
import Footer from "@/components/layout/Footer";
import { TechGrid } from "@/components/ui/TechGrid"; // 1. Import it

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <main className="relative min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 2. THE GLOBAL BACKGROUND LAYER */}
      {/* fixed inset-0 makes it cover the whole screen and stay there */}
      {/* -z-50 ensures it stays behind everything */}
      <div className="fixed inset-0 z-[-50]">
        <TechGrid />
      </div>

      {/* 3. YOUR SECTIONS */}
      {/* We wrap them in a relative container so they sit ON TOP of the fixed grid */}
      <div className="relative z-10">
        <Hero locale={locale} />
        
        <BrothersReveal>
          <Brothers locale={locale} />
        </BrothersReveal>
        
        <Services locale={locale} />
        <WhyUs locale={locale} />
        <Process locale={locale} />
        <Work locale={locale} />
        <Pricing locale={locale} />
        <Contact locale={locale} />
        <Footer locale={locale} />
      </div>
    </main>
  );
}