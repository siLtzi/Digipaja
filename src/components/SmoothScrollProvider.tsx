"use client";

import { ReactNode, useLayoutEffect, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

    // Kill existing smoother first
    const existingSmoother = ScrollSmoother.get();
    if (existingSmoother) {
      existingSmoother.scrollTop(0);
      existingSmoother.kill();
    }

    // Force scroll to top on route change to prevent starting midway
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (!wrapperRef.current || !contentRef.current) return;

    if (isMobile) {
      document.body.style.overflow = "auto";
      return;
    }

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 0.8, // Slightly higher for smoother feel
      effects: false, // Disable data-speed effects - major performance gain
      normalizeScroll: false,
    });

    // Ensure we start at the top (unless there's a hash)
    if (!window.location.hash) {
      smoother.scrollTop(0);
    }

    // 🔥 FIX: ResizeObserver forces refresh if content height changes (e.g. form appearing)
    // Debounce to prevent excessive refreshes during animations
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300); // debounce 300ms
    });
    resizeObserver.observe(contentRef.current);

    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pathname]);

  // Secondary refresh trigger on URL change
  useLayoutEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Handle hash navigation
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      
      // Use a timeout to ensure everything is loaded and calculated
      const t = setTimeout(() => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          // Force a refresh to ensure accurate positions
          ScrollTrigger.refresh();
          
          // Try to find the element
          const target = document.querySelector(hash);
          if (target) {
            smoother.scrollTo(target, true, "top 120px");
          }
        }
      }, 1000); // 1 second delay to be safe
      
      return () => clearTimeout(t);
    }
  }, [pathname, searchParams]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}