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

    const existingSmoother = ScrollSmoother.get();
    if (existingSmoother) {
      existingSmoother.scrollTop(0);
      existingSmoother.kill();
    }
    
    ScrollTrigger.getAll().forEach((st) => st.kill());

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    if (!wrapperRef.current || !contentRef.current) return;

    if (isMobile) {
      document.body.style.overflow = "auto";
      return;
    }

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 0.8,
      effects: false,
      normalizeScroll: false,
    });

    if (!window.location.hash) {
      smoother.scrollTop(0);
      requestAnimationFrame(() => {
        smoother.scrollTop(0);
      });
    }

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    });
    resizeObserver.observe(contentRef.current);

    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      
      const t = setTimeout(() => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          ScrollTrigger.refresh();
          
          const target = document.querySelector(hash);
          if (target) {
            smoother.scrollTo(target, true, "top 120px");
          }
        }
      }, 1000);
      
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