"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookieConsentProps = {
  locale: "fi" | "en";
};

const translations = {
  fi: {
    title: "Käytämme evästeitä",
    description: "Käytämme evästeitä parantaaksemme sivuston toimivuutta ja käyttökokemusta. Voit hyväksyä kaikki evästeet tai vain välttämättömät.",
    acceptAll: "Hyväksy kaikki",
    acceptNecessary: "Vain välttämättömät",
    learnMore: "Lue lisää",
    privacyPolicy: "Tietosuojaseloste",
  },
  en: {
    title: "We use cookies",
    description: "We use cookies to improve site functionality and user experience. You can accept all cookies or only the necessary ones.",
    acceptAll: "Accept all",
    acceptNecessary: "Necessary only",
    learnMore: "Learn more",
    privacyPolicy: "Privacy Policy",
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
    
    // If accepting all, you could initialize analytics here
    // if (type === "all") { initAnalytics(); }
    
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 transition-all duration-300 ${
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]/95 backdrop-blur-xl shadow-[0_-10px_60px_rgba(0,0,0,0.5)]">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8">
            <div className="absolute top-0 left-0 w-4 h-[1px] bg-[#ff8a3c]/50" />
            <div className="absolute top-0 left-0 h-4 w-[1px] bg-[#ff8a3c]/50" />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8">
            <div className="absolute top-0 right-0 w-4 h-[1px] bg-[#ff8a3c]/50" />
            <div className="absolute top-0 right-0 h-4 w-[1px] bg-[#ff8a3c]/50" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {/* Icon */}
              <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ff8a3c]/10 border border-[#ff8a3c]/20">
                <svg className="h-6 w-6 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 
                    style={{ fontFamily: "var(--font-goldman)" }}
                    className="text-lg font-bold text-white mb-2"
                  >
                    {t.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {t.description}{" "}
                    <Link 
                      href={`/${locale}/tietosuoja`}
                      className="text-[#ff8a3c] hover:text-[#ffb380] underline underline-offset-2 transition-colors"
                    >
                      {t.privacyPolicy}
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleAccept("all")}
                    className="group relative overflow-hidden rounded-lg bg-[#ff8a3c] px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,138,60,0.3)]"
                  >
                    <span className="relative z-10">{t.acceptAll}</span>
                  </button>
                  <button
                    onClick={() => handleAccept("necessary")}
                    className="group relative overflow-hidden rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#ff8a3c]/50 hover:bg-white/10"
                  >
                    <span className="relative z-10">{t.acceptNecessary}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
