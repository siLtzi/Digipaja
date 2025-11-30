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

      // 2. Intro Animation (Runs on BOTH Mobile & Desktop)
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
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
        introTl.from(
          title,
          { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }
      if (subtitle) {
        introTl.from(
          subtitle,
          { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }
      introTl.from(
        track.children,
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // 3. Media Query Logic using gsap.matchMedia()
      const mm = gsap.matchMedia();

      // --- DESKTOP: Scroll-linked Pinning & Scrubbing ---
      mm.add("(min-width: 768px)", () => {
        // Reset CSS for desktop mode
        gsap.set(wrapper, { overflowX: "visible" });

        const getScrollAmount = () => {
          return -(track.scrollWidth - wrapper.clientWidth);
        };

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });
      });

      // --- MOBILE: Native Horizontal Swipe ---
      mm.add("(max-width: 767px)", () => {
        // 1. Reset GSAP transforms so the track sits naturally
        gsap.set(track, { x: 0 });
        
        // 2. Enable native horizontal scrolling on the wrapper
        // This allows the user to swipe left/right with their finger
        gsap.set(wrapper, { 
            overflowX: "auto", 
            overflowY: "hidden",
            // Hide scrollbar for cleaner look (optional)
            scrollbarWidth: "none", 
            "-ms-overflow-style": "none",
        });
        
        // Optional: Hide webkit scrollbar via inline styles if desired, 
        // typically better handled in global CSS but this works dynamically.
      });

    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}