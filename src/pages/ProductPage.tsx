import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Truck, RotateCcw, Droplets, Check, X as XIcon, ChevronRight } from "lucide-react";
import {
  getProduct,
  getCategory,
  productsByCategory,
  productFullName,
  productPath,
  perTablet,
  PACK_TABLETS,
  HERO_IMAGE,
} from "@/lib/droply-data";
import { SHOP, eur } from "@/lib/shop-config";
import { track } from "@/lib/analytics";
import { useSeo } from "@/hooks/use-seo";
import { useCart } from "@/components/droply/cart-context";
import ProductCard from "@/components/droply/ProductCard";
import NotFound from "./NotFound";

export default function ProductPage() {
  const { id = "" } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const category = product ? getCategory(product.categoryId) : undefined;
  const name = product ? productFullName(product) : "Produkt";
  const url = product ? `${SHOP.siteUrl}${productPath(product)}/` : SHOP.siteUrl;

  useSeo({
    title: product ? `${name} – ${PACK_TABLETS} čistiacich tabliet` : "Produkt sa nenašiel",
    description: product
      ? `${category!.name}, vôňa ${product.scent}. ${PACK_TABLETS} tabliet, z každej ${category!.yieldPerTablet}. ${category!.surfaces} Cena ${eur(product.price)}.`
      : "Tento produkt v ponuke nemáme.",
    image: product?.image ?? HERO_IMAGE,
    noindex: !product,
    jsonLd: product
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name,
            image: product.image,
            description: `${product.tagline}. ${category!.surfaces}`,
            brand: { "@type": "Brand", name: "Droply" },
            sku: product.id,
            category: `Čistiace prostriedky > ${category!.name}`,
            offers: {
              "@type": "Offer",
              url,
              priceCurrency: SHOP.currency,
              price: product.price.toFixed(2),
              availability: SHOP.launched ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
              itemCondition: "https://schema.org/NewCondition",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Produkty", item: `${SHOP.siteUrl}/produkty/` },
              { "@type": "ListItem", position: 2, name: category!.name, item: `${SHOP.siteUrl}/produkty/#${category!.id}` },
              { "@type": "ListItem", position: 3, name: product.scent, item: url },
            ],
          },
        ]
      : undefined,
  });

  useEffect(() => {
    setQty(1);
    if (product) track("ViewContent", { content_ids: [product.id], content_name: name, value: product.price, content_type: "product" });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product || !category) return <NotFound />;

  const siblings = productsByCategory(product.categoryId).filter((p) => p.id !== product.id);

  return (
    <>
      <section className="py-10 sm:py-16">
        <div className="container-tight">
          <nav aria-label="Navigácia" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link to="/produkty" className="hover:text-primary">Produkty</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/produkty#${category.id}`} className="hover:text-primary">{category.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.scent}</span>
          </nav>

          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-card">
              <img src={product.image} alt={name} width={900} height={900} className="aspect-square h-full w-full object-cover" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{category.name}</span>
              <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                {category.name} – {product.scent}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">{product.tagline}.</p>

              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-4xl font-extrabold">{eur(product.price)}</span>
                <span className="mb-1 text-sm text-muted-foreground">
                  {PACK_TABLETS} tabliet · {eur(perTablet(product.price))} / tableta
                </span>
              </div>

              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                <Droplets className="h-4 w-4" /> 1 tableta = {category.yieldPerTablet}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-border">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center rounded-full hover:bg-muted" aria-label="Menej">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center rounded-full hover:bg-muted" aria-label="Viac">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => add({ id: product.id, name, price: product.price, meta: `${PACK_TABLETS} tabliet`, image: product.image }, qty)}
                  className="btn-sheen inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-water-gradient px-8 font-semibold text-white shadow-glow sm:flex-none"
                >
                  <ShoppingBag className="h-5 w-5" /> Pridať do košíka – {eur(product.price * qty)}
                </button>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-eco" /> Doprava zdarma od {SHOP.freeShippingFrom} €, inak {eur(SHOP.shippingPrice)}. Odoslanie {SHOP.dispatch}.</li>
                <li className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-eco" /> {SHOP.returnDays} dní na vrátenie</li>
              </ul>

              <div className="mt-8 space-y-5 border-t border-border pt-6">
                <div>
                  <h2 className="font-display text-lg font-bold">Ako ho pripraviť</h2>
                  <p className="mt-1 text-muted-foreground">{category.howTo}</p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold"><Check className="h-5 w-5 text-eco" /> Na čo sa hodí</h2>
                  <p className="mt-1 text-muted-foreground">{category.surfaces}</p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold"><XIcon className="h-5 w-5 text-destructive" /> Na čo ho nepoužívaj</h2>
                  <p className="mt-1 text-muted-foreground">{category.notFor}</p>
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold">Zloženie a bezpečnosť</h2>
                  <p className="mt-1 text-muted-foreground">
                    Presné zloženie a bezpečnostné upozornenia doplníme podľa výrobcu pred spustením predaja. Tablety aj hotový roztok
                    skladuj mimo dosahu detí a zvierat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="bg-muted/40 py-14">
          <div className="container-tight">
            <h2 className="font-display text-2xl font-bold">Ďalšie vône v kategórii {category.name}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
