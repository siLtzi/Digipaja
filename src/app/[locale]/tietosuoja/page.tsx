import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: "fi" | "en" }>;
};

const BASE_URL = "https://digipajaoulu.fi";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFi = locale === "fi";
  
  return {
    title: isFi ? "Tietosuojaseloste" : "Privacy Policy",
    description: isFi 
      ? "Digipajan tietosuojaseloste - Miten käsittelemme henkilötietojasi ja evästeitä." 
      : "Digipaja Privacy Policy - How we handle your personal data and cookies.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/tietosuoja`,
      languages: {
        fi: `${BASE_URL}/fi/tietosuoja`,
        en: `${BASE_URL}/en/tietosuoja`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const contentFi = {
  title: "Tietosuojaseloste",
  lastUpdated: "Päivitetty viimeksi: 7.1.2026",
  sections: [
    {
      title: "1. Rekisterinpitäjä",
      content: `Digipaja
Oulu, Suomi
Sähköposti: info@digipajaoulu.fi

Olemme sitoutuneet suojaamaan yksityisyyttäsi ja käsittelemään henkilötietojasi EU:n yleisen tietosuoja-asetuksen (GDPR) mukaisesti.`
    },
    {
      title: "2. Mitä tietoja keräämme",
      content: `Keräämme seuraavia tietoja:

**Yhteydenottolomakkeen kautta:**
- Nimi
- Sähköpostiosoite
- Puhelinnumero (valinnainen)
- Yrityksen nimi (valinnainen)
- Projektin kuvaus

**Automaattisesti kerättävät tiedot:**
- IP-osoite (anonymisoituna)
- Selaintyyppi ja versio
- Käyttöjärjestelmä
- Sivuston käyttötiedot (evästeiden hyväksynnän jälkeen)`
    },
    {
      title: "3. Tietojen käyttötarkoitus",
      content: `Käytämme kerättyjä tietoja seuraaviin tarkoituksiin:

- Yhteydenottopyyntöihin vastaaminen
- Tarjousten laatiminen
- Asiakassuhteen hoitaminen
- Sivuston toiminnallisuuden parantaminen
- Tilastollinen analyysi (anonymisoituna)`
    },
    {
      title: "4. Evästeet",
      content: `Käytämme sivustollamme evästeitä:

**Välttämättömät evästeet:**
- Sivuston perustoiminnallisuus
- Evästeasetustesi muistaminen
- Istunnon hallinta

**Analytiikkaevästeet (valinnainen):**
- Google Analytics (anonymisoitu IP)
- Sivuston käyttötilastot

Voit hallita evästeasetuksiasi milloin tahansa. Välttämättömät evästeet ovat tarpeen sivuston toiminnalle.`
    },
    {
      title: "5. Tietojen säilytys",
      content: `Säilytämme henkilötietojasi vain niin kauan kuin on tarpeen:

- Yhteydenottopyynnöt: 2 vuotta
- Asiakastiedot: Asiakassuhteen ajan + 6 vuotta (kirjanpitolaki)
- Analytiikkatiedot: 26 kuukautta

Vanhentuneet tiedot poistetaan automaattisesti tai anonymisoidaan.`
    },
    {
      title: "6. Tietojen jakaminen",
      content: `Emme myy tai vuokraa henkilötietojasi kolmansille osapuolille.

Voimme jakaa tietoja:
- Palveluntarjoajillemme (esim. sähköpostipalvelu, hosting)
- Viranomaisten vaatimuksesta lain mukaisesti

Kaikki palveluntarjoajamme ovat sitoutuneet GDPR-vaatimusten noudattamiseen.`
    },
    {
      title: "7. Oikeutesi",
      content: `Sinulla on GDPR:n mukaiset oikeudet:

- **Oikeus saada pääsy tietoihisi** - Voit pyytää kopion tiedoistasi
- **Oikeus oikaista tietoja** - Voit pyytää virheellisten tietojen korjaamista
- **Oikeus tulla unohdetuksi** - Voit pyytää tietojesi poistamista
- **Oikeus rajoittaa käsittelyä** - Voit rajoittaa tietojesi käsittelyä
- **Oikeus siirtää tiedot** - Voit saada tietosi siirrettävässä muodossa
- **Oikeus vastustaa** - Voit vastustaa tietojesi käsittelyä

Käytä oikeuksiasi ottamalla yhteyttä: info@digipajaoulu.fi`
    },
    {
      title: "8. Tietoturva",
      content: `Suojaamme tietojasi seuraavasti:

- SSL/TLS-salaus kaikessa tiedonsiirrossa
- Säännölliset tietoturva-auditoinnit
- Pääsynhallinta ja lokitus
- Varmuuskopiointi

Ilmoitamme tietoturvaloukkauksista 72 tunnin sisällä havaitsemisesta.`
    },
    {
      title: "9. Muutokset tietosuojaselosteeseen",
      content: `Voimme päivittää tätä tietosuojaselostetta ajoittain. Merkittävistä muutoksista ilmoitamme sivustollamme.

Suosittelemme tarkistamaan tämän selosteen säännöllisesti.`
    },
    {
      title: "10. Yhteystiedot",
      content: `Tietosuojaan liittyvissä kysymyksissä ota yhteyttä:

Digipaja
Sähköposti: info@digipajaoulu.fi

Jos et ole tyytyväinen tapaamme käsitellä tietojasi, voit tehdä valituksen tietosuojavaltuutetulle (tietosuoja.fi).`
    }
  ]
};

const contentEn = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: January 7, 2026",
  sections: [
    {
      title: "1. Data Controller",
      content: `Digipaja
Oulu, Finland
Email: info@digipajaoulu.fi

We are committed to protecting your privacy and processing your personal data in accordance with the EU General Data Protection Regulation (GDPR).`
    },
    {
      title: "2. What Data We Collect",
      content: `We collect the following data:

**Through the contact form:**
- Name
- Email address
- Phone number (optional)
- Company name (optional)
- Project description

**Automatically collected data:**
- IP address (anonymized)
- Browser type and version
- Operating system
- Site usage data (after cookie consent)`
    },
    {
      title: "3. Purpose of Data Processing",
      content: `We use collected data for the following purposes:

- Responding to contact requests
- Preparing quotes
- Managing customer relationships
- Improving site functionality
- Statistical analysis (anonymized)`
    },
    {
      title: "4. Cookies",
      content: `We use cookies on our website:

**Necessary cookies:**
- Basic site functionality
- Remembering your cookie preferences
- Session management

**Analytics cookies (optional):**
- Google Analytics (anonymized IP)
- Site usage statistics

You can manage your cookie settings at any time. Necessary cookies are required for the site to function.`
    },
    {
      title: "5. Data Retention",
      content: `We retain your personal data only as long as necessary:

- Contact requests: 2 years
- Customer data: Duration of relationship + 6 years (accounting law)
- Analytics data: 26 months

Expired data is automatically deleted or anonymized.`
    },
    {
      title: "6. Data Sharing",
      content: `We do not sell or rent your personal data to third parties.

We may share data with:
- Our service providers (e.g., email service, hosting)
- Authorities when required by law

All our service providers are committed to GDPR compliance.`
    },
    {
      title: "7. Your Rights",
      content: `You have the following rights under GDPR:

- **Right of access** - You can request a copy of your data
- **Right to rectification** - You can request correction of inaccurate data
- **Right to be forgotten** - You can request deletion of your data
- **Right to restrict processing** - You can restrict how we process your data
- **Right to data portability** - You can receive your data in a portable format
- **Right to object** - You can object to processing of your data

To exercise your rights, contact: info@digipajaoulu.fi`
    },
    {
      title: "8. Data Security",
      content: `We protect your data with:

- SSL/TLS encryption for all data transfers
- Regular security audits
- Access control and logging
- Backups

We will notify of data breaches within 72 hours of discovery.`
    },
    {
      title: "9. Changes to This Policy",
      content: `We may update this privacy policy from time to time. We will notify of significant changes on our website.

We recommend reviewing this policy regularly.`
    },
    {
      title: "10. Contact",
      content: `For privacy-related questions, contact:

Digipaja
Email: info@digipajaoulu.fi

If you are not satisfied with how we handle your data, you can file a complaint with the Data Protection Ombudsman (tietosuoja.fi).`
    }
  ]
};

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const content = locale === "fi" ? contentFi : contentEn;
  const backText = locale === "fi" ? "Takaisin etusivulle" : "Back to home";

  return (
    <main className="relative min-h-screen bg-[#050609] pt-32 pb-20">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center overflow-hidden">
        <div className="h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_rgba(255,138,60,0.8),0_0_40px_rgba(255,138,60,0.4)]" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Back link */}
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#ff8a3c] transition-colors mb-12"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {backText}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            {content.title}
          </h1>
          <p className="text-sm text-zinc-500">{content.lastUpdated}</p>
        </header>

        {/* Content */}
        <article className="space-y-12">
          {content.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-xl font-bold text-white"
              >
                {section.title}
              </h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
