"use client";

import React, { useState } from 'react';

// 1. Define the props interface
type Props = {
  locale: "fi" | "en";
};

// 2. Structure data for both languages
const DICTIONARY = {
  fi: {
    eyebrow: "Hinnoittelu",
    title: "Selkeä hinnoittelu ilman yllätyksiä.",
    subtitle: "Jokainen projekti on erilainen, mutta suurin osa asiakkaista asettuu näihin kokonaisuuksiin. Saat aina kirjallisen tarjouksen ennen kuin aloitamme.",
    
    plan1Name: "Perussivusto",
    plan1Price: "alk. 1 200 €",
    plan1Body: "Yksinkertaiset, mutta viimeistellyt yrityksen kotisivut. Sopii esimerkiksi yhden palvelun yritykselle tai pienelle toimijalle.",
    plan1Includes: [
      "1–3 sivua (etusivu + yhteystiedot + 1 lisäsivu)",
      "Responsiivinen toteutus",
      "Perus-hakukoneoptimointi",
      "Yhteydenottolomake tai suorat yhteystiedot"
    ],
    plan1Category: "ALKUUN PÄÄSY",

    plan2Name: "Laaja sivusto",
    plan2Price: "alk. 2 400 €",
    plan2Body: "Yrityksille, jotka vaativat tuloksia. Täysi CMS-hallinta, laajempi sisältö ja analytiikka.",
    plan2Includes: [
      "Kaikki Perussivusto-ominaisuudet", 
      "Sanity CMS -sisällönhallinta", 
      "5-8 sivua", 
      "Kehittynyt analytiikka", 
      "Mikro-animaatiot"
    ],
    plan2Category: "KASVUUN",

    plan3Name: "Räätälöity",
    plan3Price: "Kysy tarjous",
    plan3Body: "Räätälöity ekosysteemi vaativiin tarpeisiin. Integraatiot, verkkokaupat ja uniikit visiot.",
    plan3Includes: [
      "Kaikki Laaja-ominaisuudet", 
      "Verkkokauppa tai integraatiot", 
      "Kustomoidut 3D-elementit", 
      "Laaja SEO-strategia", 
      "Design-järjestelmä"
    ],
    plan3Category: "VAATIVIIN TARPEISIIN",

    cta: "Pyydä Tarjous",
    popular: "Suosituin",
    note: "Hinnat alv 0%. Lopullinen tarjous määräytyy spesifikaatioiden mukaan."
  },
  en: {
    eyebrow: "Pricing",
    title: "Clear pricing, no surprises.",
    subtitle: "Every project is unique, but most fit into these tiers. You will always receive a written quote before we start.",
    
    plan1Name: "Basic Site",
    plan1Price: "fr. 1 200 €",
    plan1Body: "Simple but polished company websites. Perfect for single-service businesses or small operators.",
    plan1Includes: [
      "1–3 pages (Home + Contact + 1 extra)",
      "Fully responsive design",
      "Basic SEO setup",
      "Contact form or direct details"
    ],
    plan1Category: "GET STARTED",

    plan2Name: "Pro Site",
    plan2Price: "fr. 2 400 €",
    plan2Body: "For businesses that demand results. Full CMS control, expanded content, and analytics.",
    plan2Includes: [
      "All Basic features", 
      "Sanity CMS content management", 
      "5-8 pages", 
      "Advanced analytics", 
      "Micro-animations"
    ],
    plan2Category: "FOR GROWTH",

    plan3Name: "Custom",
    plan3Price: "Get a Quote",
    plan3Body: "Tailored ecosystems for demanding needs. Integrations, e-commerce, and unique visions.",
    plan3Includes: [
      "All Pro features", 
      "E-commerce or integrations", 
      "Custom 3D elements", 
      "Extensive SEO strategy", 
      "Design system"
    ],
    plan3Category: "ENTERPRISE",

    cta: "Request Quote",
    popular: "Most Popular",
    note: "Prices VAT 0%. Final offer depends on specifications."
  }
};

