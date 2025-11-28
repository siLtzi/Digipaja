import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";

type ContactMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
  helperText: string;
};

type MessagesFile = {
  contact: ContactMessages;
};

type ContactSettings = {
  contactEyebrow_fi?: string | null;
  contactTitle_fi?: string | null;
  contactSubtitle_fi?: string | null;
  contactNote_fi?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export default async function Contact({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.contact;

  const cms =
    (await sanityClient.fetch<ContactSettings | null>(
      contactSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.contactEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.contactTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.contactSubtitle_fi || m.subtitle : m.subtitle;
  const note = isFi ? cms.contactNote_fi || m.note : m.note;

  const email = cms.contactEmail || "hello@digipaja.fi";
  const phone = cms.contactPhone || "";

  return (
    <section
      id="contact"
      className="relative border-t border-zinc-900 bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl px-[clamp(16px,8vw,80px)] py-20 lg:py-24">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-400">
          {eyebrow}
        </p>

        <div className="mt-4 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
          {/* Left: heading / copy */}
          <div className="max-w-2xl space-y-4">
            <h2
              style={{ fontFamily: "var(--font-clash-display)" }}
              className="text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="text-sm text-zinc-300 sm:text-base">{subtitle}</p>
            <p className="pt-4 text-xs text-zinc-400 sm:text-sm">{note}</p>

            <div className="mt-6 space-y-1 text-xs text-zinc-400 sm:text-sm">
              <p className="font-medium text-zinc-300">
                {m.helperText}
              </p>
              <p>
                <span className="font-semibold text-zinc-200">Sähköposti: </span>
                <a
                  href={`mailto:${email}`}
                  className="underline underline-offset-2 hover:text-fuchsia-300"
                >
                  {email}
                </a>
              </p>
              {phone && (
                <p>
                  <span className="font-semibold text-zinc-200">
                    Puhelin:{" "}
                  </span>
                  <span>{phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Right: form */}
          <div className="max-w-md">
            <form
              method="POST"
              action="/api/contact" // you can implement this route or change later
              className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-medium text-zinc-300"
                  >
                    {m.firstNameLabel}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none ring-0 placeholder:text-zinc-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-medium text-zinc-300"
                  >
                    {m.lastNameLabel}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-zinc-300"
                >
                  {m.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium text-zinc-300"
                >
                  {m.phoneLabel}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-zinc-300"
                >
                  {m.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/40"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-950 shadow-sm ring-1 ring-zinc-900/10 transition hover:-translate-y-[1px] hover:shadow-md dark:bg-zinc-100 cursor-pointer"
                >
                  {m.submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
