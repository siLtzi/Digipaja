import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ScrollCue from "./ScrollCue";
import WebsiteEstimator from "./WebsiteEstimator";

export default async function Hero({ locale }: { locale: "fi" | "en" }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section
      id="hero"
      className="
        relative min-h-screen w-full
        grid items-center gap-12
        px-[clamp(16px,8vw,128px)] py-20
        sm:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]
        overflow-hidden
      "
    >
      {/* Left side — main text */}
      <div className="relative z-10 text-left">
        <div
          aria-hidden
          className="
            pointer-events-none absolute -inset-x-6 -inset-y-6
            rounded-3xl
            bg-white/35 dark:bg-zinc-900/30
            backdrop-blur-xl
            border border-white/30 dark:border-white/10
            shadow-[0_8px_40px_rgba(0,0,0,0.15)]
            mask-[linear-gradient(to_bottom,black,black,black,transparent)]
          "
        />

        <h1
          style={{ fontFamily: "var(--font-clash-display)" }}
          className="relative text-6xl sm:text-8xl md:text-9xl font-normal leading-[1.1] tracking-tight max-w-[18ch] sm:max-w-[22ch]"
        >
          {t("title")}
        </h1>

        <p className="relative mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-lg">
          {t("subtitle")}
        </p>

        <div className="relative mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="rounded-2xl px-6 py-3 text-base font-medium
                       bg-zinc-900 text-white dark:bg-white dark:text-zinc-900
                       shadow hover:opacity-90 transition"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/work"
            className="rounded-2xl px-6 py-3 text-base font-medium
                       border border-zinc-300 dark:border-zinc-700
                       text-zinc-900 dark:text-zinc-100
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex justify-center items-center z-10">
        <WebsiteEstimator />
      </div>

      <ScrollCue />
    </section>
  );
}
