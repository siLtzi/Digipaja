import { Metadata } from "next";
import ContactPageContent from "./page-content";

export const metadata: Metadata = {
  title: "Yhteydenotto | Digipaja",
  description: "Ota yhteyttä ja kerro projektistasi. Autamme sinua rakentamaan unelmiesi verkkosivuston.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  
  return <ContactPageContent locale={locale} />;
}
