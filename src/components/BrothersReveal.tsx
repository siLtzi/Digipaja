"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type BrothersRevealProps = {
  children: React.ReactNode;
};

export default function BrothersReveal({ children }: BrothersRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const primary = el.querySelector<HTMLElement>("[data-brothers-primary]");
      const secondary = el.querySelector<HTMLElement>("[data-brothers-secondary]");
      const samuli = el.querySelector<HTMLElement>('[data-brothers-card="samuli"]');
      const jouko = el.querySelector<HTMLElement>('[data-brothers-card="jouko"]');

      // NEW: lines
      const samuliLine = el.querySelector<HTMLElement>('[data-brothers-line="samuli"]');
      const joukoLine = el.querySelector<HTMLElement>('[data-brothers-line="jouko"]');

      // --- PRIMARY HEADING: "Kaksi veljestä, yksi tavoite:" ---
      if (primary) {
        gsap.fromTo(
          primary,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 100%",
              end: "top 100%",
              scrub: true,
            },
          }
        );
      }

      // --- SECONDARY HEADING: typewriter "paremmat nettisivut." ---
      if (secondary) {
        const textSpan = secondary.querySelector("span") as HTMLElement | null;
        if (textSpan) {
          const fullText = textSpan.textContent ?? "";
          textSpan.textContent = "";

          const typeObj = { chars: 0 };

          gsap.fromTo(
            typeObj,
            { chars: 0 },
            {
              chars: fullText.length,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 30%",
                scrub: true,
              },
              onUpdate() {
                const current = Math.round(typeObj.chars);
                textSpan.textContent = fullText.slice(0, current);
              },
              onLeave() {
                textSpan.textContent = fullText;
              },
              onLeaveBack() {
                textSpan.textContent = "";
              },
            }
          );
        }
      }

      // --- SAMULI CARD ---
      if (samuli) {
        gsap.fromTo(
          samuli,
          { opacity: 0, x: -60, y: 40 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 40%",
              end: "top 1%",
              scrub: true,
            },
          }
        );
      }

      // --- JOUKO CARD ---
      if (jouko) {
        gsap.fromTo(
          jouko,
          { opacity: 0, x: 60, y: 40 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "top 15%",
              scrub: true,
            },
          }
        );
      }

      // --- SAMULI LINE: stretch from left ---
      if (samuliLine) {
        gsap.fromTo(
          samuliLine,
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: samuliLine,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- JOUKO LINE: stretch from right ---
      if (joukoLine) {
        gsap.fromTo(
          joukoLine,
          { scaleX: 0, opacity: 0, transformOrigin: "right center" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: joukoLine,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
