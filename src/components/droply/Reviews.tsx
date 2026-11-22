import { Link } from "react-router-dom";
import { MessageSquareHeart } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Recenzie zobrazujeme až od skutočných zákazníkov.
 * Kým žiadne nie sú, sekcia to otvorene hovorí – vymyslené recenzie sú klamlivá obchodná praktika.
 */
export default function Reviews() {
  return (
    <section id="recenzie" className="relative py-20 sm:py-28">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Recenzie</span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Prvé recenzie práve zbierame</h1>
          <p className="mt-4 text-muted-foreground">
            Droply je nová značka. Po každom nákupe ťa poprosíme o hodnotenie a zverejníme všetky, aj tie kritické.
            Dovtedy ti radšej povieme presne, čo kupuješ: zloženie, návod a na čo sa prípravok nehodí nájdeš pri každom produkte.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/produkty" className="btn-sheen rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
              Pozrieť produkty
            </Link>
            <Link to="/otazky" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold">
              <MessageSquareHeart className="h-5 w-5 text-primary" /> Časté otázky
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
