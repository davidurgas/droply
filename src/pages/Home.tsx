import HeroSlider from "@/components/droply/HeroSlider";
import TrustBar from "@/components/droply/TrustBar";
import Benefits from "@/components/droply/Benefits";
import CategoryTiles from "@/components/droply/CategoryTiles";
import Bestsellers from "@/components/droply/Bestsellers";
import SupportSection from "@/components/droply/SupportSection";
import Newsletter from "@/components/droply/Newsletter";
import { useSeo } from "@/hooks/use-seo";
import { SHOP } from "@/lib/shop-config";
import { HERO_IMAGE } from "@/lib/droply-data";

export default function Home() {
  useSeo({
    title: "Droply – čistiace tablety, z ktorých si čistič vyrobíš doma",
    description: "Hodíš tabletu do fľaše s vodou a máš čistič na kuchyňu, kúpeľňu, okná, podlahu aj prach. Balenie 10 tabliet od 8,90 €. Doprava zdarma od 25 €.",
    image: HERO_IMAGE,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "Organization", name: "Droply", url: SHOP.siteUrl + "/", email: SHOP.email },
      { "@context": "https://schema.org", "@type": "WebSite", name: "Droply", url: SHOP.siteUrl + "/", inLanguage: "sk-SK" },
    ],
  });
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <Benefits />
      <CategoryTiles />
      <Bestsellers />
      <SupportSection />
      <Newsletter />
    </>
  );
}
