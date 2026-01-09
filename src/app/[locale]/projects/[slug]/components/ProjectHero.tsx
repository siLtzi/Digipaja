"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type ProjectHeroProps = {
  locale: "fi" | "en";
  title: string;
  category?: string;
  projectYear?: string;
  description?: string;
  clientName?: string;
  projectDuration?: string;
  liveUrl?: string;
  mainImage: string;
  translations: {
    breadcrumbHome: string;
    breadcrumbProjects: string;
    metaClient: string;
    metaDuration: string;
    metaWebsite: string;
    visitWebsite: string;
  };
};

export default function ProjectHero({
  locale,
  title,
  category,
  projectYear,
  description,
  clientName,
  projectDuration,
  liveUrl,
  mainImage,
  translations,
}: ProjectHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      const breadcrumb = (q(".hero-breadcrumb")[0] as HTMLElement | undefined) ?? null;
      const eyebrow = (q(".hero-eyebrow")[0] as HTMLElement | undefined) ?? null;
      const titleEl = (q(".hero-title")[0] as HTMLElement | undefined) ?? null;
      const descEl = (q(".hero-description")[0] as HTMLElement | undefined) ?? null;
      const metaCards = gsap.utils.toArray<HTMLElement>(q(".hero-meta-card"));
      const imageFrame = (q(".hero-image-frame")[0] as HTMLElement | undefined) ?? null;
      const corners = gsap.utils.toArray<HTMLElement>(q(".hero-image-corner"));
      const mask = (q(".hero-image-mask")[0] as HTMLElement | undefined) ?? null;
      const grid = (q(".hero-image-grid")[0] as HTMLElement | undefined) ?? null;

      // --- Reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (breadcrumb) gsap.set(breadcrumb, { opacity: 1, y: 0 });
        if (eyebrow) gsap.set(eyebrow, { opacity: 1, x: 0 });
        if (titleEl) gsap.set(titleEl, { opacity: 1, y: 0 });
        if (descEl) gsap.set(descEl, { opacity: 1, x: 0 });
        gsap.set(metaCards, { opacity: 1, y: 0, scale: 1 });
        if (imageFrame) gsap.set(imageFrame, { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 });
        gsap.set(corners, { scale: 1, opacity: 1 });
        if (mask) gsap.set(mask, { scaleY: 0 });
        if (grid) gsap.set(grid, { opacity: 0.25 });

        // no auto-pan
        if (imageInnerRef.current) gsap.set(imageInnerRef.current, { y: 0 });

        return () => {};
      });

      // --- Normal motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial
        if (breadcrumb) gsap.set(breadcrumb, { opacity: 0, y: -10, filter: "blur(8px)" });
        if (eyebrow) gsap.set(eyebrow, { opacity: 0, x: -18, filter: "blur(8px)" });
        if (titleEl) gsap.set(titleEl, { opacity: 1 }); // SplitText will handle
        if (descEl) gsap.set(descEl, { opacity: 0, x: -18, filter: "blur(10px)" });
        gsap.set(metaCards, { opacity: 0, y: 14, scale: 0.98, filter: "blur(10px)" });

        if (imageFrame) {
          gsap.set(imageFrame, {
            opacity: 0,
            x: 18,
            y: 10,
            scale: 0.985,
            rotateX: 6,
            transformPerspective: 900,
            transformOrigin: "50% 70%",
            willChange: "transform, opacity",
          });
        }

        gsap.set(corners, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
        if (mask) gsap.set(mask, { scaleY: 1, transformOrigin: "50% 0%" });
        if (grid) gsap.set(grid, { opacity: 0 });

        // Split title
        let split: SplitText | null = null;
        if (titleEl) {
          split = new SplitText(titleEl, { type: "words" });
          gsap.set(split.words, {
            opacity: 0,
            yPercent: 55,
            filter: "blur(10px)",
            willChange: "transform, opacity, filter",
          });
        }

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        if (breadcrumb) tl.to(breadcrumb, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 0);
        if (eyebrow) tl.to(eyebrow, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.45 }, 0.12);

        if (split?.words?.length) {
          tl.to(
            split.words,
            {
              opacity: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.03,
            },
            0.18
          );
        } else if (titleEl) {
          tl.fromTo(titleEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.18);
        }

        if (descEl) tl.to(descEl, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.55 }, 0.32);

        tl.to(
          metaCards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.38
        );

        if (imageFrame) {
          tl.to(
            imageFrame,
            { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, duration: 0.7, ease: "power3.out" },
            0.26
          );
        }

        if (mask) tl.to(mask, { scaleY: 0, duration: 0.75, ease: "power2.out" }, 0.34);
        if (grid) tl.to(grid, { opacity: 0.25, duration: 0.45, ease: "power2.out" }, 0.42);

        tl.to(
          corners,
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.06, ease: "back.out(2.2)" },
          0.55
        );

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          once: true,
          onEnter: () => tl.play(0),
        });

        // --- Auto-pan long screenshot inside a smaller viewport (no glare)
        const viewport = viewportRef.current;
        const inner = imageInnerRef.current;

        let panTween: gsap.core.Tween | null = null;
        let panST: ScrollTrigger | null = null;

        const buildPanTween = () => {
          if (!viewport || !inner) return;

          gsap.killTweensOf(inner);
          gsap.set(inner, { y: 0 });

          const vh = viewport.clientHeight;
          const ih = inner.getBoundingClientRect().height;
          const dist = Math.max(0, ih - vh);
          if (dist < 24) return;

          const duration = gsap.utils.clamp(7, 18, dist / 120); // ~120px/sec, clamped
          panTween = gsap.to(inner, { y: -dist, duration, ease: "none", paused: true });

          panST?.kill();
          panST = ScrollTrigger.create({
            trigger: viewport,
            start: "top 85%",
            end: "bottom 15%",
            onEnter: () => panTween?.restart(true),
            onEnterBack: () => panTween?.restart(true),
            onLeave: () => panTween?.pause(),
            onLeaveBack: () => panTween?.pause(),
            invalidateOnRefresh: true,
          });
        };

        // Build after first paint & on refresh (covers image load)
        const raf = requestAnimationFrame(() => {
          buildPanTween();
          ScrollTrigger.refresh();
        });

        const ro = new ResizeObserver(() => {
          buildPanTween();
        });

        if (viewport) ro.observe(viewport);
        if (inner) ro.observe(inner);

        // --- Hover polish (image frame + meta cards)
        const cleanups: Array<() => void> = [];

        if (imageFrame) {
          const onEnter = () => {
            gsap.to(imageFrame, { y: -4, scale: 1.01, duration: 0.18, ease: "power3.out" });
            gsap.to(imageFrame, {
              boxShadow: "0 0 0 1px rgba(255,138,60,0.14), 0 30px 90px rgba(0,0,0,0.55)",
              duration: 0.18,
              ease: "power3.out",
            });
            if (grid) gsap.to(grid, { opacity: 0.33, duration: 0.2, ease: "power2.out" });
          };
          const onLeave = () => {
            gsap.to(imageFrame, { y: 0, scale: 1, duration: 0.22, ease: "power3.out" });
            gsap.to(imageFrame, { boxShadow: "none", duration: 0.22, ease: "power3.out" });
            if (grid) gsap.to(grid, { opacity: 0.25, duration: 0.2, ease: "power2.out" });
          };
          imageFrame.addEventListener("mouseenter", onEnter);
          imageFrame.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            imageFrame.removeEventListener("mouseenter", onEnter);
            imageFrame.removeEventListener("mouseleave", onLeave);
          });
        }

        metaCards.forEach((card) => {
          const onEnter = () => {
            gsap.to(card, { y: -3, scale: 1.01, duration: 0.16, ease: "power3.out" });
            gsap.to(card, { boxShadow: "0 0 0 1px rgba(255,138,60,0.10), 0 16px 50px rgba(0,0,0,0.45)", duration: 0.16, ease: "power3.out" });
          };
          const onLeave = () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.2, ease: "power3.out" });
            gsap.to(card, { boxShadow: "none", duration: 0.2, ease: "power3.out" });
          };
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          });
        });

        return () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          st.kill();
          tl.kill();
          panST?.kill();
          panTween?.kill();
          split?.revert();
          cleanups.forEach((fn) => fn());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [title, description, clientName, projectDuration, liveUrl, mainImage] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050609] pt-32 pb-16 lg:pt-40 lg:pb-24"
    >
      {/* Background layers (dark, no glare stripes) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:52px_52px] opacity-25" />
        <div className="absolute left-0 top-0 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a3c]/10 blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[640px] w-[640px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#ff8a3c]/6 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_72%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="hero-breadcrumb mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link href={`/${locale}`} className="hover:text-[#ff8a3c] transition-colors">
            {translations.breadcrumbHome}
          </Link>
          <span className="text-zinc-700">/</span>
          <Link href={`/${locale}#references`} className="hover:text-[#ff8a3c] transition-colors">
            {translations.breadcrumbProjects}
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300">{title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="space-y-6">
            <span
              style={{ fontFamily: "var(--font-goldman)" }}
              className="hero-eyebrow text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold"
            >
              [ {category || "Project"} {projectYear && `• ${projectYear}`} ]
            </span>

            <h1
              style={{ fontFamily: "var(--font-goldman)" }}
              className="hero-title text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </h1>

            {description && (
              <div className="hero-description relative border-l-2 border-[#ff8a3c]/30 pl-6">
                <p className="text-lg text-zinc-300 leading-relaxed">{description}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {clientName && (
                <div className="hero-meta-card group relative rounded-sm border border-white/10 bg-white/[0.02] px-5 py-3 transition-colors hover:border-[#ff8a3c]/30 hover:bg-white/[0.04]">
                  <div className="absolute top-0 left-0 h-2 w-2 border-l border-t border-[#ff8a3c]/0 transition-colors group-hover:border-[#ff8a3c]" />
                  <div className="absolute bottom-0 right-0 h-2 w-2 border-r border-b border-[#ff8a3c]/0 transition-colors group-hover:border-[#ff8a3c]" />
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-1">
                    {translations.metaClient}
                  </p>
                  <p className="text-white font-medium">{clientName}</p>
                </div>
              )}

              {projectDuration && (
                <div className="hero-meta-card group relative rounded-sm border border-white/10 bg-white/[0.02] px-5 py-3 transition-colors hover:border-[#ff8a3c]/30 hover:bg-white/[0.04]">
                  <div className="absolute top-0 left-0 h-2 w-2 border-l border-t border-[#ff8a3c]/0 transition-colors group-hover:border-[#ff8a3c]" />
                  <div className="absolute bottom-0 right-0 h-2 w-2 border-r border-b border-[#ff8a3c]/0 transition-colors group-hover:border-[#ff8a3c]" />
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-1">
                    {translations.metaDuration}
                  </p>
                  <p className="text-white font-medium">{projectDuration}</p>
                </div>
              )}

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-meta-card group relative rounded-sm border border-[#ff8a3c]/30 bg-[#ff8a3c]/5 px-5 py-3 transition-colors hover:border-[#ff8a3c] hover:bg-[#ff8a3c]/10"
                >
                  <div className="absolute top-0 left-0 h-2 w-2 border-l border-t border-[#ff8a3c]" />
                  <div className="absolute bottom-0 right-0 h-2 w-2 border-r border-b border-[#ff8a3c]" />
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-1">
                    {translations.metaWebsite}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#ff8a3c] font-medium group-hover:text-white transition-colors">
                    {translations.visitWebsite}
                    <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="hero-image-frame relative overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0c] shadow-2xl transition-colors hover:border-[#ff8a3c]/20">
              {/* smaller viewport that reveals long page */}
              <div
                ref={viewportRef}
                className="relative h-[420px] sm:h-[480px] lg:h-[560px] overflow-hidden"
              >
                {/* reveal mask */}
                <div className="hero-image-mask pointer-events-none absolute inset-0 z-20 bg-[#050609]" />

                {/* subtle inner fades */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-[#0a0a0c] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#0a0a0c] to-transparent" />

                {/* image inner (this is what we pan) */}
                <div ref={imageInnerRef} className="absolute inset-x-0 top-0 will-change-transform">
                  <Image
                    src={mainImage}
                    alt={title}
                    width={1400}
                    height={2600}
                    className="w-full h-auto select-none"
                    priority
                    draggable={false}
                  />
                </div>

                {/* blueprint grid (no glare) */}
                <div
                  className="hero-image-grid pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,138,60,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,138,60,0.12) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />
              </div>

              {/* corners */}
              <div className="pointer-events-none absolute inset-0 z-30 opacity-80">
                <div className="hero-image-corner absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c]" />
                <div className="hero-image-corner absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-[#ff8a3c]" />
                <div className="hero-image-corner absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-[#ff8a3c]" />
                <div className="hero-image-corner absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-[#ff8a3c]" />
              </div>
            </div>

            {/* tiny tech note (optional vibe, remove if you dislike) */}
            <div className="mt-3 text-center text-xs text-zinc-500">
              <span className="text-[#ff8a3c]/80">▲</span> Auto-scroll preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
