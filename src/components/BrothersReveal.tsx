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
              start: "top 100%",  // section a bit more in view before starting
              end: "top 100%",    // fully visible around mid-top
              scrub: true,
            },
          }
        );
      }

      // --- SECONDARY HEADING: typewriter "paremmat nettisivut." ---
      if (secondary) {
        // assume the actual text is inside the inner span (your gradient span)
        const textSpan = secondary.querySelector("span") as HTMLElement | null;
        if (textSpan) {
          const fullText = textSpan.textContent ?? "";
          // start with empty text
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
                start: "top 90%", // starts after primary has begun
                end: "top 50%",   // finishes a bit later as you scroll
                scrub: true,
              },
              onUpdate() {
                const current = Math.round(typeObj.chars);
                textSpan.textContent = fullText.slice(0, current);
              },
              // make sure text is correct when you scroll past
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

      // --- CARDS: slide in from sides a bit later ---
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
              start: "top 70%",  // slightly after heading starts
              end: "top 15%",
              scrub: true,
            },
          }
        );
      }

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
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
