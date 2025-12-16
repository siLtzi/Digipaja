"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden bg-[#050609]"
    >
      {/* 1. AMBIENT ATMOSPHERE (Updated: Smoother Gradients, No Blurs) */}
      {/* Subtle top-left warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#ff8a3c08,transparent_50%)]" />
      {/* Subtle bottom-right cool glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,#27272a20,transparent_50%)]" />
      
      {/* 2. BASE GRID */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" 
      />

      {/* 3. INTERACTIVE FLASHLIGHT GRID */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ff8a3c15_1px,transparent_1px),linear-gradient(to_bottom,#ff8a3c15_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{
          maskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      {/* 4. VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#050609_100%)] pointer-events-none" />
    </div>
  );
}