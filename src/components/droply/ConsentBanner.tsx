import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent, loadPixel } from "@/lib/analytics";

/** Súhlas s cookies: reklamný pixel sa spustí až po kliknutí na „Povoliť všetky“. */
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c === "all") loadPixel();
    setShow(c === null);
  }, []);

  if (!show) return null;

  const choose = (v: "all" | "necessary") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div role="region" aria-label="Súhlas s cookies" className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl sm:left-6 sm:right-auto sm:mx-0 sm:max-w-md rounded-2xl border border-border bg-card p-4 shadow-hover sm:p-5">
      <p className="text-sm text-muted-foreground">
        Nevyhnutné cookies používame na košík. S tvojím súhlasom aj na meranie reklamy, aby sme ti neukazovali zbytočné reklamy.{" "}
        <Link to="/ochrana-udajov" className="underline">Viac</Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => choose("all")} className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Povoliť všetky</button>
        <button onClick={() => choose("necessary")} className="h-11 rounded-full border border-border px-5 text-sm font-semibold">Len nevyhnutné</button>
      </div>
    </div>
  );
}
