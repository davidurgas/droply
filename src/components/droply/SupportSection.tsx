import { Link } from "react-router-dom";
import { Mail, Clock, HelpCircle } from "lucide-react";
import { SHOP } from "@/lib/shop-config";
import Reveal from "./Reveal";

export default function SupportSection() {
  return (
    <section id="kontakt" className="relative py-20 sm:py-24">
      <div className="container-tight">
        <Reveal className="grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Poradíme ti</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Nevieš, ktorú tabletu vybrať?</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Napíš nám, čo potrebuješ vyčistiť a na akom povrchu. Za Droply stojí tím s desiatimi rokmi skúseností
              s profesionálnym čistením, takže poradíme aj s tým, na čo sa tablety nehodia.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Odpovieme {SHOP.supportReply}</span>
              <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {SHOP.email}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${SHOP.email}`} className="btn-sheen inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-card">
              <Mail className="h-5 w-5" /> Napísať e-mail
            </a>
            <Link to="/otazky" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" /> Časté otázky
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
