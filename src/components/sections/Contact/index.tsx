import { Suspense } from "react";
import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries"; 
import dynamic from "next/dynamic";

const ContactContent = dynamic(() => import("./Content"));

type ContactMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  ctaText: string;
  formTitle: string;
  formSubtitle: string;
  formCta: string;
  formNameLabel: string;
  formEmailLabel: string;
  formCompanyLabel: string;
  formMessageLabel: string;
};

type MessagesFile = {
  contact: ContactMessages;
};

type ContactSettings = {
  email?: string | null;
  phone?: string | null;
  
  // Finnish
  eyebrow_fi?: string | null;
  title_fi?: string | null;
  subtitle_fi?: string | null;
  contactTitle_fi?: string | null;
  contactSubtitle_fi?: string | null;
  ctaText_fi?: string | null;
  formTitle_fi?: string | null;
  formSubtitle_fi?: string | null;
  formCta_fi?: string | null;
  formNameLabel_fi?: string | null;
  formEmailLabel_fi?: string | null;
  formCompanyLabel_fi?: string | null;
  formMessageLabel_fi?: string | null;

  // English
  eyebrow_en?: string | null;
  title_en?: string | null;
  subtitle_en?: string | null;
  contactTitle_en?: string | null;
  contactSubtitle_en?: string | null;
  ctaText_en?: string | null;
  formTitle_en?: string | null;
  formSubtitle_en?: string | null;
  formCta_en?: string | null;
  formNameLabel_en?: string | null;
  formEmailLabel_en?: string | null;
  formCompanyLabel_en?: string | null;
  formMessageLabel_en?: string | null;
};

export default async function Contact({ locale }: { locale: "fi" | "en" }) {
  // 1. Load Local JSON
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.contact;

  // 2. Fetch CMS Data
  const cms =
    (await sanityClient.fetch<ContactSettings | null>(contactSettingsQuery)) ?? {};

  const isFi = locale === "fi";

  // 3. Map Data (Prefer CMS -> Fallback to JSON)
  const eyebrow = isFi 
    ? cms.eyebrow_fi || m.eyebrow 
    : cms.eyebrow_en || m.eyebrow;

  const title = isFi 
    ? cms.title_fi || m.title 
    : cms.title_en || m.title;

  const subtitle = isFi 
    ? cms.subtitle_fi || m.subtitle 
    : cms.subtitle_en || m.subtitle;

  // Contact Info Column
  const contactTitle = isFi 
    ? cms.contactTitle_fi || m.contactTitle 
    : cms.contactTitle_en || m.contactTitle;

  const contactSubtitle = isFi 
    ? cms.contactSubtitle_fi || m.contactSubtitle 
    : cms.contactSubtitle_en || m.contactSubtitle;

  const ctaText = isFi 
    ? cms.ctaText_fi || m.ctaText 
    : cms.ctaText_en || m.ctaText;

  // Non-localized fallbacks (hardcoded if CMS is empty)
  const email = cms.email || "info@digipajaoulu.fi";
  const phone = cms.phone || "+358 40 123 4567";

  return (
    <Suspense fallback={null}>
      <ContactContent
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        contactTitle={contactTitle}
        contactSubtitle={contactSubtitle}
        email={email}
        phone={phone}
        ctaText={ctaText}
      />
    </Suspense>
  );
}