"use client";

import { useRef, useEffect } from "react";

// Theme colors - orange palette matching site
const THEME = {
  particles: {
    small: "#ff8a3c",
    medium: "#ffb347", 
    large: "#ffd699",
  },
  // Light beam colors - gradient from deep to light orange
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
  width: number;
  height: number;
  alpha: number;
  color: string;
  phase: number;
  phaseSpeed: number;
  scaleX: number;
  scaleY: number;
  moveX: number;
  moveY: number;
}

function range(min: number, max: number): number {
  return min + (max - min) * Math.random();
}

// Weighted toward center
function weightedRandom(min: number, max: number, weight: number = 0.8): number {
  const mid = (min + max) / 2;
  const halfSpread = (max - min) / 2;
  
  if (Math.random() < weight) {
    // Concentrated toward center with gaussian-like distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mid + gaussian * halfSpread * 0.3;
  }
  return min + Math.random() * (max - min);
}

// Create ultra-soft horizontal glow - no visible edges
function createLightBeamTexture(width: number, height: number, color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  // Very large canvas - gradient fills entire thing
  canvas.width = width * 3;
  canvas.height = height * 4;
  const ctx = canvas.getContext("2d")!;
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  // Create horizontal elliptical glow using scale transform
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(width / height, 1); // Stretch horizontally
  
  // Single ultra-smooth radial gradient - no hard edges
  const radius = canvas.height / 2;
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  
  // Very gradual falloff - many stops for smoothness
  gradient.addColorStop(0, color + "40");      // 25% at center
  gradient.addColorStop(0.05, color + "38");
  gradient.addColorStop(0.1, color + "30");
  gradient.addColorStop(0.15, color + "28");
  gradient.addColorStop(0.2, color + "22");
  gradient.addColorStop(0.3, color + "1a");
  gradient.addColorStop(0.4, color + "14");
  gradient.addColorStop(0.5, color + "0f");
  gradient.addColorStop(0.6, color + "0a");
  gradient.addColorStop(0.7, color + "06");
  gradient.addColorStop(0.8, color + "03");
  gradient.addColorStop(0.9, color + "01");
  gradient.addColorStop(1, "transparent");
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  
  return canvas;
}

