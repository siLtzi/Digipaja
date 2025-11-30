"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type HeroAdjectiveProps = {
  words: string[];
};

export default function HeroAdjective({ words }: HeroAdjectiveProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!spanRef.current || words.length <= 1) return;

    const el = spanRef.current;
    let currentIndex = 0;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    // cycle words, animate out → change text → animate in
    words.forEach((word, i) => {
      tl.to(
        {},
        {
          duration: i === 0 ? 0 : 2, // stay a bit on each word
          onStart: () => {
            const nextWord = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;

            gsap.to(el, {
              opacity: 0,
              y: 10,
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => {
                el.textContent = nextWord;
                gsap.to(el, {
                  opacity: 1,
                  y: 0,
                  duration: 0.35,
                  ease: "power2.out",
                });
              },
            });
          },
        }
      );
    });

    return () => {
      tl.kill();
    };
  }, [words]);

  return (
    <span
      ref={spanRef}
      // IMPORTANT: single-line, stable className, no newlines
      className="inline-block bg-gradient-to-r from-fuchsia-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent"
    >
      {words[0]}
    </span>
  );
}
