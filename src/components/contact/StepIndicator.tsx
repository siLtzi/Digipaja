"use client";

type Step = {
  id: string;
  title: string;
  icon: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
};

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="form-section relative mb-12">
      {/* Background container with sharp corner */}
      <div className="relative overflow-hidden rounded-lg rounded-br-none border border-zinc-800/80 bg-[#0a0a0a]/90 p-2 backdrop-blur-sm">
        {/* Corner accent */}
        <div className="absolute top-0 left-0 h-3 w-3 border-l-2 border-t-2 border-[#ff8a3c]/40" />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-[#ff8a3c]/20" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[16px_16px] opacity-50 pointer-events-none" />
        
        {/* Progress bar background */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800/50">
          <div 
            className="h-full bg-linear-to-r from-[#ff8a3c] to-[#ff6b00] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,138,60,0.5)]"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <div className="relative flex items-stretch">
          {steps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(i)}
              className={`group relative flex flex-1 flex-col items-center gap-2 px-3 py-4 transition-all duration-300 ${
                currentStep === i
                  ? "text-[#ff8a3c]"
                  : currentStep > i
                  ? "text-emerald-500"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {/* Step number/icon container */}
              <div className={`relative flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 ${
                currentStep === i
                  ? "border-[#ff8a3c]/50 bg-[#ff8a3c]/10 shadow-[0_0_15px_rgba(255,138,60,0.2)]"
                  : currentStep > i
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-800/50 group-hover:border-zinc-600"
              }`}>
                {currentStep > i ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-lg">{step.icon}</span>
                )}
                
                {/* Pulse effect for current step */}
                {currentStep === i && (
                  <span className="absolute inset-0 rounded-lg border border-[#ff8a3c]/30 animate-ping opacity-20" />
                )}
              </div>
              
              {/* Step title */}
              <span className="hidden text-[10px] font-bold uppercase tracking-wider sm:block">
                {step.title}
              </span>
              
              {/* Step number badge */}
              <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold ${
                currentStep >= i ? "bg-[#ff8a3c]/20 text-[#ff8a3c]" : "bg-zinc-800 text-zinc-600"
              }`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className={`absolute right-0 top-1/2 h-px w-full -translate-y-1/2 ${
                  currentStep > i 
                    ? "bg-linear-to-r from-emerald-500/50 to-emerald-500/20" 
                    : "bg-linear-to-r from-zinc-700/50 to-zinc-700/20"
                }`} style={{ left: '60%', width: '40%' }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
