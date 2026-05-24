import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteUrl = "https://www.mentivo.net";
const supportEmail = "mentivonet@gmail.com";
const year = "2026";

const copy = {
  en: {
    studioPositioning:
      "Mentivo is an independent app studio creating calm, premium mobile experiences for reflection, decision clarity, and useful everyday moments.",
  },
};

const apps = [
  {
    name: "Oracle Ball AI",
    href: "/apps/oracle-ball-ai/",
    tagline: "Not just yes or no. Get clarity.",
    description:
      "A mystical AI oracle for decisions, reflection, and fun. Ask by voice or text, choose a mode, and receive a calm answer with Heart says, Mind says, and an Orb verdict.",
    bullets: [
      "Not just yes or no",
      "Heart says / Mind says",
      "Daily Oracle",
      "Voice or text questions",
      "Premium themes",
      "Up to 100 AI answers per day with Premium",
      "Built for global audiences",
    ],
  },
  {
    name: "Coming soon",
    href: "/apps/",
    tagline: "More calm mobile experiences are in development.",
    description:
      "Mentivo is built to support future apps with shared support, privacy, legal, pricing, and data deletion pages.",
    bullets: ["Privacy-first", "Global-ready", "Premium mobile design"],
  },
];

const nav = [
  ["Apps", "/apps/"],
  ["Oracle Ball AI", "/apps/oracle-ball-ai/"],
  ["Support", "/support/"],
  ["Pricing", "/pricing/"],
  ["Privacy", "/legal/privacy/"],
  ["Terms", "/legal/terms/"],
];

