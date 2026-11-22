import Bundles from "@/components/droply/Bundles";
import Guarantee from "@/components/droply/Guarantee";
import Faq from "@/components/droply/Faq";
import { useSeo } from "@/hooks/use-seo";

export default function PricingPage() {
  useSeo({
    title: "Balíčky čistiacich tabliet – od 9,90 €",
    description: "Skúšobný, Domácnosť a Rodinný balíček. Tablety si poskladáš ľubovoľne, fľaše s rozprašovačom sú v cene.",
  });
  return (
    <>
      <Bundles />
      <Guarantee />
      <Faq />
    </>
  );
}
