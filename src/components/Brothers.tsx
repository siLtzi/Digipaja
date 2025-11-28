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

  // Split title at ":" to style primary / secondary differently
  const split = title.split(":");
  const primaryTitle = split.length > 1 ? `${split[0]}:` : title;
  const secondaryTitle =
    split.length > 1 ? split.slice(1).join(":").trim() : "";

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

        {/* Title */}
        <div className="mt-4 max-w-3xl space-y-4">
          <h2
            style={{ fontFamily: "var(--font-clash-display)" }}
            className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
          >
            <span
              data-brothers-primary
              className="block text-sm font-medium uppercase tracking-[0.22em] text-zinc-400 sm:text-xs mb-2"
            >
              {primaryTitle}
            </span>

            {secondaryTitle ? (
              <span
                data-brothers-secondary
                className="block text-3xl sm:text-4xl lg:text-5xl"
              >
                <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-zinc-100 bg-clip-text text-transparent">
                  {secondaryTitle}
                </span>
              </span>
            ) : (
              <span data-brothers-secondary className="block">
                {title}
              </span>
            )}
          </h2>

          <p className="text-sm text-zinc-300 sm:text-base">{subtitle}</p>
        </div>

        {/* Two brothers */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-stretch">
          {/* Samuli card */}
          <div
            data-brothers-card="samuli"
            className="relative rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-[0_18px_45px_rgba(0,0,0,0.45)] px-6 py-10 sm:px-10 overflow-visible flex items-center"
          >
            {/* TEXT */}
            <div className="flex-1 pl-28 sm:pl-36 md:pl-40 space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold text-sky-200">
                {techTitle}
              </h3>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                {techBody}
              </p>
            </div>

            {/* IMAGE */}
            <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-56">
              <Image
                src="/brothers/samuli.png"
                alt="Samuli – Digipajan tekninen veljeskunta"
                fill
                className="object-contain object-bottom scale-[1.00]"
              />
            </div>
          </div>

          {/* Jouko card */}
          <div
            data-brothers-card="jouko"
            className="relative rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-[0_18px_45px_rgba(0,0,0,0.45)] px-6 py-10 sm:px-10 overflow-visible flex items-center"
          >
            {/* TEXT */}
            <div className="flex-1 pr-28 sm:pr-36 md:pr-40 space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold text-fuchsia-200">
                {bizTitle}
              </h3>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                {bizBody}
              </p>
            </div>

            {/* IMAGE */}
            <div className="pointer-events-none absolute bottom-[24px] right-[-79px] h-80 w-56">

              <Image
                src="/brothers/jouko.png"
                alt="Jouko – Digipajan bisnes & selkokieli"
                fill
                className="object-contain object-bottom scale-[1.15] drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)]"

              />
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
