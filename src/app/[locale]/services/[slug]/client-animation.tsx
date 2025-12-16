"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ServiceClientAnimation() {
  useGSAP(() => {
    // Only run on client-side
    const tl = gsap.timeline();

    tl.fromTo(
      ".animate-hero",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    ).fromTo(
      ".animate-feature",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      "-=0.4"
    );
  });

  return null; // This component renders nothing visually, just handles logic
}