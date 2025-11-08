"use client";
import { useTranslations } from "next-intl";
import Container from "./Container";

export default function Contact({ locale }: { locale: "fi" | "en" }) {
  const t = useTranslations("contact"); // ✅ client-safe hook

  return (
    <section
      id="contact"
      className="
        min-h-screen flex items-center
        px-[clamp(16px,8vw,128px)] py-20
        bg-transparent
      "
    >
      <Container>
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[--font-clash-display] text-5xl sm:text-6xl font-semibold leading-tight">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-md">
              {t("desc")}
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <input
              type="text"
              placeholder={t("name")}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
              required
            />
            <input
              type="email"
              placeholder={t("email")}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
              required
            />
            <textarea
              placeholder={t("message")}
              rows={5}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
              required
            />
            <button
              type="submit"
              className="mt-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
