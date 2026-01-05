"use client";

type PageCountSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  description: string;
  pagesUnit: string;
};

export default function PageCountSlider({
  value,
  onChange,
  min = 1,
  max = 20,
  label,
  description,
  pagesUnit,
}: PageCountSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="relative">
      {/* Label */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="font-semibold text-zinc-200">{label}</span>
          <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
        </div>
        <div className="relative flex items-center gap-2">
          <div className="flex h-10 min-w-[4rem] items-center justify-center rounded-lg rounded-br-none border border-[#ff8a3c]/30 bg-[#ff8a3c]/10 px-3">
            <span 
              className="text-lg font-bold text-[#ff8a3c]"
              style={{ fontFamily: "var(--font-goldman)" }}
            >
              {value}
            </span>
          </div>
          <span className="text-sm text-zinc-500">{pagesUnit}</span>
        </div>
      </div>
      
      {/* Slider track */}
      <div className="relative h-2 overflow-hidden rounded-full rounded-br-none bg-zinc-800 border border-zinc-700/50">
        {/* Progress fill */}
        <div 
          className="absolute inset-y-0 left-0 bg-linear-to-r from-[#ff8a3c] to-[#ff8a3c]/70 transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px)] bg-size-[10%_100%] pointer-events-none" />
      </div>
      
      {/* Input range (invisible but functional) */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 top-10 h-2 w-full cursor-pointer opacity-0"
      />
      
      {/* Slider thumb indicator */}
      <div 
        className="absolute top-10 h-4 w-4 -translate-x-1/2 -translate-y-1 rounded-full border-2 border-[#ff8a3c] bg-[#0a0a0a] shadow-[0_0_12px_rgba(255,138,60,0.4)] transition-all duration-150 pointer-events-none"
        style={{ left: `${percentage}%` }}
      />
      
      {/* Min/Max labels */}
      <div className="mt-4 flex justify-between text-xs text-zinc-600">
        <span>{min}</span>
        <span>{max}+</span>
      </div>
    </div>
  );
}
