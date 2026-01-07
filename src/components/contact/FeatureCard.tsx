"use client";

export type Feature = {
  id: string;
  label: string;
  description: string;
};

type FeatureCardProps = {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  disabledText?: string;
};

export default function FeatureCard({ 
  id, 
  label, 
  description, 
  selected, 
  onClick,
  disabled = false,
  disabledText = "Pro",
}: FeatureCardProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group relative overflow-hidden rounded-lg rounded-br-none border p-4 text-left transition-all duration-300 ${
        disabled
          ? "border-zinc-800/50 bg-[#0a0a0a]/50 cursor-not-allowed opacity-50"
          : selected
            ? "border-[#ff8a3c] bg-linear-to-br from-[#ff8a3c]/10 to-transparent"
            : "border-zinc-800 bg-[#0a0a0a] hover:border-zinc-700"
      }`}
    >
      {/* Disabled indicator */}
      {disabled && (
        <div className="absolute top-2 right-2 rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
          {disabledText}
        </div>
      )}
      {/* Top left corner accent */}
      <div className={`absolute top-0 left-0 h-2 w-2 border-l border-t transition-colors duration-300 ${
        selected ? "border-[#ff8a3c]" : "border-zinc-700"
      }`} />
      
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium transition-colors truncate ${
            selected ? "text-[#ff8a3c]" : "text-zinc-300"
          }`}>
            {label}
          </h4>
          <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{description}</p>
        </div>
        
        {/* Custom checkbox */}
        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded transition-all duration-300 ${
          selected 
            ? "bg-[#ff8a3c] shadow-[0_0_10px_rgba(255,138,60,0.4)]" 
            : "border border-zinc-700 bg-zinc-800/50 group-hover:border-zinc-600"
        }`}>
          {selected && (
            <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      

    </button>
  );
}
