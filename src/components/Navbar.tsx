"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react"; // Import ArrowRight for the button
import {
  DIGIPAJA_LOGO_VIEWBOX,
  DIGIPAJA_ICON_PATH,
  DIGIPAJA_WORDMARK_LETTERS,
  DIGIPAJA_OULU_LETTERS,
} from "./digipajaLogoPath";

gsap.registerPlugin(ScrollSmoother);

type NavbarProps = {
  locale: "fi" | "en";
};

// Define the brand gradient used in the hero section
const BRAND_GRADIENT = "from-purple-500 via-fuchsia-500 to-cyan-500";
// The exact bezier curve for snappy animations
const CUBIC_BEZIER = "[transition-timing-function:cubic-bezier(0.23,1,0.32,1)]";

// --- COMPONENT: Sleek Nav Link ---
const NavLink = ({
  text,
  onClick,
  index,
}: {
  text: string;
  onClick: () => void;
  index: number;
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden px-4 py-2"
    >
      <div className="relative z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-all duration-300 group-hover:text-white">
        <span className={`text-[9px] text-zinc-600 transition-all duration-300 group-hover:text-fuchsia-400`}>
          0{index + 1}.
        </span>
        {text}
      </div>
      <span className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r ${BRAND_GRADIENT} transition-transform duration-300 ease-out group-hover:scale-x-100`} />
      <span className="absolute inset-0 -z-10 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-md"></span>
    </button>
  );
};

// --- COMPONENT: Animated Navbar Button (Circle Expand + Arrow Swap) ---
const ContactButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center gap-2 overflow-hidden
        
        /* Size adapted for Navbar (smaller than Hero) */
        px-6 py-2.5 
        rounded-[100px] 
        bg-transparent
        
        /* Typography */
        text-xs font-bold uppercase tracking-widest text-zinc-100
        
        /* Border Simulation (Shadow) */
        shadow-[0_0_0_2px_theme('colors.zinc.200/20')]
        
        /* Transition */
        transition-all duration-[600ms] ${CUBIC_BEZIER}
        
        /* Hover States */
        hover:rounded-[12px] 
        hover:text-white 
        hover:shadow-[0_0_0_12px_transparent]
        
        /* Active State */
        active:scale-95
        active:shadow-[0_0_0_4px_theme('colors.fuchsia.500')]
      `}
    >
      {/* 1. Expanding Circle Background */}
      <span
        className={`
          absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2
          h-2 w-2 rounded-full bg-gradient-to-r ${BRAND_GRADIENT} opacity-0
          transition-all duration-[800ms] ${CUBIC_BEZIER}
          group-hover:h-[200px] group-hover:w-[200px] group-hover:opacity-100
        `}
      />

      {/* 2. Text (Shifts Right) */}
      <span className={`relative z-10 transition-all duration-[800ms] ${CUBIC_BEZIER} group-hover:translate-x-2`}>
        {label}
      </span>

      {/* 3. Arrow 1 (Exits Right) */}
      <ArrowRight
        className={`
          absolute right-3 z-10 h-3.5 w-3.5
          transition-all duration-[800ms] ${CUBIC_BEZIER}
          group-hover:right-[-50%]
        `}
      />

      {/* 4. Arrow 2 (Enters from Left) */}
      <ArrowRight
        className={`
          absolute left-[-50%] z-10 h-3.5 w-3.5
          transition-all duration-[800ms] ${CUBIC_BEZIER}
          group-hover:left-3
        `}
      />
    </button>
  );
};

