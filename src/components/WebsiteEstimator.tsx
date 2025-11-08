"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

type SiteType = "portfolio" | "business" | "ecommerce" | "booking" | "custom";

export default function WebsiteEstimator() {
  const [type, setType] = useState<SiteType>("business");
  const [pages, setPages] = useState(4);
  const [features, setFeatures] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<"normal" | "fast" | "rush">("normal");

  const basePrices: Record<SiteType, number> = {
    portfolio: 200,
    business: 300,
    ecommerce: 500,
    booking: 450,
    custom: 600,
  };

  const featurePrices: Record<string, number> = {
    blog: 80,
    gallery: 50,
    contact: 30,
    checkout: 100,
    booking: 120,
    multilingual: 100,
    seo: 60,
    cms: 80,
  };

  const multiplier = deadline === "normal" ? 1 : deadline === "fast" ? 1.2 : 1.5;

  const total = useMemo(() => {
    const base = basePrices[type];
    const extraPages = Math.max(pages - 1, 0) * 40;
    const extras = features.reduce((sum, f) => sum + (featurePrices[f] || 0), 0);
    return Math.round((base + extraPages + extras) * multiplier);
  }, [type, pages, features, deadline]);

  const toggleFeature = (f: string) => {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  return (
    <div
      className="w-full max-w-xs rounded-2xl bg-white/10 dark:bg-zinc-900/30 
                 backdrop-blur-md p-6 shadow-md border border-white/10 
                 dark:border-zinc-700/20 transition-all"
    >
      <h3 className="text-xl font-semibold mb-3">Website Estimator</h3>

      {/* Type */}
      <label className="block text-sm font-medium mb-1">Type</label>
      <select
        className="w-full rounded-lg bg-white/20 dark:bg-zinc-800/50 
                   border border-transparent p-2 text-sm mb-3"
        value={type}
        onChange={(e) => setType(e.target.value as SiteType)}
      >
        <option value="portfolio">Portfolio</option>
        <option value="business">Business</option>
        <option value="ecommerce">E-commerce</option>
        <option value="booking">Booking</option>
        <option value="custom">Custom</option>
      </select>

      {/* Pages */}
      <label className="block text-sm font-medium mb-1">
        Pages: <span className="font-semibold">{pages}</span>
      </label>
      <input
        type="range"
        min={1}
        max={15}
        value={pages}
        onChange={(e) => setPages(Number(e.target.value))}
        className="w-full mb-3 accent-zinc-700 dark:accent-zinc-300"
      />

      {/* Features */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Features</label>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {Object.keys(featurePrices).map((f) => (
            <label key={f} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={features.includes(f)}
                onChange={() => toggleFeature(f)}
                className="accent-zinc-700 dark:accent-zinc-300"
              />
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Deadline */}
      <label className="block text-sm font-medium mb-1">Deadline</label>
      <div className="flex gap-2 text-sm mb-4">
        {["normal", "fast", "rush"].map((d) => (
          <button
            key={d}
            onClick={() => setDeadline(d as any)}
            className={`flex-1 rounded-lg p-2 transition ${
              deadline === d
                ? "bg-zinc-800 text-white dark:bg-white dark:text-zinc-900"
                : "bg-white/10 dark:bg-zinc-800/40 hover:bg-white/20"
            }`}
          >
            {d === "normal" ? "Normal" : d === "fast" ? "Fast" : "Rush"}
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="text-center">
        <p className="text-sm opacity-80">Estimated total</p>
        <p className="text-3xl font-bold mt-1 transition-all duration-300">
          €{total}
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          (approximate, depends on details)
        </p>

        <Link
          href="#contact"
          className="inline-block mt-4 rounded-full bg-black text-white 
                     dark:bg-white dark:text-black px-5 py-2 text-sm 
                     font-medium hover:opacity-90 transition"
        >
          Get a personalized quote
        </Link>
      </div>
    </div>
  );
}
