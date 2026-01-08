"use client";

import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HammerIcon } from "@/components/icons/HammerIcon";

export type HammerStrikeHandle = {
  show: () => void;
  hide: () => void;
  strike: (opts?: { onComplete?: () => void }) => void;
};

type HammerStrikeProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  className?: string;
};

export const HammerStrike = forwardRef<HammerStrikeHandle, HammerStrikeProps>(
  function HammerStrike({ targetRef, className }, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const hammerRef = useRef<HTMLDivElement>(null);
    const sparksRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: rootRef });

    const show = useCallback(() => {
      contextSafe(() => {
        const el = hammerRef.current;
        if (!el) return;

        gsap.killTweensOf(el);
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.25,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        });
      })();
    }, [contextSafe]);

    const hide = useCallback(() => {
      contextSafe(() => {
        const el = hammerRef.current;
        if (!el) return;

        gsap.killTweensOf(el);
        gsap.to(el, {
          opacity: 0,
          scale: 0.5,
          duration: 0.12,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(el, { opacity: 0, scale: 0.5 });
          },
        });
      })();
    }, [contextSafe]);

    const strike = useCallback(
      (opts?: { onComplete?: () => void }) => {
        contextSafe((safeOpts?: { onComplete?: () => void }) => {
          const hammerEl = hammerRef.current;
          const sparksEl = sparksRef.current;
          const targetEl = targetRef.current;

          if (!hammerEl || !sparksEl || !targetEl) return;
          if (gsap.isTweening(hammerEl)) return;

          gsap.set(hammerEl, { transformOrigin: "90% 10%" });

          const tl = gsap.timeline({
            onComplete: () => {
              safeOpts?.onComplete?.();
            },
          });

          tl.to(hammerEl, {
            rotation: 45,
            scale: 1.2,
            duration: 0.25,
            ease: "back.out(1.2)",
          })
            .to(hammerEl, {
              rotation: -15,
              scale: 1.32,
              duration: 0.1,
              ease: "power4.in",
              onComplete: () => {
            // ---- IMPORTANT: disable CSS transition on the button during the hit ----
            const prevTransition = (targetEl as HTMLElement).style.transition;
            (targetEl as HTMLElement).style.transition = "none";

            // Also helps reduce "nothing happens" feel on some GPUs
            const prevWillChange = (targetEl as HTMLElement).style.willChange;
            (targetEl as HTMLElement).style.willChange = "transform, filter";

            // kill any running tweens on target
            gsap.killTweensOf(targetEl);
            gsap.set(targetEl, { transformOrigin: "50% 50%" });

            // BIG, obvious hit
            gsap.fromTo(
              targetEl,
              { scaleX: 1, scaleY: 1, y: 0, rotation: 0 },
              {
                scaleX: 0.98,
                scaleY: 0.86,
                y: 6,
                rotation: -1.2,
                duration: 0.07,
                ease: "power4.out",
                yoyo: true,
                repeat: 1,
                overwrite: "auto",
                clearProps: "scaleX,scaleY,y,rotation",
              }
            );

            // brightness flash
            gsap.fromTo(
              targetEl,
              { filter: "brightness(1)" },
              {
                filter: "brightness(1.4)",
                duration: 0.07,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                overwrite: "auto",
                clearProps: "filter",
              }
            );

            // glow pulse
            gsap.fromTo(
              targetEl,
              { boxShadow: "0 0 0px rgba(255,138,60,0)" },
              {
                boxShadow: "0 0 22px rgba(255,138,60,0.45)",
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                overwrite: "auto",
                clearProps: "boxShadow",
              }
            );

            // shake
            gsap.fromTo(
              targetEl,
              { x: 0, y: 0 },
              {
                x: () => (Math.random() - 0.5) * 10,
                y: () => (Math.random() - 0.5) * 10,
                duration: 0.05,
                repeat: 5,
                yoyo: true,
                clearProps: "x,y",
              }
            );

            // restore CSS transition after the hit finishes
            gsap.delayedCall(0.45, () => {
              (targetEl as HTMLElement).style.transition = prevTransition;
              (targetEl as HTMLElement).style.willChange = prevWillChange;
            });

            // ---- SPARKS ----
            const sparks = gsap.utils.toArray(sparksEl.children);
            gsap.set(sparks, { x: 0, y: 0, opacity: 1, scale: 1 });

            gsap.to(sparks, {
              x: (i) => Math.cos((i as number) * 30 * (Math.PI / 180)) * 100,
              y: (i) => Math.sin((i as number) * 30 * (Math.PI / 180)) * 100,
              opacity: 0,
              scale: 0,
              duration: 0.5,
              ease: "expo.out",
            });

            gsap.fromTo(
              sparks,
              { backgroundColor: "#ffffff", boxShadow: "0 0 10px white" },
              {
                backgroundColor: "#ff8a3c",
                boxShadow: "0 0 0px transparent",
                duration: 0.2,
              }
            );
              },
            })
            .to(hammerEl, {
              rotation: 0,
              scale: 1,
              duration: 0.2,
              ease: "elastic.out(1, 0.5)",
            })
            .to(hammerEl, {
              opacity: 0,
              scale: 0.5,
              duration: 0.2,
            });
        })(opts);
      },
      [contextSafe, targetRef]
    );

    useImperativeHandle(ref, () => ({ show, hide, strike }), [show, hide, strike]);

    return (
      <div ref={rootRef} className={`pointer-events-none ${className ?? ""}`}>
        <div
          ref={hammerRef}
          className="absolute -top-10 -right-6 w-20 h-20 pointer-events-none opacity-0 z-20"
          style={{ transformOrigin: "90% 10%" }}
        >
          <HammerIcon className="w-full h-full drop-shadow-xl" />
        </div>

        <div
          ref={sparksRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none z-30"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-4 bg-white rounded-full opacity-0 pointer-events-none"
              style={{
                transform: `rotate(${i * 30}deg) translateY(0px)`,
                transformOrigin: "center bottom",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);
