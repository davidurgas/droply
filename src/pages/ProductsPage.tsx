import Catalog from "@/components/droply/Catalog";
import SupportSection from "@/components/droply/SupportSection";
import { useSeo } from "@/hooks/use-seo";
import { SHOP } from "@/lib/shop-config";
import { products, productPath, productFullName } from "@/lib/droply-data";

export default function ProductsPage() {
  useSeo({
    title: "Čistiace tablety – univerzál, kuchyňa, kúpeľňa, okná, podlaha, prach",
    description: "Všetky druhy rozpustných čistiacich tabliet Droply. Balenie 10 tabliet za 8,90 €, z každej tablety plná fľaša čističa.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SHOP.siteUrl}${productPath(p)}/`, name: productFullName(p) })),
    },
  });
  return (
    <>
      <Catalog />
      <SupportSection />
    </>
  );
}
