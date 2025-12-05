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

// -------- Floating label helper --------

type FloatingFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
};

function FloatingField({
  id,
  name,
  label,
  type = "text",
  required,
  textarea,
}: FloatingFieldProps) {
  const letters = label.split("");

  return (
    <div className="floating-control">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          className=""
        />
      ) : (
        <input id={id} name={name} type={type} required={required} className="" />
      )}

      <label htmlFor={id}>
        {letters.map((ch, idx) => (
          <span
            key={idx}
            style={{ transitionDelay: `${idx * 25}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </label>
    </div>
  );
}

// -------- Contact section --------

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
              <p className="font-medium text-zinc-300">{m.helperText}</p>
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
              action="/api/contact"
              className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                <FloatingField
                  id="firstName"
                  name="firstName"
                  label={m.firstNameLabel}
                  required
                />
                <FloatingField
                  id="lastName"
                  name="lastName"
                  label={m.lastNameLabel}
                  required
                />
              </div>

              <FloatingField
                id="email"
                name="email"
                type="email"
                label={m.emailLabel}
                required
              />

              <FloatingField
                id="phone"
                name="phone"
                type="tel"
                label={m.phoneLabel}
              />

              <FloatingField
                id="message"
                name="message"
                label={m.messageLabel}
                textarea
                required
              />

              <div className="pt-4">
                <button
                  type="submit"
                  className="
                    inline-flex w-full items-center justify-center
                    rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-medium
                    text-zinc-950 shadow-sm ring-1 ring-zinc-900/10
                    transition-transform duration-150 hover:-translate-y-px hover:shadow-md
                    dark:bg-zinc-100 cursor-pointer
                  "
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
