import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteUrl = "https://www.mentivo.net";
const supportEmail = "mentivonet@gmail.com";
const year = "2026";
const locales = ["en", "ru", "uk"];
const defaultLocale = "en";
const routes = ["/", "/apps/", "/apps/oracle-ball-ai/", "/apps/oracle-ball-ai/widget/", "/pricing/", "/support/", "/faq/", "/status/", "/contact/", "/legal/privacy/", "/legal/terms/", "/legal/delete-data/", "/refund/", "/legal/cookies/"];

async function loadLocale(locale) {
  return JSON.parse(await readFile(path.join(root, "locales", `${locale}.json`), "utf8"));
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function joinUrl(...parts) {
  return parts.join("/").replace(/([^:]\/)\/+/g, "$1");
}

function localizedRoute(locale, route) {
  if (locale === defaultLocale) {
    if (route === "/") return `/${locale}/`;
    return `/${locale}${route}`;
  }
  if (route === "/") return `/${locale}/`;
  return `/${locale}${route}`;
}

function canonical(locale, route) {
  return joinUrl(siteUrl, localizedRoute(locale, route));
}

function pageCanonical(page, locale) {
  return page.canonicalOverride || canonical(locale, page.route);
}

function localHref(locale, route) {
  return localizedRoute(locale, route);
}

function alternateLinks(route) {
  return `${locales.map((locale) => `<link rel="alternate" hreflang="${locale}" href="${canonical(locale, route)}">`).join("\n  ")}
  <link rel="alternate" hreflang="x-default" href="${urlFor(route)}">`;
}

function link(locale, href) {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".txt")) return href;
  return localHref(locale, href);
}

function button(label, href, locale, variant = "primary", extra = "") {
  return `<a class="button ${variant}" href="${link(locale, href)}"${extra}>${label}</a>`;
}

function badge(text) {
  return `<div class="badge">${text}</div>`;
}

function iconCard(item) {
  return `<article class="card feature-card"><div class="card-icon" aria-hidden="true"></div><h3>${item.title}</h3><p>${item.text}</p></article>`;
}

