"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "gsap";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronsRight,
  StepForward,
} from "lucide-react";
import {
  DIGIPAJA_LOGO_VIEWBOX,
  DIGIPAJA_ICON_PATH,
  DIGIPAJA_WORDMARK_LETTERS,
  DIGIPAJA_OULU_LETTERS,
} from "../digipajaLogoPath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother);
}

type NavbarProps = {
  locale: "fi" | "en";
};

const NavbarCTA = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="
        hidden lg:inline-flex relative items-center justify-center
        px-8 py-4 rounded-sm cursor-pointer select-none
        border border-white/10
        bg-black/20 backdrop-blur-md
        text-xl font-medium text-white
        transition-all duration-300
        hover:text-white
        overflow-hidden group
      "
      style={{ fontFamily: 'var(--font-clash-display)' }}
    >
      {/* Subtle background sheen on hover */}
      <span
        className="
          absolute inset-0 bg-gradient-to-r
          from-transparent via-fuchsia-500/20 to-transparent
          translate-x-[-150%]
          group-hover:translate-x-[150%]
          transition-transform duration-700 ease-out
        "
      />

      {/* Border highlight on hover */}
      <span
        className="
          absolute inset-0 rounded-sm
          ring-0 ring-fuchsia-500/0
          group-hover:ring-[1.5px] group-hover:ring-fuchsia-500/60
          transition-all duration-300
        "
      />

      {/* Text */}
      <span className="relative z-10">{text}</span>
    </button>
  );
};




const ElegantLink = ({
  text,
  onClick,
  active,
}: {
  text: string;
  onClick: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative px-6 py-3 cursor-pointer transition-colors duration-300
        ${active ? "text-white" : "text-zinc-300 hover:text-zinc-200"}
      `}
      style={{ fontFamily: "var(--font-clash-display)" }}
    >
      {/* THE FIX: 
        1. Mask Container: Fixed height (h-9) and hidden overflow.
        2. Sliding Wrapper: Stacks both texts and slides up by -translate-y-9 (36px) on hover.
      */}
      <div className="relative h-9 overflow-hidden">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-9">
          {/* 1. Default Text (Visible initially) */}
          <span className="flex h-9 items-center justify-center text-xl font-medium leading-none">
            {text}
          </span>

          {/* 2. Hover Text (Sits exactly below the viewable area) */}
          <span className="flex h-9 items-center justify-center text-xl font-medium leading-none text-fuchsia-400">
            {text}
          </span>
        </div>
      </div>

      {/* Underline Animation */}
      <span
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-fuchsia-400 transition-all duration-500 ease-out
        group-hover:w-4/5 ${active ? "w-4/5" : ""}`}
      />
    </button>
  );
};

