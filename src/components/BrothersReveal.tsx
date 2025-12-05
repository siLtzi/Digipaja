"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely
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
      // --- SELECTORS ---
      const primary = el.querySelector<HTMLElement>("[data-brothers-primary]");
      const secondary = el.querySelector<HTMLElement>("[data-brothers-secondary]");
      
      const samuliCard = el.querySelector<HTMLElement>('[data-brothers-card="samuli"]');
      const joukoCard = el.querySelector<HTMLElement>('[data-brothers-card="jouko"]');

      // --- 1. HEADER REVEAL (Faster) ---
      if (primary) {
        gsap.fromTo(
          primary,
          { opacity: 0, y: 20, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7, // Was 1.0
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      }

      // --- 2. TYPEWRITER EFFECT ---
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
              duration: 1.0, // Was 1.5 (Speed up the typing)
              scrollTrigger: {
                trigger: secondary,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              onUpdate() {
                const current = Math.round(typeObj.chars);
                textSpan.textContent = fullText.slice(0, current);
              },
              onLeave() {
                textSpan.textContent = fullText;
              },
            }
          );
        }
      }

      // --- 3. BROTHER CARD ANIMATION FUNCTION ---
      const animateCard = (card: HTMLElement, direction: "left" | "right") => {
        const imagePart = card.querySelector("img");
        const badge = card.querySelector(".rounded-xl");
        const textContent = card.querySelectorAll("h3, p, .text-xs");
        const line = card.querySelector('[class*="h-[1px]"]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        const imageContainer = imagePart?.parentElement?.parentElement;

        // A. 3D Tilt Reveal (Snappier)
        if (imageContainer) {
          tl.fromTo(
            imageContainer, 
            { 
              opacity: 0, 
              y: 40, 
              rotationX: 10, 
              scale: 0.95,
              transformOrigin: "bottom center"
            },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0, 
              scale: 1,
              duration: 0.7, // Was 1.0
              ease: "power3.out" 
            }
          );
        }

        // B. Badge Slide-in (Quick Pop)
        if (badge) {
          tl.fromTo(
            badge,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, // Was 0.5
            "-=0.5" // Start almost immediately with image
          );
        }

        // C. Divider Line Drawing (Fast)
        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
        }

        // D. Text Content (Rapid Cascade)
        if (textContent.length) {
          tl.fromTo(
            textContent,
            { opacity: 0, x: direction === "left" ? -15 : 15, filter: "blur(5px)" },
            { 
              opacity: 1, 
              x: 0, 
              filter: "blur(0px)", 
              duration: 0.5, // Was 0.6
              stagger: 0.05, // Was 0.1 (Much tighter stagger)
              ease: "power2.out" 
            },
            "-=0.4"
          );
        }
      };

      // --- APPLY ANIMATIONS ---
      if (samuliCard) animateCard(samuliCard, "left");
      if (joukoCard) animateCard(joukoCard, "right");

    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}