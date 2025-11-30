"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ServicesRevealProps = {
  children: React.ReactNode;
};

export default function ServicesReveal({ children }: ServicesRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector<HTMLElement>("[data-services-eyebrow]");
      const title = el.querySelector<HTMLElement>("[data-services-title]");
      const subtitle = el.querySelector<HTMLElement>("[data-services-subtitle]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-services-card]");

      // -----------------------------
      // HEADLINE – time-based
      // -----------------------------
      if (eyebrow || title || subtitle) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 75%", // when section is nicely entering
            toggleActions: "play none none reverse",
          },
        });

        if (eyebrow) {
          tl.from(eyebrow, {
            opacity: 0,
            y: 24,
            letterSpacing: "0.3em",
            duration: 0.5,
            ease: "power3.out",
          });
        }

        if (title) {
          tl.from(
            title,
            {
              opacity: 0,
              y: 40,
              skewY: 4,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        if (subtitle) {
          tl.from(
            subtitle,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.15"
          );
        }
      }

      // -----------------------------
      // CARDS – staggered pop-in
      // -----------------------------
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          rotateX: 6,
          transformOrigin: "center top",
          transformPerspective: 900,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "top 20%",
            scrub: 1.1, // slight lag for smoothness
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
