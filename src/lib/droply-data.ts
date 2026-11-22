import { SHOP } from "./shop-config";

export type CategoryId = "univerzal" | "kuchyna" | "sklo" | "kupelna" | "podlahy" | "prach";
export type IconKey = "universal" | "kitchen" | "glass" | "bathroom" | "floor" | "dust";

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  icon: IconKey;
  /** na čo sa hodí */
  surfaces: string;
  /** na čo nepoužívať */
  notFor: string;
  /** ako pripraviť */
  howTo: string;
  /** čo vznikne z 1 tablety */
  yieldPerTablet: string;
};

export type Product = {
  id: string;
  categoryId: CategoryId;
  /** vôňa / funkcia varianty */
  scent: string;
  tagline: string;
  image: string;
  price: number;
  badge?: string;
  /** zobrazí sa na úvodnej stránke medzi odporúčanými */
  featured?: boolean;
};

/** Počet tabliet v jednom balení a jeho cena – zmena tu sa prejaví všade. */
export const PACK_TABLETS = 10;
export const PACK_PRICE = 8.9;
export const perTablet = (price: number, tablets = PACK_TABLETS) => price / tablets;

/** Fotografie (Higgsfield CDN). Kategória „Prach“ zatiaľ používa fotku Univerzálu – treba vlastnú fotku. */
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3AhuqzP4VjgsdpfdOEJfJ1mDnzs";
const IMG = {
  universal: `${CDN}/hf_20260818_160205_83d992e0-bb23-4d57-8f4e-903f5efc0a0a.png`,
  kitchen: `${CDN}/hf_20260818_160205_4f8b438c-15dd-4e45-ac12-ae8d30d24aee.png`,
  glass: `${CDN}/hf_20260818_160206_b18f01e1-f024-4468-82c5-fd6ccd9f1849.png`,
  bathroom: `${CDN}/hf_20260818_160205_dd7bdbc6-250a-45ab-b153-c01d3ba7ad40.png`,
  floor: `${CDN}/hf_20260818_160206_4a8c5061-2834-46fe-be0d-0d8949234143.png`,
};

/** Hero video – logo vytlačené zvislo na plastovej fľaši, tableta sa reálne rozpúšťa (Higgsfield CDN). */
export const DISSOLVE_VIDEO = `${CDN}/hf_20260820_070808_45fe2482-84a9-4e7b-95de-214219449ae3.mp4`;

/** Video na bielom pozadí – pre sekciu „Ako funguje" (vytlačené logo, splýva s bielym pozadím). */
export const DISSOLVE_VIDEO_WHITE = `${CDN}/hf_20260820_070820_cd0ed9cc-a420-4521-b119-e268fde6801c.mp4`;

/** Široká hero fotka (rozprašovacia fľaša + tablety). */
export const HERO_IMAGE = `${CDN}/hf_20260818_160205_4fea7fac-bc32-4ae7-a3f0-97435a2b522d.png`;


/** Reklamné bannery pre hero slider (16:9, produkt vpravo, miesto na text vľavo). */
export const BANNER_SALE = `${CDN}/hf_20260819_154949_f35dade2-7d66-435e-afa4-6c6bd15d9953.png`;
export const BANNER_BEST = `${CDN}/hf_20260819_155148_2b1f96c0-f338-43b0-af6e-c423c587cfb5.png`;
export const BANNER_ECO = `${CDN}/hf_20260819_154949_0332d10c-aad3-48d9-8629-4bd103515797.png`;

