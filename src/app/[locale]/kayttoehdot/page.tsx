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
    title: isFi ? "Käyttöehdot" : "Terms of Service",
    description: isFi 
      ? "Digipajan käyttöehdot - Sivuston ja palveluiden käyttöä koskevat ehdot." 
      : "Digipaja Terms of Service - Terms and conditions for using our website and services.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/kayttoehdot`,
      languages: {
        fi: `${BASE_URL}/fi/kayttoehdot`,
        en: `${BASE_URL}/en/kayttoehdot`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const contentFi = {
  title: "Käyttöehdot",
  lastUpdated: "Päivitetty viimeksi: 7.1.2026",
  sections: [
    {
      title: "1. Yleistä",
      content: `Nämä käyttöehdot koskevat Digipajan (jäljempänä "me", "meidän" tai "palveluntarjoaja") tarjoamia palveluita ja verkkosivuston käyttöä.

Käyttämällä sivustoamme tai palveluitamme hyväksyt nämä ehdot. Jos et hyväksy ehtoja, älä käytä palveluitamme.`
    },
    {
      title: "2. Palvelut",
      content: `Tarjoamme seuraavia palveluita:

- Verkkosivujen suunnittelu ja toteutus
- Verkkokaupparatkaisut
- Hakukoneoptimointi (SEO)
- Tekniset integraatiot ja räätälöidyt ratkaisut
- Ylläpitopalvelut

Palveluiden tarkemmat ehdot sovitaan erikseen kirjallisessa sopimuksessa jokaisen projektin osalta.`
    },
    {
      title: "3. Tarjoukset ja sopimukset",
      content: `**Tarjoukset:**
- Tarjoukset ovat voimassa 30 päivää, ellei toisin mainita
- Tarjous ei sido kumpaakaan osapuolta ennen kirjallista hyväksyntää
- Hinnat ovat arvonlisäverottomia, ellei toisin mainita

**Sopimukset:**
- Sopimus syntyy kun molemmat osapuolet ovat hyväksyneet tarjouksen
- Muutokset sopimukseen tulee tehdä kirjallisesti
- Projektin laajuus ja aikataulu määritellään sopimuksessa`
    },
    {
      title: "4. Hinnat ja maksuehdot",
      content: `**Hinnoittelu:**
- Hinnat perustuvat projektin laajuuteen ja monimutkaisuuteen
- Lisätyöt laskutetaan erikseen sovitun tuntiveloituksen mukaan
- Kolmansien osapuolien kulut (esim. hosting, domainit) eivät sisälly hintaan

**Maksuehdot:**
- Ennakkomaksu 30-50% projektin alkaessa
- Loppumaksu ennen julkaisua tai sovituissa erissä
- Maksuaika 14 päivää
- Viivästyskorko korkolain mukaan`
    },
    {
      title: "5. Asiakkaan velvollisuudet",
      content: `Asiakas sitoutuu:

- Toimittamaan tarvittavat materiaalit sovitussa aikataulussa
- Antamaan palautetta ja hyväksynnät kohtuullisessa ajassa
- Vastaamaan toimittamiensa materiaalien laillisuudesta
- Maksamaan sovitut maksut ajallaan
- Ilmoittamaan muutoksista yhteystiedoissa

Asiakkaan viivästykset voivat vaikuttaa projektin aikatauluun ja kustannuksiin.`
    },
    {
      title: "6. Immateriaalioikeudet",
      content: `**Ennen maksua:**
- Kaikki oikeudet pysyvät Digipajalla kunnes lopullinen maksu on suoritettu

**Maksun jälkeen:**
- Asiakas saa täydet käyttöoikeudet räätälöityyn työhön
- Digipajalla on oikeus käyttää työtä referenssinä
- Kolmansien osapuolien lisenssit (esim. fontit, kuvat) siirtyvät niiden ehtojen mukaisesti

**Poikkeukset:**
- Digipajan yleiset komponentit ja työkalut pysyvät Digipajan omistuksessa`
    },
    {
      title: "7. Takuu ja tuki",
      content: `**Takuuaika:**
- 30 päivän takuu virheille ja bugeille julkaisun jälkeen
- Takuu kattaa teknisen toimivuuden, ei sisällöllisiä muutoksia

**Ylläpito:**
- Ylläpitopalvelut sovitaan erikseen
- Tietoturvapäivitykset suositellaan säännöllisesti
- Emme vastaa kolmansien osapuolien palveluiden muutoksista`
    },
    {
      title: "8. Vastuunrajoitukset",
      content: `**Digipaja ei vastaa:**
- Välillisistä vahingoista (esim. menetetty liikevaihto)
- Kolmansien osapuolien palveluiden toiminnasta
- Force majeure -tilanteista
- Asiakkaan toimittamien materiaalien virheistä

**Vastuun enimmäismäärä:**
Vastuumme rajoittuu enintään projektin kokonaisveloituksen määrään.`
    },
    {
      title: "9. Sopimuksen päättäminen",
      content: `**Peruutus ennen aloitusta:**
- Asiakas voi peruuttaa maksutta ennen työn aloittamista
- Ennakkomaksu palautetaan vähennettynä mahdollisilla jo syntyneillä kuluilla

**Keskeytys projektin aikana:**
- Tehdystä työstä laskutetaan
- Keskeneräiset materiaalit toimitetaan asiakkaalle

**Digipajan oikeus päättää:**
- Maksamattomien laskujen vuoksi (14 päivän huomautusajan jälkeen)
- Jos asiakas rikkoo olennaisesti ehtoja`
    },
    {
      title: "10. Sivuston käyttö",
      content: `Sivustomme käyttäjänä sitoudut:

- Käyttämään sivustoa laillisiin tarkoituksiin
- Olemaan yrittämättä häiritä sivuston toimintaa
- Olemaan keräämättä tietoja automaattisesti ilman lupaa
- Kunnioittamaan immateriaalioikeuksia

Pidätämme oikeuden estää pääsy sivustolle väärinkäytöstapauksissa.`
    },
    {
      title: "11. Muutokset ehtoihin",
      content: `Voimme päivittää näitä ehtoja tarvittaessa. Merkittävistä muutoksista ilmoitamme sivustollamme.

Voimassa olevien projektien ehdot säilyvät ennallaan sopimuksen mukaisesti.`
    },
    {
      title: "12. Sovellettava laki ja riitojen ratkaisu",
      content: `Näihin ehtoihin sovelletaan Suomen lakia.

Mahdolliset erimielisyydet pyritään ensisijaisesti ratkaisemaan neuvottelemalla. Jos neuvottelut eivät johda tulokseen, riita ratkaistaan Oulun käräjäoikeudessa.`
    },
    {
      title: "13. Yhteystiedot",
      content: `Digipaja
Oulu, Suomi
Sähköposti: info@digipajaoulu.fi

Otamme mielellämme vastaan kysymyksiä ja palautetta.`
    }
  ]
};

const contentEn = {
  title: "Terms of Service",
  lastUpdated: "Last updated: January 7, 2026",
  sections: [
    {
      title: "1. General",
      content: `These terms of service apply to services provided by Digipaja (hereinafter "we", "our" or "service provider") and the use of our website.

By using our website or services, you accept these terms. If you do not accept the terms, do not use our services.`
    },
    {
      title: "2. Services",
      content: `We offer the following services:

- Website design and development
- E-commerce solutions
- Search engine optimization (SEO)
- Technical integrations and custom solutions
- Maintenance services

More specific terms for services are agreed separately in a written contract for each project.`
    },
    {
      title: "3. Quotes and Contracts",
      content: `**Quotes:**
- Quotes are valid for 30 days unless otherwise stated
- A quote does not bind either party before written acceptance
- Prices are exclusive of VAT unless otherwise stated

**Contracts:**
- A contract is formed when both parties have accepted the quote
- Changes to the contract must be made in writing
- Project scope and schedule are defined in the contract`
    },
    {
      title: "4. Prices and Payment Terms",
      content: `**Pricing:**
- Prices are based on project scope and complexity
- Additional work is billed separately at the agreed hourly rate
- Third-party costs (e.g., hosting, domains) are not included

**Payment terms:**
- Advance payment 30-50% at project start
- Final payment before launch or in agreed installments
- Payment term 14 days
- Late interest according to Finnish law`
    },
    {
      title: "5. Client Obligations",
      content: `The client commits to:

- Providing necessary materials within agreed schedule
- Giving feedback and approvals in reasonable time
- Being responsible for the legality of provided materials
- Paying agreed payments on time
- Notifying of changes in contact information

Client delays may affect project schedule and costs.`
    },
    {
      title: "6. Intellectual Property Rights",
      content: `**Before payment:**
- All rights remain with Digipaja until final payment is made

**After payment:**
- Client receives full usage rights to custom work
- Digipaja has the right to use work as reference
- Third-party licenses (e.g., fonts, images) transfer according to their terms

**Exceptions:**
- Digipaja's general components and tools remain Digipaja's property`
    },
    {
      title: "7. Warranty and Support",
      content: `**Warranty period:**
- 30-day warranty for errors and bugs after launch
- Warranty covers technical functionality, not content changes

**Maintenance:**
- Maintenance services are agreed separately
- Security updates are recommended regularly
- We are not responsible for changes in third-party services`
    },
    {
      title: "8. Limitation of Liability",
      content: `**Digipaja is not liable for:**
- Indirect damages (e.g., lost revenue)
- Third-party service functionality
- Force majeure situations
- Errors in client-provided materials

**Maximum liability:**
Our liability is limited to the total project billing amount.`
    },
    {
      title: "9. Contract Termination",
      content: `**Cancellation before start:**
- Client can cancel free of charge before work begins
- Advance payment is refunded minus any costs already incurred

**Interruption during project:**
- Completed work is billed
- Incomplete materials are delivered to client

**Digipaja's right to terminate:**
- Due to unpaid invoices (after 14-day notice)
- If client materially breaches terms`
    },
    {
      title: "10. Website Use",
      content: `As a website user, you commit to:

- Using the site for lawful purposes
- Not attempting to disrupt site functionality
- Not collecting data automatically without permission
- Respecting intellectual property rights

We reserve the right to block access to the site in case of abuse.`
    },
    {
      title: "11. Changes to Terms",
      content: `We may update these terms as needed. We will notify of significant changes on our website.

Terms for ongoing projects remain unchanged according to the contract.`
    },
    {
      title: "12. Applicable Law and Dispute Resolution",
      content: `Finnish law applies to these terms.

Any disputes will primarily be resolved through negotiation. If negotiations do not lead to a result, the dispute will be resolved in Oulu District Court.`
    },
    {
      title: "13. Contact",
      content: `Digipaja
Oulu, Finland
Email: info@digipajaoulu.fi

We welcome questions and feedback.`
    }
  ]
};

export default async function TermsOfServicePage({ params }: Props) {
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
