"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type WhyUsRevealProps = {
  children: React.ReactNode;
};

export default function WhyUsReveal({ children }: WhyUsRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector<HTMLElement>("[data-whyus-eyebrow]");
      const title = el.querySelector<HTMLElement>("[data-whyus-title]");
      const subtitle = el.querySelector<HTMLElement>("[data-whyus-subtitle]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-whyus-card]");

      // ------------------------------------------
      // HEADLINE TIMELINE (time-based)
      // ------------------------------------------
      if (eyebrow || title || subtitle) {
        const headlineTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        if (eyebrow) {
          headlineTl.from(eyebrow, {
            opacity: 0,
            y: 24,
            letterSpacing: "0.4em",
            duration: 0.6,
            ease: "power3.out",
          });
        }

        if (title) {
          headlineTl.from(
            title,
            {
              opacity: 0,
              y: 40,
              skewY: 4,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        if (subtitle) {
          headlineTl.from(
            subtitle,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.15"
          );
        }
      }

      // ------------------------------------------
      // CARDS (MUCH STRONGER + SLOWER)
      // ------------------------------------------
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 140,               // bigger vertical travel
          scale: 0.94,          // slight zoom-in effect
          rotateX: 12,          // more noticeable 3D tilt
          transformOrigin: "center top",
          transformPerspective: 900,
          stagger: 0.18,        // more time between cards
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",   // start later (you scroll deeper into section)
            end: "top 5%",      // much longer scroll range -> slower feel
            scrub: 1.2,         // small lag = smooth, cinematic
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
