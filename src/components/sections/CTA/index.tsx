import dynamic from "next/dynamic";
import { getMessages } from "next-intl/server";
import { sanityClient } from "@/sanity/config";
import { ctaSettingsQuery } from "@/sanity/queries";

const CTAContent = dynamic(() => import("./Content"));

type CTAMessages = {
  cta: string;
};

type CTASettings = {
  ctaText_fi?: string | null;
  ctaText_en?: string | null;
  ctaLink?: string | null;
};

type Props = {
  locale: string;
  ctaLink?: string;
};

export default async function CTA({ locale, ctaLink }: Props) {
  const messages = await getMessages({ locale });
  const m = (messages.aboutUs || {}) as CTAMessages;

  const cms = (await sanityClient.fetch<CTASettings | null>(ctaSettingsQuery)) ?? {};
  
  const isFi = locale === "fi";
  const ctaText = isFi 
    ? cms.ctaText_fi || m.cta || "Ota yhteyttä"
    : cms.ctaText_en || m.cta || "Get in touch";
  
  const link = ctaLink || cms.ctaLink || (isFi ? "/yhteydenotto" : "/contact");

  return <CTAContent ctaText={ctaText} ctaLink={`/${locale}${link}`} />;
}
