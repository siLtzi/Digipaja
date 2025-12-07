export function TechGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* 1. Base Dark Background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* 2. The Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      
      {/* 3. Noise Texture (Subtle grain) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />

      {/* 4. Vignette (Fades the grid at edges so it doesn't look like a spreadsheet) */}
      <div className="absolute inset-0 bg-[#050505] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,#000_100%)]" />
    </div>
  );
}