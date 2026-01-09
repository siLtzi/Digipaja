import dynamic from "next/dynamic";
import { getPricingData } from "./data";

const PricingContent = dynamic(() => import("./Content"));

export default async function Pricing({ locale }: { locale: "fi" | "en" }) {
  const { eyebrow, title, subtitle, tiers } = await getPricingData(locale);

  return (
    <PricingContent
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      tiers={tiers}
    />
  );
}