"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

// ============================================
// 1. HOMEPAGE MOCKUP - "Räätälöidyt kotisivut"
// ============================================
export function HomepageMockup({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<SVGPathElement>(null);
  const shape2Ref = useRef<SVGPathElement>(null);
  const shape3Ref = useRef<SVGPathElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  // Blob paths for morphing
  const blobPaths = [
    "M45,-51.4C56.6,-40.3,63.3,-24.3,65.6,-7.5C67.9,9.3,65.8,26.9,56.6,39.7C47.4,52.5,31.1,60.5,13.8,64.2C-3.5,67.9,-21.8,67.3,-37.4,59.8C-53,52.3,-65.9,37.9,-71.1,21.1C-76.3,4.3,-73.8,-14.9,-65.1,-30.3C-56.4,-45.7,-41.5,-57.3,-25.7,-66.8C-9.9,-76.3,6.8,-83.7,22.1,-79.7C37.4,-75.7,51.3,-60.3,45,-51.4Z",
    "M39.7,-47.9C52.4,-37.7,64.5,-26.1,68.9,-11.4C73.3,3.3,70,21.1,60.8,35.1C51.6,49.1,36.5,59.3,19.8,65.1C3.1,70.9,-15.2,72.3,-31.7,66.5C-48.2,60.7,-62.9,47.7,-70.1,31.4C-77.3,15.1,-77,-4.5,-70.6,-21.3C-64.2,-38.1,-51.7,-52.1,-37.3,-61.8C-22.9,-71.5,-6.6,-76.9,6.1,-83.9C18.8,-90.9,27,-58.1,39.7,-47.9Z",
    "M44.4,-52.1C57.1,-42.4,66.8,-28.2,70.4,-12.2C74,3.8,71.5,21.6,62.5,35.4C53.5,49.2,38,59,21.3,64.6C4.6,70.2,-13.3,71.6,-29.8,66.2C-46.3,60.8,-61.4,48.6,-69.3,32.8C-77.2,17,-77.9,-2.4,-72.1,-19.3C-66.3,-36.2,-54,-50.6,-39.7,-59.8C-25.4,-69,-9.1,-73,4.6,-78.5C18.3,-84,31.7,-61.8,44.4,-52.1Z",
    "M51.5,-58.5C64.7,-48.4,72.4,-31.2,74.2,-13.7C76,3.8,71.9,21.6,62.5,36.1C53.1,50.6,38.4,61.8,21.8,68.1C5.2,74.4,-13.3,75.8,-29.5,70.1C-45.7,64.4,-59.6,51.6,-67.8,35.6C-76,19.6,-78.5,0.4,-74.1,-16.6C-69.7,-33.6,-58.4,-48.4,-44.4,-58.4C-30.4,-68.4,-13.7,-73.6,2.8,-76.9C19.3,-80.2,38.3,-68.6,51.5,-58.5Z",
  ];

  const smallBlobPaths = [
    "M36.9,-45.5C47.3,-36.8,54.8,-24.6,58.3,-10.8C61.8,3,61.3,18.4,54.5,30.5C47.7,42.6,34.6,51.4,19.9,56.5C5.2,61.6,-11.1,63,-25.8,58.2C-40.5,53.4,-53.6,42.4,-60.3,28.2C-67,14,-67.3,-3.4,-62.1,-18.5C-56.9,-33.6,-46.2,-46.4,-33.6,-54.5C-21,-62.6,-6.5,-66,5.3,-72.2C17.1,-78.4,26.5,-54.2,36.9,-45.5Z",
    "M42.7,-51.4C54.7,-42.3,63.6,-28.7,67.1,-13.6C70.6,1.5,68.7,18.1,61,31.7C53.3,45.3,39.8,55.9,24.4,62.1C9,68.3,-8.3,70.1,-24.1,65.5C-39.9,60.9,-54.2,49.9,-62.5,35.3C-70.8,20.7,-73.1,2.5,-69.2,-13.7C-65.3,-29.9,-55.2,-44.1,-42.3,-53.1C-29.4,-62.1,-13.7,-65.9,1.3,-67.5C16.3,-69.1,30.7,-60.5,42.7,-51.4Z",
    "M39.2,-47.8C50.3,-38.6,58.6,-26.1,62.2,-12C65.8,2.1,64.7,17.8,57.6,30.8C50.5,43.8,37.4,54.1,22.6,59.8C7.8,65.5,-8.7,66.6,-23.9,62.1C-39.1,57.6,-53,47.5,-61.2,33.7C-69.4,19.9,-71.9,2.4,-68.3,-13.4C-64.7,-29.2,-55,-43.3,-42.5,-52.2C-30,-61.1,-14.7,-64.8,-0.2,-64.5C14.3,-64.2,28.1,-57,39.2,-47.8Z",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main blob morphing animation
      if (shape1Ref.current) {
        gsap.to(shape1Ref.current, {
          morphSVG: { shape: blobPaths[1], type: "rotational" },
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.5,
        });
        
        // Also animate position and scale
        gsap.to(shape1Ref.current, {
          x: 10,
          y: -15,
          scale: 1.1,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Second shape morphing
      if (shape2Ref.current) {
        gsap.to(shape2Ref.current, {
          morphSVG: { shape: blobPaths[2], type: "rotational" },
          duration: 4,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
        
        gsap.to(shape2Ref.current, {
          x: -8,
          y: 12,
          rotation: 45,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Third smaller shape
      if (shape3Ref.current) {
        gsap.to(shape3Ref.current, {
          morphSVG: { shape: smallBlobPaths[1], type: "rotational" },
          duration: 2.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
        
        gsap.to(shape3Ref.current, {
          x: 15,
          y: -10,
          rotation: -30,
          scale: 1.2,
          duration: 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Button morphing
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          borderRadius: "24px",
          paddingLeft: "28px",
          paddingRight: "28px",
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
        
        // Color shift for button
        gsap.to(buttonRef.current, {
          background: "linear-gradient(to right, #3b82f6, #2563eb)",
          duration: 3,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

      // Logo morphing
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          borderRadius: "50%",
          duration: 2.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
        
        gsap.to(logoRef.current, {
          background: "linear-gradient(to bottom right, #a855f7, #9333ea)",
          duration: 4,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

      // Line width animations
      if (line1Ref.current) {
        gsap.to(line1Ref.current, {
          width: "85%",
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
      if (line2Ref.current) {
        gsap.to(line2Ref.current, {
          width: "90%",
          duration: 3.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
      if (line3Ref.current) {
        gsap.to(line3Ref.current, {
          width: "50%",
          duration: 4,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#0c0c14] to-[#080810]">
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
        <div className="flex-1 relative p-6 sm:p-8">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div 
                ref={logoRef}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(to bottom right, #ff8a3c, #ff6b1a)" }}
              >
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-white font-semibold text-sm hidden sm:block">Yrityksesi</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              {["Etusivu", "Palvelut", "Yhteystiedot"].map((item, i) => (
                <span 
                  key={item} 
                  className={`text-[10px] sm:text-xs cursor-pointer ${i === 0 ? "text-[#ff8a3c]" : "text-zinc-400"}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-4 sm:space-y-6 max-w-[85%]">
            <h1 
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight"
            >
              {title}
            </h1>
            
            {/* Morphing lines */}
            <div className="space-y-2">
              <div ref={line1Ref} className="h-2 bg-zinc-700/40 rounded-full" style={{ width: "100%" }} />
              <div ref={line2Ref} className="h-2 bg-zinc-700/30 rounded-full" style={{ width: "80%" }} />
              <div ref={line3Ref} className="h-2 bg-zinc-700/20 rounded-full" style={{ width: "60%" }} />
            </div>

            {/* Morphing CTA Button */}
            <div className="pt-2">
              <div 
                ref={buttonRef}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg"
                style={{ background: "linear-gradient(to right, #ff8a3c, #ff6b1a)" }}
              >
                <span className="text-[11px] sm:text-xs text-white font-semibold">Ota yhteyttä</span>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Morphing SVG Blobs */}
          <svg 
            className="absolute top-4 right-4 w-28 h-28 sm:w-36 sm:h-36"
            viewBox="-100 -100 200 200"
          >
            <defs>
              <linearGradient id="blob1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff8a3c" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff6b1a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
              ref={shape1Ref}
              d={blobPaths[0]}
              fill="url(#blob1Gradient)"
              stroke="rgba(255,138,60,0.2)"
              strokeWidth="1"
            />
          </svg>

          <svg 
            className="absolute bottom-16 right-20 w-20 h-20 sm:w-24 sm:h-24"
            viewBox="-100 -100 200 200"
          >
            <defs>
              <linearGradient id="blob2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
              ref={shape2Ref}
              d={blobPaths[3]}
              fill="url(#blob2Gradient)"
              stroke="rgba(139,92,246,0.15)"
              strokeWidth="1"
            />
          </svg>

          <svg 
            className="absolute bottom-8 right-8 w-12 h-12 sm:w-14 sm:h-14"
            viewBox="-100 -100 200 200"
          >
            <defs>
              <linearGradient id="blob3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
              ref={shape3Ref}
              d={smallBlobPaths[0]}
              fill="url(#blob3Gradient)"
              stroke="rgba(16,185,129,0.2)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 2. CODE EDITOR MOCKUP - "Tekninen toteutus"
// ============================================
export function CodeEditorMockup({ title }: { title: string }) {
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  
  const codeToType = [
    "<Analytics />",
    "<SEO optimize />",
    "<Performance />",
  ];
  
  useEffect(() => {
    if (lineIndex >= codeToType.length) {
      // Reset after all lines
      const timeout = setTimeout(() => {
        setLineIndex(0);
        setTypedText("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
    const currentLine = codeToType[lineIndex];
    if (typedText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentLine.slice(0, typedText.length + 1));
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setLineIndex(prev => prev + 1);
        setTypedText("");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [typedText, lineIndex, codeToType]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1e1e2e]">
      <div className="w-full h-full flex flex-col">
        {/* IDE Top Bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#181825] border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-1 ml-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1e1e2e] border-t-2 border-[#ff8a3c] rounded-t">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm16.525 13.707c-0.131-0.821-0.666-1.511-2.252-2.155-0.552-0.259-1.165-0.438-1.349-0.854-0.068-0.248-0.078-0.382-0.034-0.529 0.113-0.484 0.687-0.629 1.137-0.495 0.293 0.088 0.563 0.315 0.732 0.676 0.775-0.507 0.775-0.507 1.316-0.844-0.203-0.314-0.304-0.451-0.439-0.586-0.473-0.528-1.103-0.798-2.126-0.775l-0.528 0.067c-0.507 0.124-0.991 0.395-1.283 0.754-0.855 0.968-0.608 2.655 0.427 3.354 1.023 0.765 2.521 0.933 2.712 1.653 0.18 0.878-0.652 1.159-1.475 1.058-0.607-0.136-0.945-0.439-1.316-1.002l-1.372 0.788c0.157 0.359 0.337 0.517 0.607 0.832 1.305 1.316 4.568 1.249 5.153-0.754 0.021-0.067 0.18-0.528 0.056-1.237l0.034 0.049zM11.467 11.937l-1.691 0.001c0 1.156-0.006 2.307-0.006 3.465 0 0.736 0.037 1.412-0.084 1.62-0.199 0.425-0.713 0.373-0.946 0.297-0.238-0.123-0.358-0.294-0.498-0.54-0.039-0.072-0.067-0.128-0.073-0.128l-1.365 0.843c0.229 0.472 0.563 0.879 0.994 1.137 0.641 0.383 1.502 0.507 2.404 0.305 0.588-0.17 1.095-0.519 1.358-1.059 0.384-0.697 0.302-1.553 0.299-2.509 0.008-1.541 0-3.083 0-4.635l0.608 0.003z"/>
              </svg>
              <span className="text-[11px] text-white font-medium">app.tsx</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#181825] rounded-t opacity-50">
              <span className="text-[11px] text-zinc-400">config.ts</span>
            </div>
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Line Numbers */}
          <div className="py-4 px-3 bg-[#181825]/50 text-right select-none border-r border-white/5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => (
              <div key={num} className="text-[11px] leading-6 text-zinc-600 font-mono">
                {num}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 py-4 px-4 overflow-hidden font-mono text-[11px] sm:text-xs leading-6">
            <div><span className="text-pink-400">import</span> <span className="text-zinc-300">{"{"}</span> <span className="text-blue-300">NextPage</span> <span className="text-zinc-300">{"}"}</span> <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;next&apos;</span></div>
            <div className="text-zinc-500">// {title}</div>
            <div>&nbsp;</div>
            <div><span className="text-pink-400">const</span> <span className="text-blue-300">App</span><span className="text-zinc-300">:</span> <span className="text-green-300">NextPage</span> <span className="text-zinc-300">=</span> <span className="text-pink-400">()</span> <span className="text-pink-400">=&gt;</span> <span className="text-zinc-300">(</span></div>
            <div className="pl-4"><span className="text-zinc-500">&lt;</span><span className="text-blue-300">main</span><span className="text-zinc-500">&gt;</span></div>
            <div className="pl-8"><span className="text-zinc-500">&lt;</span><span className="text-green-300">Hero</span> <span className="text-purple-300">/</span><span className="text-zinc-500">&gt;</span></div>
            <div className="pl-8"><span className="text-zinc-500">&lt;</span><span className="text-green-300">Features</span> <span className="text-purple-300">/</span><span className="text-zinc-500">&gt;</span></div>
            <div className="pl-8"><span className="text-zinc-500">&lt;</span><span className="text-green-300">Contact</span> <span className="text-purple-300">/</span><span className="text-zinc-500">&gt;</span></div>
            {/* Typing animation lines */}
            {codeToType.map((line, i) => {
              if (i > lineIndex) return <div key={i} className="pl-8">&nbsp;</div>;
              const displayText = i === lineIndex ? typedText : line;
              const componentName = displayText.replace(/<|>|\/|\s.*/g, '');
              const hasAttr = displayText.includes(' ');
              return (
                <div key={i} className="pl-8">
                  {displayText && (
                    <>
                      <span className="text-zinc-500">&lt;</span>
                      <span className="text-yellow-300">{componentName}</span>
                      {hasAttr && displayText.includes('optimize') && <span className="text-purple-300"> optimize</span>}
                      {displayText.includes('/>') && <span className="text-purple-300"> /</span>}
                      {displayText.includes('/>') && <span className="text-zinc-500">&gt;</span>}
                    </>
                  )}
                  {i === lineIndex && <span className="animate-cursor-blink text-white">|</span>}
                </div>
              );
            })}
            <div className="pl-4"><span className="text-zinc-500">&lt;/</span><span className="text-blue-300">main</span><span className="text-zinc-500">&gt;</span></div>
            <div><span className="text-zinc-300">);</span></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#ff8a3c]">
          <div className="flex items-center gap-4 text-[10px] text-black font-medium">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              TypeScript React
            </span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-black font-medium">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            Typing...
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. SEARCH ENGINE MOCKUP - "Hakukoneoptimointi"
// ============================================
export function SearchEngineMockup({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f0f18]">
      <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8">
        {/* Google-style Logo */}
        <div className="flex items-center gap-0.5 text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-amber-400">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-6 sm:mb-8">
          <div className="flex items-center gap-3 px-5 py-3 bg-[#1f1f2e] rounded-full border border-white/10 shadow-lg hover:shadow-xl transition-shadow">
            <svg className="w-5 h-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span 
              style={{ fontFamily: "var(--font-goldman)" }}
              className="flex-1 text-sm sm:text-base text-white font-medium"
            >
              {title}
              <span className="animate-cursor-blink text-[#ff8a3c]">|</span>
            </span>
            <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>

        {/* Search Results */}
        <div className="w-full max-w-md space-y-4">
          {/* Result 1 - Main result */}
          <div className="group cursor-pointer">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff8a3c] to-[#ff6b1a] flex items-center justify-center shadow-lg shadow-[#ff8a3c]/20">
                <span className="text-[10px] font-bold text-white">Y</span>
              </div>
              <div>
                <div className="text-[11px] text-zinc-400">yrityksesi.fi</div>
              </div>
            </div>
            <div className="text-sm sm:text-base text-blue-400 group-hover:underline font-medium mb-0.5">
              Yrityksesi - Parhaat tulokset hakukoneissa
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 line-clamp-2">
              Ammattimainen hakukoneoptimointi kasvattaa näkyvyyttäsi ja tuo lisää asiakkaita...
            </div>
          </div>

          {/* Result 2 - Faded */}
          <div className="opacity-30">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center">
                <span className="text-[10px] text-zinc-500">W</span>
              </div>
              <div className="text-[11px] text-zinc-500">www.example.com</div>
            </div>
            <div className="text-sm text-zinc-500">Lorem ipsum dolor sit amet...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. E-COMMERCE MOCKUP - "Verkkokaupat"
// ============================================
export function EcommerceMockup({ title }: { title: string }) {
  const products = [
    { name: "Premium", price: "€49", sale: true },
    { name: "Basic", price: "€29", sale: false },
    { name: "Pro", price: "€89", sale: true },
    { name: "Starter", price: "€19", sale: false },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a10] flex flex-col">
      {/* Hero Header - Big & Eye-catching */}
      <div className="shrink-0 px-4 pt-3 pb-2 bg-gradient-to-b from-[#0f0f18] to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff8a3c] to-[#ff6b1a] flex items-center justify-center shadow-lg shadow-[#ff8a3c]/30">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 
              style={{ fontFamily: "var(--font-goldman)" }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide leading-none"
            >
              {title}
            </h2>
          </div>
          {/* Shopping Cart */}
          <div className="relative">
            <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ff8a3c] rounded-full flex items-center justify-center text-[8px] font-bold text-black">
              2
            </div>
          </div>
        </div>
      </div>

      {/* Compact Product Grid */}
      <div className="flex-1 px-3 pb-3 grid grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden">
        {products.map((product, i) => (
          <div key={i} className="bg-white/[0.02] rounded-md border border-white/5 p-1.5 flex flex-col min-h-0">
            <div className="flex-1 min-h-0 relative bg-zinc-900/50 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={i % 2 === 0 
                  ? "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  : "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                } />
              </svg>
              {product.sale && (
                <div className="absolute top-0.5 left-0.5 px-1 py-0.5 bg-red-500/90 rounded text-[5px] font-bold text-white">
                  SALE
                </div>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-[8px] text-zinc-400 block truncate">{product.name}</span>
                <span className="text-[9px] font-bold text-[#ff8a3c]">{product.price}</span>
              </div>
              <button className="w-5 h-5 rounded bg-[#ff8a3c] flex items-center justify-center">
                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// VISUAL SELECTOR - Maps slug to component
// ============================================
export function ServiceVisual({ slug, title }: { slug?: string; title: string }) {
  switch (slug) {
    case "raataloidyt-kotisivut":
    case "custom-websites":
      return <HomepageMockup title={title} />;
    
    case "tekninen-toteutus":
    case "technical-implementation":
      return <CodeEditorMockup title={title} />;
    
    case "hakukoneoptimointi":
    case "seo":
    case "search-engine-optimization":
      return <SearchEngineMockup title={title} />;
    
    case "verkkokaupat":
    case "ecommerce":
    case "e-commerce":
      return <EcommerceMockup title={title} />;
    
    default:
      return null;
  }
}
