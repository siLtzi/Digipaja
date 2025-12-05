import Image from "next/image";
import { brothersSettingsQuery } from "@/sanity/queries";
import { sanityClient } from "@/sanity/config";

// --- TYPES (Unchanged) ---
type BrothersMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  techTitle: string;
  techBody: string;
  bizTitle: string;
  bizBody: string;
  note: string;
};

type MessagesFile = {
  brothers: BrothersMessages;
};

type BrothersSettings = {
  brothersEyebrow_fi?: string | null;
  brothersTitle_fi?: string | null;
  brothersSubtitle_fi?: string | null;
  brothersTechTitle_fi?: string | null;
  brothersTechBody_fi?: string | null;
  brothersBizTitle_fi?: string | null;
  brothersBizBody_fi?: string | null;
  brothersNote_fi?: string | null;
};

// Shared Gradient for consistency
const BRAND_GRADIENT = "from-purple-500 via-fuchsia-500 to-cyan-500";

// --- MAIN COMPONENT ---
export default async function Brothers({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.brothers;

  const cms =
    (await sanityClient.fetch<BrothersSettings | null>(
      brothersSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.brothersEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.brothersTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.brothersSubtitle_fi || m.subtitle : m.subtitle;
  const techTitle = isFi
    ? cms.brothersTechTitle_fi || m.techTitle
    : m.techTitle;
  const techBody = isFi ? cms.brothersTechBody_fi || m.techBody : m.techBody;
  const bizTitle = isFi ? cms.brothersBizTitle_fi || m.bizTitle : m.bizTitle;
  const bizBody = isFi ? cms.brothersBizBody_fi || m.bizBody : m.bizBody;
  const note = isFi ? cms.brothersNote_fi || m.note : m.note;

  const split = title.split(":");
  const primaryTitle = split.length > 1 ? `${split[0]}:` : title;
  const secondaryTitle =
    split.length > 1 ? split.slice(1).join(":").trim() : "";

  const secondaryText = secondaryTitle || title;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#050505] border-t border-white/5"
    >
      {/* Global Ambient Glow (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[clamp(16px,8vw,80px)] py-24 lg:py-32">
        
        {/* --- HEADER --- */}
        <div className="mx-auto mb-24 max-w-4xl text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            {eyebrow}
          </p>

          <h2
            style={{ fontFamily: "var(--font-clash-display)" }}
            className="text-4xl font-medium tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
          >
            <span data-brothers-primary className="block text-zinc-400 opacity-80 mb-2 sm:mb-4">
              {primaryTitle}
            </span>
            <span data-brothers-secondary className={`block bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
              <span>{secondaryText}</span>
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-zinc-400">
            {subtitle}
          </p>
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="space-y-32">
          
          {/* --- SAMULI (Tech / Cyan Theme) --- */}
          <div data-brothers-card="samuli" className="group relative">
            {/* Tech Glow */}
            <div className="absolute left-[10%] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-900/20 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative grid grid-cols-1 items-center gap-16 md:grid-cols-2 lg:gap-24">
              
              {/* IMAGE COLUMN */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
                  
                  {/* Image "Portal" Effect */}
                  <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/30">
                    {/* Inner Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/20" />
                    
                    <Image
                      src="/brothers/Samuli.png"
                      alt="Samuli"
                      width={520}
                      height={720}
                      className="relative z-10 h-auto w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />

                    {/* Name Badge (Glassmorphic) */}
                    <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 w-[90%]">
                      <div className="rounded-xl border border-white/10 bg-black/60 px-6 py-3 text-center backdrop-blur-md">
                        <span className="block text-xl font-bold uppercase tracking-widest text-cyan-400">
                          Samuli
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-full border border-cyan-500/20 bg-cyan-500/5 blur-xl" />
                </div>
              </div>

              {/* TEXT COLUMN */}
              <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-3 md:justify-start">
                    <span className="h-[1px] w-8 bg-cyan-500/50" />
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">
                      Technical Director
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-clash-display)" }}
                    className="text-3xl font-medium text-zinc-100 sm:text-4xl"
                  >
                    {techTitle}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                  {techBody}
                </p>
              </div>
            </div>
          </div>

          {/* --- JOUKO (Biz / Fuchsia Theme) --- */}
          <div data-brothers-card="jouko" className="group relative">
            {/* Biz Glow */}
            <div className="absolute right-[10%] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-fuchsia-900/20 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative grid grid-cols-1 items-center gap-16 md:grid-cols-2 lg:gap-24">
              
              {/* TEXT COLUMN (Order Swapped for Desktop) */}
              <div className="order-2 flex flex-col justify-center space-y-6 text-center md:order-1 md:text-left lg:items-end lg:text-right">
                <div className="flex flex-col gap-4 lg:items-end">
                  <div className="flex items-center justify-center gap-3 md:justify-start lg:flex-row-reverse">
                    <span className="h-[1px] w-8 bg-fuchsia-500/50" />
                    <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-500">
                      Creative & Business
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-clash-display)" }}
                    className="text-3xl font-medium text-zinc-100 sm:text-4xl"
                  >
                    {bizTitle}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-zinc-400 sm:text-lg lg:max-w-xl">
                  {bizBody}
                </p>
              </div>

              {/* IMAGE COLUMN */}
              <div className="order-1 flex justify-center md:order-2 md:justify-start">
                <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
                  
                  {/* Image "Portal" Effect */}
                  <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-fuchsia-500/30">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fuchsia-900/20" />
                    
                    <Image
                      src="/brothers/Jouko.png"
                      alt="Jouko"
                      width={520}
                      height={720}
                      className="relative z-10 h-auto w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />

                    {/* Name Badge */}
                    <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 w-[90%]">
                      <div className="rounded-xl border border-white/10 bg-black/60 px-6 py-3 text-center backdrop-blur-md">
                        <span className="block text-xl font-bold uppercase tracking-widest text-fuchsia-400">
                          Jouko
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 blur-xl" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- FOOTER NOTE --- */}
        <div className="mt-32 flex justify-center">
          <div className="max-w-2xl border-t border-white/5 pt-10 text-center">
            <p className="text-sm font-light text-zinc-500 tracking-wide">
              {note}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}