"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type FooterProps = {
  data: {
    m: any;
    email: string;
    phone: string;
    navLinks: { href: string; label: string }[];
    currentYear: number;
  };
};

export default function FooterUI({ data }: FooterProps) {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // 1. Marquee Animation
  useGSAP(
    () => {
      if (!marqueeRef.current) return;
      
      const q = gsap.utils.selector(marqueeRef.current);
      const parts = q(".marquee-part");
      
      gsap.to(parts, {
        xPercent: -100,
        repeat: -1,
        duration: 25,
        ease: "linear",
      });
    },
    { scope: container }
  );

  // 2. Elastic String Animation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!pathRef.current) return;
    pathRef.current.setAttribute(
      "d", 
      `M0,0 Q${window.innerWidth / 2},${e.movementY * 2} ${window.innerWidth},0`
    );
  };

  const handleMouseLeave = () => {
     if (!pathRef.current) return;
     gsap.to(pathRef.current, {
        attr: { d: `M0,0 Q${window.innerWidth / 2},0 ${window.innerWidth},0` },
        duration: 1.5,
        ease: "elastic.out(1, 0.2)"
     });
  }

  // 3. Reveal Animations
  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(".footer-element", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
    });
  }, { scope: container });

  const { m, email, phone, navLinks, currentYear } = data;

  return (
    <footer 
        ref={container} 
        className="relative overflow-hidden bg-zinc-950 pt-24 pb-8 text-zinc-50"
    >
      {/* INTERACTIVE BORDER */}
      <div className="absolute top-0 left-0 w-full h-[100px] -mt-[50px] z-10 w-full cursor-row-resize">
         <div className="absolute inset-0" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <svg className="w-full h-full overflow-visible">
                <path 
                    ref={pathRef}
                    d={`M0,0 Q${typeof window !== 'undefined' ? window.innerWidth / 2 : 500},0 ${typeof window !== 'undefined' ? window.innerWidth : 1000},0`} 
                    stroke="#27272a" 
                    strokeWidth="1"
                    fill="none"
                />
            </svg>
         </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-[clamp(16px,8vw,80px)]">
        
        {/* TOP SECTION */}
        <div className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
            <div className="footer-element max-w-3xl">
                <h2 
                    className="text-5xl font-semibold tracking-tighter text-white sm:text-7xl md:text-8xl leading-[0.9]"
                    style={{ fontFamily: "var(--font-clash-display)" }}
                >
                    {m.contactTitle || "Ready to scale?"}
                </h2>
                
                <div className="mt-8 flex flex-wrap gap-4">
                    {/* Primary Button */}
                    <a 
                        href={`mailto:${email}`} 
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 px-8 py-4 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800"
                    >
                        <span 
                            className="relative z-10 text-sm font-medium uppercase tracking-wide text-white"
                            style={{ fontFamily: "var(--font-poppins)" }}
                        >
                            {m.contactLink || "Start a Project"}
                        </span>
                        <div className="absolute inset-0 -z-0 bg-zinc-800 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
                    </a>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-element flex flex-wrap gap-12 md:gap-20">
                <div className="flex flex-col gap-4">
                    <span 
                        className="text-sm font-semibold uppercase tracking-widest text-zinc-500"
                        style={{ fontFamily: "var(--font-clash-display)" }}
                    >
                        {m.navigationTitle}
                    </span>
                    <nav className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                className="text-sm text-zinc-400 transition-colors hover:text-white hover:underline hover:decoration-fuchsia-500 hover:underline-offset-4"
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                
                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <span 
                        className="text-sm font-semibold uppercase tracking-widest text-zinc-500"
                        style={{ fontFamily: "var(--font-clash-display)" }}
                    >
                        Contact
                    </span>
                    <div className="flex flex-col gap-3 text-sm text-zinc-400">
                        <a 
                            href={`mailto:${email}`} 
                            className="transition-colors hover:text-white"
                            style={{ fontFamily: "var(--font-poppins)" }}
                        >
                            {email}
                        </a>
                        {phone && (
                            <a 
                                href={`tel:${phone}`} 
                                className="transition-colors hover:text-white"
                                style={{ fontFamily: "var(--font-poppins)" }}
                            >
                                {phone}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* FULL WIDTH MARQUEE */}
      <div className="footer-element w-full border-t border-b border-zinc-900/50 bg-zinc-950 py-6 mb-8">
            <div className="w-full overflow-hidden opacity-20 hover:opacity-40 transition-opacity duration-500">
                <div ref={marqueeRef} className="flex whitespace-nowrap">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="marquee-part flex items-center pr-12">
                            <span 
                                className="text-6xl font-bold uppercase tracking-tight text-zinc-500 md:text-8xl"
                                style={{ fontFamily: "var(--font-clash-display)" }}
                            >
                                {m.companyName} — Digital Agency —
                            </span>
                        </div>
                    ))}
                </div>
            </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mx-auto max-w-7xl px-[clamp(16px,8vw,80px)]">
         <div className="footer-element flex flex-col items-center justify-between gap-4 text-xs text-zinc-600 sm:flex-row">
                <p style={{ fontFamily: "var(--font-poppins)" }}>
                    © {currentYear} {m.companyName}. {m.rights}
                </p>
                <div 
                    className="flex gap-6"
                    style={{ fontFamily: "var(--font-poppins)" }}
                >
                    <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-zinc-400 transition-colors">Terms</Link>
                    <span className="text-zinc-800">|</span>
                    <span className="text-zinc-500">{m.madeIn}</span>
                </div>
            </div>
      </div>
    </footer>
  );
}