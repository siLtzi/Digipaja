import dynamic from "next/dynamic";
import { getMessages } from "next-intl/server";

const CTAContent = dynamic(() => import("./Content"));

type CTAMessages = {
  cta: string;
};

type Props = {
  locale: string;
  ctaLink?: string;
};

export default async function CTA({ locale, ctaLink = "/yhteydenotto" }: Props) {
  const messages = await getMessages({ locale });
  const m = (messages.aboutUs || {}) as CTAMessages;

  return <CTAContent ctaText={m.cta || "Ota yhteyttä"} ctaLink={ctaLink} />;
}
