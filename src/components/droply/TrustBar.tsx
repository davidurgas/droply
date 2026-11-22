import { Droplets, RotateCcw, Recycle, CreditCard, Truck, Package, Sparkles } from "lucide-react";
import { SHOP } from "@/lib/shop-config";

const ITEMS = [
  { icon: Truck, label: `Doprava zdarma od ${SHOP.freeShippingFrom} €` },
  { icon: Package, label: `Odoslanie ${SHOP.dispatch}` },
  { icon: RotateCcw, label: `${SHOP.returnDays} dní na vrátenie` },
  { icon: Droplets, label: "1 tableta = 500 ml čističa" },
  { icon: Recycle, label: "Jedna fľaša na roky" },
  { icon: CreditCard, label: "Kartou, prevodom aj dobierkou" },
  { icon: Sparkles, label: "Zloženie pri každom produkte" },
];

export default function TrustBar() {
  return (
    <div className="pause-on-hover relative overflow-hidden border-y border-border bg-card py-4">
      {/* okraje s jemným prechodom */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent" />

      <div className="flex w-max animate-marquee items-center">
        {[...ITEMS, ...ITEMS].map(({ icon: Icon, label }, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2.5 px-8 text-sm font-medium text-muted-foreground">
            <Icon className="h-4 w-4 text-eco" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
