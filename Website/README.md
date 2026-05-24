# Mentivo Website

Static website for `https://www.mentivo.net/`.

## Pages

- `/` - Mentivo home
- `/apps/` - Mentivo app catalog
- `/apps/oracle-ball-ai/` - Oracle Ball AI product page
- `/support/` - support center for all Mentivo apps
- `/contact/` - contact page
- `/pricing/` - app pricing and purchase information
- `/refund/` - App Store refund policy
- `/faq/` - FAQ for apps, purchases, privacy, ads, and safety
- `/status/` - service status
- `/legal/privacy/` - Privacy Policy
- `/legal/terms/` - Terms of Use
- `/legal/delete-data/` - Delete Data instructions
- `/legal/cookies/` - Cookie Policy
- `/app-ads.txt` - AdMob publisher declaration
- `/sitemap.xml` - SEO sitemap
- `/robots.txt` - crawler rules

Legacy legal URLs are redirected:

- `/privacy` -> `/legal/privacy/`
- `/terms` -> `/legal/terms/`
- `/delete-data` -> `/legal/delete-data/`
- `/refund-policy` -> `/refund/`
- `/refunds` -> `/refund/`

## Deploy

This folder is the canonical production website source. The old `MentivoDeploy/` Next.js career-test app is not used for the current Mentivo studio website.

GitHub Pages deploys the contents of this `Website` folder through `.github/workflows/deploy-website.yml`.

Vercel is configured from the repository root with `vercel.json`:

- build command: `node Website/tools/build-site.mjs`
- output directory: `Website`

If a Vercel project is connected manually, make sure it uses the repository root and respects `vercel.json`, or set the output directory to `Website`.

Keep `CNAME` in the root of the deployed site.

Regenerate static pages after editing content:

```bash
node Website/tools/build-site.mjs
```

Premium copy must stay conservative: Oracle Ball AI Premium is described as up to 100 AI answers per day, subject to fair use, safety, service availability, and backend enforcement. Do not describe Premium as unlimited.

AdMob publisher declaration:

```text
google.com, pub-8843292959471328, DIRECT, f08c47fec0942fa0
```

Also make sure `mentivonet@gmail.com` forwards to your real inbox.
