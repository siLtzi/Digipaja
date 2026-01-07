"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookieConsentProps = {
  locale: "fi" | "en";
};

const translations = {
  fi: {
    title: "Evästeet",
    description: "Käytämme evästeitä parantaaksemme käyttökokemusta.",
    acceptAll: "Hyväksy",
    acceptNecessary: "Vain välttämättömät",
    privacyPolicy: "Tietosuoja",
  },
  en: {
    title: "Cookies",
    description: "We use cookies to improve your experience.",
    acceptAll: "Accept",
    acceptNecessary: "Necessary only",
    privacyPolicy: "Privacy",
  },
};

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const t = translations[locale];

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay before showing
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: "all" | "necessary") => {
    const consentData = {
      type,
      timestamp: new Date().toISOString(),
      analytics: type === "all",
      marketing: type === "all",
      necessary: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consentData));
    
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[9999] transition-all duration-300 pointer-events-auto ${
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="sm:max-w-sm">
        <div className="relative overflow-hidden rounded-lg rounded-tl-none border border-white/10 bg-[#0a0a0c]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#ff8a3c] via-[#ff8a3c]/50 to-transparent" />
          
          {/* Sharp corner accent (top-left) */}
          <div className="absolute top-0 left-0 w-4 h-4">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ff8a3c]" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-[#ff8a3c]" />
          </div>

          {/* Corner accent (bottom-right) */}
          <div className="absolute bottom-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-gradient-to-t from-[#ff8a3c]/40 to-transparent" />
            <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-gradient-to-l from-[#ff8a3c]/40 to-transparent" />
          </div>

          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-sm font-bold text-white uppercase tracking-wider"
              >
                {t.title}
              </h3>
              <Link 
                href={`/${locale}/tietosuoja`}
                className="text-[10px] text-[#ff8a3c] hover:text-[#ffb380] underline underline-offset-2 transition-colors uppercase tracking-wider cursor-pointer"
              >
                {t.privacyPolicy}
              </Link>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              {t.description}
            </p>

            {/* Buttons - Hero CTA style */}
            <div className="flex gap-2">
              {/* Primary - Accept All */}
              <button
                onClick={() => handleAccept("all")}
                style={{ fontFamily: "var(--font-goldman)" }}
                className="group relative isolate flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff8a3c] transition-colors duration-300 hover:text-white cursor-pointer"
              >
                <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
                <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <span className="relative z-10">{t.acceptAll}</span>
              </button>

              {/* Secondary - Necessary Only */}
              <button
                onClick={() => handleAccept("necessary")}
                style={{ fontFamily: "var(--font-goldman)" }}
                className="group flex-1 flex items-center justify-center rounded-sm border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 backdrop-blur-sm transition-all hover:border-[#ff8a3c]/50 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <span>{t.acceptNecessary}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
