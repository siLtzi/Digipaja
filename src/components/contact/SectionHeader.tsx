"use client";

type SectionHeaderProps = {
  number: string;
  title: string;
  description: string;
};

export default function SectionHeader({ number, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      {/* Tech-style header with number */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="flex h-8 w-8 items-center justify-center rounded rounded-br-none border border-[#ff8a3c]/30 bg-[#ff8a3c]/5 text-xs font-bold text-[#ff8a3c]"
            style={{ fontFamily: "var(--font-goldman)" }}
          >
            {number}
          </span>
          <div className="h-px w-8 bg-linear-to-r from-[#ff8a3c]/50 to-transparent" />
        </div>
        <div className="h-px flex-1 bg-linear-to-r from-zinc-700/50 via-zinc-800/30 to-transparent" />
      </div>
      
      <h2 
        className="text-2xl font-bold text-white sm:text-3xl"
        style={{ fontFamily: "var(--font-goldman)" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
