"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProcessRevealProps = {
  children: React.ReactNode;
};

export default function ProcessReveal({ children }: ProcessRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector<HTMLElement>("[data-process-eyebrow]");
      const title = el.querySelector<HTMLElement>("[data-process-title]");
      const subtitle = el.querySelector<HTMLElement>("[data-process-subtitle]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]");

      if (!steps.length) return;

      // Pinned, scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=2000", // how long user is "stuck" here – increase for longer scroll
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Headline comes in first
      if (eyebrow) {
        tl.from(eyebrow, {
          opacity: 0,
          y: 30,
          letterSpacing: "0.35em",
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (title) {
        tl.from(
          title,
          {
            opacity: 0,
            y: 50,
            skewY: 5,
            duration: 0.8,
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
            y: 25,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      // Then reveal each step one by one as scroll continues
      steps.forEach((step, index) => {
        tl.from(
          step,
          {
            opacity: 0,
            y: 100,
            scale: 0.94,
            filter: "blur(10px)",
            duration: 0.8,
            ease: "power3.out",
          },
          // space them out along the scroll
          "+=0.4"
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
