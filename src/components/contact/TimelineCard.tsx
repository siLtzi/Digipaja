"use client";

type TimelineCardProps = {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

export default function TimelineCard({
  id,
  label,
  description,
  selected,
  onClick,
}: TimelineCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-lg rounded-br-none border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-[#ff8a3c]/50 bg-linear-to-br from-[#ff8a3c]/10 to-[#ff8a3c]/5"
          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
      }`}
    >
      {/* Corner accent */}
      <div className={`absolute top-0 left-0 h-2.5 w-2.5 transition-colors duration-300 ${
        selected ? "border-l border-t border-[#ff8a3c]/50" : "border-l border-t border-zinc-700/50"
      }`} />
      
      {/* Grid pattern on hover */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-size-[12px_12px] pointer-events-none transition-opacity duration-300 ${
        selected ? "opacity-100" : "opacity-0 group-hover:opacity-60"
      }`} />
      
      <div className="relative flex items-start gap-3">
        {/* Radio indicator */}
        <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          selected
            ? "border-2 border-[#ff8a3c] bg-[#ff8a3c]/20"
            : "border border-zinc-600 bg-zinc-800/50 group-hover:border-zinc-500"
        }`}>
          {selected && (
            <div className="h-1.5 w-1.5 rounded-full bg-[#ff8a3c] animate-pulse" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className={`font-semibold transition-colors duration-300 ${
            selected ? "text-white" : "text-zinc-300 group-hover:text-white"
          }`}>
            {label}
          </div>
          <p className={`mt-1 text-xs leading-relaxed transition-colors duration-300 ${
            selected ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-400"
          }`}>
            {description}
          </p>
        </div>
      </div>
      
      {/* Selection glow */}
      {selected && (
        <div className="absolute inset-0 bg-linear-to-r from-[#ff8a3c]/5 via-transparent to-transparent pointer-events-none" />
      )}
    </button>
  );
}