const footerGroups = [
  {
    title: "Mentivo",
    links: [
      ["Apps", "/apps/"],
      ["Oracle Ball AI", "/apps/oracle-ball-ai/"],
      ["Support", "/support/"],
      ["Contact", "/contact/"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/legal/privacy/"],
      ["Terms of Use", "/legal/terms/"],
      ["Delete Data", "/legal/delete-data/"],
      ["Refund Policy", "/refund/"],
      ["Cookie Policy", "/legal/cookies/"],
    ],
  },
  {
    title: "App",
    links: [
      ["Pricing", "/pricing/"],
      ["FAQ", "/faq/"],
      ["Status", "/status/"],
      ["App ads", "/app-ads.txt"],
    ],
  },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attrs(items) {
  return Object.entries(items)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => `${key}="${esc(value)}"`)
    .join(" ");
}

function urlFor(route) {
  if (route === "/") return `${siteUrl}/`;
  return `${siteUrl}${route}`;
}

function button(label, href, variant = "primary", extra = "") {
  return `<a class="button ${variant}" href="${href}"${extra}>${label}</a>`;
}

function badge(text) {
  return `<div class="badge">${text}</div>`;
}

function iconCard(title, text) {
  return `<article class="card feature-card"><div class="card-icon" aria-hidden="true"></div><h3>${title}</h3><p>${text}</p></article>`;
}

function faq(items) {
  return `<div class="faq-list">${items
    .map(
      ([q, a]) => `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`,
    )
    .join("")}</div>`;
}

function header() {
  return `<header class="site-header">
  <nav class="nav" aria-label="Main navigation">
    <a class="brand" href="/" aria-label="Mentivo home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>Mentivo</span>
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu">
      <span></span><span></span><span></span>
      <span class="sr-only">Open menu</span>
    </button>
    <div class="nav-links" id="site-menu">
      ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
      <a class="nav-cta" href="/support/">Get support</a>
    </div>
  </nav>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/" aria-label="Mentivo home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>Mentivo</span>
      </a>
      <p>${copy.en.studioPositioning}</p>
      <p class="muted">© ${year} Mentivo. All rights reserved.</p>
    </div>
    ${footerGroups
      .map(
        (group) => `<div class="footer-group"><h2>${group.title}</h2>${group.links
          .map(([label, href]) => `<a href="${href}">${label}</a>`)
          .join("")}</div>`,
      )
      .join("")}
  </div>
</footer>`;
}

function layout(page) {
  const title = page.title;
  const description = page.description;
  const canonical = urlFor(page.route);
  const image = `${siteUrl}/assets/og-mentivo.png`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Mentivo">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${image}">
  <meta name="theme-color" content="#050510">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  ${header()}
  <main>${page.body}</main>
  ${footer()}
  <script src="/assets/main.js"></script>
</body>
</html>`;
}

function hero({ badgeText, title, subtitle, primary, secondary, visual = true }) {
  return `<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      ${badge(badgeText)}
      <h1>${title}</h1>
      <p class="lead">${subtitle}</p>
      <div class="actions">
        ${primary ? button(primary.label, primary.href, "primary", primary.extra || "") : ""}
        ${secondary ? button(secondary.label, secondary.href, "secondary") : ""}
      </div>
    </div>
    ${
      visual
        ? `<div class="orb-stage" aria-hidden="true">
      <div class="orb-shell">
        <div class="orb"></div>
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
      </div>
    </div>`
        : ""
    }
  </div>
</section>`;
}

function pageTitle({ eyebrow, title, subtitle }) {
  return `<section class="page-hero">
  <div class="container narrow">
    ${badge(eyebrow)}
    <h1>${title}</h1>
    <p class="lead">${subtitle}</p>
  </div>
</section>`;
}

function homePage() {
  return {
    route: "/",
    title: "Mentivo — Premium apps for clarity, reflection, and everyday decisions",
    description:
      "Mentivo is an independent app studio creating calm, premium mobile experiences for reflection, decision clarity, and useful everyday moments.",
    body: `${hero({
      badgeText: "Independent app studio",
      title: "Calm apps for clarity, reflection, and everyday decisions.",
      subtitle:
        "Mentivo creates premium mobile experiences that help people pause, ask better questions, and make calmer decisions.",
      primary: { label: "Explore apps", href: "/apps/" },
      secondary: { label: "Get support", href: "/support/" },
    })}
<section class="section">
  <div class="container">
    <div class="section-heading">
      ${badge("What we build")}
      <h2>Premium mobile experiences with clear support and privacy.</h2>
    </div>
    <div class="grid three">
      ${iconCard("Reflection apps", "Small tools that help users pause, think clearly, and see a situation from a new angle.")}
      ${iconCard("Decision clarity", "Simple experiences for everyday questions, choices, moods, and personal insights.")}
      ${iconCard("Premium mobile design", "Calm interfaces, clear privacy, fair monetization, and global language support.")}
    </div>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
    <div class="split-heading">
      <div>${badge("Apps")}<h2>Built for global audiences.</h2></div>
      <p>Each Mentivo app is designed with permanent legal URLs, transparent support, and practical safety boundaries.</p>
    </div>
    <div class="app-showcase">
      <article class="card app-featured">
        <div class="app-icon-large" aria-hidden="true"></div>
        <div>
          <p class="eyebrow-soft">Oracle Ball AI</p>
          <h3>Not just yes or no. Get clarity.</h3>
          <p>${apps[0].description}</p>
          <ul class="check-list">${apps[0].bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
          ${button("View Oracle Ball AI", "/apps/oracle-ball-ai/", "primary")}
        </div>
      </article>
      <article class="card app-secondary">
        <h3>Future app</h3>
        <p>More calm, useful mobile experiences are coming soon.</p>
      </article>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-heading">
      ${badge("Built for trust")}
      <h2>Clear policies, careful claims, and responsible AI from the start.</h2>
    </div>
    <div class="grid three">
      ${iconCard("Clear privacy", "We explain what data is processed, why it is needed, and how users can request deletion.")}
      ${iconCard("Transparent purchases", "Subscriptions and in-app purchases are handled through Apple, with restore and cancellation instructions.")}
      ${iconCard("Safe AI experiences", "Our apps are designed for reflection and entertainment, not professional advice or guaranteed predictions.")}
    </div>
  </div>
</section>
<section class="section">
  <div class="container cta-band">
    <div>
      ${badge("Need help?")}
      <h2>Support for apps, purchases, subscriptions, privacy, and data.</h2>
      <p>For questions about apps, purchases, subscriptions, data, privacy, or support, visit our support center.</p>
    </div>
    ${button("Open support", "/support/", "primary")}
  </div>
</section>`,
  };
}

function appsPage() {
  return {
    route: "/apps/",
    title: "Mentivo Apps — Premium mobile experiences",
    description:
      "Explore Mentivo apps for reflection, clarity, and everyday decisions, including Oracle Ball AI.",
    body: `${pageTitle({
      eyebrow: "Apps",
      title: "Mentivo Apps",
      subtitle: "Premium mobile experiences for reflection, clarity, and everyday decisions.",
    })}
<section class="section">
  <div class="container app-list">
    ${apps
      .map(
        (app) => `<article class="card app-row">
      <div class="app-icon-large" aria-hidden="true"></div>
      <div>
        <p class="eyebrow-soft">${app.name}</p>
        <h2>${app.tagline}</h2>
        <p>${app.description}</p>
        <ul class="check-list">${app.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="actions compact">
          ${button(app.name === "Oracle Ball AI" ? "View app" : "Coming soon", app.href, "primary")}
          ${button("Support", "/support/", "secondary")}
        </div>
      </div>
    </article>`,
      )
      .join("")}
  </div>
</section>`,
  };
}

function oraclePage() {
  return {
    route: "/apps/oracle-ball-ai/",
    title: "Oracle Ball AI — Not just yes or no. Get clarity.",
    description:
      "Ask questions by voice or text and receive mystical AI-powered reflections for decisions, love, money, career, and everyday moments.",
    body: `${hero({
      badgeText: "Oracle Ball AI",
      title: "Not just yes or no. Get clarity.",
      subtitle:
        "Ask your question by voice or text and receive a mystical AI-powered reflection for decisions, love, money, career, and everyday moments.",
      primary: { label: "App Store link coming soon", href: "/support/", extra: ' aria-label="App Store link coming soon. Contact support for updates."' },
      secondary: { label: "Get support", href: "/support/" },
    })}
<section class="section">
  <div class="container">
    <div class="section-heading">${badge("How it works")}<h2>Ask, reveal, reflect.</h2></div>
    <div class="grid three numbered">
      ${iconCard("Ask", "Type your question or use your voice. Voice input turns speech into text before the final question is submitted.")}
      ${iconCard("Reveal", "The Orb gives a short verdict with a reflective answer, using the language selected in the app.")}
      ${iconCard("Reflect", "See Heart says, Mind says, advice, and a gentle warning when needed.")}
    </div>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
    <div class="section-heading">${badge("Modes")}<h2>Choose your Oracle mode.</h2></div>
    <div class="grid three">
      ${iconCard("Classic", "Quick yes/no/maybe style answers, including offline Classic mode.")}
      ${iconCard("Wise", "Calm, reflective answers for everyday decisions.")}
      ${iconCard("Love", "Gentle insights for relationships and communication, without pressure or manipulation.")}
      ${iconCard("Money", "Careful reflections for spending, business, and risk awareness.")}
      ${iconCard("Career", "Practical clarity for work, projects, and direction.")}
      ${iconCard("Funny", "Playful, witty answers when you want the Orb with personality.")}
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div>
      ${badge("Premium")}
      <h2>Go deeper with Premium.</h2>
      <p>Premium removes ads, unlocks deeper reflection tools, and raises usage limits without promising unlimited usage.</p>
    </div>
    <div class="card">
      <ul class="check-list large">
        <li>Up to 100 AI answers per day</li>
        <li>No ads</li>
        <li>Heart says / Mind says</li>
        <li>Full question history</li>
        <li>Daily Oracle Plus</li>
        <li>Premium themes</li>
        <li>Love, Money, Career, and Funny modes</li>
      </ul>
      ${button("View pricing", "/pricing/", "primary")}
    </div>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
    <div class="section-heading">${badge("Features")}<h2>A mystical interface built for reflection.</h2></div>
    <div class="grid three">
      ${iconCard("Heart says", "See the emotional side of your question in a warm, reflective tone.")}
      ${iconCard("Mind says", "Get a practical angle that helps you slow down and think clearly.")}
      ${iconCard("Orb verdict", "Receive a short mystical answer that works as a reflection prompt.")}
      ${iconCard("Voice or text", "Type your question or speak it out loud before asking the Orb.")}
      ${iconCard("Daily Oracle", "Start the day with a small reflective prompt.")}
      ${iconCard("Premium themes", "Unlock deeper answers, remove ads, and personalize the experience.")}
    </div>
  </div>
</section>
<section class="section">
  <div class="container notice">
    <h2>Designed for reflection, not prediction</h2>
    <p>Oracle Ball AI is designed for entertainment, reflection, and decision clarity. It does not predict the future and does not replace professional advice.</p>
    <p>The app does not provide medical, legal, financial, emergency, or mental health advice. For important situations, contact a qualified professional or local emergency service.</p>
  </div>
</section>
<section class="section">
  <div class="container narrow">
    <div class="section-heading">${badge("FAQ")}<h2>Oracle Ball AI questions.</h2></div>
    ${faq([
      ["Does Oracle Ball AI predict the future?", "No. It is designed for entertainment and reflection."],
      ["Can I ask by voice?", "Yes. Voice input can turn your spoken question into text before you ask the Orb."],
      ["Can I delete my history?", "Yes. You can delete question history and request account/data deletion."],
      ["Does the app show ads?", "Free users may see ads. Premium removes ads where applicable."],
      ["Are AI answers private?", "Question text may be processed to generate answers. We avoid sending unnecessary personal data and explain this in our Privacy Policy."],
      ["How many Premium answers are included?", "Premium is designed for high personal use, currently up to 100 AI answers per day, subject to fair use, safety, and backend limits."],
    ])}
  </div>
</section>`,
  };
}

function supportPage() {
  return {
    route: "/support/",
    title: "Support — Mentivo",
    description:
      "Get help with Mentivo apps, subscriptions, purchases, privacy, data deletion, and app support.",
    body: `${pageTitle({
      eyebrow: "Support Center",
      title: "Support Center",
      subtitle:
        `Get help with Mentivo apps, subscriptions, purchases, privacy, and data requests. Email ${supportEmail}.`,
    })}
<section class="section">
  <div class="container support-grid">
    ${iconCard("App support", "Oracle Ball AI support covers subscriptions, credits, ads, voice input, language settings, question history, and data deletion.")}
    ${iconCard("Billing and purchases", "Learn how to cancel subscriptions, restore purchases, request Apple refunds, and fix Premium not appearing after purchase.")}
    ${iconCard("Privacy and data", "Understand how to delete history, request account/data deletion, and how AI processing works.")}
    ${iconCard("Technical issues", "Help for voice input, ads not loading, wrong app language, AI answers not generating, and purchase failures.")}
  </div>
</section>
<section class="section section-soft">
  <div class="container split">
    <div>
      ${badge("Contact")}
      <h2>Still need help?</h2>
      <p>Email us at <a href="mailto:${supportEmail}">${supportEmail}</a>. Please include the app name, device/platform, what happened, and screenshots if helpful.</p>
      <p>We aim to respond as soon as possible.</p>
    </div>
    <div class="card link-card">
      ${button("Privacy Policy", "/legal/privacy/", "secondary")}
      ${button("Terms of Use", "/legal/terms/", "secondary")}
      ${button("Delete Data", "/legal/delete-data/", "secondary")}
      ${button("Refund Policy", "/refund/", "secondary")}
      ${button("Apple billing support", "https://support.apple.com/billing", "primary", ' rel="noopener"')}
    </div>
  </div>
</section>
<section class="section">
  <div class="container narrow">
    <div class="section-heading">${badge("FAQ")}<h2>Common support questions.</h2></div>
    ${faq([
      ["How do I cancel a subscription?", "Open iPhone Settings, tap your Apple ID, choose Subscriptions, select the app subscription, and cancel it there."],
      ["How do I restore purchases?", "Open the app, go to Settings or Premium, and tap Restore Purchases."],
      ["Why is Premium not active after purchase?", "Make sure you are using the same Apple ID, then tap Restore Purchases. If it still does not work, contact support."],
      ["How do I request an Apple refund?", "Use Apple’s Report a Problem page or Apple billing support. Mentivo cannot directly issue App Store refunds."],
      ["Does Oracle Ball AI predict the future?", "No. It is designed for entertainment, reflection, and decision clarity."],
      ["How do I delete my data?", "Use app Settings for local history or visit Delete Data for account/backend deletion instructions."],
    ])}
  </div>
</section>`,
  };
}

function contactPage() {
  return {
    route: "/contact/",
    title: "Contact Mentivo — App support, privacy, and legal requests",
    description:
      "Contact Mentivo for app support, privacy requests, business questions, or legal notices.",
    body: `${pageTitle({
      eyebrow: "Contact",
      title: "Contact Mentivo",
      subtitle:
        "For app support, privacy requests, business questions, or legal notices, contact us by email.",
    })}
<section class="section">
  <div class="container split">
    <div class="card contact-card">
      <p class="eyebrow-soft">Email</p>
      <h2><a href="mailto:${supportEmail}">${supportEmail}</a></h2>
      <p>Please include the app name and your device/platform when contacting support.</p>
    </div>
    <div class="grid one">
      ${iconCard("App support", "For subscriptions, purchases, credits, ads, voice input, language settings, or app issues.")}
      ${iconCard("Privacy requests", "For data deletion, privacy questions, or account requests.")}
      ${iconCard("Business / legal", "For business or legal questions related to Mentivo apps and websites.")}
    </div>
  </div>
</section>`,
  };
}

function pricingPage() {
  return {
    route: "/pricing/",
    title: "Pricing — Mentivo",
    description:
      "Mentivo apps may include free features, optional ads, subscriptions, and one-time purchases.",
    body: `${pageTitle({
      eyebrow: "Pricing",
      title: "Pricing",
      subtitle:
        "Mentivo apps may include free features, optional ads, subscriptions, and one-time purchases.",
    })}
<section class="section">
  <div class="container">
    <div class="section-heading">${badge("Oracle Ball AI")}<h2>Free, Premium, and answer credits.</h2></div>
    <div class="pricing-grid">
      <article class="card pricing-card">
        <p class="eyebrow-soft">Free</p>
        <h3>Start with reflection</h3>
        <ul class="check-list">
          <li>Basic answers</li>
          <li>Limited AI answers</li>
          <li>Daily Oracle</li>
          <li>Ads may be shown</li>
          <li>Limited history</li>
        </ul>
      </article>
      <article class="card pricing-card featured-plan">
        <p class="eyebrow-soft">Premium</p>
        <h3>Go deeper</h3>
        <ul class="check-list">
          <li>Up to 100 AI answers per day</li>
          <li>No ads</li>
          <li>Premium modes</li>
          <li>Full history</li>
          <li>Daily Oracle Plus</li>
          <li>Premium themes</li>
        </ul>
      </article>
      <article class="card pricing-card">
        <p class="eyebrow-soft">One-time credits</p>
        <h3>Deep answers</h3>
        <ul class="check-list">
          <li>10 Deep Answers — $0.99</li>
          <li>50 Deep Answers — $2.99</li>
          <li>100 Deep Answers — $4.99</li>
          <li>Credits do not expire where supported by the app</li>
        </ul>
      </article>
    </div>
    <div class="card price-table">
      <h2>Subscriptions</h2>
      <div class="rows">
        <span>Weekly</span><strong>$4.99/week</strong>
        <span>Monthly</span><strong>$9.99/month</strong>
        <span>Yearly</span><strong>$39.99/year</strong>
      </div>
      <p>Prices may vary by country, currency, taxes, App Store region, promotions, and Apple rules. The final price is shown in the App Store purchase screen before confirmation.</p>
    </div>
  </div>
</section>`,
  };
}

function refundPage() {
  return {
    route: "/refund/",
    title: "Refund Policy — Mentivo",
    description:
      "Purchases and subscriptions for Mentivo iOS apps are processed by Apple. Learn how refund requests work.",
    body: `${pageTitle({
      eyebrow: "Refund Policy",
      title: "Refund Policy",
      subtitle: "Purchases and subscriptions for Mentivo iOS apps are processed by Apple.",
    })}
<section class="section">
  <div class="container legal-content">
    <p>Mentivo does not directly process App Store payments and cannot directly issue App Store refunds. Refund requests are handled by Apple according to Apple Media Services Terms and App Store rules.</p>
    <h2>How to request a refund</h2>
    <p>Go to Apple’s Report a Problem page or Apple Support and follow the refund request steps.</p>
    <h2>Subscriptions</h2>
    <p>You can cancel subscriptions in iPhone Settings &gt; Apple ID &gt; Subscriptions.</p>
    <h2>Restore purchases</h2>
    <p>If you bought Premium or credits and they do not appear in the app, open the app and tap Restore Purchases in Settings or Premium.</p>
    <h2>Need help?</h2>
    <p>Email <a href="mailto:${supportEmail}">${supportEmail}</a> with the app name, issue description, purchase date if available, and a screenshot if helpful.</p>
    ${button("Apple billing support", "https://support.apple.com/billing", "primary", ' rel="noopener"')}
  </div>
</section>`,
  };
}

const faqItems = [
  ["What is Mentivo?", "Mentivo is an independent app studio creating calm, premium mobile experiences for reflection, decision clarity, and useful everyday moments."],
  ["What apps does Mentivo make?", "Mentivo currently supports Oracle Ball AI and is preparing future mobile apps."],
  ["Is Mentivo available globally?", "Mentivo apps are designed for global audiences, with multilingual architecture and clear support pages."],
  ["Does Oracle Ball AI predict the future?", "No. It is designed for entertainment, reflection, and decision clarity."],
  ["What is Heart says / Mind says?", "It is a reflection format that separates emotional perspective from practical perspective."],
  ["Can I use voice input?", "Yes. Apple speech recognition can turn your voice into text before you submit the question."],
  ["Can I change language?", "Yes. Oracle Ball AI supports automatic device language detection and manual language settings."],
  ["Can I delete history?", "Yes. You can delete question history and request account/data deletion."],
  ["How do I cancel Premium?", "Cancel through iPhone Settings &gt; Apple ID &gt; Subscriptions."],
  ["How do I restore purchases?", "Open the app and tap Restore Purchases in Settings or Premium."],
  ["Why do I see ads?", "Free users may see ads. Premium removes ads where applicable."],
  ["How do I remove ads?", "Upgrade to Premium or use Remove Ads / Go Premium in the app."],
  ["What data is collected?", "Depending on the app, we may process usage data, purchase status, device language, settings, diagnostics, ad identifiers where permitted, support messages, and AI question text submitted for answers."],
  ["Are questions used for analytics?", "Full question text should not be sent in analytics events. Analytics may include mode, language, question length, user type, and answer type."],
  ["Can I delete my data?", "Yes. Visit Delete Data or use the app settings where available."],
  ["Does the app send my question to AI providers?", "For AI answers, question text may be sent from the app to Mentivo backend and then to an AI provider to generate the answer."],
  ["Can I use it for medical/legal/financial advice?", "No. The app does not replace qualified professional advice and does not provide emergency guidance."],
  ["What should I do in an emergency?", "Contact local emergency services or a qualified professional immediately."],
  ["How many Premium answers are available?", "Premium currently provides up to 100 AI answers per day, subject to fair use, safety, service availability, and backend limits."],
];

function faqPage() {
  return {
    route: "/faq/",
    title: "FAQ — Mentivo",
    description:
      "Answers to common questions about Mentivo, Oracle Ball AI, purchases, ads, privacy, data deletion, and safety.",
    body: `${pageTitle({
      eyebrow: "FAQ",
      title: "FAQ",
      subtitle: "Answers about Mentivo apps, purchases, privacy, AI processing, and safety.",
    })}
<section class="section">
  <div class="container narrow">${faq(faqItems)}</div>
</section>`,
  };
}

function legalPage(kind) {
  const shared = {
    privacy: {
      route: "/legal/privacy/",
      title: "Privacy Policy — Mentivo",
      description:
        "Learn how Mentivo collects, uses, and protects information for its websites, mobile apps, AI features, analytics, ads, and support.",
      heading: "Privacy Policy",
      updated: "May 25, 2026",
      sections: [
        ["Overview", "This Privacy Policy explains how Mentivo collects, uses, and protects information when you use our websites, mobile applications, AI features, analytics, ads, and support services."],
        ["Data we collect", "Depending on the app and features you use, we may process app usage data, purchase/subscription status, device language, app settings, crash diagnostics, advertising identifiers where permitted, support messages, and question text submitted for AI features."],
        ["What we do not do", "We do not sell personal data. We do not use full question text in analytics events. We do not store OpenAI API keys in the app. We do not claim to predict the future."],
        ["AI processing", "For AI-powered features, question text may be sent from the app to our backend and then to an AI provider to generate an answer. We avoid sending unnecessary personal data and use this processing to provide the requested feature and maintain service safety."],
        ["Advertising", "Free users may see ads from advertising partners such as Google AdMob. Advertising partners may process device and ad interaction data according to their own policies and user consent settings."],
        ["Analytics", "Analytics events may include mode, language, question length, user type, answer type, app opens, purchases, ads, and feature usage. Analytics events should not include full question text."],
        ["Purchases", "In-app purchases and subscriptions are processed by Apple. We may receive transaction status and product identifiers needed to unlock paid features, credits, Premium status, or restore purchases."],
        ["Children", "Our apps are not intended for children under 13 or the minimum age required by local law. If you believe a child has provided personal data, contact us so we can review and remove it where required."],
        ["Data deletion", `You can delete local history in the app and request backend/account deletion. See <a href="/legal/delete-data/">Delete Data</a> for instructions.`],
        ["Contact", `For privacy questions or requests, contact <a href="mailto:${supportEmail}">${supportEmail}</a>.`],
      ],
    },
    terms: {
      route: "/legal/terms/",
      title: "Terms of Use — Mentivo",
      description: "Read the terms that apply to Mentivo websites and mobile apps.",
      heading: "Terms of Use",
      updated: "May 25, 2026",
      sections: [
        ["Acceptance", "By using Mentivo apps or websites, you agree to these Terms of Use and our Privacy Policy. If you do not agree, do not use the services."],
        ["Eligibility", "You must be at least 13 years old or the minimum age required by local law to use Mentivo apps and websites."],
        ["Entertainment and reflection", "Oracle Ball AI is designed for entertainment, reflection, and decision clarity. It does not predict the future and does not replace professional advice."],
        ["AI limitations", "AI answers may be incomplete, inaccurate, symbolic, or unsuitable for serious decisions. You are responsible for decisions made after using the app."],
        ["No professional advice", "Our apps do not provide medical, legal, financial, mental health, emergency, or other professional advice. For important matters, contact a qualified professional or appropriate emergency service."],
        ["Subscriptions and renewal", "Subscriptions renew unless cancelled through Apple. Prices, trial availability, renewal terms, cancellation, and refunds are governed by Apple App Store rules and the purchase screen shown to you."],
        ["Credits", "Purchased answer credits may be used for app features and are subject to app functionality, service availability, fair use, safety, and backend limits. Premium users do not spend credits where the app is designed that way."],
        ["Ads", "Free users may see ads. Premium removes ads where applicable."],
        ["Feature changes", "Mentivo may change, pause, or discontinue features, themes, modes, limits, pricing, or app availability."],
        ["Limits and fair use", "Premium currently provides up to 100 AI answers per day, subject to fair use, safety checks, service availability, and backend enforcement. We do not promise unlimited usage."],
        ["Contact", `For questions about these terms, contact <a href="mailto:${supportEmail}">${supportEmail}</a>.`],
      ],
    },
    delete: {
      route: "/legal/delete-data/",
      title: "Delete Data — Mentivo",
      description: "Learn how to delete local history, account data, backend data, and support messages for Mentivo apps.",
      heading: "Delete Data",
      updated: "May 25, 2026",
      sections: [
        ["Delete local question history", "1. Open the app. 2. Go to Settings. 3. Tap Delete question history. 4. Confirm deletion."],
        ["Delete account/data", "1. Open the app. 2. Go to Settings. 3. Tap Delete account / data. 4. Confirm deletion."],
        ["Email request", `If you cannot access the app, email <a href="mailto:${supportEmail}">${supportEmail}</a>. Include the app name, Apple account email if available, user identifier shown in app settings if available, and request type: delete account, delete backend data, or delete support message.`],
        ["What we may keep", "Some records may be retained for legal, tax, purchase verification, fraud prevention, security, or dispute resolution where permitted by law."],
        ["Response time", "We aim to respond to deletion requests as soon as possible and within the time required by applicable law."],
      ],
    },
    cookies: {
      route: "/legal/cookies/",
      title: "Cookie Policy — Mentivo",
      description: "Learn how Mentivo websites may use essential technologies, analytics, and advertising technologies.",
      heading: "Cookie Policy",
      updated: "May 25, 2026",
      sections: [
        ["Overview", "Mentivo websites may use essential technologies for site operation and may use analytics or advertising technologies if enabled."],
        ["Essential cookies / local storage", "Essential technologies may support navigation, security, preferences, and basic site operation."],
        ["Analytics", "If analytics are enabled, they help us understand aggregate website usage and improve content. We aim to avoid collecting unnecessary personal data."],
        ["Advertising", "This website currently uses minimal technologies. Mentivo apps may use analytics and ads as described in the Privacy Policy."],
        ["Managing choices", "You can manage cookies and local storage in your browser settings. App-level tracking choices are managed in iOS settings where applicable."],
        ["Contact", `For cookie questions, contact <a href="mailto:${supportEmail}">${supportEmail}</a>.`],
      ],
    },
  }[kind];

  return {
    route: shared.route,
    title: shared.title,
    description: shared.description,
    body: `${pageTitle({
      eyebrow: "Legal",
      title: shared.heading,
      subtitle: `Last updated: ${shared.updated}`,
    })}
<section class="section">
  <div class="container legal-content">
    ${shared.sections.map(([title, text]) => `<h2>${title}</h2><p>${text}</p>`).join("")}
  </div>
</section>`,
  };
}

function statusPage() {
  return {
    route: "/status/",
    title: "Status — Mentivo",
    description: "Simple service status information for Mentivo apps and support pages.",
    body: `${pageTitle({
      eyebrow: "Status",
      title: "Status",
      subtitle: "Simple service status information for Mentivo apps and support pages.",
    })}
<section class="section">
  <div class="container grid three">
    ${iconCard("Website", "Operational")}
    ${iconCard("Support email", "Operational")}
    ${iconCard("Oracle Ball AI backend", "Monitored through app infrastructure")}
  </div>
</section>`,
  };
}

const pages = [
  homePage(),
  appsPage(),
  oraclePage(),
  supportPage(),
  contactPage(),
  pricingPage(),
  refundPage(),
  faqPage(),
  statusPage(),
  legalPage("privacy"),
  legalPage("terms"),
  legalPage("delete"),
  legalPage("cookies"),
];

const redirects = [
  ["/privacy/", "/legal/privacy/"],
  ["/terms/", "/legal/terms/"],
  ["/delete-data/", "/legal/delete-data/"],
  ["/refund-policy/", "/refund/"],
  ["/refunds/", "/refund/"],
];

function redirectPage(from, to) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting — Mentivo</title>
  <link rel="canonical" href="${urlFor(to)}">
  <meta http-equiv="refresh" content="0; url=${to}">
  <script>window.location.replace(${JSON.stringify(to)});</script>
</head>
<body>
  <p>Redirecting to <a href="${to}">${to}</a>.</p>
</body>
</html>`;
}

function targetPath(route) {
  if (route.endsWith(".html")) return path.join(root, route.slice(1));
  const clean = route === "/" ? "" : route.replace(/^\/|\/$/g, "");
  return path.join(root, clean, "index.html");
}

async function writePage(route, html) {
  const file = targetPath(route);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

async function main() {
  for (const page of pages) {
    await writePage(page.route, layout(page));
  }

  for (const [from, to] of redirects) {
    await writePage(from, redirectPage(from, to));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => `  <url><loc>${urlFor(page.route)}</loc></url>`)
  .join("\n")}
</urlset>
`;
  await writeFile(path.join(root, "sitemap.xml"), sitemap);

  await writeFile(
    path.join(root, "robots.txt"),
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  );
}

main();
