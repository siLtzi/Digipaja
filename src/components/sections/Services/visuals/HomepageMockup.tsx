"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface HomepageMockupProps {
  title: string;
}

export function HomepageMockup({ title }: HomepageMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaArrowRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);
  const textBlock1Ref = useRef<HTMLDivElement>(null);
  const textBlock2Ref = useRef<HTMLDivElement>(null);
  const accentBlockRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoLetterRef = useRef<HTMLSpanElement>(null);

  // Split title into two lines
  const titleParts = title.split(" ");
  const firstLine = titleParts[0] || "";
  const secondLine = titleParts.slice(1).join(" ") || "";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA button - morphing shape (pill → rounded → sharp) and color
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          keyframes: [
            { borderRadius: "20px", scaleX: 1, background: "linear-gradient(to right, #ff8a3c, #ff6b1a)", duration: 0 },
            { borderRadius: "8px", scaleX: 1.05, background: "linear-gradient(to right, #3b82f6, #2563eb)", duration: 1.5 },
            { borderRadius: "2px", scaleX: 1.1, background: "linear-gradient(to right, #8b5cf6, #7c3aed)", duration: 1.5 },
          ],
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // CTA arrow - smooth slide
      if (ctaArrowRef.current) {
        gsap.to(ctaArrowRef.current, {
          x: 3,
          duration: 0.8,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Image block - morphs from square to landscape to portrait + color shift
      if (imageBlockRef.current) {
        gsap.to(imageBlockRef.current, {
          keyframes: [
            { scaleX: 1, scaleY: 1, borderRadius: "8px", x: 0, y: 0, background: "linear-gradient(to bottom right, rgba(113,113,122,0.5), rgba(63,63,70,0.3))", duration: 0 },
            { scaleX: 1.3, scaleY: 0.8, borderRadius: "4px", x: 5, y: -5, background: "linear-gradient(to bottom right, rgba(59,130,246,0.4), rgba(37,99,235,0.2))", duration: 2.5 },
            { scaleX: 0.85, scaleY: 1.2, borderRadius: "12px", x: -5, y: 5, background: "linear-gradient(to bottom right, rgba(139,92,246,0.4), rgba(124,58,237,0.2))", duration: 2.5 },
            { scaleX: 1, scaleY: 1, borderRadius: "8px", x: 0, y: 0, background: "linear-gradient(to bottom right, rgba(113,113,122,0.5), rgba(63,63,70,0.3))", duration: 2.5 },
          ],
          ease: "power1.inOut",
          repeat: -1,
        });
      }

      // Text block 1 - width changes + color
      if (textBlock1Ref.current) {
        gsap.to(textBlock1Ref.current, {
          scaleX: 0.7,
          x: -10,
          backgroundColor: "rgba(59,130,246,0.4)",
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Text block 2 - different rhythm + color
      if (textBlock2Ref.current) {
        gsap.to(textBlock2Ref.current, {
          scaleX: 1.2,
          x: 5,
          backgroundColor: "rgba(139,92,246,0.35)",
          duration: 2.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.5,
        });
      }

      // Accent block - floats and morphs + color
      if (accentBlockRef.current) {
        gsap.to(accentBlockRef.current, {
          keyframes: [
            { scale: 1, borderRadius: "8px", rotation: 0, background: "linear-gradient(to bottom right, #ff8a3c, #ff6b1a)", duration: 0 },
            { scale: 1.15, borderRadius: "50%", rotation: 45, background: "linear-gradient(to bottom right, #3b82f6, #2563eb)", duration: 2 },
            { scale: 0.9, borderRadius: "4px", rotation: -15, background: "linear-gradient(to bottom right, #8b5cf6, #7c3aed)", duration: 2 },
            { scale: 1, borderRadius: "8px", rotation: 0, background: "linear-gradient(to bottom right, #ff8a3c, #ff6b1a)", duration: 2 },
          ],
          ease: "power1.inOut",
          repeat: -1,
        });
        
        gsap.to(accentBlockRef.current, {
          y: -8,
          x: 5,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Logo - morphs between different logo styles (stays in place)
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          keyframes: [
            { borderRadius: "6px", background: "linear-gradient(135deg, #ff8a3c, #ff6b1a)", scale: 1, rotation: 0, duration: 0 },
            { borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", scale: 1.1, rotation: 0, duration: 1.5 },
            { borderRadius: "0px", background: "linear-gradient(135deg, #10b981, #059669)", scale: 0.95, rotation: 45, duration: 1.5 },
            { borderRadius: "12px 4px 12px 4px", background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", scale: 1.05, rotation: 0, duration: 1.5 },
            { borderRadius: "6px", background: "linear-gradient(135deg, #ff8a3c, #ff6b1a)", scale: 1, rotation: 0, duration: 1.5 },
          ],
          ease: "power2.inOut",
          repeat: -1,
        });
      }

      // Logo letter - subtle pulse
      if (logoLetterRef.current) {
        gsap.to(logoLetterRef.current, {
          scale: 1.15,
          duration: 1.2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pb-8 overflow-hidden bg-gradient-to-br from-[#0c0c14] to-[#080810]">
      {/* Browser Chrome */}
      <div className="w-full h-full flex flex-col">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1a1a24] border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-4 py-1.5 bg-[#0f0f18] rounded-lg">
            <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] text-zinc-500">https://</span>
            <span className="text-[11px] text-white font-medium">yrityksesi.fi</span>
          </div>
        </div>

        {/* Website Content */}
        <div className="flex-1 relative p-4 sm:p-5 overflow-hidden">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div 
                ref={logoRef}
                className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#ff8a3c] to-[#ff6b1a] flex items-center justify-center"
                style={{ willChange: "transform" }}
              >
                <span ref={logoLetterRef} className="text-white font-bold text-[10px]" style={{ willChange: "transform" }}>Y</span>
              </div>
              <span className="text-white font-semibold text-[10px] hidden sm:block">Yrityksesi</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              {["Etusivu", "Palvelut", "Yhteystiedot"].map((item, i) => (
                <span 
                  key={item} 
                  className={`text-[8px] sm:text-[9px] cursor-pointer transition-colors ${i === 0 ? "text-[#ff8a3c]" : "text-zinc-500"}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Main Layout - Hero section with left-aligned big title */}
          <div className="flex h-[calc(100%-2.5rem)]">
            {/* Left side - Title and content */}
            <div className="flex-1 flex flex-col justify-center pr-4">
              {/* Hero Title - Split into two lines */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#ff8a3c]/25 via-[#ff6b1a]/15 to-transparent blur-2xl rounded-full" />
                <h1 
                  style={{ fontFamily: "var(--font-goldman)" }}
                  className="relative leading-[0.85] tracking-tight"
                >
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,138,60,0.3)]">
                    {firstLine}
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent mt-0.5">
                    {secondLine}
                  </span>
                </h1>
              </div>
              
              {/* Morphing text blocks */}
              <div className="mt-4 space-y-1.5 origin-left">
                <div 
                  ref={textBlock1Ref}
                  className="h-1.5 bg-zinc-700/50 rounded-full w-[90%] origin-left"
                  style={{ willChange: "transform" }}
                />
                <div 
                  ref={textBlock2Ref}
                  className="h-1.5 bg-zinc-700/35 rounded-full w-[65%] origin-left"
                  style={{ willChange: "transform" }}
                />
              </div>

              {/* Morphing CTA Button */}
              <div className="mt-4">
                <div 
                  ref={ctaRef}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#ff8a3c] to-[#ff6b1a] origin-left"
                  style={{ willChange: "transform", borderRadius: "20px" }}
                >
                  <span className="text-[9px] sm:text-[10px] text-white font-semibold whitespace-nowrap">Ota yhteyttä</span>
                  <div ref={ctaArrowRef} style={{ willChange: "transform" }}>
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Morphing image block */}
            <div className="flex items-center justify-center w-[40%]">
              <div 
                ref={imageBlockRef}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-zinc-700/50 to-zinc-800/30 border border-white/10 flex items-center justify-center"
                style={{ willChange: "transform", borderRadius: "8px" }}
              >
                <svg className="w-8 h-8 text-zinc-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
