"use client";

import type { ProjectType } from "./ProjectTypeCard";

type TimelineOption = {
  id: string;
  label: string;
  description: string;
};

type ChoicesSummaryProps = {
  projectType: string;
  pageCount: number;
  selectedFeatures: string[];
  featureOptions: { id: string; label: string; description: string }[];
  timeline: string;
  budget: string;
  projectTypes: ProjectType[];
  timelineOptions: TimelineOption[];
  budgetRanges: { id: string; label: string; description: string }[];
  translations: {
    title: string;
    subtitle: string;
    projectTypeLabel: string;
    pageCountLabel: string;
    featuresLabel: string;
    timelineLabel: string;
    budgetLabel: string;
    pagesUnit: string;
    noSelection: string;
  };
};

export default function ChoicesSummary({
  projectType,
  pageCount,
  selectedFeatures,
  featureOptions,
  timeline,
  budget,
  projectTypes,
  timelineOptions,
  budgetRanges,
  translations,
}: ChoicesSummaryProps) {
  const selectedFeatureNames = selectedFeatures
    .map(id => featureOptions.find(f => f.id === id)?.label)
    .filter(Boolean);

  return (
    <div className="form-section relative overflow-hidden rounded-lg border border-zinc-800/80 bg-[#0a0a0a]/90 p-6 backdrop-blur-sm">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      
      {/* Header */}
      <div className="relative mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff8a3c]/30 bg-[#ff8a3c]/10">
          <svg className="h-5 w-5 text-[#ff8a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-goldman)" }}>
            {translations.title}
          </h3>
          <p className="text-xs text-zinc-500">{translations.subtitle}</p>
        </div>
      </div>
      
      {/* Summary items */}
      <div className="relative space-y-4 text-sm">
        <SummaryRow 
          label={translations.projectTypeLabel} 
          value={projectTypes.find(p => p.id === projectType)?.label || translations.noSelection} 
        />
        <SummaryRow 
          label={translations.pageCountLabel} 
          value={`${pageCount} ${translations.pagesUnit}`} 
        />
        <SummaryRow 
          label={translations.timelineLabel} 
          value={timelineOptions.find(t => t.id === timeline)?.label || translations.noSelection} 
        />
        <SummaryRow 
          label={translations.budgetLabel} 
          value={budgetRanges.find(b => b.id === budget)?.label || translations.noSelection} 
        />
        
        {/* Features list */}
        <div className="border-t border-zinc-800/50 pt-4">
          <span className="text-zinc-500 block mb-2">{translations.featuresLabel}</span>
          {selectedFeatureNames.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {selectedFeatureNames.map((name, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center rounded-full bg-[#ff8a3c]/10 px-2.5 py-1 text-xs text-[#ff8a3c]"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-zinc-600 italic text-xs">{translations.noSelection}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800/50 pb-3">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-300 font-medium">{value}</span>
    </div>
  );
}
