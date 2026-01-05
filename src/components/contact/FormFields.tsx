"use client";

type FormInputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

export function FormInput({ label, type, value, onChange, placeholder, required }: FormInputProps) {
  return (
    <div className="group/input relative step-content">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">
        {label}
        {required && <span className="text-[#ff8a3c] ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg rounded-br-none border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none"
        />
        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-zinc-700 transition-colors duration-300 group-focus-within/input:border-[#ff8a3c]/50" />
      </div>
    </div>
  );
}

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function FormSelect({ label, value, onChange, options }: FormSelectProps) {
  return (
    <div className="group/input relative step-content">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg rounded-br-none border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none appearance-none cursor-pointer"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-zinc-700 transition-colors duration-300 group-focus-within/input:border-[#ff8a3c]/50" />
      </div>
    </div>
  );
}

type FormTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export function FormTextarea({ label, value, onChange, placeholder, rows = 5 }: FormTextareaProps) {
  return (
    <div className="group/input relative step-content">
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-focus-within/input:text-[#ff8a3c]">
        {label}
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-lg rounded-br-none border border-zinc-800 bg-[#050609] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 focus:border-[#ff8a3c] focus:bg-[#0a0b10] focus:shadow-[0_0_20px_rgba(255,138,60,0.1)] focus:ring-0 focus:outline-none"
        />
        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-zinc-700 transition-colors duration-300 group-focus-within/input:border-[#ff8a3c]/50" />
      </div>
    </div>
  );
}
