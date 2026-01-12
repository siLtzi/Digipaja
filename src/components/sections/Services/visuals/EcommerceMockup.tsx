"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface EcommerceMockupProps {
  title: string;
}

export function EcommerceMockup({ title }: EcommerceMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartBadgeRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flyingItemRef = useRef<HTMLDivElement>(null);
  const checkoutBtnRef = useRef<HTMLDivElement>(null);
  const successOverlayRef = useRef<HTMLDivElement>(null);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { price: "€49", sale: true, color: "#ff8a3c" },
    { price: "€29", sale: false, color: "#3b82f6" },
    { price: "€89", sale: true, color: "#10b981" },
    { price: "€19", sale: false, color: "#8b5cf6" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main animation timeline - loops through products
      const mainTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      
      // Animate each product flying to cart in sequence
      products.forEach((product, index) => {
        mainTl.call(() => {
          const productEl = productRefs.current[index];
          const cartEl = cartRef.current;
          const flyingEl = flyingItemRef.current;
          
          if (!productEl || !cartEl || !flyingEl) return;
          
          // Get positions
          const productRect = productEl.getBoundingClientRect();
          const cartRect = cartEl.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect();
          
          if (!containerRect) return;
          
          // Position flying item at product location
          const startX = productRect.left - containerRect.left + productRect.width / 2;
          const startY = productRect.top - containerRect.top + productRect.height / 2;
          const endX = cartRect.left - containerRect.left + cartRect.width / 2;
          const endY = cartRect.top - containerRect.top + cartRect.height / 2;
          
          // Set initial position and make visible
          gsap.set(flyingEl, {
            x: startX,
            y: startY,
            scale: 1,
            opacity: 1,
            backgroundColor: product.color,
          });
          
          // Animate to cart with arc
          gsap.to(flyingEl, {
            x: endX,
            y: endY,
            scale: 0.3,
            duration: 0.6,
            ease: "power2.in",
            motionPath: {
              path: [
                { x: startX, y: startY },
                { x: (startX + endX) / 2, y: startY - 60 },
                { x: endX, y: endY },
              ],
              curviness: 1.5,
            },
            onComplete: () => {
              // Hide flying item
              gsap.set(flyingEl, { opacity: 0 });
              
              // Boing animation on cart
              gsap.to(cartEl, {
                scale: 1.3,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(cartEl, {
                    scale: 1,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)",
                  });
                },
              });
              
              // Badge pulse
              if (cartBadgeRef.current) {
                gsap.to(cartBadgeRef.current, {
                  scale: 1.4,
                  duration: 0.15,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.to(cartBadgeRef.current, {
                      scale: 1,
                      duration: 0.3,
                      ease: "elastic.out(1, 0.4)",
                    });
                  },
                });
              }
              
              // Update cart count
              setCartCount(prev => prev + 1);
            },
          });
          
          // Flash the product being added
          gsap.to(productEl, {
            scale: 0.9,
            opacity: 0.5,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(productEl, {
                scale: 1,
                opacity: 0.6,
                duration: 0.3,
                ease: "power2.out",
              });
            },
          });
        });
        
        // Wait before next item
        mainTl.to({}, { duration: 1.5 });
      });
      
      // Checkout animation
      mainTl.to({}, { duration: 0.5 }); // Brief pause
      
      // Subtle highlight on checkout button
      mainTl.to(checkoutBtnRef.current, {
        scale: 1.05,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
      
      // Click effect
      mainTl.to(checkoutBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in",
      });
      
      mainTl.to(checkoutBtnRef.current, {
        scale: 1,
        opacity: 0.7,
        duration: 0.15,
        ease: "power2.out",
      });
      
      // Show success checkmark (smaller, subtler)
      mainTl.to(successOverlayRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      
      // Cart empties with a spin
      mainTl.to(cartRef.current, {
        rotation: 360,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.inOut",
      }, "<0.2");
      
      // Reset cart count during spin
      mainTl.call(() => {
        setCartCount(0);
      }, [], "<0.25");
      
      // Cart returns to normal
      mainTl.to(cartRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      
      // Hold success message
      mainTl.to({}, { duration: 1.5 });
      
      // Fade out success overlay
      mainTl.to(successOverlayRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
      
      // Brief pause before loop
      mainTl.to({}, { duration: 0.5 });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pb-8 overflow-hidden bg-[#0a0a10] flex flex-col">
      {/* Flying item - hidden by default */}
      <div 
        ref={flyingItemRef}
        className="absolute w-6 h-6 rounded-lg opacity-0 pointer-events-none z-50 shadow-lg"
        style={{ willChange: "transform, opacity" }}
      />
      
      {/* Giant Title - THE MAIN FOCUS */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Shopping bag icon above title */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#ff8a3c] to-[#ff6b1a] flex items-center justify-center mb-3 shadow-lg shadow-[#ff8a3c]/30">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        
        {/* Big Title */}
        <h2 
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-center leading-[0.9]"
        >
          {title}
        </h2>
        
        {/* Subtle tagline */}
        <p className="text-[10px] sm:text-xs text-zinc-500 mt-2 tracking-widest uppercase">
          Myy verkossa 24/7
        </p>

        {/* Shopping Cart & Checkout - floating */}
        <div className="absolute top-4 right-4 flex flex-col items-center gap-1.5">
          <div 
            ref={cartRef}
            style={{ willChange: "transform" }}
          >
            <div className="relative">
              <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div 
                ref={cartBadgeRef}
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff8a3c] rounded-full flex items-center justify-center text-[8px] font-bold text-black"
                style={{ willChange: "transform" }}
              >
                {cartCount}
              </div>
            </div>
          </div>

          {/* Checkout Button - under cart */}
          <div 
            ref={checkoutBtnRef}
            className="px-2 py-1 bg-[#ff8a3c]/80 rounded text-[6px] font-bold text-black uppercase tracking-wide opacity-70"
            style={{ willChange: "transform, opacity" }}
          >
            Osta
          </div>

          {/* Success checkmark - small, appears over cart area */}
          <div 
            ref={successOverlayRef}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 scale-75 pointer-events-none"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Product Strip at bottom - supporting element */}
      <div className="shrink-0 px-3 pb-3">
        <div className="flex gap-1.5">
          {products.map((product, i) => (
            <div 
              key={i} 
              ref={el => { productRefs.current[i] = el; }}
              className="flex-1 bg-white/[0.03] rounded-lg border border-white/5 p-1.5 opacity-60"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="aspect-square relative bg-zinc-900/50 rounded flex items-center justify-center mb-1">
                <svg className="w-4 h-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {product.sale && (
                  <div className="absolute top-0.5 left-0.5 px-1 py-0.5 bg-red-500/90 rounded text-[4px] font-bold text-white">
                    SALE
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-[#ff8a3c]">{product.price}</span>
                <div className="w-4 h-4 rounded bg-[#ff8a3c]/80 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
