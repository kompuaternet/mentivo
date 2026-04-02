# CareerPath — Setup Guide

## 1. Install dependencies
```bash
cd career-test
npm install
```

## 2. Set up environment
```bash
cp .env.example .env.local
# Fill in all values
```

## 3. Set up database
```bash
npm run db:push
```

## 4. LemonSqueezy setup (5 min)

1. Зарегистрируйся на [lemonsqueezy.com](https://lemonsqueezy.com)
2. **Создай Store** → Settings → Stores
3. **Создай Product** → Products → Add Product
   - Name: "CareerPath — Полный профиль"
   - Price: $3.99 (или любая другая)
   - Type: Single payment
4. Скопируй **Store ID** и **Variant ID** в `.env.local`
5. **API Key** → Settings → API → Create key
6. **Webhook** → Settings → Webhooks → Create:
   - URL: `https://yoursite.com/api/webhook`
   - Events: `order_created`
   - Скопируй signing secret

## 5. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

## 6. Deploy

### Vercel (recommended for frontend)
```bash
npx vercel
# Add env variables in Vercel dashboard
```

### Railway (for database + bot)
1. Create new project → PostgreSQL
2. Connect GitHub repo
3. Add env variables

## 7. Telegram Bot (optional)

```bash
# Create bot via @BotFather on Telegram
# Copy token to TELEGRAM_BOT_TOKEN
npm run bot
```

## File structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── test/page.tsx         # Quiz with progress bar
│   ├── results/[id]/page.tsx # Results (free + paid)
│   └── api/
│       ├── session/          # Save/load test sessions
│       ├── payment/checkout/ # Create LemonSqueezy checkout
│       └── webhook/          # LemonSqueezy webhook handler
├── data/
│   ├── questions.ts          # 30 questions × 6 languages
│   └── professions.ts        # 25 professions
├── lib/
│   ├── scoring.ts            # RIASEC algorithm
│   └── i18n.ts               # UI translations
└── types/index.ts            # TypeScript types
```

## Supported languages
🇷🇺 Russian · 🇬🇧 English · 🇺🇦 Ukrainian · 🇩🇪 German · 🇪🇸 Spanish · 🇹🇷 Turkish
