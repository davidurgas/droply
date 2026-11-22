import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, HelpCircle, Mail, ChevronDown } from "lucide-react";
import { faqs } from "@/lib/droply-data";
import { SHOP } from "@/lib/shop-config";

/** Plávajúca pomoc: najčastejšie otázky + kontakt. Bez predstieraného živého chatu. */
export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("droply-open-chat", h);
    return () => window.removeEventListener("droply-open-chat", h);
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <div
        role="dialog"
        aria-label="Pomoc"
        className={`fixed bottom-24 right-4 z-40 w-[min(92vw,22rem)] origin-bottom-right rounded-3xl border border-border bg-card shadow-hover transition-all duration-300 sm:right-6 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between rounded-t-3xl bg-water-gradient p-4 text-white">
          <p className="font-semibold">Ako ti pomôžeme?</p>
          <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15" aria-label="Zavrieť pomoc">
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="max-h-72 divide-y divide-border overflow-y-auto px-4">
          {faqs.slice(0, 5).map((f, i) => (
            <li key={f.q}>
              <button onClick={() => setQ(q === i ? null : i)} className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold" aria-expanded={q === i}>
                {f.q}
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${q === i ? "rotate-180" : ""}`} />
              </button>
              {q === i && <p className="pb-3 text-sm text-muted-foreground">{f.a}</p>}
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-border p-4 text-sm">
          <a href={`mailto:${SHOP.email}`} className="flex items-center gap-2 font-semibold text-primary">
            <Mail className="h-4 w-4" /> {SHOP.email}
          </a>
          <p className="text-muted-foreground">Odpovieme {SHOP.supportReply}. <Link to="/otazky" onClick={() => setOpen(false)} className="underline">Všetky otázky</Link></p>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-hover transition-transform hover:scale-105 sm:right-6"
        aria-label="Pomoc a časté otázky"
        aria-expanded={open}
      >
        <HelpCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Potrebuješ pomoc?</span>
      </button>
    </>
  );
}
