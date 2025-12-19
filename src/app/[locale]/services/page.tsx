import type { Metadata } from "next";
import { sanityClient } from "@/sanity/config";
import { servicesOverviewQuery } from "@/sanity/queries";
import ServicesOverviewContent from "./page-content";

type Props = {
  params: Promise<{ locale: "fi" | "en" }>;
};

type ServiceData = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: any;
  icon?: string;
  features?: string[];
  benefits?: string[];
  imageUrl?: string;
  galleryUrls?: string[];
};

type ServicesOverviewData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  services: ServiceData[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFi = locale === "fi";
  return {
    title: isFi ? "Palvelut – Digipaja" : "Services – Digipaja",
    description: isFi 
      ? "Modernit verkkosivut, verkkokaupat ja tekniset ratkaisut." 
      : "Modern websites, e-commerce, and technical solutions.",
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  const data = await sanityClient.fetch<ServicesOverviewData | null>(
    servicesOverviewQuery,
    { locale }
  );

  // Fallback content if no CMS data exists yet
  const fallbackData: ServicesOverviewData = {
    eyebrow: locale === "fi" ? "PALVELUMME" : "OUR SERVICES",
    title: locale === "fi" ? "Räätälöidyt ratkaisut verkossa menestymiseen" : "Tailored Solutions for Online Success",
    subtitle: locale === "fi" 
      ? "Autamme yrityksiäsi kasvamaan digitaalisessa ympäristössä modernien ja tehokkaiden verkkosivujen avulla. Jokainen projekti toteutetaan huolella ja ammattitaidolla."
      : "We help your business grow in the digital environment with modern and effective websites. Each project is executed with care and expertise.",
    services: [
      {
        slug: "kotisivut",
        title: locale === "fi" ? "Räätälöidyt kotisivut" : "Custom Websites",
        shortDescription: locale === "fi" 
          ? "Modernit ja responsiiviset verkkosivut, jotka heijastavat yrityksen identiteettiä. Suunnittelemme ja toteutamme verkkosivut, jotka toimivat kaikilla laitteilla ja tarjoavat käyttäjille erinomaisen kokemuksen. Sivustomme ovat nopeita, helposti päivitettäviä ja optimoituja hakukoneille."
          : "Modern and responsive websites that reflect your company's identity. We design and develop websites that work on all devices and provide users with an excellent experience.",
        icon: "website",
        features: locale === "fi" 
          ? [
              "Täysin responsiivinen suunnittelu mobiilista työpöytään",
              "Huippunopea latausaika ja suorituskyky",
              "SEO-optimoitu rakenne paremman näkyvyyden saavuttamiseksi",
              "Helposti päivitettävä sisällönhallintajärjestelmä",
              "Modernit animaatiot ja visuaaliset tehosteet",
              "Saavutettavuus ja WCAG-standardit huomioiden"
            ]
          : ["Responsive design", "Fast loading times", "SEO optimized", "Content management", "Modern animations", "Accessibility standards"],
        benefits: locale === "fi"
          ? [
              "Ammattimaisempi yrityskuva ja vahvempi brändi",
              "Parempi käyttäjakokemus kasvattaa konversiota",
              "Helppo sisällönpäivitys ilman teknistä osaamista",
              "Säästät aikaa ja rahaa pitkällä aikavälillä",
              "Skaalautuva ratkaisu, joka kasvaa yrityksesi mukana"
            ]
          : ["Better user experience", "Higher conversion", "Easy maintenance", "Time and cost savings", "Scalable solution"]
      },
      {
        slug: "verkkokaupat",
        title: locale === "fi" ? "Verkkokaupat" : "E-commerce",
        shortDescription: locale === "fi"
          ? "Tehokkaat verkkokaupparatkaisut, jotka kasvattavat myyntiä. Rakennamme käyttäjäystävällisiä verkkokauppoja, jotka houkuttelevat asiakkaita ja muuttavat vierailijat ostajiksi. Integraatiot maksujärjestelmiin, varastonhallintaan ja toimitustapoihin varmistavat saumattoman ostokokemuksen."
          : "Effective e-commerce solutions that grow your sales. We build user-friendly e-commerce platforms that attract customers and convert visitors into buyers.",
        icon: "ecommerce",
        features: locale === "fi"
          ? [
              "Turvalliset maksuintegraatiot kaikille yleisimmille palveluille",
              "Automaattinen varastonhallinta ja tuotetietojen synkronointi",
              "Tilausten seuranta ja asiakashallinta",
              "Monipuoliset toimitustapavaihtoehdot",
              "Kampanjakoodien ja alennusten hallinta",
              "Analytiikka ja raportointi myynnin seurantaan"
            ]
          : ["Payment integrations", "Inventory management", "Order tracking", "Delivery options", "Discount management", "Analytics and reporting"],
        benefits: locale === "fi"
          ? [
              "Myy tuotteita 24/7 ilman aukioloaikoja",
              "Tavoita asiakkaita koko Suomessa tai maailmanlaajuisesti",
              "Automatisoitu myyntiprosessi säästää työaikaa",
              "Parempi asiakaskokemus nostaa keskiostosta",
              "Reaaliaikainen tilannekuva myynnistä ja varastosta"
            ]
          : ["24/7 sales", "Wider customer base", "Automated process", "Better customer experience", "Real-time insights"]
      },
      {
        slug: "hakukoneoptimointi",
        title: locale === "fi" ? "Hakukoneoptimointi" : "SEO",
        shortDescription: locale === "fi"
          ? "Parannamme sivustosi näkyvyyttä hakukoneissa ja tuomme laadukasta liikennettä verkkosivuillesi. Tekninen optimointi, sisältöstrategia ja säännöllinen seuranta varmistavat, että sivustosi löytyy oikeilla hakusanoilla ja houkuttelee relevantteja kävijöitä."
          : "We improve your site's visibility in search engines and bring quality traffic to your website. Technical optimization, content strategy and regular monitoring ensure your site ranks well.",
        icon: "seo",
        features: locale === "fi"
          ? [
              "Perusteellinen avainsanatutkimus ja kilpailija-analyysi",
              "Tekninen SEO-optimointi sivuston rakenteelle",
              "Sisältöstrategia ja hakusanaoptimoidut tekstit",
              "Metatietojen ja rakenteellisten merkintöjen optimointi",
              "Nopeuden ja käytettävyyden parantaminen",
              "Linkkirakentaminen ja auktoriteetin kasvattaminen"
            ]
          : ["Keyword research", "Technical SEO", "Content strategy", "Metadata optimization", "Performance improvements", "Link building"],
        benefits: locale === "fi"
          ? [
              "Enemmän orgaanista liikennettä ilman mainoskustannuksia",
              "Paremmat sijoitukset hakukoneissa kasvattavat näkyvyyttä",
              "Pitkäaikainen kasvu ja kestävä asiakasvirta",
              "Kohdennetut kävijät, jotka ovat kiinnostuneita palveluistasi",
              "Parempi tuotto markkinointiin sijoitetulle pääomalle"
            ]
          : ["More traffic", "Better ranking", "Long-term growth", "Targeted visitors", "Better ROI"]
      },
      {
        slug: "tekninen-toteutus",
        title: locale === "fi" ? "Tekninen toteutus & Integraatiot" : "Technical Implementation",
        shortDescription: locale === "fi"
          ? "Räätälöidyt tekniset ratkaisut ja integraatiot yrityksesi tarpeisiin. Yhdistämme eri järjestelmät toimimaan saumattomasti yhdessä – asiakashallinnasta varastonhallintaan, maksujärjestelmistä analytiikkatyökaluihin. Autamme myös pilvipalveluiden käyttöönotossa ja ylläpidossa."
          : "Custom technical solutions and integrations for your business needs. We connect different systems to work seamlessly together.",
        icon: "technical",
        features: locale === "fi"
          ? [
              "API-integraatiot kolmannen osapuolen palveluihin",
              "Tietokantasuunnittelu ja -optimointi",
              "Pilvipalveluiden käyttöönotto (AWS, Azure, Google Cloud)",
              "Mukautetut backend-ratkaisut ja mikropalvelut",
              "Automaatiot ja työnkulkujen tehostaminen",
              "Tietoturva ja suojaus parhaiden käytäntöjen mukaan"
            ]
          : ["API integrations", "Database design", "Cloud services", "Custom backends", "Automation", "Security best practices"],
        benefits: locale === "fi"
          ? [
              "Skaalautuva ratkaisu, joka kasvaa yrityksesi mukana",
              "Tehokkuus ja automatisointi säästävät työaikaa",
              "Parempi tietoturva suojaa liiketoimintaasi",
              "Saumaton tiedonkulku eri järjestelmien välillä",
              "Modernit teknologiat varmistavat tulevaisuudenkestävyyden"
            ]
          : ["Scalable solution", "Efficiency", "Security", "Seamless data flow", "Future-proof technologies"]
      }
    ]
  };

  return (
    <ServicesOverviewContent
      eyebrow={(data?.eyebrow || fallbackData.eyebrow)}
      title={(data?.title || fallbackData.title)}
      subtitle={(data?.subtitle || fallbackData.subtitle)}
      services={(data?.services || fallbackData.services)}
      locale={locale}
    />
  );
}