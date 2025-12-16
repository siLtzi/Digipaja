import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ServiceClientAnimation from "./client-animation";
import HeroBackground from "@/components/ui/HeroBackground";

// 1. Sanity Imports
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// 2. Fallback JSON Imports
import fi from "@/i18n/messages/fi.json";
import en from "@/i18n/messages/en.json";

type Props = {
  params: Promise<{ locale: "fi" | "en"; slug: string }>;
};

// --- DATA FETCHING ---
async function getServiceData(locale: string, slug: string) {
  try {
    const query = groq`
      *[_type == "service" && slug.current == $slug && language == $locale][0] {
        title,
        "slug": slug.current,
        description,
        body,
        features,
        "imageUrl": mainImage.asset->url,
        "videoUrl": heroVideo.asset->url
      }
    `;
    const sanityData = await client.fetch(query, { slug, locale });
    if (sanityData) return sanityData;
  } catch (error) {
    console.warn("Sanity fetch failed, using fallback.");
  }

  const fallbackData = locale === "fi" ? fi : en;
  // @ts-ignore
  return fallbackData.services.items.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceData(locale, slug);
  if (!service) return { title: "Not Found" };
  
  return {
    title: `${service.title} – Digipaja`,
    description: service.description || service.body,
  };
}

// --- ICONS MAP ---
const Icons = {
  Sparkle: (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Check: (props: any) => <Image src="/icons/check.svg" alt="Check" width={20} height={20} {...props} />,
  Fingerprint: (props: any) => <Image src="/icons/fingerprint.svg" alt="Design" width={20} height={20} {...props} />,
  Code: (props: any) => <Image src="/icons/code.svg" alt="Code" width={20} height={20} {...props} />,
  Lighthouse: (props: any) => <Image src="/icons/lighthouse.svg" alt="Speed" width={20} height={20} {...props} />,
  Mobile: (props: any) => <Image src="/icons/responsive.svg" alt="Mobile" width={20} height={20} {...props} />,
  Puzzle: (props: any) => <Image src="/icons/puzzle.svg" alt="Integration" width={20} height={20} {...props} />,
  Sanity: (props: any) => <Image src="/icons/sanity.svg" alt="CMS" width={20} height={20} {...props} />,
};

function getFeatureIcon(text: string) {
  const t = text.toLowerCase();
  if (t.includes("design") || t.includes("uniikki") || t.includes("brand")) return Icons.Fingerprint;
  if (t.includes("koodattu") || t.includes("code") || t.includes("käsin") || t.includes("react") || t.includes("next")) return Icons.Code;
  if (t.includes("lighthouse") || t.includes("nopeus") || t.includes("speed")) return Icons.Lighthouse;
  if (t.includes("mobiili") || t.includes("mobile") || t.includes("responsive")) return Icons.Mobile;
  if (t.includes("integraatio") || t.includes("integration") || t.includes("crm")) return Icons.Puzzle;
  if (t.includes("cms") || t.includes("sanity") || t.includes("päivite") || t.includes("update")) return Icons.Sanity;
  return Icons.Check; 
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = await getServiceData(locale, slug);
  const isFi = locale === "fi";

  if (!service) notFound();

  return (
    <main className="relative min-h-screen w-full bg-[#050609] text-zinc-100 selection:bg-[#ff8a3c] selection:text-black overflow-x-hidden">
      
      {/* === 1. HERO VIDEO LAYER === */}
      <div className="absolute top-0 inset-x-0 h-[650px] overflow-hidden z-0 pointer-events-none">
        {service.videoUrl ? (
          <>
            <video 
              src={service.videoUrl} 
              autoPlay loop muted playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050609]/20 to-[#050609]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#ff8a3c08,transparent_70%)]" />
        )}
      </div>

      {/* === 2. INTERACTIVE GRID LAYER === */}
      <div className="fixed inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
         <HeroBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
        {/* === HEADER SECTION === */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <Link 
            href={`/${locale}/#services`} 
            className="group mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#ff8a3c] transition-colors hover:text-white"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {isFi ? "PALAA PALVELUIHIN" : "BACK TO SERVICES"}
          </Link>
          
          <h1 
            className="animate-hero text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl relative mb-8" 
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {service.title}
          </h1>
          
          <div className="animate-hero flex items-center justify-center gap-2 opacity-50">
            <div className="h-[1px] w-12 bg-gradient-to-l from-[#ff8a3c] to-transparent" />
            <div className="h-1 w-1 rounded-full bg-[#ff8a3c]" />
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#ff8a3c] to-transparent" />
          </div>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="max-w-4xl mx-auto">
          
          <div className="animate-hero prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 text-center mb-20 leading-relaxed">
             <p className="whitespace-pre-line">{service.description || service.body}</p>
          </div>

          <div className="animate-hero mb-20">
            <h3 className="mb-8 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
              <Icons.Sparkle className="h-4 w-4 text-[#ff8a3c]" />
              {isFi ? "Mitä sisältyy" : "What's Included"}
            </h3>
            
            {service.features && service.features.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.features.map((feature: string, i: number) => {
                  const IconComponent = getFeatureIcon(feature);
                  return (
                    <div 
                      key={i} 
                      className="group relative overflow-hidden rounded-sm border border-white/5 bg-zinc-900/30 p-6 transition-all hover:border-[#ff8a3c]/30 hover:bg-zinc-900/60"
                    >
                       <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/10 transition-colors group-hover:border-[#ff8a3c]/50" />
                       <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/10 transition-colors group-hover:border-[#ff8a3c]/50" />

                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-white/5 bg-black/40 group-hover:border-[#ff8a3c]/20 transition-colors">
                          <div className="h-6 w-6 opacity-90 grayscale-[20%] transition-all group-hover:scale-110 group-hover:grayscale-0">
                             <IconComponent className="h-full w-full object-contain" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{feature}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* === CTA BUTTON (TECH STYLE) === */}
          <div className="animate-hero flex justify-center pt-4">
            <Link
              href={`/${locale}/contact`}
              style={{ fontFamily: "var(--font-goldman)" }}
              className="group relative isolate flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-colors duration-300 hover:text-white hover:shadow-[0_0_20px_rgba(255,138,60,0.2)]"
            >
              {/* Tech Corners */}
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
              
              {/* Background Fade */}
              <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
              
              {/* Text & Icon */}
              <span className="relative z-10">{isFi ? "Aloita Projekti" : "Start Project"}</span>
              <svg className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>
      
      <ServiceClientAnimation />
    </main>
  );
}