export const categories: Category[] = [
  {
    id: "univerzal", name: "Univerzál", tagline: "Linka, stôl, chladnička, spotrebiče", image: IMG.universal, icon: "universal",
    surfaces: "Kuchynská linka, stoly, chladnička, mikrovlnka, umývateľné steny, plasty a lakované povrchy.",
    notFor: "Neošetrené drevo, mramor a prírodný kameň.",
    howTo: "Naplň fľašu 500 ml vlažnou vodou, vhoď tabletu, nechaj rozpustiť a až potom nasaď rozprašovač.",
    yieldPerTablet: "500 ml čističa",
  },
  {
    id: "kuchyna", name: "Kuchyňa", tagline: "Mastnota na sporáku, digestore a obkladoch", image: IMG.kitchen, icon: "kitchen",
    surfaces: "Sporák, digestor, obklady za linkou, rúra zvonka, drez.",
    notFor: "Hliník, mramor a prírodný kameň. Nepoužívaj na horúce povrchy.",
    howTo: "Naplň fľašu 500 ml vlažnou vodou, vhoď tabletu, nechaj rozpustiť. Na pripálenú mastnotu nechaj pôsobiť 2–3 minúty.",
    yieldPerTablet: "500 ml čističa",
  },
  {
    id: "sklo", name: "Okná & sklo", tagline: "Okná, zrkadlá a sklenené dvere bez šmúh", image: IMG.glass, icon: "glass",
    surfaces: "Okná, zrkadlá, sprchové zásteny, sklenené stoly, vitríny.",
    notFor: "Obrazovky a displeje s antireflexnou vrstvou.",
    howTo: "Naplň fľašu 500 ml vodou, vhoď tabletu, nechaj rozpustiť. Utieraj suchou mikrohandričkou.",
    yieldPerTablet: "500 ml čističa",
  },
  {
    id: "kupelna", name: "Kúpeľňa", tagline: "Vodný kameň a mydlové usadeniny", image: IMG.bathroom, icon: "bathroom",
    surfaces: "Batérie, umývadlo, vaňa, sprchový kút, obklady, WC.",
    notFor: "Mramor, prírodný kameň a smaltované povrchy s poškodenou glazúrou (prípravok je kyslý).",
    howTo: "Naplň fľašu 500 ml vodou, vhoď tabletu, nechaj rozpustiť. Na vodný kameň nechaj pôsobiť 5 minút a opláchni.",
    yieldPerTablet: "500 ml čističa",
  },
  {
    id: "podlahy", name: "Podlahy", tagline: "Dlažba, vinyl aj laminát", image: IMG.floor, icon: "floor",
    surfaces: "Dlažba, vinyl, laminát, lakované parkety.",
    notFor: "Neošetrené a olejované drevo, koberce.",
    howTo: "Vhoď 1 tabletu do vedra s 5 l vlažnej vody a nechaj rozpustiť. Mop dobre vyžmýkaj, nič neoplachuj.",
    yieldPerTablet: "5 l roztoku na podlahu",
  },
  {
    id: "prach", name: "Prach", tagline: "Skrinky a police, antistatický", image: IMG.universal, icon: "dust",
    surfaces: "Nábytok, skrinky, police, TV stolík, parapety, plastové aj lakované povrchy.",
    notFor: "Neošetrené drevo a obrazovky.",
    howTo: "Naplň fľašu 500 ml vodou, vhoď tabletu, nechaj rozpustiť. Nastriekaj na handričku, nie priamo na nábytok.",
    yieldPerTablet: "500 ml čističa",
  },
];

const IMG_BY_CAT: Record<CategoryId, string> = {
  univerzal: IMG.universal,
  kuchyna: IMG.kitchen,
  sklo: IMG.glass,
  kupelna: IMG.bathroom,
  podlahy: IMG.floor,
  prach: IMG.universal,
};

type Variant = Omit<Product, "image" | "categoryId" | "tagline" | "price"> & { tagline?: string; price?: number };

/** Skratka na vytvorenie variantov kategórie (zdieľajú fotku kategórie). */
function cat(categoryId: CategoryId, tagline: string, variants: Variant[]): Product[] {
  return variants.map((v) => ({
    ...v,
    price: v.price ?? PACK_PRICE,
    categoryId,
    image: IMG_BY_CAT[categoryId],
    tagline: v.tagline ?? tagline,
  }));
}

export const products: Product[] = [
  ...cat("univerzal", "Jedna tableta na väčšinu povrchov v domácnosti", [
    { id: "univerzal-bavlna", scent: "Svieža bavlna", featured: true, badge: "Začni týmto" },
    { id: "univerzal-aloe", scent: "Aloe vera" },
    { id: "univerzal-citrus", scent: "Citrus" },
  ]),
  ...cat("kuchyna", "Odmasťovač na sporák, digestor a obklady", [
    { id: "kuchyna-citrus", scent: "Citrus & limetka", featured: true },
    { id: "kuchyna-grep", scent: "Grapefruit" },
    { id: "kuchyna-bez", scent: "Bez parfumu", badge: "Bez parfumu" },
  ]),
  ...cat("sklo", "Okná, zrkadlá a sklo bez šmúh", [
    { id: "sklo-bez", scent: "Bez parfumu", featured: true, badge: "Bez parfumu" },
    { id: "sklo-sviezost", scent: "Sviežosť" },
  ]),
  ...cat("kupelna", "Vodný kameň a mydlové usadeniny", [
    { id: "kupelna-more", scent: "Morský vánok" },
    { id: "kupelna-eukalyptus", scent: "Eukalyptus" },
    { id: "kupelna-levandula", scent: "Levanduľa" },
  ]),
  ...cat("podlahy", "1 tableta na celé vedro vody", [
    { id: "podlahy-eukalyptus", scent: "Eukalyptus" },
    { id: "podlahy-citrus", scent: "Citrus" },
  ]),
  ...cat("prach", "Utrie prach a spomalí jeho usadzovanie", [
    { id: "prach-bez", scent: "Bez parfumu", featured: true, badge: "Novinka" },
    { id: "prach-cedra", scent: "Céder" },
  ]),
];

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByCategory = (id: CategoryId) => products.filter((p) => p.categoryId === id);
export const bestsellers = products.filter((p) => p.featured);
export const productFullName = (p: Product) => `Droply ${getCategory(p.categoryId).name} – ${p.scent}`;
export const productPath = (p: Product) => `/produkty/${p.id}`;

