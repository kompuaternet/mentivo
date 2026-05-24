# Oracle Ball AI

Premium mystical iOS SwiftUI MVP for entertainment, self-reflection, and decision clarity.

## What is included

- SwiftUI iOS 17 app scaffold with clean feature/core structure.
- Home, animated SwiftUI orb, question input, voice input, shake-to-ask.
- Language auto-detection with manual language override and RTL support hooks.
- Local mock answers and offline Classic mode.
- Answer screen with Heart says / Mind says / Orb verdict.
- History, Daily Oracle, premium/paywall, themes, settings, share cards.
- StoreKit 2 product ids and sandbox config.
- AdMob test-ad facade structure without hard SDK dependency.
- Supabase Edge Function contract and PostgreSQL schema.
- Static Mentivo website for support, privacy policy, terms, delete-data instructions, and app-ads.txt.
- Mentivo premium/legal website with Apps, Oracle Ball AI, Support, Contact, Pricing, Refund, FAQ, Privacy, Terms, Delete Data, Cookie Policy, sitemap, robots, and AdMob app-ads.txt.

OpenAI keys are not stored in the iOS app. Configure `OPENAI_API_KEY` only in the backend environment.

## Website

The support/legal website lives in `Website/` and is prepared for:

- `https://www.mentivo.net/`
- `https://www.mentivo.net/apps`
- `https://www.mentivo.net/apps/oracle-ball-ai/`
- `https://www.mentivo.net/support`
- `https://www.mentivo.net/contact`
- `https://www.mentivo.net/pricing`
- `https://www.mentivo.net/refund`
- `https://www.mentivo.net/faq`
- `https://www.mentivo.net/legal/privacy`
- `https://www.mentivo.net/legal/terms`
- `https://www.mentivo.net/legal/delete-data`
- `https://www.mentivo.net/legal/cookies`
- `https://www.mentivo.net/sitemap.xml`
- `https://www.mentivo.net/robots.txt`
- `https://www.mentivo.net/app-ads.txt`

Deploy the contents of `Website/` to the GitHub Pages repository connected to `www.mentivo.net`. Keep `Website/CNAME` in the deployed root. Vercel is configured by `vercel.json` to build and serve `Website/`, so it should not deploy the old `MentivoDeploy/` career-test app.

## Backend

Supabase files live in `OracleBallAI/Backend/supabase`.

Deploy the `oracle-ask` Edge Function and set:

```bash
supabase secrets set OPENAI_API_KEY=...
supabase secrets set OPENAI_PREMIUM_MODEL=gpt-5-mini
supabase secrets set OPENAI_ECONOMY_MODEL=gpt-4.1-nano
supabase secrets set INTRO_QUALITY_ANSWER_LIMIT=30
```

Then update `ORACLE_API_ENDPOINT` in `OracleBallAI/Info.plist` to your deployed function URL:

```text
https://YOUR-SUPABASE-PROJECT.functions.supabase.co/oracle-ask
```

Do not put `OPENAI_API_KEY` in the iOS app.

AI cost routing:

- first 30 answers: `gpt-5-mini`
- Premium users: `gpt-5-mini`
- Free users after the first 30 answers: `gpt-4.1-nano`
- Premium is limited to up to 100 AI answers per day, enforced by backend/database limits.

## AdMob

The app is connected to the GoogleMobileAds Swift Package and uses these AdMob ids:

- App id: `ca-app-pub-8843292959471328~1313903084`
- Rewarded: `ca-app-pub-8843292959471328/7572189677`
- Interstitial: `ca-app-pub-8843292959471328/2511434684`
- Banner: `ca-app-pub-8843292959471328/8865090048`

Before release:

1. Confirm AdMob has app-ads.txt verified for `www.mentivo.net`.
2. Keep ad frequency conservative and avoid banners on Home.
3. Test on a physical device before App Store submission.
