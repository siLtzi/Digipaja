import PricingTable from "./Content";

type Props = {
  locale: "fi" | "en";
};

const DICTIONARY = {
  fi: {
    eyebrow: "Hinnoittelu",
    title: "Selkeä hinnoittelu ilman yllätyksiä.",
    subtitle: "Jokainen projekti on erilainen, mutta suurin osa asiakkaista asettuu näihin kokonaisuuksiin.",
    
    plan1Name: "Perussivusto",
    plan1Price: "alk. 1 200 €",
    plan1Body: "Yksinkertaiset, mutta viimeistellyt yrityksen kotisivut. Sopii esimerkiksi yhden palvelun yritykselle.",
    plan1Includes: [
      "1–3 sivua (etusivu + yhteystiedot)",
      "Responsiivinen toteutus",
      "Perus-hakukoneoptimointi",
      "Yhteydenottolomake"
    ],
    plan1Category: "ALKUUN PÄÄSY",

    plan2Name: "Laaja sivusto",
    plan2Price: "alk. 2 400 €",
    plan2Body: "Yrityksille, jotka vaativat tuloksia. Täysi CMS-hallinta ja laajempi sisältö.",
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
    plan3Body: "Räätälöity ekosysteemi vaativiin tarpeisiin. Verkkokaupat ja uniikit visiot.",
    plan3Includes: [
      "Kaikki Laaja-ominaisuudet", 
      "Verkkokauppa tai integraatiot", 
      "Kustomoidut 3D-elementit", 
      "Laaja SEO-strategia", 
      "Design-järjestelmä"
    ],
    plan3Category: "VAATIVIIN TARPEISIIN",

    cta: "Pyydä Tarjous",
    note: "Hinnat alv 0%. Lopullinen tarjous määräytyy spesifikaatioiden mukaan."
  },
  en: {
    eyebrow: "Pricing",
    title: "Clear pricing, no surprises.",
    subtitle: "Every project is unique, but most fit into these tiers.",
    
    plan1Name: "Basic Site",
    plan1Price: "fr. 1 200 €",
    plan1Body: "Simple but polished company websites. Perfect for single-service businesses.",
    plan1Includes: [
      "1–3 pages (Home + Contact)",
      "Fully responsive design",
      "Basic SEO setup",
      "Contact form"
    ],
    plan1Category: "GET STARTED",

    plan2Name: "Pro Site",
    plan2Price: "fr. 2 400 €",
    plan2Body: "For businesses that demand results. Full CMS control and expanded content.",
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
    plan3Body: "Tailored ecosystems for demanding needs. E-commerce and unique visions.",
    plan3Includes: [
      "All Pro features", 
      "E-commerce or integrations", 
      "Custom 3D elements", 
      "Extensive SEO strategy", 
      "Design system"
    ],
    plan3Category: "ENTERPRISE",

    cta: "Request Quote",
    note: "Prices VAT 0%. Final offer depends on specifications."
  }
};

export default function Pricing({ locale }: Props) {
  const m = DICTIONARY[locale];

  const plans = [
    {
      name: m.plan1Name,
      price: m.plan1Price,
      body: m.plan1Body,
      includes: m.plan1Includes,
      highlight: false,
      category: m.plan1Category,
      cta: m.cta,
      href: "#contact", // ADDED
    },
    {
      name: m.plan2Name,
      price: m.plan2Price,
      body: m.plan2Body,
      includes: m.plan2Includes,
      highlight: true,
      category: m.plan2Category,
      cta: m.cta,
      href: "#contact", // ADDED
    },
    {
      name: m.plan3Name,
      price: m.plan3Price,
      body: m.plan3Body,
      includes: m.plan3Includes,
      highlight: false,
      category: m.plan3Category,
      cta: m.cta,
      href: "#contact", // ADDED
    },
  ];

  return (
    <PricingTable 
      eyebrow={m.eyebrow}
      title={m.title}
      subtitle={m.subtitle}
      plans={plans}
      note={m.note}
    />
  );
}