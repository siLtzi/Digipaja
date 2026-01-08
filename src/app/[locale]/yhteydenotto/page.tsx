import type { Metadata } from "next";
import ConversationalContactForm from "@/components/contact/ConversationalContactForm";
import type { Translations, Package, Feature } from "@/components/contact/ConversationalContactForm";

const BASE_URL = "https://digipajaoulu.fi";

// Package definitions with feature restrictions
const PACKAGES_FI: Package[] = [
  {
    id: "kipina",
    name: "Kipinä",
    price: "alkaen 1 800 €",
    description: "Kompakti verkkosivusto pienyrityksille ja aloittaville yrittäjille.",
    features: [
      "1–3 sivua",
      "Responsiivinen design",
      "Yhteydenottolomake",
      "Perus-SEO",
    ],
    maxPages: 3,
    allowedFeatures: [
      "responsive",
      "contact-form",
      "basic-seo",
      "analytics",
      "multilingual",
    ],
  },
  {
    id: "hehku",
    name: "Hehku",
    price: "alkaen 3 500 €",
    description: "Monipuolinen sivusto kasvavalle yritykselle, joka haluaa erottua.",
    features: [
      "4–8 sivua",
      "CMS-sisällönhallinta",
      "Blogi / Uutiset",
      "Edistynyt SEO",
      "Animaatiot",
    ],
    maxPages: 8,
    allowedFeatures: [
      "responsive",
      "contact-form",
      "basic-seo",
      "analytics",
      "multilingual",
      "cms",
      "blog",
      "seo-advanced",
      "animations",
      "booking",
      "user-accounts",
    ],
  },
  {
    id: "roihu",
    name: "Roihu",
    price: "alkaen 6 500 €",
    description: "Täysimittainen räätälöity ratkaisu vaativiin tarpeisiin.",
    features: [
      "Rajaton sivumäärä",
      "Verkkokauppa",
      "API-integraatiot",
      "Kaikki ominaisuudet",
    ],
    maxPages: 999,
    allowedFeatures: [
      "responsive",
      "contact-form",
      "basic-seo",
      "analytics",
      "multilingual",
      "cms",
      "blog",
      "seo-advanced",
      "animations",
      "booking",
      "user-accounts",
      "ecommerce",
      "api-integrations",
      "live-chat",
    ],
  },
];

const PACKAGES_EN: Package[] = [
  {
    id: "kipina",
    name: "Kipinä",
    price: "from €1,800",
    description: "Compact website for small businesses and startups.",
    features: [
      "1–3 pages",
      "Responsive design",
      "Contact form",
      "Basic SEO",
    ],
    maxPages: 3,
    allowedFeatures: [
      "responsive",
      "contact-form",
      "basic-seo",
      "analytics",
      "multilingual",
    ],
  },
  {
    id: "hehku",
    name: "Hehku",
    price: "from €3,500",
    description: "Versatile site for growing businesses that want to stand out.",
    features: [
      "4–8 pages",
      "CMS content management",
      "Blog / News",
      "Advanced SEO",
      "Animations",
    ],
    maxPages: 8,
    allowedFeatures: [
      "responsive",
      "contact-form",
      "basic-seo",
      "analytics",
      "multilingual",
      "cms",
      "blog",
      "seo-advanced",
      "animations",
      "booking",
      "user-accounts",
    ],
  },
  {
    id: "roihu",
    name: "Roihu",
    price: "from €6,500",
    description: "Full-scale custom solution for demanding needs.",
    features: [
      "Unlimited pages",
      "E-commerce",
      "API integrations",
      "All features",
    ],
    maxPages: 999,
    allowedFeatures: [
      "responsive",
      "contact-form",
      "basic-seo",
      "analytics",
      "multilingual",
      "cms",
      "blog",
      "seo-advanced",
      "animations",
      "booking",
      "user-accounts",
      "ecommerce",
      "api-integrations",
      "live-chat",
    ],
  },
];

// Feature definitions
const FEATURES_FI: Feature[] = [
  { id: "cms", label: "Sisällönhallinta (CMS)", description: "Helppo sisällön muokkaus" },
  { id: "blog", label: "Blogi / Uutiset", description: "Ajankohtaista-osio" },
  { id: "ecommerce", label: "Verkkokauppa", description: "Tuotteiden myynti" },
  { id: "booking", label: "Ajanvaraus", description: "Online-varausjärjestelmä" },
  { id: "seo-advanced", label: "SEO-optimointi", description: "Hakukonenäkyvyys" },
  { id: "analytics", label: "Analytiikka", description: "Kävijäseuranta" },
  { id: "multilingual", label: "Monikielisyys", description: "Useita kieliä" },
  { id: "animations", label: "Animaatiot", description: "Liike ja efektit" },
  { id: "user-accounts", label: "Käyttäjätilit", description: "Kirjautuminen" },
  { id: "api-integrations", label: "API-integraatiot", description: "Kolmannen osapuolen palvelut" },
  { id: "contact-form", label: "Lomakkeet", description: "Yhteydenotto & kyselyt" },
  { id: "live-chat", label: "Live Chat", description: "Reaaliaikainen tuki" },
];

