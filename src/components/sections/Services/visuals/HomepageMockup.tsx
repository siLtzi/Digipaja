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
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
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
      // CTA button - snappy morph with pauses
      if (ctaRef.current) {
        const ctaTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        ctaTl
          .to(ctaRef.current, { 
            borderRadius: "8px", 
            scaleX: 1.08, 
            background: "linear-gradient(to right, #3b82f6, #2563eb)", 
            duration: 0.4, 
            ease: "back.out(2)" 
          })
          .to(ctaRef.current, { duration: 1.2 }) // pause
          .to(ctaRef.current, { 
            borderRadius: "2px", 
            scaleX: 1.15, 
            background: "linear-gradient(to right, #8b5cf6, #7c3aed)", 
            duration: 0.35, 
            ease: "power4.out" 
          })
          .to(ctaRef.current, { duration: 1.0 }) // pause
          .to(ctaRef.current, { 
            borderRadius: "20px", 
            scaleX: 1, 
            background: "linear-gradient(to right, #ff8a3c, #ff6b1a)", 
            duration: 0.5, 
            ease: "elastic.out(1, 0.5)" 
          })
          .to(ctaRef.current, { duration: 1.5 }); // pause
      }

      // CTA arrow - quick bounce
      if (ctaArrowRef.current) {
        gsap.to(ctaArrowRef.current, {
          keyframes: [
            { x: 0, duration: 0 },
            { x: 5, duration: 0.15, ease: "power2.out" },
            { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" },
          ],
          repeat: -1,
          repeatDelay: 2,
        });
      }

      // 3-Card fan animation sequence
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;
      const cardsContainer = cardsContainerRef.current;

      if (card1 && card2 && card3 && cardsContainer) {
        // Initial state: all cards stacked, cards 2 & 3 hidden behind card 1
        gsap.set([card1, card2, card3], {
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
          rotation: 0,
          scale: 1,
          opacity: 1,
        });
        gsap.set([card2, card3], { opacity: 0, scale: 0.95 });
        gsap.set(cardsContainer, {
          width: "35%",
          height: "55%",
          top: "22%",
          left: "58%",
        });

        const cardsTl = gsap.timeline({ repeat: -1, repeatDelay: 1.0 });
        
        cardsTl
          // Phase 1: Single card (hold)
          .to({}, { duration: 2.0 })
          
          // Phase 2: Cards 2 & 3 appear and fan out
          .to([card2, card3], { 
            opacity: 1, 
            scale: 1, 
            duration: 0.3, 
            ease: "power2.out" 
          })
          .to(card1, { 
            rotation: -15, 
            x: "-20%", 
            duration: 0.4, 
            ease: "back.out(1.4)" 
          }, "-=0.1")
          .to(card2, { 
            rotation: 0, 
            x: "0%", 
            duration: 0.4, 
            ease: "back.out(1.4)" 
          }, "<")
          .to(card3, { 
            rotation: 15, 
            x: "20%", 
            duration: 0.4, 
            ease: "back.out(1.4)" 
          }, "<")
          
          // Hold fan shape
          .to({}, { duration: 2.2 })
          
          // Phase 3: Merge into one vertical card (right side)
          .to([card1, card3], { 
            rotation: 0, 
            x: "0%", 
            opacity: 0,
            scale: 0.9,
            duration: 0.35, 
            ease: "power3.in" 
          })
          .to(card2, { 
            scale: 1.05, 
            duration: 0.35, 
            ease: "power2.out" 
          }, "<")
          .to(cardsContainer, { 
            width: "22%",
            height: "72%",
            left: "72%",
            top: "14%",
            duration: 0.4, 
            ease: "power3.out" 
          }, "-=0.2")
          
          // Hold vertical card
          .to({}, { duration: 2.0 })
          
          // Phase 4: Move to left, take half the screen (under hero text)
          .to(cardsContainer, { 
            width: "50%",
            height: "100%",
            top: "0%",
            left: "0%",
            duration: 0.5, 
            ease: "power3.inOut" 
          })
          .to(card2, {
            background: "linear-gradient(135deg, rgba(16,185,129,0.5), rgba(5,150,105,0.25))",
            duration: 0.3,
          }, "<")
          
          // Hold left position
          .to({}, { duration: 2.2 })
          
          // Phase 5: Morph back to original
          .to(cardsContainer, { 
            width: "35%",
            height: "55%",
            top: "22%",
            left: "58%",
            duration: 0.45, 
            ease: "power3.inOut" 
          })
          .to(card2, { 
            scale: 1,
            background: "linear-gradient(135deg, rgba(113,113,122,0.5), rgba(63,63,70,0.3))",
            duration: 0.35, 
            ease: "power2.out" 
          }, "<")
          .to([card1, card3], { 
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: "0%",
            duration: 0.3, 
            ease: "power2.out" 
          }, "-=0.2");
      }

      // Text block 1 - snappy width changes
      if (textBlock1Ref.current) {
        const txt1Tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
        txt1Tl
          .to(textBlock1Ref.current, { 
            scaleX: 0.6, 
            x: -8, 
            backgroundColor: "rgba(59,130,246,0.5)", 
            duration: 0.25, 
            ease: "power3.out" 
          })
          .to(textBlock1Ref.current, { duration: 1.5 })
          .to(textBlock1Ref.current, { 
            scaleX: 1.1, 
            x: 5, 
            backgroundColor: "rgba(139,92,246,0.4)", 
            duration: 0.3, 
            ease: "back.out(1.5)" 
          })
          .to(textBlock1Ref.current, { duration: 1.8 })
          .to(textBlock1Ref.current, { 
            scaleX: 1, 
            x: 0, 
            backgroundColor: "rgba(113,113,122,0.5)", 
            duration: 0.2, 
            ease: "power2.out" 
          });
      }

      // Text block 2 - offset rhythm
      if (textBlock2Ref.current) {
        const txt2Tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 0.6 });
        txt2Tl
          .to(textBlock2Ref.current, { 
            scaleX: 1.4, 
            x: 10, 
            backgroundColor: "rgba(16,185,129,0.45)", 
            duration: 0.3, 
            ease: "power4.out" 
          })
          .to(textBlock2Ref.current, { duration: 1.6 })
          .to(textBlock2Ref.current, { 
            scaleX: 0.5, 
            x: -5, 
            backgroundColor: "rgba(236,72,153,0.4)", 
            duration: 0.25, 
            ease: "power3.out" 
          })
          .to(textBlock2Ref.current, { duration: 1.4 })
          .to(textBlock2Ref.current, { 
            scaleX: 1, 
            x: 0, 
            backgroundColor: "rgba(113,113,122,0.35)", 
            duration: 0.35, 
            ease: "elastic.out(1, 0.5)" 
          });
      }

      // Accent block - snappy jumps with rotation
      if (accentBlockRef.current) {
        const accentTl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
        accentTl
          .to(accentBlockRef.current, { 
            scale: 1.2, 
            borderRadius: "50%", 
            rotation: 90, 
            x: 8, 
            y: -12,
            background: "linear-gradient(to bottom right, #3b82f6, #2563eb)", 
            duration: 0.35, 
            ease: "back.out(2)" 
          })
          .to(accentBlockRef.current, { duration: 1.4 })
          .to(accentBlockRef.current, { 
            scale: 0.85, 
            borderRadius: "4px", 
            rotation: -45, 
            x: -6, 
            y: 8,
            background: "linear-gradient(to bottom right, #8b5cf6, #7c3aed)", 
            duration: 0.3, 
            ease: "power4.out" 
          })
          .to(accentBlockRef.current, { duration: 1.2 })
          .to(accentBlockRef.current, { 
            scale: 1.1, 
            borderRadius: "8px 2px", 
            rotation: 180, 
            x: 5, 
            y: -5,
            background: "linear-gradient(to bottom right, #10b981, #059669)", 
            duration: 0.4, 
            ease: "elastic.out(1, 0.4)" 
          })
          .to(accentBlockRef.current, { duration: 1.5 })
          .to(accentBlockRef.current, { 
            scale: 1, 
            borderRadius: "8px", 
            rotation: 0, 
            x: 0, 
            y: 0,
            background: "linear-gradient(to bottom right, #ff8a3c, #ff6b1a)", 
            duration: 0.35, 
            ease: "back.out(1.7)" 
          });
      }

      // Logo - snappy shape morphs
      if (logoRef.current) {
        const logoTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        logoTl
          .to(logoRef.current, { 
            borderRadius: "50%", 
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", 
            scale: 1.15, 
            rotation: 0, 
            duration: 0.3, 
            ease: "back.out(2)" 
          })
          .to(logoRef.current, { duration: 1.2 })
          .to(logoRef.current, { 
            borderRadius: "0px", 
            background: "linear-gradient(135deg, #10b981, #059669)", 
            scale: 0.9, 
            rotation: 45, 
            duration: 0.25, 
            ease: "power4.out" 
          })
          .to(logoRef.current, { duration: 1.0 })
          .to(logoRef.current, { 
            borderRadius: "12px 4px 12px 4px", 
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", 
            scale: 1.1, 
            rotation: 0, 
            duration: 0.35, 
            ease: "elastic.out(1, 0.5)" 
          })
          .to(logoRef.current, { duration: 1.3 })
          .to(logoRef.current, { 
            borderRadius: "6px", 
            background: "linear-gradient(135deg, #ff8a3c, #ff6b1a)", 
            scale: 1, 
            rotation: 0, 
            duration: 0.3, 
            ease: "back.out(1.5)" 
          });
      }

      // Logo letter - quick pop
      if (logoLetterRef.current) {
        gsap.to(logoLetterRef.current, {
          keyframes: [
            { scale: 1, duration: 0 },
            { scale: 1.25, duration: 0.15, ease: "back.out(3)" },
            { scale: 1, duration: 0.25, ease: "power2.out" },
          ],
          repeat: -1,
          repeatDelay: 2.5,
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
          {/* Navigation Bar - Larger */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div 
                ref={logoRef}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#ff8a3c] to-[#ff6b1a] flex items-center justify-center"
                style={{ willChange: "transform" }}
              >
                <span ref={logoLetterRef} className="text-white font-bold text-xs sm:text-sm" style={{ willChange: "transform" }}>Y</span>
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm">Yrityksesi</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              {["Etusivu", "Palvelut", "Yhteystiedot"].map((item, i) => (
                <span 
                  key={item} 
                  className={`text-[9px] sm:text-[11px] cursor-pointer transition-colors ${i === 0 ? "text-[#ff8a3c]" : "text-zinc-400 hover:text-zinc-200"}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Main Layout - Hero section with left-aligned big title */}
          <div className="relative h-[calc(100%-3.5rem)]">
            {/* Left side - Title and content */}
            <div className="relative z-10 flex flex-col justify-center h-full w-[75%] sm:w-[60%] lg:w-[55%] pr-2 sm:pr-4">
              {/* Hero Title - Split into two lines */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#ff8a3c]/25 via-[#ff6b1a]/15 to-transparent blur-2xl rounded-full" />
                <h1 
                  style={{ fontFamily: "var(--font-goldman)" }}
                  className="relative leading-[0.85] tracking-tight"
                >
                  <span className="block text-3xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,138,60,0.3)]">
                    {firstLine}
                  </span>
                  <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent mt-0.5">
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

            {/* 3-Card container - cards fan out and merge */}
            <div 
              ref={cardsContainerRef}
              className="absolute"
              style={{ 
                willChange: "width, height, top, left", 
                width: "35%",
                height: "55%",
                top: "22%",
                left: "58%",
              }}
            >
              {/* Card 1 (left when fanned) */}
              <div 
                ref={card1Ref}
                className="absolute bg-gradient-to-br from-zinc-600/50 to-zinc-700/30 border border-white/10 rounded-xl overflow-hidden"
                style={{ 
                  willChange: "transform, opacity",
                  transformOrigin: "center bottom",
                }}
              >
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/30 to-blue-600/10 rounded-full blur-sm" />
                </div>
                <div className="absolute inset-2 border border-white/5 rounded-lg" />
              </div>

              {/* Card 2 (center - main card) */}
              <div 
                ref={card2Ref}
                className="absolute bg-gradient-to-br from-zinc-700/50 to-zinc-800/30 border border-white/15 rounded-xl overflow-hidden"
                style={{ 
                  willChange: "transform, opacity, background",
                  transformOrigin: "center bottom",
                  background: "linear-gradient(135deg, rgba(113,113,122,0.5), rgba(63,63,70,0.3))",
                }}
              >
                <div className="absolute inset-0 opacity-70">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-sm animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-to-tl from-white/15 to-transparent rounded-full" />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-white/10 to-transparent" />
                <div className="absolute inset-2 border border-white/5 rounded-lg" />
              </div>

              {/* Card 3 (right when fanned) */}
              <div 
                ref={card3Ref}
                className="absolute bg-gradient-to-br from-zinc-600/50 to-zinc-700/30 border border-white/10 rounded-xl overflow-hidden"
                style={{ 
                  willChange: "transform, opacity",
                  transformOrigin: "center bottom",
                }}
              >
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-to-bl from-purple-400/30 to-purple-600/10 rounded-full blur-sm" />
                </div>
                <div className="absolute inset-2 border border-white/5 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
