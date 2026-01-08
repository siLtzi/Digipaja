type MetricItem = {
  label: string;
  value: string;
};

type ProjectMetricsProps = {
  metrics: MetricItem[];
};

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Top laser beam separator */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40" />
        <div className="absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)]" />
        <div className="absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90" />
      </div>

      {/* Bottom laser beam separator */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40" />
        <div className="absolute bottom-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)]" />
        <div className="absolute bottom-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 text-center transition-all duration-300 hover:border-[#ff8a3c]/30 hover:bg-white/[0.05]"
            >
              {/* Corner decorations */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 h-3 w-3 border-l border-t border-[#ff8a3c]" />
                <div className="absolute top-0 right-0 h-3 w-3 border-r border-t border-[#ff8a3c]" />
                <div className="absolute bottom-0 left-0 h-3 w-3 border-l border-b border-[#ff8a3c]" />
                <div className="absolute bottom-0 right-0 h-3 w-3 border-r border-b border-[#ff8a3c]" />
              </div>

              {/* Index number */}
              <span className="absolute top-2 right-3 text-[10px] font-bold text-zinc-700 group-hover:text-[#ff8a3c]/50 transition-colors">
                0{index + 1}
              </span>

              <p
                style={{ fontFamily: "var(--font-goldman)" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff8a3c] mb-2 transition-transform duration-300 group-hover:scale-110"
              >
                {metric.value}
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-[0.15em]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
