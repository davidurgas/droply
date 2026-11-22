/**
 * Jedno miesto pre všetky obchodné nastavenia e-shopu.
 * Keď sa niečo zmení (cena dopravy, e-mail, spustenie predaja), mení sa iba tu.
 */
export const SHOP = {
  /** false = ukážka: pruh „zatiaľ nepredávame“, vyhľadávače stránku neindexujú, objednávky sa neodosielajú */
  launched: false,

  name: "Droply",
  siteUrl: "https://davidurgas.github.io/droply",
  email: "ahoj@droply.sk",
  /** Prevádzkovateľ – doplniť pred spustením (povinné údaje e-shopu) */
  company: "Prevádzkovateľ: doplníme pred spustením (obchodné meno, IČO, sídlo)",

  currency: "EUR",
  freeShippingFrom: 25,
  shippingPrice: 3.5,
  shippingCarrier: "Packeta",
  dispatch: "do 2 pracovných dní",
  returnDays: 30,
  supportReply: "do 1 pracovného dňa",

  /** Cena 1 fľaše s rozprašovačom predávanej samostatne */
  bottlePrice: 6.9,

  /** Porovnávacia cena bežného čističa 500 ml, z ktorej počíta kalkulačka úspory */
  classicBottlePrice: 2.6,

  /** Meta (Facebook) pixel – vlož ID z Events Manageru. Prázdne = nič sa nenačíta. */
  metaPixelId: "",
} as const;

export const eur = (n: number) =>
  `${n.toLocaleString("sk-SK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
