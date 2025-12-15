"use client";

import { useState } from "react";
import Image from "next/image";

type Card = {
  title: string;
  description: string;
  icon: string;
};

type WhyUsProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: Card[];
};

export default function WhyUsContent({
  eyebrow,
  title,
  subtitle,
  cards,
}: WhyUsProps) {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[#050609] py-24 lg:py-32">
      
      {/* === TOP SEPARATOR (Lazer Line) === */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-center">
        <div className="h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c]/50 to-transparent" />
        <div className="absolute top-0 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent opacity-80" />
      </div>

      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
            <Image 
                src="/image/BGWhyUs2.png" 
                alt="Background" 
                fill
                className="object-cover object-center opacity-30 mix-blend-screen"
                priority
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-[#050609]/80 to-[#050609]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* === HEADER === */}
        <div className="mb-20 flex flex-col items-center text-center">
          {/* Eyebrow: Minimalist style */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#ff8a3c]/20 bg-[#ff8a3c]/5 px-4 py-1.5 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#ff8a3c]" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#ffcc80]">
              {eyebrow}
            </span>
          </div>
          
          <h2 
            style={{ fontFamily: "var(--font-goldman)" }} 
            className="max-w-5xl text-balance text-4xl font-bold leading-none text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </h2>
          
          <p className="mt-6 max-w-3xl text-base text-zinc-400 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* === TECH GRID === */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const isLast = i === cards.length - 1;
            return (
              <GridItem 
                key={i} 
                card={card} 
                index={i} 
                variant={isLast ? "highlight" : "default"}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENT ---
function GridItem({ 
  card, 
  index, 
  variant = "default" 
}: { 
  card: Card; 
  index: number; 
  variant?: "default" | "highlight";
}) {
  const isHighlight = variant === "highlight";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group relative flex flex-col p-6 transition-all duration-500 rounded-sm border cursor-pointer sm:cursor-default overflow-hidden
      ${
        isHighlight 
          ? "bg-[#0a0b10] border-[#ff8a3c] shadow-[0_0_40px_-10px_rgba(255,138,60,0.3)]" 
          : "bg-[#0a0a0a]/90 border-white/10 hover:border-[#ff8a3c] hover:shadow-[0_0_30px_-10px_rgba(255,138,60,0.1)]"
      }
      `}
    >
      
      {/* === HOVER EFFECT 1: The Blueprint Grid === */}
      {/* Reveals a tech grid pattern in the background on hover */}
      <div 
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, #ff8a3c1a 1px, transparent 1px), linear-gradient(to bottom, #ff8a3c1a 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* === HOVER EFFECT 2: Rising Heat Gradient === */}
      {/* A warm gradient rises from the bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#ff8a3c]/20 via-[#ff8a3c]/5 to-transparent transition-transform duration-500 ease-out z-0
        ${isHighlight ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`} 
      />

      {/* Tech Corner Decorations */}
      <div className={`absolute inset-0 pointer-events-none ${isHighlight ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 z-20`}>
          <div className="absolute top-0 left-0 h-2 w-2 border-l border-t border-[#ff8a3c]" />
          <div className="absolute top-0 right-0 h-2 w-2 border-r border-t border-[#ff8a3c]" />
          <div className="absolute bottom-0 left-0 h-2 w-2 border-l border-b border-[#ff8a3c]" />
          <div className="absolute bottom-0 right-0 h-2 w-2 border-r border-b border-[#ff8a3c]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Header: Icon + Title */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Icon Container with Glow Effect */}
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-all duration-300 ${
               isHighlight 
                ? "border-[#ff8a3c] bg-[#ff8a3c]/10 text-[#ff8a3c]" 
                : "border-white/10 bg-white/5 text-[#ff8a3c] group-hover:border-[#ff8a3c] group-hover:bg-[#ff8a3c]/10 group-hover:text-[#ff8a3c] group-hover:shadow-[0_0_20px_-5px_#ff8a3c]"
            }`}>
                {/* ICONS */}
                {card.icon === 'forge' && <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4V20H18V9H16V6H6V9ZM10 9H14V6H10V9ZM16 20H18V18H16V20ZM4 20H6V18H4V20ZM6 18H16V9H6V18Z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {card.icon === 'speed' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                {card.icon === 'tech' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                {card.icon === 'local' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                {card.icon === 'shield' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                {card.icon === 'fingerprint' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.578-4.18M7 9a1 1 0 012 0v1h2v-1a1 1 0 112 0v1h2v-1a1 1 0 112 0" /></svg>}
                {card.icon === 'rocket' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                {card.icon === 'trophy' && <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
            </div>
            <h3 style={{ fontFamily: "var(--font-goldman)" }} className={`text-lg font-bold leading-tight ${isHighlight ? "text-white" : "text-white"}`}>
              {card.title}
            </h3>
          </div>

          {/* Mobile Expand Indicator (Hidden on Desktop) */}
          <div className="sm:hidden text-zinc-500">
             <svg 
               className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-45 text-[#ff8a3c]" : ""}`} 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor"
             >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
             </svg>
          </div>
        </div>

        {/* Description: Collapsed on mobile, Visible on Desktop */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0 mt-0"} 
          sm:max-h-none sm:opacity-100 sm:mt-4
        `}>
          <p className={`text-sm leading-relaxed ${isHighlight ? "text-zinc-300" : "text-zinc-400"}`}>
            {card.description}
          </p>
        </div>
      </div>

      {/* Tech ID */}
      <div className={`absolute top-4 right-4 text-[10px] font-bold opacity-30 ${isHighlight ? "text-[#ff8a3c]" : "text-zinc-600"}`}>
        0{index + 1}
      </div>
    </div>
  );
}