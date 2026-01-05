"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CustomCursorProps = {
  enabled?: boolean;
};

type Point = { x: number; y: number };

export default function CustomCursor({ enabled = true }: CustomCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mousePos = useRef<Point>({ x: -100, y: -100 });
  const animationRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const drawTail = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Update canvas size if needed
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add current mouse position to points
    const points = pointsRef.current;
    points.unshift({ ...mousePos.current });

    // Keep limited points for tail length
    const maxPoints = 25;
    if (points.length > maxPoints) {
      points.length = maxPoints;
    }

    // Smooth the points - each point lerps toward the one before it
    for (let i = points.length - 1; i > 0; i--) {
      points[i].x = lerp(points[i].x, points[i - 1].x, 0.35);
      points[i].y = lerp(points[i].y, points[i - 1].y, 0.35);
    }

    if (points.length < 2 || !isVisible) {
      animationRef.current = requestAnimationFrame(drawTail);
      return;
    }

    // Draw the smooth tail
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw from tail to head with increasing thickness and opacity
    for (let i = points.length - 1; i > 0; i--) {
      const t = 1 - i / points.length; // 0 at tail, 1 at head
      const nextT = 1 - (i - 1) / points.length;
      
      // Thickness: thin at tail, thick at head (teardrop shape)
      const thickness = lerp(1, isHovering ? 14 : 10, t * t); // Quadratic for smoother taper
      
      // Opacity: fade out toward tail
      const opacity = lerp(0, 0.9, t);

      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i - 1].x, points[i - 1].y);
      ctx.strokeStyle = `rgba(255, 138, 60, ${opacity})`;
      ctx.lineWidth = thickness;
      ctx.stroke();
    }

    animationRef.current = requestAnimationFrame(drawTail);
  }, [isVisible, isHovering]);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) setIsVisible(true);

      // Update cursor dot position smoothly
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => {
      setIsVisible(false);
      mousePos.current = { x: -100, y: -100 };
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
      return elements;
    };

    const elements = attachHoverListeners();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    document.body.style.cursor = "none";

    const observer = new MutationObserver(() => attachHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    // Start animation loop
    animationRef.current = requestAnimationFrame(drawTail);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      observer.disconnect();
      document.body.style.cursor = "";
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [enabled, isVisible, drawTail]);

  if (!enabled) return null;

  return (
    <>
      {/* Canvas for smooth tail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Center dot (head of teardrop) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: -100,
          top: -100,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <div
          className="rounded-full bg-[#ff8a3c]"
          style={{
            width: isHovering ? "16px" : "12px",
            height: isHovering ? "16px" : "12px",
            transform: isClicking ? "scale(0.8)" : "scale(1)",
            transition: "width 0.2s ease, height 0.2s ease, transform 0.1s ease",
            boxShadow: isHovering 
              ? "0 0 20px 6px rgba(255,138,60,0.5)" 
              : "0 0 12px 4px rgba(255,138,60,0.4)",
          }}
        />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
