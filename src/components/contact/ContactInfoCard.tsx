"use client";

type ContactInfoCardProps = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  translations: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    companyLabel: string;
    notProvided: string;
  };
};

export default function ContactInfoCard({
  name,
  email,
  phone,
  company,
  translations,
}: ContactInfoCardProps) {
  const hasData = name || email || phone || company;
  
  return (
    <div className="form-section relative overflow-hidden rounded-lg rounded-br-none border border-zinc-800/80 bg-[#0a0a0a]/90 p-6 backdrop-blur-sm">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      
      {/* Header */}
      <div className="relative mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg rounded-br-none border border-zinc-700/50 bg-zinc-800/50">
          <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-goldman)" }}>
            {translations.title}
          </h3>
          <p className="text-xs text-zinc-500">{translations.subtitle}</p>
        </div>
      </div>
      
      {/* Info items */}
      <div className="relative space-y-3">
        <InfoRow 
          icon={
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          label={translations.nameLabel}
          value={name}
          notProvided={translations.notProvided}
        />
        <InfoRow 
          icon={
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          label={translations.emailLabel}
          value={email}
          notProvided={translations.notProvided}
        />
        <InfoRow 
          icon={
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
          label={translations.phoneLabel}
          value={phone}
          notProvided={translations.notProvided}
        />
        {company !== undefined && (
          <InfoRow 
            icon={
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            label={translations.companyLabel}
            value={company}
            notProvided={translations.notProvided}
            isLast
          />
        )}
      </div>
    </div>
  );
}

function InfoRow({ 
  icon, 
  label, 
  value, 
  notProvided,
  isLast 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  notProvided: string;
  isLast?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 ${!isLast ? "border-b border-zinc-800/50 pb-3" : ""}`}>
      <div className="mt-0.5 text-zinc-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-zinc-500 block">{label}</span>
        <span className={`text-sm block truncate ${value ? "text-zinc-300" : "text-zinc-600 italic"}`}>
          {value || notProvided}
        </span>
      </div>
    </div>
  );
}
