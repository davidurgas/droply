import { Leaf, Boxes, Truck, PiggyBank, Sparkles, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const BENEFITS = [
  {
    icon: Leaf,
    title: "Šetríš planétu",
    text: "Jedna fľaša slúži roky, nekupuješ novú plastovú pri každom nákupe. Vodu nevozíš, máš ju z vodovodu.",
    tint: "bg-eco/10 text-eco",
  },
  {
    icon: Boxes,
    title: "Zaberie menej miesta",
    text: "Celá zásoba čističov sa zmestí do malej krabičky. Koniec neporiadku pod drezom.",
    tint: "bg-primary/10 text-primary",
  },
  {
    icon: Truck,
    title: "Žiadne ťahanie litrov",
    text: "Netreba nosiť ťažké fľaše z obchodu. Ľahučké tablety ti prídu poštou až domov.",
    tint: "bg-accent/10 text-accent",
  },
  {
    icon: PiggyBank,
    title: "Ušetríš peniaze",
    text: "Neplatíš za vodu ani za novú fľašu. Z jednej tablety je plná fľaša čističa.",
    tint: "bg-sunny/15 text-sunny",
  },
  {
    icon: Sparkles,
    title: "Rovnako účinné",
    text: "Hotový roztok používaš ako bežný sprej. Na každý druh špiny máš vlastnú tabletu.",
    tint: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Vieš, čo kupuješ",
    text: "Pri každom produkte nájdeš zloženie, návod a na čo sa nehodí. Vyber si s vôňou alebo bez parfumu.",
    tint: "bg-eco/10 text-eco",
  },
];

export default function Benefits() {
  return (
    <section id="vyhody" className="relative py-20 sm:py-28">
      <div className="container-tight">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="kicker">Prečo Droply</span>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight sm:text-5xl">
              Malá tableta, <span className="font-accent text-primary">veľký</span> rozdiel
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Bežné čističe sú z veľkej časti voda v plastovej fľaši. Vodu máš doma, tak si ju nemusíš kupovať.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal
                key={b.title}
                delay={(i % 3) * 90}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${b.tint} transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