export type Bundle = {
  id: string;
  name: string;
  subtitle: string;
  tablets: number;
  bottles: number;
  price: number;
  highlight?: boolean;
  ribbon?: string;
  perks: string[];
};

/** Koľko by stál obsah balíčka pri nákupe po kusoch (skutočný výpočet, nie vymyslená „pôvodná cena“). */
export const bundleSeparatePrice = (b: Bundle) => (b.tablets / PACK_TABLETS) * PACK_PRICE + b.bottles * SHOP.bottlePrice;

export const bundles: Bundle[] = [
  {
    id: "starter",
    name: "Skúšobný",
    subtitle: "Na vyskúšanie, či ti Droply sadne",
    tablets: 10,
    bottles: 1,
    price: 9.9,
    perks: ["10 tabliet podľa výberu", "1 fľaša s rozprašovačom v cene", `Odoslanie ${SHOP.dispatch}`],
  },
  {
    id: "home",
    name: "Domácnosť",
    subtitle: "Na kuchyňu, kúpeľňu aj okná",
    tablets: 30,
    bottles: 2,
    price: 25.9,
    highlight: true,
    ribbon: "Najlepší pomer ceny",
    perks: ["30 tabliet – ľubovoľná kombinácia", "2 fľaše s rozprašovačom v cene", "Doprava zdarma"],
  },
  {
    id: "family",
    name: "Rodinný",
    subtitle: "Pre veľkú domácnosť na dlhšie",
    tablets: 60,
    bottles: 3,
    price: 44.9,
    ribbon: "Najnižšia cena za tabletu",
    perks: ["60 tabliet – ľubovoľná kombinácia", "3 fľaše s rozprašovačom v cene", "Doprava zdarma"],
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Ako Droply tablety fungujú?",
    a: "Do fľaše s rozprašovačom nalej 500 ml vody z vodovodu, vhoď jednu tabletu a počkaj približne 2 minúty, kým sa rozpustí. Potom nasaď rozprašovač a čistíš ako s bežným čističom. Na podlahu dáš 1 tabletu do vedra s 5 l vody.",
  },
  {
    q: "Na koľko čistenia vydrží jedno balenie?",
    a: `Balenie má ${PACK_TABLETS} tabliet a z každej vznikne jedna plná fľaša čističa (500 ml), pri podlahe jedno vedro roztoku. Koľko to vydrží, závisí od toho, ako často upratuješ.`,
  },
  {
    q: "Prečo tableta a nie hotový čistič?",
    a: "Bežné čističe sú z veľkej časti voda. Tú máš doma z vodovodu, takže ju nemusíš niesť z obchodu ani skladovať. Domov príde malá krabička a fľašu používaš stále dokola.",
  },
  {
    q: "Sú bezpečné pre deti a zvieratá?",
    a: "Je to čistiaci prostriedok, preto tablety aj hotový roztok skladuj mimo dosahu detí a zvierat. Zloženie a bezpečnostné upozornenia nájdeš pri každom produkte a na obale.",
  },
  {
    q: "Ako dlho vydrží namiešaný čistič?",
    a: "Odporúčame ho spotrebovať do mesiaca. Fľašu skladuj zatvorenú a mimo priameho slnka.",
  },
  {
    q: "Čo ak mi to nebude vyhovovať?",
    a: `Tovar môžeš vrátiť do ${SHOP.returnDays} dní od doručenia. Podrobnosti sú v reklamačnom poriadku.`,
  },
  {
    q: "Ako prebieha doručenie?",
    a: `Objednávky odosielame ${SHOP.dispatch} cez ${SHOP.shippingCarrier}. Doprava stojí ${SHOP.shippingPrice.toLocaleString("sk-SK", { minimumFractionDigits: 2 })} €, pri objednávke od ${SHOP.freeShippingFrom} € je zadarmo.`,
  },
];