// Create glow texture for filled particles
function createGlowTexture(size: number, color: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size * 4;
  canvas.height = size * 4;
  const ctx = canvas.getContext("2d")!;
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 2);
  gradient.addColorStop(0, color + "FF");
  gradient.addColorStop(0.3, color + "99");
  gradient.addColorStop(0.6, color + "33");
  gradient.addColorStop(1, "transparent");
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 2, 0, Math.PI * 2);
  ctx.fill();
  
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

    // Pre-create textures
    const glowTextureMedium = createGlowTexture(12, THEME.particles.medium);
    const glowTextureLarge = createGlowTexture(40, THEME.particles.large);
    
    // Light beam textures - ultra wide and soft
    const lightTextures = [
      createLightBeamTexture(1200, 150, THEME.lights[0]),  // Main wide beam
      createLightBeamTexture(900, 400, THEME.lights[1]),   // Secondary glow  
      createLightBeamTexture(500, 250, THEME.lights[2]),   // Accent
    ];

    // Initialize particles with proper distribution
    const particles: Particle[] = [];
    
    // Small ring particles - 300, concentrated in horizontal band
    for (let i = 0; i < 300; i++) {
      const initX = weightedRandom(0, width, 0.6);
      // Concentrate in middle 50% of height
      const initY = weightedRandom(height * 0.25, height * 0.75, 0.8);
      
      particles.push({
        x: initX,
        y: initY,
        initX,
        initY,
        radius: range(1.5, 3),
        color: THEME.particles.small,
        alpha: range(0, 0.1),
        alphaMax: range(0.3, 0.5),
        alphaDir: 1,
        speed: range(0.0003, 0.001),
        distance: range(2, 6),
        fill: false,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: range(0.001, 0.004) * (Math.random() > 0.5 ? 1 : -1),
        scale: 1,
      });
    }

    // Medium filled particles - 100
    for (let i = 0; i < 100; i++) {
      const initX = weightedRandom(0, width, 0.5);
      const initY = weightedRandom(height * 0.15, height * 0.85, 0.7);
      
      particles.push({
        x: initX,
        y: initY,
        initX,
        initY,
        radius: range(4, 10),
        color: THEME.particles.medium,
        alpha: range(0, 0.05),
        alphaMax: range(0.15, 0.35),
        alphaDir: 1,
        speed: range(0.0002, 0.0008),
        distance: range(8, 20),
        fill: true,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: range(0.0005, 0.002) * (Math.random() > 0.5 ? 1 : -1),
        scale: range(0.5, 1),
      });
    }

    // Large glowing orbs - 12
    for (let i = 0; i < 12; i++) {
      const initX = weightedRandom(width * 0.1, width * 0.9, 0.4);
      const initY = weightedRandom(height * 0.2, height * 0.8, 0.6);
      
      particles.push({
        x: initX,
        y: initY,
        initX,
        initY,
        radius: range(20, 40),
        color: THEME.particles.large,
        alpha: range(0, 0.02),
        alphaMax: range(0.1, 0.25),
        alphaDir: 1,
        speed: range(0.0001, 0.0004),
        distance: range(20, 50),
        fill: true,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: range(0.0002, 0.001) * (Math.random() > 0.5 ? 1 : -1),
        scale: range(0.6, 1),
      });
    }

    // Initialize lights - ultra soft horizontal beam effect
    const lights: Light[] = [
      {
        x: width / 2,
        y: height / 2,
        width: 1200,
        height: 150,
        alpha: 1,  // Full alpha since gradient itself is subtle
        color: THEME.lights[0],
        phase: 0,
        phaseSpeed: 0.0003,
        scaleX: 1.2,
        scaleY: 1,
        moveX: 0,
        moveY: 0,
      },
      {
        x: width / 2 - 30,
        y: height / 2,
        width: 900,
        height: 400,
        alpha: 0.8,
        color: THEME.lights[1],
        phase: Math.PI / 3,
        phaseSpeed: 0.00025,
        scaleX: 1,
        scaleY: 1,
        moveX: 0,
        moveY: 0,
      },
      {
        x: width / 2 + 80,
        y: height / 2 - 20,
        width: 500,
        height: 250,
        alpha: 0.6,
        color: THEME.lights[2],
        phase: Math.PI / 2,
        phaseSpeed: 0.0004,
        scaleX: 1,
        scaleY: 1,
        moveX: 0,
        moveY: 0,
      },
    ];

    let lastTime = performance.now();
    
    function animate(currentTime: number) {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Draw lights first (background glow beams)
      lights.forEach((light, i) => {
        light.phase += light.phaseSpeed * dt;
        
        const sin = Math.sin(light.phase);
        const cos = Math.cos(light.phase * 0.7);
        
        // Animate scale and position
        if (i === 0) {
          light.scaleX = 1.5 + sin * 0.5;
          light.scaleY = 0.8 + cos * 0.2;
        } else if (i === 1) {
          light.scaleX = 1 + sin * 0.3;
          light.scaleY = 1 + cos * 0.4;
          light.moveX = cos * 80;
          light.moveY = sin * 30;
        } else {
          light.scaleX = 1 + sin * 0.2;
          light.scaleY = 1 + cos * 0.2;
          light.moveX = cos * 120;
          light.moveY = sin * 40;
        }

        const texture = lightTextures[i];
        const drawWidth = texture.width * light.scaleX;
        const drawHeight = texture.height * light.scaleY;
        
        ctx.save();
        ctx.globalAlpha = light.alpha;
        ctx.globalCompositeOperation = "screen";
        ctx.drawImage(
          texture,
          light.x + light.moveX - drawWidth / 2,
          light.y + light.moveY - drawHeight / 2,
          drawWidth,
          drawHeight
        );
        ctx.restore();
      });

      // Draw particles with additive blending
      ctx.globalCompositeOperation = "lighter";
      
      particles.forEach((p) => {
        // Update position - gentle circular drift
        p.angle += p.angleSpeed * dt * 0.05;
        p.x = p.initX + Math.cos(p.angle) * p.distance;
        p.y = p.initY + Math.sin(p.angle * 0.7) * p.distance * 0.5;

        // Alpha pulsing
        p.alpha += p.alphaDir * p.speed * dt;
        if (p.alpha >= p.alphaMax) {
          p.alpha = p.alphaMax;
          p.alphaDir = -1;
        } else if (p.alpha <= 0) {
          p.alpha = 0;
          p.alphaDir = 1;
          p.speed = range(0.0002, 0.001);
        }

        if (p.alpha <= 0.01) return;

        ctx.globalAlpha = p.alpha;

        if (p.fill) {
          // Use pre-rendered glow texture
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
          // Ring particles - simple strokes
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

    // Resize handler
    function handleResize() {
      if (!parent) return;
      
      const newWidth = parent.offsetWidth;
      const newHeight = parent.offsetHeight;
      
      // Scale particle positions
      const scaleX = newWidth / width;
      const scaleY = newHeight / height;
      
      particles.forEach((p) => {
        p.initX *= scaleX;
        p.initY *= scaleY;
        p.x = p.initX;
        p.y = p.initY;
      });

      // Update light positions
      lights.forEach((l) => {
        l.x = newWidth / 2 + (l.x - width / 2) * scaleX;
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
