// Po zostavení vygeneruje hotové HTML pre každú stránku, sitemap.xml a robots.txt.
// Vďaka tomu vyhľadávače, AI vyhľadávače aj náhľady na sociálnych sieťach vidia obsah bez spúšťania JavaScriptu.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const DIST = path.resolve("dist");
const BASE = (process.env.VITE_BASE || "/").replace(/\/?$/, "/");
const cfg = fs.readFileSync("src/lib/shop-config.ts", "utf8");
const SITE = cfg.match(/siteUrl:\s*"([^"]+)"/)[1].replace(/\/$/, "");
const LAUNCHED = /launched:\s*true/.test(cfg);
const shell = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
fs.writeFileSync(path.join(DIST, "404.html"), shell); // prázdny obal pre neznáme adresy

const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (!p.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  const file = path.join(DIST, p.slice(BASE.length));
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(200, { "content-type": "text/html" });
  res.end(shell);
});
await new Promise((r) => server.listen(4179, r));
const origin = "http://localhost:4179";

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage();
await page.route(/^(?!http:\/\/localhost:4179)/, (r) => r.abort()); // externé fotky a pixel netreba
const seen = new Set();
const queue = ["/"];
const indexable = [];

while (queue.length) {
  const route = queue.shift();
  if (seen.has(route)) continue;
  seen.add(route);
  await page.goto(origin + BASE + route.replace(/^\//, ""), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("main#obsah h1", { timeout: 15000 });
  await page.waitForTimeout(300);
  const { html, links, noindex } = await page.evaluate((base) => {
    const links = [...document.querySelectorAll("a[href]")]
      .map((a) => new URL(a.getAttribute("href"), location.href))
      .filter((u) => u.origin === location.origin && u.pathname.startsWith(base))
      .map((u) => "/" + u.pathname.slice(base.length).replace(/\/$/, ""));
    const noindex = (document.querySelector('meta[name="robots"]')?.content || "").includes("noindex");
    return { html: "<!doctype html>\n" + document.documentElement.outerHTML, links, noindex };
  }, BASE);
  const out = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  if (!noindex || !LAUNCHED) indexable.push({ route, noindex });
  for (const l of links) if (!seen.has(l) && l !== "/404") queue.push(l === "" ? "/" : l);
  console.log("prerender", route);
}
await browser.close();
server.close();

const urls = indexable.filter((x) => !x.noindex || !LAUNCHED).map((x) => `${SITE}${x.route === "/" ? "/" : x.route + "/"}`);
fs.writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`hotovo: ${seen.size} stránok, sitemap ${urls.length} adries, spustený predaj: ${LAUNCHED}`);
