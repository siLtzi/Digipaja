"use client";

import { useRef, useEffect } from "react";

// Theme colors - orange palette
const THEME = {
  particles: {
    small: "#ff8a3c",
    medium: "#ffb347",
    large: "#ffd699",
  },
  lights: ["#ff6b00", "#ff8a3c", "#ffb347"],
};

interface Particle {
  x: number;
  y: number;
  initX: number;
  initY: number;
  radius: number;
  color: string;
  alpha: number;
  alphaMax: number;
  alphaDir: number;
  speed: number;
  distance: number;
  fill: boolean;
  angle: number;
  angleSpeed: number;
  scale: number;
}

interface Light {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  alpha: number;
  color: string;
  phase: number;
  phaseSpeed: number;
}

function range(min: number, max: number): number {
  return min + (max - min) * Math.random();
}

function weightedRandom(min: number, max: number, weight: number = 0.8): number {
  const mid = (min + max) / 2;
  const halfSpread = (max - min) / 2;
  
  if (Math.random() < weight) {
    const u1 = Math.random();
    const u2 = Math.random();
    const gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.min(max, Math.max(min, mid + gaussian * halfSpread * 0.3));
  }
  return min + Math.random() * (max - min);
}

// Pre-render particle glow texture
function createGlowTexture(size: number, color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size * 4;
  canvas.height = size * 4;
  const ctx = canvas.getContext("2d")!;
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, color + "99");
  gradient.addColorStop(0.6, color + "33");
  gradient.addColorStop(1, "transparent");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas;
}

