"use client";
import { useEffect, useState } from "react";

export default function SectionDots({
  sections,
  side = "right",
}: {
  sections: string[];
  side?: "right" | "left";
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setActive(index);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px", // triggers when section's middle hits viewport center
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const sidePos =
    side === "right" ? "right-4 sm:right-6" : "left-4 sm:left-6";

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed top-1/2 -translate-y-1/2 ${sidePos} z-40 pointer-events-auto`}
    >
      <ul className="flex flex-col items-center gap-4">
        {sections.map((id, i) => {
          const isActive = i === active;
          const dist = Math.abs(i - active);
          const scale =
            dist === 0 ? 1.4 : dist === 1 ? 1.1 : dist === 2 ? 0.9 : 0.7;
          const opacity = dist === 0 ? 1 : dist === 1 ? 0.8 : 0.6;

          return (
            <li key={id}>
              <button
                onClick={() =>
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="relative block rounded-full transition-transform duration-300 ease-out"
                style={{
                  width: 10,
                  height: 10,
                  transform: `scale(${scale})`,
                  opacity,
                  background: "rgba(255,255,255,0.9)",
                  boxShadow: isActive
                    ? "0 0 4px rgba(255,255,255,0.8)"
                    : "0 0 2px rgba(0,0,0,0.3)",
                }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
