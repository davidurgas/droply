import { Link } from "react-router-dom";
import { SHOP } from "@/lib/shop-config";
import { useSeo } from "@/hooks/use-seo";

const PAGES = {
  podmienky: {
    title: "Obchodné podmienky",
    lead: "Obchodné podmienky upravujú nákup v e-shope Droply: uzavretie zmluvy, ceny, platbu, doručenie, odstúpenie od zmluvy a reklamácie.",
    points: [
      "Údaje o prevádzkovateľovi (obchodné meno, IČO, sídlo, kontakt)",
      "Uzavretie kúpnej zmluvy a potvrdenie objednávky",
      "Ceny vrátane DPH, spôsoby platby a dopravy",
      `Odstúpenie od zmluvy do 14 dní (zákonná lehota), u nás predĺžené na ${SHOP.returnDays} dní`,
      "Zodpovednosť za vady a postup reklamácie",
      "Alternatívne riešenie sporov (Slovenská obchodná inšpekcia, platforma RSO)",
    ],
  },
  udaje: {
    title: "Ochrana osobných údajov",
    lead: "Osobné údaje spracúvame len na vybavenie objednávky, komunikáciu so zákazníkom a s tvojím súhlasom na marketing.",
    points: [
      "Prevádzkovateľ a kontakt na neho",
      "Aké údaje spracúvame a prečo (objednávka, účtovníctvo, newsletter)",
      "Komu údaje odovzdávame (dopravca, platobná brána, účtovník)",
      "Cookies a reklamný pixel, ktoré sa spúšťajú len so súhlasom",
      "Ako dlho údaje uchovávame",
      "Tvoje práva: prístup, oprava, výmaz, námietka, sťažnosť na Úrade na ochranu osobných údajov",
    ],
  },
  reklamacie: {
    title: "Reklamácie a vrátenie tovaru",
    lead: `Nepoškodený tovar môžeš vrátiť do ${SHOP.returnDays} dní od doručenia bez udania dôvodu. Na vadný tovar platí záruka 24 mesiacov.`,
    points: [
      `Ako vrátiť tovar: napíš na ${SHOP.email} a pošli balík na adresu prevádzkovateľa`,
      "Peniaze vrátime do 14 dní od doručenia vráteného tovaru",
      "Reklamáciu vybavíme najneskôr do 30 dní",
      "Formulár na odstúpenie od zmluvy",
    ],
  },
} as const;

export default function LegalPage({ kind }: { kind: keyof typeof PAGES }) {
  const p = PAGES[kind];
  useSeo({ title: p.title, description: p.lead, noindex: true });
  return (
    <section className="py-16 sm:py-20">
      <div className="container-tight max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{p.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{p.lead}</p>
        {!SHOP.launched && (
          <p className="mt-6 rounded-2xl border border-sunny/40 bg-sunny/10 p-4 text-sm">
            Úplné znenie doplníme pred spustením predaja. Dokument bude obsahovať:
          </p>
        )}
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {p.points.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Otázky? Napíš na <a href={`mailto:${SHOP.email}`} className="underline">{SHOP.email}</a> alebo pozri <Link to="/otazky" className="underline">časté otázky</Link>.
        </p>
      </div>
    </section>
  );
}
