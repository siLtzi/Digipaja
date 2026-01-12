"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SearchEngineMockupProps {
  title: string;
}

export function SearchEngineMockup({ title }: SearchEngineMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const searchTextRef = useRef<HTMLSpanElement>(null);
  const result1Ref = useRef<HTMLDivElement>(null);
  const result2Ref = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth cursor blink
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Typing animation timeline
      const typingTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Reset text at the start of each loop
      typingTl.call(() => {
        setDisplayText("");
      });
      
      // Type out the text character by character
      const chars = title.split("");
      
      chars.forEach((char, index) => {
        typingTl.call(() => {
          setDisplayText(prev => prev + char);
        }, [], 0.08 * (index + 1));
      });

      // After typing complete, show results with stagger
      typingTl.to(result1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, ">");
      
      typingTl.to(result2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, ">0.15");

      // Hold for a moment
      typingTl.to({}, { duration: 2.5 });
      
      // Fade out results back down (reverse order)
      typingTl.to(result2Ref.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
      });
      
      typingTl.to(result1Ref.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
      }, ">0.1");
      
      // Erase the text character by character (reverse typing)
      for (let i = chars.length; i >= 0; i--) {
        const targetText = title.substring(0, i);
        typingTl.call(() => {
          setDisplayText(targetText);
        }, [], "+=0.04");
      }
      
      // Small pause before loop restarts
      typingTl.to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={containerRef} className="absolute inset-0 pb-8 overflow-hidden bg-[#0f0f18]">
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-6">
        {/* Google-style Logo - smaller */}
        <div className="flex items-center gap-0.5 text-lg sm:text-xl font-bold mb-4 opacity-60">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-amber-400">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>

        {/* Search Bar - THE MAIN FOCUS */}
        <div className="w-full max-w-[95%] mb-5">
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-[#1f1f2e] rounded-full border-2 border-[#ff8a3c]/50 shadow-[0_0_20px_rgba(255,138,60,0.15)]">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff8a3c] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span 
              style={{ fontFamily: "var(--font-goldman)" }}
              className="flex-1 text-xl sm:text-2xl lg:text-3xl text-white font-bold tracking-tight"
            >
              <span ref={searchTextRef}>{displayText}</span>
              <span 
                ref={cursorRef}
                className="inline-block w-[3px] h-[1.1em] bg-[#ff8a3c] ml-0.5 align-middle rounded-sm shadow-[0_0_8px_rgba(255,138,60,0.8)]"
              />
            </span>
          </div>
        </div>

        {/* Search Results - animated */}
        <div className="w-full max-w-[90%] space-y-3">
          {/* Result 1 - Main result */}
          <div 
            ref={result1Ref}
            className="group cursor-pointer opacity-0 translate-y-3"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff8a3c] to-[#ff6b1a] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">Y</span>
              </div>
              <div className="text-[9px] text-zinc-500">yrityksesi.fi</div>
            </div>
            <div className="text-xs sm:text-sm text-blue-400 group-hover:underline font-medium">
              Yrityksesi
            </div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 line-clamp-1">
              Ammattimainen hakukoneoptimointi kasvattaa näkyvyyttäsi...
            </div>
          </div>

          {/* Result 2 - Secondary */}
          <div 
            ref={result2Ref}
            className="opacity-0 translate-y-3"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center">
                <span className="text-[8px] text-zinc-500">W</span>
              </div>
              <div className="text-[9px] text-zinc-600">example.com</div>
            </div>
            <div className="text-xs text-zinc-600">Lorem ipsum dolor...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
