"use client";

import React, { useState, useEffect } from "react";

interface CodeEditorMockupProps {
  title: string;
}

export function CodeEditorMockup({ title }: CodeEditorMockupProps) {
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  
  const codeToType = [
    "<Analytics />",
    "<SEO optimize />",
    "<Performance />",
    "<Monitoring />",
    "<CacheControl />",
  ];
  
  useEffect(() => {
    if (lineIndex >= codeToType.length) {
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
      const timeout = setTimeout(() => {
        setLineIndex(prev => prev + 1);
        setTypedText("");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [typedText, lineIndex, codeToType]);

  return (
    <div className="absolute inset-0 pb-8 overflow-hidden bg-[#1e1e2e]">
      <div className="w-full h-full flex flex-col">
        {/* IDE Top Bar - VSCode style */}
        <div className="flex items-center px-2 py-1.5 bg-[#181825] border-b border-white/5">
          {/* File Explorer Icon */}
          <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 rounded">
            <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          {/* Search Icon */}
          <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 rounded">
            <svg className="w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          {/* Git Icon */}
          <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 rounded">
            <svg className="w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="6" r="2" />
              <circle cx="12" cy="18" r="2" />
              <circle cx="6" cy="12" r="2" />
              <path d="M12 8v8M6 12h4" />
            </svg>
          </div>
          
          {/* File Tabs */}
          <div className="flex items-center gap-0.5 ml-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e2e] border-t border-[#ff8a3c] text-white">
              <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm16.525 13.707c-0.131-0.821-0.666-1.511-2.252-2.155-0.552-0.259-1.165-0.438-1.349-0.854-0.068-0.248-0.078-0.382-0.034-0.529 0.113-0.484 0.687-0.629 1.137-0.495 0.293 0.088 0.563 0.315 0.732 0.676 0.775-0.507 0.775-0.507 1.316-0.844-0.203-0.314-0.304-0.451-0.439-0.586-0.473-0.528-1.103-0.798-2.126-0.775l-0.528 0.067c-0.507 0.124-0.991 0.395-1.283 0.754-0.855 0.968-0.608 2.655 0.427 3.354 1.023 0.765 2.521 0.933 2.712 1.653 0.18 0.878-0.652 1.159-1.475 1.058-0.607-0.136-0.945-0.439-1.316-1.002l-1.372 0.788c0.157 0.359 0.337 0.517 0.607 0.832 1.305 1.316 4.568 1.249 5.153-0.754 0.021-0.067 0.18-0.528 0.056-1.237l0.034 0.049z"/>
              </svg>
              <span className="text-[10px] font-medium">app.tsx</span>
              <span className="text-zinc-500 hover:text-white text-xs ml-1">×</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#181825] text-zinc-500">
              <svg className="w-3.5 h-3.5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-[10px]">config.ts</span>
            </div>
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Line Numbers */}
          <div className="py-3 px-2 bg-[#181825]/50 text-right select-none border-r border-white/5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((num) => (
              <div key={num} className="text-[10px] leading-5 text-zinc-600 font-mono">
                {num}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 py-3 px-3 overflow-hidden font-mono text-[9px] sm:text-[10px] leading-5">
            <div><span className="text-pink-400">import</span> <span className="text-zinc-300">{"{"}</span> <span className="text-blue-300">NextPage</span> <span className="text-zinc-300">{"}"}</span> <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;next&apos;</span></div>
            <div><span className="text-pink-400">import</span> <span className="text-zinc-300">{"{"}</span> <span className="text-blue-300">Analytics</span><span className="text-zinc-300">,</span> <span className="text-blue-300">SEO</span> <span className="text-zinc-300">{"}"}</span> <span className="text-pink-400">from</span> <span className="text-amber-300">&apos;./components&apos;</span></div>
            <div>&nbsp;</div>
            {/* THE BIG GREEN COMMENT - Main Focus */}
            <div className="my-1">
              <span 
                style={{ fontFamily: "var(--font-goldman)", color: "#6A9955" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black"
              >
                // {title}
              </span>
            </div>
            <div>&nbsp;</div>
            <div><span className="text-pink-400">const</span> <span className="text-blue-300">App</span><span className="text-zinc-300">:</span> <span className="text-blue-300">NextPage</span> <span className="text-zinc-300">=</span> <span className="text-pink-400">()</span> <span className="text-pink-400">=&gt;</span> <span className="text-zinc-300">{"{"}</span></div>
            <div className="pl-3"><span className="text-pink-400">return</span> <span className="text-zinc-300">(</span></div>
            <div className="pl-6"><span className="text-zinc-500">&lt;</span><span className="text-blue-300">main</span> <span className="text-purple-300">className</span><span className="text-zinc-300">=</span><span className="text-amber-300">&quot;app&quot;</span><span className="text-zinc-500">&gt;</span></div>
            {/* Typing animation lines */}
            {codeToType.map((line, i) => {
              if (i > lineIndex) return <div key={i} className="pl-9 h-5">&nbsp;</div>;
              const displayText = i === lineIndex ? typedText : line;
              const componentName = displayText.replace(/<|>|\/|\s.*/g, '');
              const hasAttr = displayText.includes(' ');
              return (
                <div key={i} className="pl-9 h-5">
                  {displayText && (
                    <>
                      <span className="text-zinc-500">&lt;</span>
                      <span className="text-yellow-300">{componentName}</span>
                      {hasAttr && displayText.includes('optimize') && <span className="text-purple-300"> optimize</span>}
                      {displayText.includes('/>') && <span className="text-purple-300"> /</span>}
                      {displayText.includes('/>') && <span className="text-zinc-500">&gt;</span>}
                    </>
                  )}
                  {i === lineIndex && <span className="animate-pulse text-white">|</span>}
                </div>
              );
            })}
            <div className="pl-6"><span className="text-zinc-500">&lt;/</span><span className="text-blue-300">main</span><span className="text-zinc-500">&gt;</span></div>
            <div className="pl-3"><span className="text-zinc-300">);</span></div>
            <div><span className="text-zinc-300">{"}"}</span></div>
            <div>&nbsp;</div>
            <div><span className="text-pink-400">export</span> <span className="text-pink-400">default</span> <span className="text-blue-300">App</span><span className="text-zinc-300">;</span></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#0f0f18] border-t border-white/5">
          <div className="flex items-center gap-3 text-[9px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              TSX
            </span>
            <span>UTF-8</span>
            <span>Ln {lineIndex + 8}, Col {typedText.length + 1}</span>
            <span className="flex items-center gap-1">
              <svg className="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Prettier
            </span>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fast
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Typing...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
