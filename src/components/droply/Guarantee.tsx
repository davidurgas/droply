import { ShieldCheck, Truck, Undo2, Headphones } from "lucide-react";
import Reveal from "./Reveal";
import { SHOP } from "@/lib/shop-config";

const ITEMS = [
  { icon: Undo2, title: `${SHOP.returnDays} dní na vrátenie`, text: "Tovar môžeš vrátiť bez udania dôvodu." },
  { icon: Truck, title: "Doprava zdarma", text: `Pri objednávke od ${SHOP.freeShippingFrom} € neplatíš za dopravu.` },
  { icon: ShieldCheck, title: "Zloženie na očiach", text: "Pri každom produkte zloženie, návod a bezpečnostné upozornenia." },
  { icon: Headphones, title: "Odpovieme rýchlo", text: `Na e-maily odpovedáme ${SHOP.supportReply}.` },
];

export default function Guarantee() {
  return (
    <section className="relative py-8">
      <div className="container-tight">
        <Reveal className="grid gap-5 rounded-3xl border border-border bg-card p-8 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-eco/10 text-eco">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold">{it.title}</h3>
                  <p className="text-sm text-muted-foreground">{it.text}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