// 3. Add props to the component function
export default function Pricing({ locale }: Props) {
  
  // Select language based on the prop
  const m = DICTIONARY[locale];
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const plans = [
    {
      name: m.plan1Name,
      price: m.plan1Price,
      body: m.plan1Body,
      includes: m.plan1Includes,
      highlight: false,
      category: m.plan1Category,
    },
    {
      name: m.plan2Name,
      price: m.plan2Price,
      body: m.plan2Body,
      includes: m.plan2Includes,
      highlight: true,
      category: m.plan2Category,
    },
    {
      name: m.plan3Name,
      price: m.plan3Price,
      body: m.plan3Body,
      includes: m.plan3Includes,
      highlight: false,
      category: m.plan3Category,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full border-t border-zinc-900 bg-[#050505] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-900/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:py-32">
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-px w-8 bg-gradient-to-r from-transparent to-fuchsia-500" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400 glow-text">
              {m.eyebrow}
            </p>
            <span className="flex h-px w-8 bg-gradient-to-l from-transparent to-fuchsia-500" />
          </div>
          
          <div className="max-w-4xl">
            <h2
              className="text-4xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-clash-display, sans-serif)' }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                {m.title}
              </span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl leading-relaxed">
              {m.subtitle}
            </p>
          </div>
        </div>

        {/* Tech Accordion Container */}
        <div 
          className="flex flex-col gap-4 lg:h-[650px] lg:flex-row lg:gap-3"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {plans.map((plan, idx) => {
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`
                  group relative flex overflow-hidden rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                  
                  /* Mobile: Standard Stack */
                  w-full flex-col min-h-[400px]
                  
                  /* Desktop: Accordion Logic */
                  lg:min-h-0 lg:h-full lg:flex-1 lg:cursor-pointer lg:hover:flex-[2.5]
                  
                  /* Dynamic Styles */
                  ${plan.highlight 
                    ? "border-zinc-800 bg-zinc-900/40" 
                    : "border-zinc-800/60 bg-zinc-900/20"
                  }
                  ${isDimmed ? "opacity-40 scale-[0.98] lg:scale-100" : "opacity-100 scale-100"}
                  ${isHovered ? "border-zinc-600 shadow-2xl shadow-fuchsia-900/20" : ""}
                `}
              >
                {/* Highlight Glow Effect */}
                {plan.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-zinc-800/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""}`} />

                {/* === DESKTOP: Collapsed Vertical Label === */}
                <div 
                  className={`
                    absolute inset-0 hidden items-center justify-center transition-all duration-500 lg:flex
                    ${isHovered ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 delay-100"}
                  `}
                >
                  <div className="flex flex-col items-center gap-6">
                     {/* Tech Decorator Line */}
                    <div className="h-12 w-px bg-gradient-to-b from-transparent to-zinc-700" />
                    <span 
                      className="whitespace-nowrap text-lg font-bold uppercase tracking-[0.25em] text-zinc-500 rotate-[-90deg] group-hover:text-fuchsia-400 transition-colors duration-300"
                      style={{ textShadow: plan.highlight ? '0 0 20px rgba(232, 121, 249, 0.3)' : 'none' }}
                    >
                      {plan.name}
                    </span>
                    <div className="h-12 w-px bg-gradient-to-t from-transparent to-zinc-700" />
                  </div>
                </div>

                {/* === CONTENT === */}
                <div 
                  className={`
                    relative flex h-full flex-col justify-between p-8 lg:p-10 w-full
                    transition-all duration-500
                    lg:absolute lg:inset-0 lg:min-w-[480px]
                    ${isHovered ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-0 lg:translate-x-8"}
                  `}
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 backdrop-blur-md">
                      <div className={`h-1.5 w-1.5 rounded-full ${plan.highlight ? "bg-fuchsia-500 animate-pulse" : "bg-zinc-500"}`} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-300">
                        {plan.category}
                      </span>
                    </div>
                    {plan.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]">
                        {m.popular}
                      </span>
                    )}
                  </div>

                  {/* Main Info */}
                  <div className="mt-8 lg:mt-0 space-y-6">
                    <div>
                      <h3 
                        className="text-3xl text-white font-medium sm:text-4xl"
                        style={{ fontFamily: 'var(--font-clash-display, sans-serif)' }}
                      >
                        {plan.name}
                      </h3>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-4xl font-light tracking-tight text-white sm:text-5xl">
                          {plan.price}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm leading-relaxed text-zinc-400 max-w-sm border-l border-zinc-800 pl-4">
                      {plan.body}
                    </p>
                  </div>

                  {/* Feature List & CTA */}
                  <div className="mt-8 space-y-8 lg:mt-0">
                    <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
                    
                    <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:block lg:space-y-3">
                      {plan.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 group-hover/item:border-fuchsia-500/50 transition-colors">
                             <svg className="h-2.5 w-2.5 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                             </svg>
                          </div>
                          <span className="group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`
                      group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-4 transition-all duration-300
                      ${plan.highlight 
                        ? "bg-fuchsia-600 text-white hover:bg-fuchsia-500" 
                        : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                      }
                    `}>
                      <span className="relative z-10 text-xs font-bold uppercase tracking-[0.15em]">
                        {m.cta}
                      </span>
                      {plan.highlight && (
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 flex items-center justify-center gap-2 opacity-60">
           <div className="h-1 w-1 rounded-full bg-zinc-500" />
           <p className="text-xs text-zinc-500 tracking-wide uppercase">
            {m.note}
           </p>
           <div className="h-1 w-1 rounded-full bg-zinc-500" />
        </div>
      </div>
    </section>
  );
}