export default function Navbar({ locale }: NavbarProps) {
  const base = `/${locale}`;
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  // State
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  // 1. Scroll Detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // 2. GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoRef.current) {
        const svg = logoRef.current;
        const iconPaths = svg.querySelectorAll(".logo-icon path");
        const letterGroups = svg.querySelectorAll(".logo-wordmark .logo-letter");

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        gsap.set([iconPaths, letterGroups], { opacity: 0 });

        tl.fromTo(svg, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });

        if (iconPaths.length) {
          tl.fromTo(
            iconPaths,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05 },
            "-=0.6"
          );
        }
        if (letterGroups.length) {
          tl.fromTo(
            letterGroups,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.03 },
            "-=0.4"
          );
        }
      }
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const selector = `#${id}`;
    const smoother = ScrollSmoother.get();
    const target = document.querySelector(selector) as HTMLElement | null;

    if (smoother && target) {
      smoother.scrollTo(target, true, "top top");
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (typeof window !== "undefined") {
      const newUrl = `${base}#${id}`;
      window.history.pushState(null, "", newUrl);
    }
    setMenuOpen(false);
  };

  const links = [
    { key: "whyUs", id: "why-us" },
    { key: "process", id: "process" },
    { key: "services", id: "services" },
    { key: "work", id: "work" },
    { key: "pricing", id: "pricing" },
  ];

  return (
    <header
      ref={navRef}
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-[#050505]/80 py-3 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent py-6 border-b border-transparent"
        }
      `}
    >
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-12">
        
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link href={base} className="group relative z-10 block">
            <svg
              ref={logoRef}
              viewBox={DIGIPAJA_LOGO_VIEWBOX}
              className="h-10 w-auto text-zinc-300 transition-colors duration-300 group-hover:text-white"
            >
              <g className="logo-icon">
                {DIGIPAJA_ICON_PATH.map((d, i) => (
                  <path key={i} d={d} fill="currentColor" />
                ))}
              </g>
              <g className="logo-wordmark">
                {DIGIPAJA_WORDMARK_LETTERS.map((l, i) => (
                  <g key={i} className="logo-letter">
                    {l.paths.map((d, j) => (
                      <path key={j} d={d} fill="currentColor" />
                    ))}
                  </g>
                ))}
              </g>
              <g className="logo-subtext">
                {DIGIPAJA_OULU_LETTERS.map((l, i) =>
                  l.paths.map((d, j) => (
                    <path key={`s-${i}-${j}`} d={d} fill="currentColor" />
                  ))
                )}
              </g>
            </svg>
          </Link>
        </div>

        {/* CENTER: Sleek Navigation */}
        <nav className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-[#0A0A0A]/50 p-1 backdrop-blur-md">
          {links.map((link, i) => (
            <NavLink
              key={link.key}
              text={tNav(link.key)}
              index={i}
              onClick={() => scrollToSection(link.id)}
            />
          ))}
        </nav>

        {/* RIGHT: Animated Contact Button */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <ContactButton 
              onClick={() => scrollToSection("contact")} 
              label={tCta("primary")} 
            />
          </div>

          {/* Mobile Burger (Sleeker, rounded caps) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={`h-[2px] w-6 rounded-full bg-zinc-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px] bg-white" : "group-hover:bg-white"}`} />
            <span className={`h-[2px] w-6 rounded-full bg-zinc-300 transition-all duration-300 ${menuOpen ? "opacity-0" : "group-hover:bg-white"}`} />
            <span className={`h-[2px] w-6 rounded-full bg-zinc-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px] bg-white" : "group-hover:bg-white"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Sleek Overlay) */}
      <div 
        className={`
            fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden
            ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex h-full flex-col justify-center px-12">
            <nav className="flex flex-col gap-4">
                {links.map((link, i) => (
                <button
                    key={link.key}
                    onClick={() => scrollToSection(link.id)}
                    className="group flex items-center gap-4 text-left text-2xl font-bold uppercase tracking-widest text-zinc-500 transition-all hover:text-white"
                >
                    <span className={`text-sm font-bold bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent opacity-50 group-hover:opacity-100 transition-opacity`}>0{i + 1}.</span>
                    {tNav(link.key)}
                </button>
                ))}
            </nav>
            <div className="mt-12 flex justify-center">
                 {/* Mobile button adapted */}
                 <ContactButton 
                    onClick={() => scrollToSection("contact")} 
                    label={tCta("primary")} 
                 />
            </div>
        </div>
      </div>
    </header>
  );
}