function list(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function faq(items) {
  return `<div class="faq-list">${items.map((item) => `<details class="faq-item"><summary>${item.q}</summary><p>${item.a}</p></details>`).join("")}</div>`;
}

function comparisonTable(table) {
  return `<div class="table-wrap"><table class="comparison-table">
    <thead><tr>${table.headers.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
    <tbody>${table.rows.map((row) => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function mockup(type, t) {
  if (type === "daily") {
    return `<div class="phone-mockup" role="img" aria-label="${esc(t.alt.daily)}">
      <div class="phone-top"></div>
      <div class="mock-orb"></div>
      <p class="mock-kicker">${t.oracle.daily.mock.kicker}</p>
      <h3>${t.oracle.daily.mock.title}</h3>
      <p>${t.oracle.daily.mock.text}</p>
      <div class="mock-grid">${t.oracle.daily.labels.slice(2, 6).map((label) => `<span>${label}</span>`).join("")}</div>
    </div>`;
  }
  if (type === "ask") {
    return `<div class="phone-mockup ask-mockup" role="img" aria-label="${esc(t.alt.ask)}">
      <div class="phone-top"></div>
      <div class="mock-question">${t.oracle.ask.examples[1]}</div>
      <div class="mock-answer"><strong>${t.oracle.responseFormat.parts[0]}</strong><span>${t.oracle.ask.mockAnswer}</span></div>
      <div class="mock-answer"><strong>${t.oracle.responseFormat.parts[2]}</strong><span>${t.oracle.responseFormat.note}</span></div>
    </div>`;
  }
  return `<div class="widget-stage" role="img" aria-label="${esc(t.alt.widgets)}">
    <div class="widget-card small"><span>${t.oracle.widget.sizes.small.title}</span><strong>${t.oracle.daily.labels[3]}</strong></div>
    <div class="widget-card medium"><span>${t.oracle.widget.sizes.medium.title}</span><p>${t.oracle.widget.sizes.medium.text}</p></div>
    <div class="widget-card large"><span>${t.oracle.widget.sizes.large.title}</span><p>${t.oracle.widget.sizes.large.text}</p><em>${t.oracle.daily.labels[7]}</em></div>
  </div>`;
}

function schemaTag(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function orgSchema(t, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mentivo",
    url: locale === defaultLocale ? urlFor("/") : canonical(locale, "/"),
    email: supportEmail,
    sameAs: [siteUrl],
  };
}

function appSchema(t, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Oracle Ball AI",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    description: t.seo.oracle.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free with optional in-app purchases",
    },
  };
}

function breadcrumbSchema(t, locale, route, title) {
  const parts = route.split("/").filter(Boolean);
  const items = [{ name: "Mentivo", item: canonical(locale, "/") }];
  let current = "";
  for (const part of parts) {
    current += `/${part}/`;
    items.push({ name: part.replaceAll("-", " "), item: canonical(locale, current) });
  }
  items[items.length - 1].name = title;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.item })),
  };
}

function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, "") },
    })),
  };
}

function header(t, locale, route) {
  const localeOptions = locales.map((item) => `<a href="${localizedRoute(item, route)}" lang="${item}" hreflang="${item}"${item === locale ? ' aria-current="true"' : ""}>${t.locales[item]}</a>`).join("");
  return `<header class="site-header">
  <nav class="nav" aria-label="${t.common.mainNav}">
    <a class="brand" href="${localHref(locale, "/")}" aria-label="${t.common.homeAria}">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>Mentivo</span>
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu">
      <span></span><span></span><span></span>
      <span class="sr-only">${t.common.openMenu}</span>
    </button>
    <div class="nav-links" id="site-menu">
      ${t.nav.map((item) => `<a href="${link(locale, item.href)}">${item.label}</a>`).join("")}
      <div class="language-switcher" aria-label="${t.common.languageSwitcher}">${localeOptions}</div>
      <a class="nav-cta" href="${localHref(locale, "/support/")}">${t.common.supportCta}</a>
    </div>
  </nav>
</header>`;
}

function footer(t, locale) {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${localHref(locale, "/")}" aria-label="${t.common.homeAria}">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>Mentivo</span>
      </a>
      <p>${t.footer.positioning}</p>
      <p class="muted">© ${year} Mentivo. ${t.footer.rights}</p>
    </div>
    ${t.footer.groups.map((group) => `<div class="footer-group"><h2>${group.title}</h2>${group.links.map((item) => `<a href="${link(locale, item.href)}">${item.label}</a>`).join("")}</div>`).join("")}
  </div>
</footer>`;
}

function layout(page, t, locale) {
  const image = `${siteUrl}/assets/og-oracle-ball-ai.svg`;
  const extraSchema = page.schema || [];
  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${pageCanonical(page, locale)}">
  ${alternateLinks(page.route)}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Mentivo">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${pageCanonical(page, locale)}">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${image}">
  <meta name="theme-color" content="#050510">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="stylesheet" href="/assets/styles.css">
  ${schemaTag(orgSchema(t, locale))}
  ${schemaTag(breadcrumbSchema(t, locale, page.route, page.h1 || page.title))}
  ${extraSchema.map(schemaTag).join("\n  ")}
</head>
<body data-locale="${locale}">
  ${header(t, locale, page.route)}
  <main>${page.body}</main>
  ${footer(t, locale)}
  <script src="/assets/main.js"></script>
</body>
</html>`;
}

function hero({ badgeText, title, subtitle, primary, secondary, visual = "orb" }, t, locale) {
  return `<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      ${badge(badgeText)}
      <h1>${title}</h1>
      <p class="lead">${subtitle}</p>
      <div class="actions">
        ${primary ? button(primary.label, primary.href, locale, "primary", primary.extra || "") : ""}
        ${secondary ? button(secondary.label, secondary.href, locale, "secondary") : ""}
      </div>
      <p class="safety-line">${t.common.safetyLine}</p>
    </div>
    ${visual === "mockups" ? `<div class="hero-visual">${mockup("ask", t)}</div>` : `<div class="orb-stage" aria-hidden="true"><div class="orb-shell"><div class="orb"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div></div></div>`}
  </div>
</section>`;
}

function pageTitle({ eyebrow, title, subtitle }) {
  return `<section class="page-hero"><div class="container narrow">${badge(eyebrow)}<h1>${title}</h1><p class="lead">${subtitle}</p></div></section>`;
}

function homePage(t, locale) {
  return {
    route: "/",
    title: t.seo.home.title,
    description: t.seo.home.description,
    h1: t.home.hero.title,
    body: `${hero({
      badgeText: t.home.hero.badge,
      title: t.home.hero.title,
      subtitle: t.home.hero.subtitle,
      primary: { label: t.home.hero.primary, href: "/apps/oracle-ball-ai/" },
      secondary: { label: t.home.hero.secondary, href: "/support/" },
    }, t, locale)}
<section class="section section-tight">
  <div class="container app-showcase">
    <article class="card app-featured">
      <div class="app-icon-large" aria-hidden="true"></div>
      <div>
        <p class="eyebrow-soft">Oracle Ball AI</p>
        <h2>${t.home.product.title}</h2>
        <p>${t.home.product.text}</p>
        ${list(t.home.product.bullets)}
        ${button(t.home.product.cta, "/apps/oracle-ball-ai/", locale, "primary")}
      </div>
    </article>
    <aside class="trust-panel">
      <h2>${t.home.trust.title}</h2>
      ${t.home.trust.cards.map((item) => `<div><strong>${item.title}</strong><p>${item.text}</p></div>`).join("")}
    </aside>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
    <div class="section-heading">${badge(t.home.built.badge)}<h2>${t.home.built.title}</h2></div>
    <div class="grid three">${t.home.built.cards.map(iconCard).join("")}</div>
  </div>
</section>`,
  };
}

function appsPage(t, locale) {
  return {
    route: "/apps/",
    title: t.seo.apps.title,
    description: t.seo.apps.description,
    h1: t.apps.title,
    body: `${pageTitle(t.apps.hero)}
<section class="section"><div class="container app-list">${t.apps.items.map((app) => `<article class="card app-row">
  <div class="app-icon-large" aria-hidden="true"></div>
  <div><p class="eyebrow-soft">${app.name}</p><h2>${app.title}</h2><p>${app.text}</p>${list(app.bullets)}<div class="actions compact">${button(app.cta, app.href, locale, "primary")}${button(t.common.supportCta, "/support/", locale, "secondary")}</div></div>
</article>`).join("")}</div></section>`,
  };
}

function oraclePage(t, locale) {
  return {
    route: "/apps/oracle-ball-ai/",
    title: t.seo.oracle.title,
    description: t.seo.oracle.description,
    h1: t.oracle.hero.title,
    schema: [appSchema(t, locale), faqSchema(t.oracle.faq)],
    body: `${hero({
      badgeText: "Oracle Ball AI",
      title: t.oracle.hero.title,
      subtitle: t.oracle.hero.subtitle,
      primary: { label: t.oracle.hero.primary, href: "#features" },
      secondary: { label: t.oracle.hero.secondary, href: "/support/" },
      visual: "mockups",
    }, t, locale)}
<section class="section" id="features"><div class="container"><div class="section-heading">${badge(t.oracle.what.badge)}<h2>${t.oracle.what.title}</h2></div><div class="grid four">${t.oracle.what.cards.map(iconCard).join("")}</div></div></section>
<section class="section section-soft"><div class="container"><div class="section-heading">${badge(t.oracle.how.badge)}<h2>${t.oracle.how.title}</h2></div><div class="grid four numbered">${t.oracle.how.steps.map(iconCard).join("")}</div></div></section>
<section class="section"><div class="container split align-center"><div>${badge(t.oracle.daily.badge)}<h2>${t.oracle.daily.title}</h2><p>${t.oracle.daily.text}</p><div class="pill-grid">${t.oracle.daily.labels.map((label) => `<span>${label}</span>`).join("")}</div></div>${mockup("daily", t)}</div></section>
<section class="section section-soft"><div class="container split align-center"><div>${badge(t.oracle.widget.badge)}<h2>${t.oracle.widget.title}</h2><p>${t.oracle.widget.text}</p>${list(t.oracle.widget.preview, "check-list large")}${button(t.oracle.widget.cta, "/apps/oracle-ball-ai/widget/", locale, "primary")}</div>${mockup("widgets", t)}</div></section>
<section class="section"><div class="container split"><div>${badge(t.oracle.ask.badge)}<h2>${t.oracle.ask.title}</h2><p>${t.oracle.ask.text}</p><div class="quote-grid">${t.oracle.ask.examples.map((item) => `<blockquote>${item}</blockquote>`).join("")}</div></div><div class="card">${badge(t.oracle.astro.badge)}<h2>${t.oracle.astro.title}</h2><p>${t.oracle.astro.text}</p><p class="note">${t.oracle.astro.note}</p></div></div></section>
<section class="section section-soft"><div class="container"><div class="section-heading">${badge(t.oracle.responseFormat.badge)}<h2>${t.oracle.responseFormat.title}</h2><p>${t.oracle.responseFormat.text}</p></div><div class="grid five mini-cards">${t.oracle.responseFormat.parts.map((item) => `<div class="card"><h3>${item}</h3></div>`).join("")}</div><p class="note">${t.oracle.responseFormat.note}</p></div></section>
<section class="section"><div class="container split"><div>${badge(t.oracle.styles.badge)}<h2>${t.oracle.styles.title}</h2><p>${t.oracle.styles.text}</p><h3>${t.oracle.styles.stylesTitle}</h3><div class="pill-grid">${t.oracle.styles.styles.map((item) => `<span>${item}</span>`).join("")}</div></div><div class="card"><h3>${t.oracle.styles.topicsTitle}</h3><div class="pill-grid">${t.oracle.styles.topics.map((item) => `<span>${item}</span>`).join("")}</div><p class="note">${t.oracle.styles.moneySafety}</p></div></div></section>
<section class="section section-soft"><div class="container split"><div>${badge(t.oracle.premium.badge)}<h2>${t.oracle.premium.title}</h2><p>${t.oracle.premium.text}</p><p class="note">${t.oracle.premium.note}</p>${button(t.oracle.premium.cta, "/pricing/", locale, "primary")}</div><div class="card">${list(t.oracle.premium.features, "check-list large")}</div></div></section>
<section class="section"><div class="container notice"><h2>${t.oracle.trust.title}</h2><p>${t.oracle.trust.text}</p>${list(t.oracle.trust.bullets)}</div></section>
<section class="section section-soft"><div class="container narrow"><div class="section-heading">${badge(t.faq.title)}<h2>${t.oracle.faqTitle}</h2></div>${faq(t.oracle.faq)}</div></section>`,
  };
}

function widgetPage(t, locale) {
  return {
    route: "/apps/oracle-ball-ai/widget/",
    title: t.seo.widget.title,
    description: t.seo.widget.description,
    h1: t.widgetPage.hero.title,
    body: `${pageTitle(t.widgetPage.hero)}
<section class="section"><div class="container split align-center"><div><h2>${t.widgetPage.intro.title}</h2><p>${t.widgetPage.intro.text}</p>${list(t.widgetPage.intro.bullets, "check-list large")}</div>${mockup("widgets", t)}</div></section>
<section class="section section-soft"><div class="container"><div class="section-heading">${badge(t.widgetPage.sizes.badge)}<h2>${t.widgetPage.sizes.title}</h2></div><div class="grid three">${Object.values(t.oracle.widget.sizes).map(iconCard).join("")}</div></div></section>
<section class="section"><div class="container"><div class="section-heading">${badge(t.widgetPage.compare.badge)}<h2>${t.widgetPage.compare.title}</h2><p>${t.widgetPage.compare.note}</p></div>${comparisonTable(t.widgetPage.table)}</div></section>`,
  };
}

function pricingPage(t, locale) {
  return {
    route: "/pricing/",
    title: t.seo.pricing.title,
    description: t.seo.pricing.description,
    h1: t.pricing.title,
    body: `${pageTitle(t.pricing.hero)}
<section class="section"><div class="container"><div class="pricing-grid">${t.pricing.plans.map((plan) => `<article class="card pricing-card${plan.featured ? " featured-plan" : ""}"><p class="eyebrow-soft">${plan.label}</p><h2>${plan.title}</h2><p>${plan.text}</p>${list(plan.features)}</article>`).join("")}</div><div class="card price-table"><h2>${t.pricing.subscriptionTitle}</h2><div class="rows">${t.pricing.subscriptions.map((item) => `<span>${item.label}</span><strong>${item.price}</strong>`).join("")}</div><p>${t.pricing.priceNote}</p><p>${t.pricing.previewNote}</p></div></div></section>`,
  };
}

function supportPage(t, locale) {
  return {
    route: "/support/",
    title: t.seo.support.title,
    description: t.seo.support.description,
    h1: t.support.hero.title,
    body: `${pageTitle(t.support.hero)}
<section class="section"><div class="container"><div class="grid three">${t.support.cards.map(iconCard).join("")}</div></div></section>
<section class="section section-soft"><div class="container split"><div>${badge(t.support.contact.badge)}<h2>${t.support.contact.title}</h2><p>${t.support.contact.text.replace("{email}", `<a href="mailto:${supportEmail}">${supportEmail}</a>`)}</p>${list(t.support.contact.include)}</div><div class="card link-card">${t.support.links.map((item) => `<a class="button secondary" href="${link(locale, item.href)}">${item.label}</a>`).join("")}</div></div></section>`,
  };
}

function contactPage(t) {
  return {
    route: "/contact/",
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    h1: t.contact.hero.title,
    body: `${pageTitle(t.contact.hero)}
<section class="section"><div class="container split"><div class="card contact-card"><p class="eyebrow-soft">${t.contact.emailLabel}</p><h2><a href="mailto:${supportEmail}?subject=Oracle%20Ball%20AI%20Support">${supportEmail}</a></h2><p>${t.contact.text}</p></div><div class="grid one">${t.contact.categories.map(iconCard).join("")}</div></div></section>`,
  };
}

function faqPage(t, locale) {
  return {
    route: "/faq/",
    title: t.seo.faq.title,
    description: t.seo.faq.description,
    h1: t.faq.hero.title,
    schema: [faqSchema(t.faq.items)],
    body: `${pageTitle(t.faq.hero)}
<section class="section"><div class="container faq-categories">${t.faq.groups.map((group) => `<article><h2>${group.title}</h2>${faq(group.items)}</article>`).join("")}</div></section>`,
  };
}

function statusPage(t) {
  return {
    route: "/status/",
    title: t.seo.status.title,
    description: t.seo.status.description,
    h1: t.status.hero.title,
    body: `${pageTitle(t.status.hero)}
<section class="section"><div class="container"><div class="status-list">${t.status.rows.map((row) => `<article class="status-row"><span>${row.name}</span><strong>${row.value}</strong></article>`).join("")}</div><p class="note">${t.status.note}</p></div></section>`,
  };
}

function legalPage(t, kind) {
  const page = t.legal[kind];
  return {
    route: page.route,
    title: page.seoTitle,
    description: page.description,
    h1: page.title,
    body: `${pageTitle({ eyebrow: t.legal.eyebrow, title: page.title, subtitle: `${t.legal.updated}: ${page.updated}` })}
<section class="section"><div class="container legal-content">${page.sections.map((section) => `<h2>${section.title}</h2><p>${section.text.replaceAll("{email}", `<a href="mailto:${supportEmail}">${supportEmail}</a>`)}</p>`).join("")}</div></section>`,
  };
}

function pagesFor(t, locale) {
  return [
    homePage(t, locale),
    appsPage(t, locale),
    oraclePage(t, locale),
    widgetPage(t, locale),
    pricingPage(t, locale),
    supportPage(t, locale),
    faqPage(t, locale),
    statusPage(t),
    contactPage(t),
    legalPage(t, "privacy"),
    legalPage(t, "terms"),
    legalPage(t, "deleteData"),
    legalPage(t, "refund"),
    legalPage(t, "cookies"),
  ];
}

function targetPath(locale, route) {
  const local = localizedRoute(locale, route);
  const clean = local === "/" ? "" : local.replace(/^\/|\/$/g, "");
  return path.join(root, clean, "index.html");
}

async function writePage(locale, route, html) {
  const file = targetPath(locale, route);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

async function writeRootPage(route, html) {
  const clean = route === "/" ? "" : route.replace(/^\/|\/$/g, "");
  const file = path.join(root, clean, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

function redirectPage(to) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Redirecting — Mentivo</title><link rel="canonical" href="${urlFor(to)}"><meta http-equiv="refresh" content="0; url=${to}"><script>window.location.replace(${JSON.stringify(to)});</script></head><body><p>Redirecting to <a href="${to}">${to}</a>.</p></body></html>`;
}

function urlFor(route) {
  return joinUrl(siteUrl, route);
}

function flattenKeys(value, prefix = "") {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, nested]) => flattenKeys(nested, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

function valueAt(obj, key) {
  return key.split(".").reduce((acc, part) => acc?.[part], obj);
}

function validateLocales(dictionary) {
  const baseKeys = flattenKeys(dictionary[defaultLocale]).sort();
  for (const locale of locales) {
    const keys = flattenKeys(dictionary[locale]).sort();
    const missing = baseKeys.filter((key) => !keys.includes(key));
    if (missing.length) throw new Error(`${locale} is missing locale keys:\n${missing.join("\n")}`);
    for (const key of ["seo.home.title", "seo.home.description", "seo.oracle.title", "seo.oracle.description"]) {
      if (!valueAt(dictionary[locale], key)) throw new Error(`${locale} has empty required SEO field ${key}`);
    }
  }
  const russianSentinels = ["персональный ИИ-оракул", "главном экране", "гарантированное предсказание"];
  const enText = JSON.stringify(dictionary.en);
  const ukText = JSON.stringify(dictionary.uk);
  for (const phrase of russianSentinels) {
    if (enText.includes(phrase)) throw new Error(`Russian phrase leaked into English locale: ${phrase}`);
    if (ukText.includes(phrase)) throw new Error(`Russian phrase leaked into Ukrainian locale: ${phrase}`);
  }
}

async function main() {
  const dictionary = Object.fromEntries(await Promise.all(locales.map(async (locale) => [locale, await loadLocale(locale)])));
  validateLocales(dictionary);

  const allPages = [];
  for (const locale of locales) {
    const t = dictionary[locale];
    for (const page of pagesFor(t, locale)) {
      allPages.push([locale, page]);
      await writePage(locale, page.route, layout(page, t, locale));
    }
  }

  const english = dictionary[defaultLocale];
  for (const page of pagesFor(english, defaultLocale)) {
    await writeRootPage(page.route, layout({ ...page, canonicalOverride: urlFor(page.route) }, english, defaultLocale));
  }

  const redirects = [
    ["/privacy/", "/legal/privacy/"],
    ["/terms/", "/legal/terms/"],
    ["/delete-data/", "/legal/delete-data/"],
    ["/refund-policy/", "/refund/"],
    ["/refunds/", "/refund/"],
  ];
  for (const [from, to] of redirects) {
    const file = path.join(root, from.replace(/^\/|\/$/g, ""), "index.html");
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, redirectPage(to));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map((route) => `  <url>
    <loc>${canonical(defaultLocale, route)}</loc>
${locales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${canonical(locale, route)}" />`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(defaultLocale, route)}" />
  </url>`).join("\n")}
</urlset>
`;
  await writeFile(path.join(root, "sitemap.xml"), sitemap);

  await writeFile(path.join(root, "robots.txt"), `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);
}

main();
