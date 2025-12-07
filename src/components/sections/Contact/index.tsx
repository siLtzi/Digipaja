import { sanityClient } from "@/sanity/config";
import { contactSettingsQuery } from "@/sanity/queries";
import ContactForm from "./Content";

type ContactMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
  helperText: string;
};

type MessagesFile = {
  contact: ContactMessages;
};

type ContactSettings = {
  contactEyebrow_fi?: string | null;
  contactTitle_fi?: string | null;
  contactSubtitle_fi?: string | null;
  contactNote_fi?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export default async function Contact({ locale }: { locale: "fi" | "en" }) {
  const messages = (await import(`@/i18n/messages/${locale}.json`))
    .default as MessagesFile;

  const m = messages.contact;

  const cms =
    (await sanityClient.fetch<ContactSettings | null>(
      contactSettingsQuery
    )) ?? {};

  const isFi = locale === "fi";

  const eyebrow = isFi ? cms.contactEyebrow_fi || m.eyebrow : m.eyebrow;
  const title = isFi ? cms.contactTitle_fi || m.title : m.title;
  const subtitle = isFi ? cms.contactSubtitle_fi || m.subtitle : m.subtitle;
  const note = isFi ? cms.contactNote_fi || m.note : m.note;
  const email = cms.contactEmail || "hello@digipaja.fi";
  const phone = cms.contactPhone || "";

  // Prepare labels object for clean props
  const labels = {
    firstName: m.firstNameLabel,
    lastName: m.lastNameLabel,
    email: m.emailLabel,
    phone: m.phoneLabel,
    message: m.messageLabel,
    submit: m.submitLabel,
    helper: m.helperText,
  };

  return (
    <ContactForm 
       eyebrow={eyebrow}
       title={title}
       subtitle={subtitle}
       note={note}
       email={email}
       phone={phone}
       labels={labels}
    />
  );
}