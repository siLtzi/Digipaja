import Link from "next/link";

type ProjectCTAProps = {
  locale: "fi" | "en";
  title: string;
  description: string;
  buttonText: string;
  backText: string;
};

export default function ProjectCTA({
  locale,
  title,
  description,
  buttonText,
  backText,
}: ProjectCTAProps) {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Top laser beam separator */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center">
        <div className="h-[4px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent blur-md opacity-40" />
        <div className="absolute top-0 h-[2px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-[#ff8a3c] to-transparent shadow-[0_0_20px_2px_rgba(255,138,60,0.6)]" />
        <div className="absolute top-0 h-[1px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#ffe8d6] to-transparent mix-blend-screen opacity-90" />
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,60,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <span
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-[#ff8a3c] text-[11px] sm:text-[13px] uppercase tracking-[0.25em] font-semibold mb-6"
        >
          [ {locale === "fi" ? "Aloitetaan" : "Let's Start"} ]
        </span>

        <h2
          style={{ fontFamily: "var(--font-goldman)" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          {title}
        </h2>
        
        <p className="text-zinc-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href={`/${locale}/yhteydenotto`}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="group relative isolate inline-flex items-center gap-3 px-10 py-5 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a3c] transition-all duration-300 hover:text-white hover:shadow-[0_0_30px_rgba(255,138,60,0.3)]"
          >
            <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#ff8a3c] transition-all duration-300 group-hover:h-full group-hover:w-full" />
            <span className="absolute inset-0 -z-10 bg-[#ff8a3c] opacity-0 transition-opacity duration-300 group-hover:opacity-15" />
            <span className="relative z-10">{buttonText}</span>
            <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <Link
            href={`/${locale}#references`}
            className="group inline-flex items-center gap-2 px-6 py-5 text-sm text-zinc-400 hover:text-[#ff8a3c] transition-colors"
          >
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {backText}
          </Link>
        </div>
      </div>
    </section>
  );
}
