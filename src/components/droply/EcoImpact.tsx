import { useCountUp } from "@/hooks/use-count-up";
import Bubbles from "./Bubbles";

function Stat({ target, decimals = 0, suffix = "", label }: { target: number; decimals?: number; suffix?: string; label: string }) {
  const { ref, formatted } = useCountUp(target, 2000, decimals);
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        <span ref={ref} className="tabular-nums">
          {formatted}
        </span>
        {suffix}
      </div>
      <div className="mt-2 text-sm text-white/70">{label}</div>
    </div>
  );
}

export default function EcoImpact() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 text-white sm:py-24">
      <Bubbles count={18} />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-eco/20 blur-3xl" />

      <div className="container-tight relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-glow">Jedna domácnosť za rok</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Čo sa zmení, keď prejdeš na tablety
          </h2>
          <p className="mt-3 text-white/75">
            Orientačný odhad pre domácnosť, ktorá minie 4 fľaše čističa mesačne. Vlastné číslo si spočítaš v kalkulačke vyššie.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat target={48} label="nových plastových fliaš, ktoré nekúpiš" />
          <Stat target={4.3} decimals={1} suffix=" kg" label="plastu menej" />
          <Stat target={24} suffix=" l" label="vody, ktorú nenesieš z obchodu" />
          <Stat target={1} label="fľaša na každý druh čističa" />
        </div>
      </div>
    </section>
  );
}