const FEATURES_EN: Feature[] = [
  { id: "cms", label: "Content Management (CMS)", description: "Easy content editing" },
  { id: "blog", label: "Blog / News", description: "Updates section" },
  { id: "ecommerce", label: "E-commerce", description: "Product sales" },
  { id: "booking", label: "Booking System", description: "Online reservations" },
  { id: "seo-advanced", label: "SEO Optimization", description: "Search visibility" },
  { id: "analytics", label: "Analytics", description: "Visitor tracking" },
  { id: "multilingual", label: "Multilingual", description: "Multiple languages" },
  { id: "animations", label: "Animations", description: "Motion & effects" },
  { id: "user-accounts", label: "User Accounts", description: "Login system" },
  { id: "api-integrations", label: "API Integrations", description: "Third-party services" },
  { id: "contact-form", label: "Forms", description: "Contact & inquiries" },
  { id: "live-chat", label: "Live Chat", description: "Real-time support" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFi = locale === "fi";

  const title = isFi
    ? "Ota yhteyttä | Digipaja – Verkkosivut yrityksille"
    : "Contact Us | Digipaja – Websites for Businesses";

  const description = isFi
    ? "Ota yhteyttä ja kerro projektistasi. Vastaamme 24 tunnin sisällä. Digipaja – Modernit verkkosivut yrityksille Oulusta."
    : "Get in touch and tell us about your project. We respond within 24 hours. Digipaja – Modern websites for businesses.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/yhteydenotto`,
      languages: {
        "fi-FI": `${BASE_URL}/fi/yhteydenotto`,
        "en-US": `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isFi ? "fi_FI" : "en_US",
      url: `${BASE_URL}/${locale}/${isFi ? "yhteydenotto" : "contact"}`,
      siteName: "Digipaja",
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  const translations: Translations = locale === "fi" ? {
    steps: {
      contactInfo: {
        title: "Kerro ensin hieman itsestäsi",
        name: "Nimi",
        namePlaceholder: "Etunimi Sukunimi",
        email: "Sähköposti",
        emailPlaceholder: "nimi@yritys.fi",
        company: "Yritys",
        companyPlaceholder: "Yrityksen nimi",
        phone: "Puhelin",
        phonePlaceholder: "+358 40 123 4567",
      },
      contactMethod: {
        title: "Miten sinuun saa parhaiten yhteyden?",
        email: {
          label: "Sähköpostilla",
          description: "Vastaamme tyypillisesti 24 tunnin sisällä",
        },
        phone: {
          label: "Puhelimella",
          description: "Soitamme sinulle sopivana ajankohtana",
        },
      },
      package: {
        title: "Mikä paketti kiinnostaa?",
        subtitle: "Voit aina räätälöidä pakettia myöhemmin keskustelussa.",
      },
      features: {
        title: "Mitä ominaisuuksia tarvitset?",
        subtitle: "Valitse kaikki mitä sivustollasi tulisi olla.",
        limitWarning: "{package}-paketissa on rajoituksia joihinkin ominaisuuksiin.",
      },
      message: {
        title: "Kerro lisää projektistasi",
        placeholder: "Kuvaile vapaasti mitä olet rakentamassa, mitä tavoitteita sinulla on, ja mikä on aikataulu...",
      },
      additional: {
        title: "Vielä muutama kysymys",
        currentWebsite: "Nykyinen verkkosivusto",
        currentWebsitePlaceholder: "https://...",
        competitors: "Kilpailijoiden sivustot",
        competitorsPlaceholder: "Sivustot joista pidät tai jotka inspiroivat",
        referral: "Mistä kuulit meistä?",
        referralPlaceholder: "Google, suositus, sosiaalinen media...",
        budget: "Budjetti",
        budgetPlaceholder: "esim. 2 000 - 5 000 €",
      },
    },
    ui: {
      back: "Takaisin",
      next: "Jatka",
      submit: "Lähetä",
      sending: "Lähetetään...",
      optional: "valinnainen",
    },
    success: {
      title: "Kiitos viestistäsi!",
      message: "Olemme vastaanottaneet viestisi ja palaamme asiaan pian.",
      backHome: "Takaisin etusivulle",
    },
    packages: PACKAGES_FI,
    features: FEATURES_FI,
  } : {
    steps: {
      contactInfo: {
        title: "First, tell us about yourself",
        name: "Name",
        namePlaceholder: "First Last",
        email: "Email",
        emailPlaceholder: "name@company.com",
        company: "Company",
        companyPlaceholder: "Company name",
        phone: "Phone",
        phonePlaceholder: "+1 234 567 8900",
      },
      contactMethod: {
        title: "How should we reach you?",
        email: {
          label: "Email",
          description: "We typically respond within 24 hours",
        },
        phone: {
          label: "Phone",
          description: "We'll call you at a convenient time",
        },
      },
      package: {
        title: "Which package interests you?",
        subtitle: "You can always customize it later in the discussion.",
      },
      features: {
        title: "What features do you need?",
        subtitle: "Select everything your website should have.",
        limitWarning: "Some features are limited in the {package} package.",
      },
      message: {
        title: "Tell us more about your project",
        placeholder: "Describe what you're building, your goals, and timeline...",
      },
      additional: {
        title: "A few more questions",
        currentWebsite: "Current website",
        currentWebsitePlaceholder: "https://...",
        competitors: "Competitor websites",
        competitorsPlaceholder: "Sites you like or that inspire you",
        referral: "How did you hear about us?",
        referralPlaceholder: "Google, referral, social media...",
        budget: "Budget",
        budgetPlaceholder: "e.g. €2,000 - €5,000",
      },
    },
    ui: {
      back: "Back",
      next: "Continue",
      submit: "Submit",
      sending: "Sending...",
      optional: "optional",
    },
    success: {
      title: "Thank you!",
      message: "We've received your message and will get back to you soon.",
      backHome: "Back to home",
    },
    packages: PACKAGES_EN,
    features: FEATURES_EN,
  };

  return <ConversationalContactForm t={translations} />;
}
