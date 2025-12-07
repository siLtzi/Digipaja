"use client";

import type { CSSProperties } from "react";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";

// --- FLOATING FIELD COMPONENT ---
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
    <div className="group relative mb-8 w-full">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          placeholder=" "
          className="peer block w-full appearance-none border-0 border-b border-white/10 bg-transparent px-0 py-2.5 text-sm text-white focus:border-white focus:outline-none focus:ring-0 font-light"
          style={{ fontFamily: "var(--font-poppins)" }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder=" "
          className="peer block w-full appearance-none border-0 border-b border-white/10 bg-transparent px-0 py-2.5 text-sm text-white focus:border-white focus:outline-none focus:ring-0 font-light"
          style={{ fontFamily: "var(--font-poppins)" }}
        />
      )}

      {/* Floating Wave Label (per-character) */}
      <label
        htmlFor={id}
        className={`
          pointer-events-none absolute top-3 left-0 flex origin-[0] text-sm text-zinc-500 duration-300
          peer-focus:[&>span]:-translate-y-6 peer-focus:[&>span]:scale-75 peer-focus:[&>span]:text-white
          peer-[:not(:placeholder-shown)]:[&>span]:-translate-y-6 peer-[:not(:placeholder-shown)]:[&>span]:scale-75
        `}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {letters.map((ch, idx) => (
          <span
            key={idx}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </label>

      {/* Active Line Animation */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-700 peer-focus:w-full" />
    </div>
  );
}

// --- UIVERSE-STYLE BUTTON, THEMED LIKE YOUR CURRENT ONE ---
const SubmitButton = ({ text }: { text: string }) => {
  const letters = text.split("");

  return (
    <button type="submit" className="button w-full max-w-none">
      {/* animated outline ring */}
      <span className="outline" />

      {/* default state */}
      <span className="state state--default">
        <span className="icon">
          <ArrowRight className="w-4 h-4" />
        </span>

        <p aria-hidden="true">
          {letters.map((ch, i) => (
            <span key={i} style={{ "--i": i + 1 } as CSSProperties}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </span>

      {/* sent state */}
      <span className="state state--sent">
        <span className="icon">
          <Check className="w-4 h-4" />
        </span>

        <p>
          {"Lähetetty".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i + 1 } as CSSProperties}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </span>

      {/* accessibility */}
      <span className="sr-only">{text}</span>
    </button>
  );
};

// --- MAIN COMPONENT ---
type ContactFormProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  email: string;
  phone: string;
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    helper: string;
  };
};

export default function ContactForm({
  eyebrow,
  title,
  subtitle,
  note,
  email,
  phone,
  labels,
}: ContactFormProps) {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-white/5 bg-transparent py-24 lg:py-32"
    >
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1fr] lg:gap-24">
        {/* --- LEFT COLUMN: Info --- */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-6">
            <span
              style={{ fontFamily: "var(--font-poppins)" }}
              className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 block"
            >
              {eyebrow}
            </span>

            <h2
              className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-clash-display)" }}
            >
              {title}
            </h2>

            <p
              className="max-w-xl text-lg leading-relaxed text-zinc-400 font-light"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {subtitle}
            </p>
          </div>

          <div className="space-y-5">
            {/* Email Card */}
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-5 rounded-sm border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg白/10 hover:border-white/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black text-zinc-400 transition-colors group-hover:text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p
                  className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Sähköposti
                </p>
                <p
                  className="text-lg font-medium text-white"
                  style={{ fontFamily: "var(--font-clash-display)" }}
                >
                  {email}
                </p>
              </div>
            </a>

            {/* Phone Card */}
            {phone && (
              <div className="flex items-center gap-5 rounded-sm border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black text-zinc-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Puhelin
                  </p>
                  <p
                    className="text-lg font-medium text-white"
                    style={{ fontFamily: "var(--font-clash-display)" }}
                  >
                    {phone}
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-white/10 pt-5">
              <p
                className="text-sm text-zinc-500 font-light italic"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {note}
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Form --- */}
        <div className="relative group">
          {/* Hard Light Border (Matches other sections) */}
          <div className="absolute -inset-[1px] bg-white/30 rounded-sm -z-10 blur-[1px] opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative h-full rounded-sm border border-white/10 bg-[#0A0A0A] p-8 md:p-10 shadow-2xl">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Projektista lyhyesti
                </p>
                <p className="text-xs text-zinc-400 font-light">
                  Vastataan yleensä yhden arkipäivän sisällä.
                </p>
              </div>
              <div className="hidden items-center gap-1.5 md:flex opacity-50">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
              </div>
            </div>

            <form method="POST" action="/api/contact" className="space-y-2">
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                <FloatingField
                  id="firstName"
                  name="firstName"
                  label={labels.firstName}
                  required
                />
                <FloatingField
                  id="lastName"
                  name="lastName"
                  label={labels.lastName}
                  required
                />
              </div>

              <FloatingField
                id="email"
                name="email"
                type="email"
                label={labels.email}
                required
              />

              <FloatingField
                id="phone"
                name="phone"
                type="tel"
                label={labels.phone}
              />

              <div className="mt-2">
                <FloatingField
                  id="message"
                  name="message"
                  label={labels.message}
                  textarea
                  required
                />
              </div>

              <div className="mt-8 space-y-4">
                <SubmitButton text={labels.submit} />

                <p
                  className="text-center text-[10px] text-zinc-600 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {labels.helper}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
