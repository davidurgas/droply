import { Link } from "react-router-dom";
import { Plus, Droplets } from "lucide-react";
import { type Product, getCategory, productFullName, productPath, perTablet, PACK_TABLETS } from "@/lib/droply-data";
import { eur } from "@/lib/shop-config";
import { useCart } from "./cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const category = getCategory(product.categoryId);
  const href = productPath(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover">
      <Link to={href} className="relative block aspect-square overflow-hidden bg-muted" tabIndex={-1} aria-hidden="true">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{category.name}</span>
        <h3 className="mt-0.5 font-display text-base font-bold leading-tight">
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.scent}
          </Link>
        </h3>

        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Droplets className="h-3.5 w-3.5 text-primary" />1 tableta = {category.yieldPerTablet}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="font-display text-xl font-extrabold">{eur(product.price)}</span>
            <span className="block text-[11px] text-muted-foreground">
              {PACK_TABLETS} tabliet · {eur(perTablet(product.price))} / tableta
            </span>
          </div>
          <button
            onClick={() =>
              add({ id: product.id, name: productFullName(product), price: product.price, meta: `${PACK_TABLETS} tabliet`, image: product.image })
            }
            className="btn-sheen relative z-10 inline-flex h-11 items-center gap-1 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            aria-label={`Pridať ${productFullName(product)} do košíka`}
          >
            <Plus className="h-4 w-4" /> Pridať
          </button>
        </div>
      </div>
    </article>
  );
}
