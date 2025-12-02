"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type BrothersRevealProps = {
  children: React.ReactNode;
};

export default function BrothersReveal({ children }: BrothersRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const primary = el.querySelector<HTMLElement>("[data-brothers-primary]");
      const secondary = el.querySelector<HTMLElement>(
        "[data-brothers-secondary]"
      );
      const samuli = el.querySelector<HTMLElement>(
        '[data-brothers-card="samuli"]'
      );
      const jouko = el.querySelector<HTMLElement>(
        '[data-brothers-card="jouko"]'
      );

      const samuliLine = el.querySelector<HTMLElement>(
        '[data-brothers-line="samuli"]'
      );
      const joukoLine = el.querySelector<HTMLElement>(
        '[data-brothers-line="jouko"]'
      );

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 768px)").matches;

      // --- PRIMARY HEADING ---
      if (primary) {
        gsap.fromTo(
          primary,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- SECONDARY HEADING TYPEWRITER ---
      if (secondary) {
        // Haetaan <span> sisällä oleva tekstielementti
        const textSpan = secondary.querySelector("span") as HTMLElement | null;

        if (textSpan) {
          // Otetaan talteen koko alkuperäinen teksti
          const fullText = textSpan.textContent ?? "";

          // Tyhjennetään teksti näkyvistä ennen animaation alkua
          textSpan.textContent = "";

          // Tämä objekti on "animaatio-arvo", johon GSAP kirjoittaa lukuja 0 → fullText.length
          const typeObj = { chars: 0 };

          gsap.fromTo(
            // ANIMOITAVA OBJEKTI
            typeObj,

            // ALKUTILA
            { chars: 0 },

            // LOPPUTILA + ASETUKSET
            {
              chars: fullText.length, // animoidaan numero 0 → merkkien kokonaismäärä

              ease: "none", // ei hidastuksia, tasainen "kirjoitusnopeus"

              duration: 1.2, // kuinka kauan koko kirjoitus kestää ajassa (sekunteina)

              // ScrollTrigger kertoo MILLON animaatio käynnistetään
              scrollTrigger: {
                trigger: el, // animaation käynnistyspiste on koko tämä osio
                start: "top 80%", // kun osion yläreuna osuu viewportin 80% korkeuteen
                toggleActions: "play none none none",
                // selitys:
                // play = animaatio pyörii kun trigger täyttyy
                // none none none = älä tee mitään muissa trigger-tilanteissa
              },

              onUpdate() {
                // Tämä ajetaan joka frame → päivitetään näkyvä tekstimäärä
                const current = Math.round(typeObj.chars);

                // Otetaan alkuperäisestä tekstistä palanen 0 → current merkkiin
                textSpan.textContent = fullText.slice(0, current);
              },

              onLeave() {
                // Kun skrollataan ohi → varmistetaan että koko teksti näkyy
                textSpan.textContent = fullText;
              },

              onLeaveBack() {
                // Kun skrollataan takaisin ylös → tyhjennetään teksti uudelleen
                textSpan.textContent = "";
              },
            }
          );
        }
      }

      // --- SAMULI CARD (simple fade-up) ---
      if (samuli) {
        if (isMobile) {
          gsap.fromTo(
            samuli,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        } else {
          gsap.fromTo(
            samuli,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: samuli,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // --- JOUKO CARD (simple fade-up) ---
      if (jouko) {
        if (isMobile) {
          gsap.fromTo(
            jouko,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        } else {
          gsap.fromTo(
            jouko,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: jouko,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // --- SAMULI LINE ---
      if (samuliLine) {
        gsap.fromTo(
          samuliLine,
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: samuliLine,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- JOUKO LINE ---
      if (joukoLine) {
        gsap.fromTo(
          joukoLine,
          { scaleX: 0, opacity: 0, transformOrigin: "right center" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: joukoLine,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
