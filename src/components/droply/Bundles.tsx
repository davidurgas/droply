import { useState } from "react";
import { Check, Crown, Zap } from "lucide-react";
import { bundles, bundleSeparatePrice, type Bundle } from "@/lib/droply-data";
import { SHOP, eur } from "@/lib/shop-config";
import Reveal from "./Reveal";
import BundleBuilder from "./BundleBuilder";

function BundleCard({ bundle, onSelect }: { bundle: Bundle; onSelect: () => void }) {
  const highlight = bundle.highlight;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 ${
        highlight
          ? "border-accent/50 bg-card shadow-hover md:-translate-y-3 md:scale-[1.03]"
          : "border-border bg-card shadow-card hover:-translate-y-1"
      }`}
    >
      {bundle.ribbon && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold shadow ${
            highlight ? "bg-water-gradient text-white" : "bg-secondary text-secondary-foreground"
          }`}
        >
          {bundle.ribbon}
        </span>
      )}

      <div className="flex items-center gap-2">
        {highlight ? <Crown className="h-5 w-5 text-sunny" /> : <Zap className="h-5 w-5 text-accent" />}
        <h3 className="font-display text-xl font-extrabold">{bundle.name}</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{bundle.subtitle}</p>

      <div className="mt-5 flex items-end gap-2">
        <span className="font-display text-4xl font-extrabold">
          {bundle.price.toLocaleString("sk-SK", { minimumFractionDigits: 2 })} €
        </span>

      </div>
      <div className="mt-1 text-sm text-muted-foreground">
        {bundle.tablets} tabliet + {bundle.bottles} {bundle.bottles === 1 ? "fľaša" : "fľaše"} ·{" "}
        <strong className="text-eco">{eur(bundle.price / bundle.tablets)} / tableta s fľašami v cene</strong>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">
        Po kusoch by si zaplatil {eur(bundleSeparatePrice(bundle))}, ušetríš{" "}
        <strong className="text-foreground">{eur(bundleSeparatePrice(bundle) - bundle.price)}</strong>
      </div>

      <ul className="mt-6 space-y-3 text-sm">
        {bundle.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-eco" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`btn-sheen mt-7 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03] ${
          highlight
            ? "bg-water-gradient text-white shadow-glow"
            : "border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        Vyskladať balíček
      </button>
    </div>
  );
}

export default function Bundles() {
  const [openBundle, setOpenBundle] = useState<Bundle | null>(null);
  return (
    <section id="cennik" className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Balíčky</span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Vyber si balíček a <span className="font-accent text-primary">začni šetriť</span>
          </h1>

          <p className="mt-4 text-muted-foreground">
            Tablety si v balíčku poskladáš ľubovoľne. Čím väčší balíček, tým nižšia cena za tabletu a fľaše sú v cene.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {bundles.map((b, i) => (
            <Reveal key={b.id} delay={i * 90}>
              <BundleCard bundle={b} onSelect={() => setOpenBundle(b)} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Klikni na balíček a naklikaj si, koľko ktorých tabliet chceš.
        </p>
      </div>

      {openBundle && <BundleBuilder bundle={openBundle} onClose={() => setOpenBundle(null)} />}
    </section>
  );
}