export default function ParticleBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    
    let width = parent.offsetWidth;
    let height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Pre-create particle glow textures
    const glowTextureMedium = createGlowTexture(12, THEME.particles.medium);
    const glowTextureLarge = createGlowTexture(40, THEME.particles.large);

    // Initialize particles
    const particles: Particle[] = [];
    
    // Small ring particles - 300
    for (let i = 0; i < 300; i++) {
      const initX = weightedRandom(0, width, 0.6);
      const initY = weightedRandom(height * 0.25, height * 0.75, 0.8);
      const baseAlpha = range(0.2, 0.45);
      
      particles.push({
        x: initX,
        y: initY,
        initX,
        initY,
        radius: range(1.5, 3),
        color: THEME.particles.small,
        alpha: baseAlpha,
        alphaMax: baseAlpha,  // Keep alpha constant
        alphaDir: 0,  // No flickering
        speed: 0,
        distance: range(5, 15),  // Larger floating distance
        fill: false,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: range(0.004, 0.012) * (Math.random() > 0.5 ? 1 : -1),
        scale: 1,
      });
    }

    // Medium filled particles - 100
    for (let i = 0; i < 100; i++) {
      const initX = weightedRandom(0, width, 0.5);
      const initY = weightedRandom(height * 0.15, height * 0.85, 0.7);
      const baseAlpha = range(0.15, 0.3);
      
      particles.push({
        x: initX,
        y: initY,
        initX,
        initY,
        radius: range(4, 10),
        color: THEME.particles.medium,
        alpha: baseAlpha,
        alphaMax: baseAlpha,
        alphaDir: 0,
        speed: 0,
        distance: range(15, 35),
        fill: true,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: range(0.002, 0.006) * (Math.random() > 0.5 ? 1 : -1),
        scale: range(0.5, 1),
      });
    }

    // Large glowing orbs - 12
    for (let i = 0; i < 12; i++) {
      const initX = weightedRandom(width * 0.1, width * 0.9, 0.4);
      const initY = weightedRandom(height * 0.2, height * 0.8, 0.6);
      const baseAlpha = range(0.1, 0.22);
      
      particles.push({
        x: initX,
        y: initY,
        initX,
        initY,
        radius: range(20, 40),
        color: THEME.particles.large,
        alpha: baseAlpha,
        alphaMax: baseAlpha,
        alphaDir: 0,
        speed: 0,
        distance: range(30, 70),
        fill: true,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: range(0.001, 0.003) * (Math.random() > 0.5 ? 1 : -1),
        scale: range(0.6, 1),
      });
    }

    // Initialize lights - these are drawn directly, no textures
    // Wide horizontal beams spanning almost full width
    const lights: Light[] = [
      {
        x: width / 2,
        y: height / 2,
        radiusX: width * 0.55,  // Even wider
        radiusY: 120,  // Much thicker
        alpha: 0.5,
        color: THEME.lights[0],
        phase: 0,
        phaseSpeed: 0.0003,
      },
      {
        x: width / 2,
        y: height / 2 + 15,
        radiusX: width * 0.5,
        radiusY: 160,
        alpha: 0.4,
        color: THEME.lights[1],
        phase: Math.PI / 3,
        phaseSpeed: 0.00025,
      },
      {
        x: width / 2,
        y: height / 2 - 20,
        radiusX: width * 0.45,
        radiusY: 90,
        alpha: 0.32,
        color: THEME.lights[2],
        phase: Math.PI / 2,
        phaseSpeed: 0.0004,
      },
    ];

    let lastTime = performance.now();
    
    function animate(currentTime: number) {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Draw lights directly on canvas - simple radial gradients
      lights.forEach((light, i) => {
        light.phase += light.phaseSpeed * dt;
        
        const sin = Math.sin(light.phase);
        const cos = Math.cos(light.phase * 0.7);
        
        // Subtle animation
        let scaleX = 1;
        let scaleY = 1;
        let offsetX = 0;
        let offsetY = 0;
        
        if (i === 0) {
          scaleX = 1 + sin * 0.2;
          scaleY = 1 - sin * 0.1;
        } else if (i === 1) {
          scaleX = 1 + sin * 0.15;
          scaleY = 1 + cos * 0.15;
          offsetX = cos * 50;
          offsetY = sin * 20;
        } else {
          scaleX = 1 + sin * 0.1;
          scaleY = 1 + cos * 0.1;
          offsetX = cos * 80;
          offsetY = sin * 30;
        }

        const rx = light.radiusX * scaleX;
        const ry = light.radiusY * scaleY;
        const cx = light.x + offsetX;
        const cy = light.y + offsetY;
        
        // Draw elliptical gradient using scale transform
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(rx / ry, 1);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, ry);
        gradient.addColorStop(0, light.color + "50");  // ~31% at center
        gradient.addColorStop(0.15, light.color + "40");
        gradient.addColorStop(0.3, light.color + "28");
        gradient.addColorStop(0.5, light.color + "18");
        gradient.addColorStop(0.7, light.color + "0a");
        gradient.addColorStop(0.85, light.color + "04");
        gradient.addColorStop(1, light.color + "00");
        
        ctx.globalAlpha = light.alpha;
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.fillRect(-rx * 2, -ry * 2, rx * 4, ry * 4);
        ctx.restore();
      });

      // Draw particles
      ctx.globalCompositeOperation = "lighter";
      
      particles.forEach((p) => {
        // Smooth floating motion
        p.angle += p.angleSpeed * dt * 0.25;
        p.x = p.initX + Math.cos(p.angle) * p.distance;
        p.y = p.initY + Math.sin(p.angle * 0.8) * p.distance * 0.6;

        ctx.globalAlpha = p.alpha;

        if (p.fill) {
          const texture = p.radius > 15 ? glowTextureLarge : glowTextureMedium;
          const size = p.radius * p.scale * 2;
          ctx.drawImage(
            texture,
            p.x - size,
            p.y - size,
            size * 2,
            size * 2
          );
        } else {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.scale, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    function handleResize() {
      if (!parent || !canvas) return;
      
      const newWidth = parent.offsetWidth;
      const newHeight = parent.offsetHeight;
      
      const scaleX = newWidth / width;
      const scaleY = newHeight / height;
      
      particles.forEach((p) => {
        p.initX *= scaleX;
        p.initY *= scaleY;
        p.x = p.initX;
        p.y = p.initY;
      });

      lights.forEach((l) => {
        l.x = newWidth / 2 + (l.x - width / 2);
        l.y = newHeight / 2;
      });

      width = newWidth;
      height = newHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
