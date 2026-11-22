import Reviews from "@/components/droply/Reviews";
import Guarantee from "@/components/droply/Guarantee";
import { useSeo } from "@/hooks/use-seo";

export default function ReviewsPage() {
  useSeo({ title: "Recenzie", description: "Recenzie zákazníkov Droply zverejníme po prvých nákupoch, všetky bez úprav." });
  return (
    <>
      <Reviews />
      <Guarantee />
    </>
  );
}
