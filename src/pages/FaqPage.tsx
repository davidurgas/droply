import Faq from "@/components/droply/Faq";
import SupportSection from "@/components/droply/SupportSection";
import { faqs } from "@/lib/droply-data";
import { useSeo } from "@/hooks/use-seo";

export default function FaqPage() {
  useSeo({
    title: "Časté otázky o čistiacich tabletách",
    description: "Ako fungujú rozpustné čistiace tablety Droply, na koľko čistenia vydrží balenie, doprava, vrátenie a bezpečnosť.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  });
  return (
    <>
      <Faq asPage />
      <SupportSection />
    </>
  );
}
