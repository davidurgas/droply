import AkoFunguje from "@/components/droply/AkoFunguje";
import Comparison from "@/components/droply/Comparison";
import SavingsCalculator from "@/components/droply/SavingsCalculator";
import EcoImpact from "@/components/droply/EcoImpact";
import { useSeo } from "@/hooks/use-seo";

export default function HowPage() {
  useSeo({
    title: "Ako fungujú rozpustné čistiace tablety",
    description: "Naplň fľašu vodou, vhoď tabletu a o dve minúty máš čistič. Porovnanie s bežnými čističmi a kalkulačka, koľko plastu a nosenia ušetríš.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Ako pripraviť čistič z tablety Droply",
      totalTime: "PT3M",
      step: [
        { "@type": "HowToStep", name: "Naplň fľašu", text: "Nalej do fľaše s rozprašovačom 500 ml vody z vodovodu." },
        { "@type": "HowToStep", name: "Vhoď tabletu", text: "Vhoď jednu tabletu a nechaj ju asi 2 minúty rozpustiť, fľašu zatiaľ nezatváraj." },
        { "@type": "HowToStep", name: "Čisti", text: "Nasaď rozprašovač a čisti ako s bežným čističom." },
      ],
    },
  });
  return (
    <>
      <AkoFunguje />
      <Comparison />
      <SavingsCalculator />
      <EcoImpact />
    </>
  );
}
