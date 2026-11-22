import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SHOP } from "@/lib/shop-config";
import { trackPageView } from "@/lib/analytics";

type Seo = {
  title: string;
  description: string;
  image?: string;
  /** štruktúrované dáta schema.org pre Google a AI vyhľadávače */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Nastaví titulok, popis, kanonickú adresu, Open Graph a JSON-LD pre aktuálnu stránku. */
export function useSeo({ title, description, image, jsonLd, noindex }: Seo) {
  const { pathname } = useLocation();
  const json = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    const full = title.includes("Droply") ? title : `${title} | Droply`;
    const url = `${SHOP.siteUrl}${pathname === "/" ? "/" : pathname.replace(/\/$/, "") + "/"}`;
    document.title = full;
    setMeta("name", "description", description);
    setMeta("name", "robots", !SHOP.launched || noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:description", description);
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    document.head.querySelectorAll('script[data-seo="page"]').forEach((n) => n.remove());
    if (jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seo = "page";
      s.textContent = json;
      document.head.appendChild(s);
    }
    trackPageView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, json, noindex, pathname]);
}
