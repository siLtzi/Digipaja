import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";
import ContactContent from "./Content";

// --- TYPE DEFINITIONS ---

type MessagesShape = {
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

type SanitySettings = {
  email?: string | null;
  phone?: string | null;

  // Finnish Fields
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

  // English Fields
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

// --- FALLBACKS ---

const FALLBACK_MESSAGES_SHAPE: MessagesShape = {
  eyebrow: "CONTACT",
  title: "Get In Touch",
  subtitle:
    "Start your journey towards a faster, more effective online presence. We respond within 24 hours.",

  contactTitle: "Phone & Email",
  contactSubtitle: "Reach out directly or book a free consultation below.",
  ctaText: "Book A Free Consultation",

  formTitle: "Project Inquiry",
  formSubtitle: "Tell us about your project and we'll be in touch soon.",
  formCta: "SEND INQUIRY",
  formNameLabel: "Name",
  formEmailLabel: "Email",
  formCompanyLabel: "Company",
  formMessageLabel: "Message / Project Description",
};

const FALLBACK_CONTACT_DETAILS = {
  email: "info@example.com",
  phone: "+358 40 123 4567",
};

export default async function Contact({ locale }: { locale: "fi" | "en" }) {
  // 1) Local JSON (fallback)
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default as {
    contact?: Partial<MessagesShape>;
  };

  const m: MessagesShape = { ...FALLBACK_MESSAGES_SHAPE, ...(messages.contact ?? {}) };

  // 2) CMS
  const cms =
    (await sanityClient.fetch<SanitySettings | null>(contactSettingsQuery)) ?? {};

  // 3) Localized field helper (CMS first, then JSON)
  const getLocalizedField = (field: keyof MessagesShape): string => {
    const cmsKey = `${field}_${locale}` as keyof SanitySettings;
    const fromCms = cms[cmsKey];
    return (fromCms as string | null | undefined) || m[field];
  };

  const props = {
    eyebrow: getLocalizedField("eyebrow"),
    title: getLocalizedField("title"),
    subtitle: getLocalizedField("subtitle"),

    contactTitle: getLocalizedField("contactTitle"),
    contactSubtitle: getLocalizedField("contactSubtitle"),
    ctaText: getLocalizedField("ctaText"),

    email: cms.email || FALLBACK_CONTACT_DETAILS.email,
    phone: cms.phone || FALLBACK_CONTACT_DETAILS.phone,

    formTitle: getLocalizedField("formTitle"),
    formSubtitle: getLocalizedField("formSubtitle"),
    formCta: getLocalizedField("formCta"),
    formNameLabel: getLocalizedField("formNameLabel"),
    formEmailLabel: getLocalizedField("formEmailLabel"),
    formCompanyLabel: getLocalizedField("formCompanyLabel"),
    formMessageLabel: getLocalizedField("formMessageLabel"),
  };

  return <ContactContent {...props} />;
}
