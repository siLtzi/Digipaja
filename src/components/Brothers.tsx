import Image from "next/image";
import { brothersSettingsQuery } from "@/sanity/queries";
import { sanityClient } from "@/sanity/config";

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

export default async function Brothers({ locale }: { locale: "fi" | "en" }) {
  // 1) base texts from i18n
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.brothers;

  // 2) optional overrides from Sanity (FI only for now)
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

  return (
    <section
      id="about"
      className="relative border-t border-zinc-800 bg-zinc-950/95"
    >
      <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-20 lg:py-24">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400">
          {eyebrow}
        </p>

        {/* Title & subtitle */}
        <div className="mt-4 max-w-3xl space-y-4">
          <h2
            style={{ fontFamily: "var(--font-clash-display)" }}
            className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="text-sm text-zinc-300 sm:text-base">{subtitle}</p>
        </div>

        {/* Two-column cards */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 relative">
          {/* Samuli image (behind card) */}
          <Image
            src="/brothers/samuli.png"
            alt="Samuli"
            width={600}
            height={600}
            className="
      pointer-events-none
      absolute 
      -left-10 
      -top-20 
      w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]
      opacity-95
      object-contain 
      drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]
      z-0
    "
          />

          {/* Tech brother card */}
          <div className="relative z-10 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="relative space-y-4">
              <h3 className="text-lg font-semibold text-sky-200">
                {techTitle}
              </h3>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {techBody}
              </p>
            </div>
          </div>

          {/* Jouko image (behind card) */}
          <Image
            src="/brothers/jouko.png"
            alt="Jouko"
            width={600}
            height={600}
            className="
      pointer-events-none
      absolute 
      -right-10 
      -top-20 
      w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]
      opacity-95
      object-contain 
      drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]
      z-0 
    "
          />

          {/* Biz brother card */}
          <div className="relative z-10 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div className="absolute -left-20 -bottom-16 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="relative space-y-4">
              <h3 className="text-lg font-semibold text-fuchsia-200">
                {bizTitle}
              </h3>
              <p className="text-sm text-zinc-200 leading-relaxed">{bizBody}</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-8 max-w-3xl text-xs text-zinc-400 sm:text-sm">
          {note}
        </p>
      </div>
    </section>
  );
}
