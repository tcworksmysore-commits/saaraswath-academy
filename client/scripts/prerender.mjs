// Post-build: render every route to static HTML so GitHub Pages serves it with HTTP 200 and full content.
// Run after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr` (see package.json "build").
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, ROUTES, ARTICLE_DATES } = ssr;

const base = (process.env.VITE_BASE || '/saaraswath-academy/').replace(/\/$/, '');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const today = new Date().toISOString().slice(0, 10);

const page = (route) => {
  const { html, head } = render(base + (route === '/' ? '/' : route), base || '/');
  if (!head) throw new Error(`No <SEO> rendered for ${route}`);
  let out = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(head.title)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${esc(head.url)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${esc(head.url)}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${esc(head.image)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(head.title)}`)
    .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${esc(head.image)}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${esc(head.type || 'website')}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  if (head.description) {
    out = out
      .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(head.description)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(head.description)}`)
      .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(head.description)}`);
  }
  // A noindex page (404) must not claim a canonical URL.
  if (head.noindex) out = out.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '');
  // Hero photo first: preload it with high priority (same srcset/sizes as <Photo>), so LCP does not wait for the JS.
  const w = (k, n) => `${base}/images/web/${k}-${n}.webp`;
  const pre = head.preload;
  const extra = [
    pre ? `<link rel="preload" as="image" href="${w(pre.k, 720)}" imagesrcset="${w(pre.k, 420)} 420w, ${w(pre.k, 720)} 720w" imagesizes="${pre.sizes}" fetchpriority="high" />` : '',
    head.noindex ? '<meta name="robots" content="noindex" />' : '',
    ...head.ld.map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
  return { out: out.replace('</head>', `    ${extra}\n  </head>`), url: head.url };
};

// lastmod: an article's own date; the article list = its newest article; other pages = this build.
const newest = Object.values(ARTICLE_DATES).sort().pop();
const LASTMOD = { ...ARTICLE_DATES, '/articles': newest };
const sitemap = [];
for (const [route, inMap, priority] of ROUTES) {
  const { out, url } = page(route);
  if (route === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), out);
  } else {
    // /about.html answers /about (no redirect); /about/index.html answers /about/
    const rel = route.slice(1);
    fs.mkdirSync(path.join(dist, rel), { recursive: true });
    fs.writeFileSync(path.join(dist, rel, 'index.html'), out);
    fs.writeFileSync(path.join(dist, `${rel}.html`), out);
  }
  if (inMap) sitemap.push(`  <url><loc>${url}</loc><lastmod>${LASTMOD[route] || today}</lastmod><priority>${priority}</priority></url>`);
}

// 404 page for unknown paths: the NotFound route, noindex.
fs.writeFileSync(path.join(dist, '404.html'), page('/this-page-does-not-exist').out);

fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.join('\n')}\n</urlset>\n`);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Pre-rendered ${ROUTES.length} routes + 404; sitemap has ${sitemap.length} URLs.`);
