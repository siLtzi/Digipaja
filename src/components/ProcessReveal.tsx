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
      // 1. Select elements
      const section = el.querySelector<HTMLElement>("[data-process-section]");
      const wrapper = el.querySelector<HTMLElement>("[data-process-wrapper]");
      const track = el.querySelector<HTMLElement>("[data-process-track]");
      
      const eyebrow = el.querySelector<HTMLElement>("[data-process-eyebrow]");
      const title = el.querySelector<HTMLElement>("[data-process-title]");
      const subtitle = el.querySelector<HTMLElement>("[data-process-subtitle]");

      if (!section || !wrapper || !track) return;

      // 2. Intro Animation (Independent of Scroll Scrub)
      // This makes the text appear nicely as you arrive, without waiting for the pin
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%", // Starts animating when section is 60% up the viewport
          toggleActions: "play none none reverse",
        },
      });

      if (eyebrow) {
        introTl.from(eyebrow, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      if (title) {
        introTl.from(title, { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" }, "-=0.4");
      }
      if (subtitle) {
        introTl.from(subtitle, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4");
      }
      introTl.from(track.children, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out"
      }, "-=0.4");


      // 3. Horizontal Scroll Logic
      
      // Calculate how much actual overflow exists
      // If the track is 2000px and the wrapper is 1000px, we need to move -1000px
      const getScrollAmount = () => {
        return -(track.scrollWidth - wrapper.clientWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none", // Linear movement is required for sync with scroll
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top", // Pin immediately when section hits top
        end: () => `+=${Math.abs(getScrollAmount())}`, // Scroll length matches track length exactly
        pin: true,
        animation: tween,
        scrub: 1, // Smoothness (0 = instant, 1 = slight inertia)
        invalidateOnRefresh: true, // Recalculates sizes on window resize
      });

    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}