export default function Navbar({ locale }: NavbarProps) {
  const base = `/${locale}`;
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / height) * 100;
      setScrolled(scrollY > 50);
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const smoother = ScrollSmoother.get();
      const target = document.querySelector(`#${id}`) as HTMLElement | null;
      if (smoother && target) {
        smoother.scrollTo(target, true, "top top");
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  // --- LOGO WAVE & COLOR ANIMATION ---
  const handleLogoHover = () => {
    if (!logoRef.current) return;

    const letterGroups =
      logoRef.current.querySelectorAll<SVGGElement>(".logo-letter");
    const letterPaths =
      logoRef.current.querySelectorAll<SVGPathElement>(".logo-letter path");
    const icon = logoRef.current.querySelector<SVGGElement>(".logo-icon");

    gsap.killTweensOf([letterGroups, letterPaths, icon]);

    const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

    // Wave = groups move up/down
    tl.to(letterGroups, {
      y: -6,
      duration: 0.25,
      stagger: 0.04,
      yoyo: true,
      repeat: 1,
    });

    // Color wave = paths change fill in same stagger
    tl.to(
      letterPaths,
      {
        fill: "#d946ef",
        duration: 0.25,
        stagger: 0.04,
        yoyo: true,
        repeat: 1,
      },
      0 // start at same time as the move
    );

    // Icon wiggle
    tl.to(
      icon,
      {
        rotation: 8,
        scale: 1.05,
        transformOrigin: "50% 50%",
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      0
    );
  };

  const handleLogoLeave = () => {
    if (!logoRef.current) return;

    const letterGroups =
      logoRef.current.querySelectorAll<SVGGElement>(".logo-letter");
    const letterPaths =
      logoRef.current.querySelectorAll<SVGPathElement>(".logo-letter path");
    const icon = logoRef.current.querySelector<SVGGElement>(".logo-icon");

    gsap.killTweensOf([letterGroups, letterPaths, icon]);

    // Reset position
    gsap.to(letterGroups, {
      y: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    });

    // Reset color back to white
    gsap.to(letterPaths, {
      fill: "#ffffff",
      duration: 0.3,
      stagger: 0.02,
      ease: "power2.out",
    });

    gsap.to(icon, {
      rotation: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const navLinks = [
    { key: "whyUs", id: "why-us" },
    { key: "services", id: "services" },
    { key: "process", id: "process" },
    { key: "work", id: "work" },
    { key: "pricing", id: "pricing" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5
          ${
            scrolled
              ? "bg-[#050505]/80 backdrop-blur-xl py-3"
              : "bg-transparent py-6"
          }
        `}
      >
        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full bg-linear-to-r from-fuchsia-600 via-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(217,70,239,0.5)] transition-all duration-100 ease-out"
            style={{ width: "0%" }}
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* --- LOGO SECTION START --- */}
          <Link
            href={base}
            ref={logoRef}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            className="group relative z-50 flex items-center gap-4 py-1"
          >
            <svg
              viewBox={DIGIPAJA_LOGO_VIEWBOX}
              className="logo-svg h-10 sm:h-11 md:h-12 w-auto text-white"
            >
              {/* ICON (circle + dude) */}
              <g className="logo-icon">
                {DIGIPAJA_ICON_PATH.map((d, i) => (
                  <path key={i} d={d} fill="currentColor" />
                ))}
              </g>

              {/* DIGIPAJA wordmark */}
              <g className="logo-wordmark">
                {DIGIPAJA_WORDMARK_LETTERS.map((letter, i) => (
                  <g key={`dp-${i}`} className="logo-letter">
                    {letter.paths.map((d, j) => (
                      <path key={j} d={d} fill="currentColor" />
                    ))}
                  </g>
                ))}
              </g>

              {/* OULU wordmark */}
              <g className="logo-oulu">
                {DIGIPAJA_OULU_LETTERS.map((letter, i) => (
                  <g key={`ou-${i}`} className="logo-letter">
                    {letter.paths.map((d, j) => (
                      <path key={j} d={d} fill="currentColor" />
                    ))}
                  </g>
                ))}
              </g>
            </svg>
          </Link>

          {/* --- LOGO SECTION END --- */}

          {/* CENTER: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 cursor-pointer">
            {navLinks.map((link) => (
              <ElegantLink
                key={link.key}
                text={tNav(link.key)}
                onClick={() => scrollToSection(link.id)}
              />
            ))}
          </nav>

          {/* RIGHT: CTA & Menu Toggle */}
          <div className="flex items-center gap-4">
            <NavbarCTA
              text={tCta("primary")}
              onClick={() => scrollToSection("contact")}
            />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="z-50 flex h-10 w-10 items-center justify-center text-white md:hidden cursor-pointer"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU --- */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden
          ${menuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="absolute inset-0 opacity-20 bg-size-[24px_24px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
        <div className="relative flex h-full flex-col justify-center px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.id)}
                className="group flex items-center justify-between border-b border-white/10 pb-4 text-left cursor-pointer"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.5s ease-out",
                }}
              >
                <span
                  style={{ fontFamily: "var(--font-clash-display)" }}
                  className="text-4xl font-medium text-zinc-500 transition-colors group-hover:text-white"
                >
                  0{i + 1}{" "}
                  <span className="ml-4 text-white">{tNav(link.key)}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 text-zinc-700 transition-transform duration-300 group-hover:rotate-45 group-hover:text-fuchsia-500" />
              </button>
            ))}
          </div>
          <div
            className="mt-12"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease-out 0.6s",
            }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-white py-5 rounded-sm text-center text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              {tCta("primary")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
