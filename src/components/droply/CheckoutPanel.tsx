import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Info } from "lucide-react";
import { SHOP, eur } from "@/lib/shop-config";
import { track } from "@/lib/analytics";
import { useCart } from "./cart-context";
import { useAccount } from "./account-context";

const PAYMENTS = [
  { id: "card", label: "Kartou online", fee: 0 },
  { id: "transfer", label: "Bankovým prevodom", fee: 0 },
  { id: "cod", label: "Dobierkou", fee: 1 },
];

type Field = "name" | "email" | "phone" | "point";

/** Pokladňa bez povinnej registrácie – meno, kontakt, výdajné miesto, platba. */
export default function CheckoutPanel({ onBack }: { onBack: () => void }) {
  const { items, grandTotal, clear, closeCart } = useCart();
  const { user, placeOrder } = useAccount();
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "", phone: "", point: "" });
  const [pay, setPay] = useState("card");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const fee = PAYMENTS.find((p) => p.id === pay)?.fee ?? 0;
  const total = grandTotal + fee;

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const miss: string[] = [];
    if (!form.name.trim()) miss.push("meno a priezvisko");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) miss.push("e-mail");
    if (form.phone.replace(/\D/g, "").length < 9) miss.push("telefón");
    if (!form.point.trim()) miss.push("výdajné miesto");
    if (!terms) miss.push("súhlas s obchodnými podmienkami");
    setErrors(miss);
    if (miss.length) return;
    if (user) placeOrder(items.map((i) => ({ name: i.name, qty: i.qty, price: i.price, meta: i.meta })), total);
    if (SHOP.launched) track("Purchase", { value: total, num_items: items.length });
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-start gap-4 p-6">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-eco/15 text-eco">
          <Check className="h-6 w-6" />
        </span>
        {SHOP.launched ? (
          <>
            <h3 className="font-display text-xl font-bold">Objednávka je prijatá</h3>
            <p className="text-sm text-muted-foreground">Potvrdenie sme poslali na {form.email}. Balík odošleme {SHOP.dispatch}.</p>
          </>
        ) : (
          <>
            <h3 className="font-display text-xl font-bold">Toto je ukážka e-shopu</h3>
            <p className="text-sm text-muted-foreground">
              Objednávka sa nikam neodoslala a nič sa nezaplatilo. Predaj spustíme po napojení platobnej brány.
            </p>
          </>
        )}
        <button onClick={() => { setDone(false); onBack(); closeCart(); }} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Späť do obchodu
        </button>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-border bg-muted/30 px-3.5 py-3 text-base outline-none focus:border-primary";

  return (
    <form onSubmit={submit} noValidate className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Späť do košíka
        </button>
        <h3 className="font-display text-lg font-bold">Doručenie a platba</h3>
        <p className="text-sm text-muted-foreground">Registrácia nie je potrebná.</p>

        <label className="block text-sm font-medium">Meno a priezvisko
          <input className={`${input} mt-1`} value={form.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label className="block text-sm font-medium">E-mail
          <input className={`${input} mt-1`} type="email" value={form.email} onChange={set("email")} autoComplete="email" inputMode="email" />
        </label>
        <label className="block text-sm font-medium">Telefón pre doručovateľa
          <input className={`${input} mt-1`} type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" placeholder="+421 9xx xxx xxx" />
        </label>
        <label className="block text-sm font-medium">Výdajné miesto {SHOP.shippingCarrier}
          <input className={`${input} mt-1`} value={form.point} onChange={set("point")} placeholder="Mesto alebo ulica" />
          <span className="mt-1 block text-xs text-muted-foreground">Po spustení tu bude mapa výdajných miest.</span>
        </label>

        <fieldset className="space-y-2">
          <legend className="mb-1 text-sm font-medium">Platba</legend>
          {PAYMENTS.map((p) => (
            <label key={p.id} className={`flex cursor-pointer items-center justify-between rounded-xl border px-3.5 py-3 text-sm ${pay === p.id ? "border-primary bg-primary/5" : "border-border"}`}>
              <span className="flex items-center gap-2.5">
                <input type="radio" name="pay" value={p.id} checked={pay === p.id} onChange={() => setPay(p.id)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                {p.label}
              </span>
              <span className="text-muted-foreground">{p.fee ? `+${eur(p.fee)}` : "zadarmo"}</span>
            </label>
          ))}
        </fieldset>

        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" />
          <span>
            Súhlasím s <Link to="/obchodne-podmienky" className="underline" onClick={closeCart}>obchodnými podmienkami</Link> a beriem na vedomie{" "}
            <Link to="/ochrana-udajov" className="underline" onClick={closeCart}>spracovanie osobných údajov</Link>.
          </span>
        </label>

        {errors.length > 0 && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3.5 py-3 text-sm text-destructive">
            Doplň prosím: {errors.join(", ")}.
          </p>
        )}

        {!SHOP.launched && (
          <p className="flex gap-2 rounded-xl bg-muted px-3.5 py-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0" /> Ukážka e-shopu: objednávka sa po odoslaní nikam nepošle.
          </p>
        )}
      </div>

      <footer className="border-t border-border p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold">Spolu s DPH</span>
          <span className="font-display text-xl font-extrabold tabular-nums">{eur(total)}</span>
        </div>
        <button type="submit" className="btn-sheen w-full rounded-full bg-water-gradient py-3.5 font-semibold text-white shadow-glow">
          Objednať s povinnosťou platby
        </button>
      </footer>
    </form>
  );
}
