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

// --- MAIN COMPONENT ---
export default async function Brothers({ locale }: { locale: "fi" | "en" }) {
  // (Data fetching logic remains unchanged)
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

  // text that gets the gradient + typewriter
  const secondaryText = secondaryTitle || title;

  // --- THE REWORKED VIEW ---
  return (
    <section
      id="about"
      // Changed bg to pure black for better contrast with glows
      className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-[clamp(16px,8vw,80px)] py-24 lg:py-32">
        {/* HEADER SECTION (Centered for cinematic feel) */}
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400">
            {eyebrow}
          </p>

          <div className="mt-4 space-y-6">
            <h2
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-6xl"
            >
              <span
                data-brothers-primary
                className="mb-3 block text-sm font-medium uppercase tracking-[0.22em] text-zinc-400 sm:text-base"
              >
                {primaryTitle}
              </span>

              <span data-brothers-secondary className="block">
                <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-zinc-100 bg-clip-text text-transparent drop-shadow-sm">
                  {secondaryText}
                </span>
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-base text-zinc-300 sm:text-lg">
              {subtitle}
            </p>
          </div>
        </div>

        {/* BROTHERS CONTENT CONTAINER */}
        <div className="space-y-32">
          {/* --- SAMULI SECTION (Tech / Blue) --- */}
          <div data-brothers-card="samuli" className="relative">
            {/* Ambient Background Glow - Blue */}
            <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-sky-600/20 blur-[120px] mix-blend-screen md:h-[800px] md:w-[800px]"></div>

            <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-24">
              {/* IMAGE + NAMEPLATE COMBO (PRESERVED) */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-[240px] sm:w-[280px] lg:w-[320px]">
                  <Image
                    src="/brothers/Samuli.png"
                    alt="Samuli – Digipajan tekninen veljeskunta"
                    width={520}
                    height={720}
                    className="h-auto w-full object-contain drop-shadow-2xl"
                  />

                  {/* Name Plate */}
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="w-full rounded-md bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-700 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
                      <span className="block text-center text-[14px] sm:text-[30px] font-semibold uppercase tracking-[0.24em] text-zinc-50 drop-shadow-[0_1px_3px_rgba(0,0,0,1)]">
                        Samuli
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
                <h3
                  style={{ fontFamily: "var(--font-clash-display)" }}
                  className="text-2xl font-semibold text-sky-300 sm:text-3xl"
                >
                  {techTitle}
                </h3>
                {/* Samuli line */}
                <div
                  data-brothers-line="samuli"
                  className="h-1 w-12 bg-sky-500/50 mx-auto md:mx-0"
                ></div>
                <p className="max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                  {techBody}
                </p>
              </div>
            </div>
          </div>

          {/* --- JOUKO SECTION (Biz / Fuchsia) --- */}
          <div data-brothers-card="jouko" className="relative">
            {/* Ambient Background Glow - Fuchsia */}
            <div className="absolute right-0 top-1/2 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-[120px] mix-blend-screen md:h-[800px] md:w-[800px]"></div>

            <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-24">
              {/* TEXT (Order change for zigzag pattern) */}
              <div className="order-2 flex flex-col justify-center space-y-6 text-center md:order-1 md:text-left lg:items-end lg:text-right">
                <h3
                  style={{ fontFamily: "var(--font-clash-display)" }}
                  className="text-2xl font-semibold text-fuchsia-300 sm:text-3xl"
                >
                  {bizTitle}
                </h3>
                {/* Jouko line */}
                <div
                  data-brothers-line="jouko"
                  className="h-1 w-12 bg-fuchsia-500/50 mx-auto md:mx-0 lg:ml-auto lg:mr-0"
                ></div>
                <p className="max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                  {bizBody}
                </p>
              </div>

              {/* IMAGE + NAMEPLATE COMBO (PRESERVED) */}
              <div className="order-1 flex justify-center md:order-2 md:justify-start">
                <div className="relative w-[240px] sm:w-[280px] lg:w-[320px]">
                  <Image
                    src="/brothers/Jouko.png"
                    alt="Jouko – Digipajan bisnes & selkokieli"
                    width={520}
                    height={720}
                    className="h-auto w-full object-contain drop-shadow-2xl"
                  />

                  {/* Name Plate */}
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="w-full rounded-md bg-gradient-to-r from-fuchsia-500 via-fuchsia-600 to-fuchsia-700 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
                      <span className="block text-center text-[14px] sm:text-[30px] font-semibold uppercase tracking-[0.26em] text-zinc-50 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                        Pekka
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note Footer */}
        <div className="mt-32 border-t border-zinc-800/50 pt-8 text-center">
          <p className="mx-auto max-w-3xl text-sm text-zinc-500">{note}</p>
        </div>
      </div>
    </section>
  );
}
