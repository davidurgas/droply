import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/use-seo";

export default function NotFound() {
  useSeo({ title: "Stránka sa nenašla", description: "Táto stránka neexistuje.", noindex: true });
  return (
    <section className="py-24">
      <div className="container-tight max-w-xl text-center">
        <h1 className="font-display text-4xl font-extrabold">Táto stránka neexistuje</h1>
        <p className="mt-3 text-muted-foreground">Odkaz je možno starý alebo v ňom je preklep.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/produkty" className="rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">Pozrieť produkty</Link>
          <Link to="/" className="rounded-full border border-border px-7 py-3.5 font-semibold">Na úvod</Link>
        </div>
      </div>
    </section>
  );
}
