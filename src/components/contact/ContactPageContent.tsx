"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MultiStepContactForm from "@/components/contact/MultiStepContactForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

type ContactPageProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  translations: {
    steps: { contact: string; project: string; details: string };
    step1: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
    };
    step2: {
      title: string;
      subtitle: string;
      projectTypeLabel: string;
      budgetLabel: string;
    };
    step3: {
      title: string;
      subtitle: string;
      messageLabel: string;
      messagePlaceholder: string;
    };
    projectTypes: {
      landing: { label: string; description: string };
      website: { label: string; description: string };
      ecommerce: { label: string; description: string };
      webapp: { label: string; description: string };
    };
    budgets: {
      starter: string;
      growth: string;
      enterprise: string;
      custom: string;
    };
    buttons: { next: string; previous: string; submit: string; submitting: string };
    success: { title: string; message: string };
  };
  contactInfo: {
    email: string;
    phone: string;
    responseTime: string;
    responseTimeLabel: string;
  };
};

export default function ContactPageContent({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  translations,
  contactInfo,
}: ContactPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "fi";

  // Entrance animations
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-animate",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }
      );

      // Animate contact cards
      gsap.fromTo(
        ".contact-card",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#050609] pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/image/BG4.webp"
            alt=""
            fill
            className="object-cover object-center"
            quality={80}
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-[#050609]/80 to-[#050609]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_30%,#000_40%,transparent_100%)]" />

        {/* Ambient glow */}
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,138,60,0.08) 0%, rgba(255,138,60,0.02) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <div className="mb-16 lg:mb-20 text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="hero-animate inline-flex items-center gap-3 mb-6 opacity-0">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff8a3c] opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]"></span>
            </span>
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-[10px] sm:text-[12px] uppercase tracking-[0.2em] text-[#ff8a3c]"
            >
              [ {eyebrow} ]
            </span>
          </div>

          {/* Title */}
          <h1
            style={{ fontFamily: "var(--font-goldman)" }}
            className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0"
          >
            {title}{" "}
            <span className="bg-gradient-to-r from-[#ffb347] via-[#ff8a3c] to-[#ff6b00] bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate text-base sm:text-lg text-zinc-400 leading-relaxed opacity-0">
            {subtitle}
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* Form */}
          <MultiStepContactForm t={translations} />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Contact info card */}
            <div className="contact-card relative group overflow-hidden rounded-xl border border-[#ff8a3c]/20 bg-[#0a0b10]/90 p-6 backdrop-blur-sm opacity-0">
              <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c] opacity-50 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-[#ff8a3c] opacity-50 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:opacity-100" />

              <h3
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-lg font-bold text-white mb-4"
              >
                {locale === "fi" ? "Yhteystiedot" : "Contact Info"}
              </h3>

              <div className="space-y-4">
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="group/link flex items-center gap-4 p-3 rounded-lg bg-[#050609]/50 border border-zinc-800 transition-all duration-300 hover:border-[#ff8a3c]/30 hover:bg-[#0a0a0a]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a3c]/10 transition-colors duration-300 group-hover/link:bg-[#ff8a3c]/20">
                    <svg
                      className="h-5 w-5 text-[#ff8a3c]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">
                      Email
                    </span>
                    <span className="block text-sm font-medium text-white truncate group-hover/link:text-[#ff8a3c] transition-colors">
                      {contactInfo.email}
                    </span>
                  </div>
                </Link>

                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="group/link flex items-center gap-4 p-3 rounded-lg bg-[#050609]/50 border border-zinc-800 transition-all duration-300 hover:border-[#ff8a3c]/30 hover:bg-[#0a0a0a]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a3c]/10 transition-colors duration-300 group-hover/link:bg-[#ff8a3c]/20">
                    <svg
                      className="h-5 w-5 text-[#ff8a3c]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">
                      {locale === "fi" ? "Puhelin" : "Phone"}
                    </span>
                    <span className="block text-sm font-medium text-white truncate group-hover/link:text-[#ff8a3c] transition-colors">
                      {contactInfo.phone}
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Response time card */}
            <div className="contact-card relative overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0b10]/90 p-6 backdrop-blur-sm opacity-0">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a3c]/20 to-[#ff8a3c]/5 border border-[#ff8a3c]/20">
                  <svg
                    className="h-6 w-6 text-[#ff8a3c]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="text-sm font-bold text-white mb-1"
                  >
                    {contactInfo.responseTimeLabel}
                  </h4>
                  <p className="text-sm text-zinc-400">{contactInfo.responseTime}</p>
                </div>
              </div>
            </div>

            {/* Back to home */}
            <Link
              href={`/${locale}`}
              className="contact-card flex items-center justify-center gap-2 p-4 rounded-xl border border-zinc-800 bg-[#0a0b10]/50 text-zinc-400 transition-all duration-300 hover:border-zinc-700 hover:text-white opacity-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm">
                {locale === "fi" ? "Takaisin etusivulle" : "Back to home"}
              </span>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
