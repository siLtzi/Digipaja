"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Simple, TS-safe guard for Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationVariant =
  | "fadeUp"
  | "fadeIn"
  | "slideFromLeft"
  | "slideFromRight"
  | "scaleIn";

type AnimatedSectionProps = {
  children: React.ReactNode;
  delay?: number;
  variant?: AnimationVariant;
};

export default function AnimatedSection({
  children,
  delay = 0,
  variant = "fadeUp",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      let from: gsap.TweenVars = { opacity: 0 };
      let to: gsap.TweenVars = {
        opacity: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      };

      switch (variant) {
        case "fadeUp":
          from = { opacity: 0, y: 40 };
          to = { ...to, y: 0 };
          break;
        case "fadeIn":
          from = { opacity: 0 };
          to = { ...to };
          break;
        case "slideFromLeft":
          from = { opacity: 0, x: -60 };
          to = { ...to, x: 0 };
          break;
        case "slideFromRight":
          from = { opacity: 0, x: 60 };
          to = { ...to, x: 0 };
          break;
        case "scaleIn":
          from = { opacity: 0, scale: 0.9 };
          to = { ...to, scale: 1 };
          break;
      }

      gsap.fromTo(el, from, to);
    }, el);

    return () => ctx.revert();
  }, [delay, variant]);

  return <div ref={ref}>{children}</div>;
}
