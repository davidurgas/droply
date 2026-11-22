import { SHOP } from "./shop-config";

/**
 * Meta pixel – načíta sa iba ak je vyplnené SHOP.metaPixelId
 * a návštevník povolil marketingové cookies.
 */
type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const CONSENT_KEY = "droply-consent";
export type Consent = "all" | "necessary";

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* prehliadač ukladanie nepovolil */
  }
  if (v === "all") loadPixel();
}

let loaded = false;
export function loadPixel() {
  if (loaded || !SHOP.metaPixelId || getConsent() !== "all" || typeof window === "undefined") return;
  loaded = true;
  const f = window;
  if (f.fbq) return;
  const n: Fbq = function (...args: unknown[]) {
    n.callMethod ? n.callMethod(...args) : n.queue!.push(args);
  } as Fbq;
  n.queue = [];
  n.loaded = true;
  n.version = "2.0";
  n.push = n;
  f.fbq = n;
  f._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", SHOP.metaPixelId);
  n("track", "PageView");
}

/** Štandardné udalosti pre Meta reklamy: ViewContent, AddToCart, InitiateCheckout, Purchase, Lead */
export function track(event: string, data?: Record<string, unknown>) {
  if (!loaded || !window.fbq) return;
  window.fbq("track", event, { currency: SHOP.currency, ...data });
}

export function trackPageView() {
  if (!loaded || !window.fbq) return;
  window.fbq("track", "PageView");
}
