"use client";

export type ProjectType = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

type ProjectTypeCardProps = ProjectType & {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
};

export default function ProjectTypeCard({ 
  id, 
  label, 
  description, 
  icon, 
  selected, 
  onClick,
  disabled = false,
  disabledText = "Pro",
}: ProjectTypeCardProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group relative overflow-hidden rounded-lg rounded-br-none border p-5 text-left transition-all duration-300 ${
        disabled
          ? "border-zinc-800/50 bg-[#0a0a0a]/50 cursor-not-allowed opacity-50"
          : selected
            ? "border-[#ff8a3c] bg-linear-to-br from-[#ff8a3c]/10 to-transparent shadow-[0_0_30px_rgba(255,138,60,0.15)]"
            : "border-zinc-800 bg-[#0a0a0a] hover:border-zinc-700 hover:bg-[#0f0f0f]"
      }`}
    >
      {/* Disabled badge */}
      {disabled && (
        <div className="absolute top-3 right-3 rounded-full bg-zinc-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {disabledText}
        </div>
      )}
      {/* Top corner bracket */}
      <div className={`absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 transition-all duration-300 ${
        selected ? "border-[#ff8a3c]" : "border-zinc-700 group-hover:border-zinc-600"
      }`} />
      
      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff8a3c]">
          <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-size-[20px_20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Icon */}
      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg border transition-all duration-300 ${
        selected 
          ? "border-[#ff8a3c]/30 bg-[#ff8a3c]/10" 
          : "border-zinc-700 bg-zinc-800/50 group-hover:border-zinc-600"
      }`}>
        <span className="text-2xl">{icon}</span>
      </div>
      
      <h4 className={`text-lg font-bold transition-colors ${
        selected ? "text-[#ff8a3c]" : "text-white group-hover:text-zinc-200"
      }`} style={{ fontFamily: "var(--font-goldman)" }}>
        {label}
      </h4>
      <p className="mt-1 text-xs text-zinc-500">{description}</p>
    </button>
  );
}
