# NEXT TECH

Corporate site built with Next.js (App Router) + TypeScript + microCMS.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Node.js 24.x is required (see `engines` in `package.json`).

### Environment variables

| Variable | Purpose |
| --- | --- |
| `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` | microCMS (endpoint `blogs`) |
| `CONTACT_TO_EMAIL` / `SMTP_*` | Contact mail via nodemailer (`app/api/contact/route.ts`; use an app password for Gmail) |
| `RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 (optional; verification is skipped when unset) |

## microCMS schema (`blogs`)

`title` (text) / `content` (rich editor) / `eyecatch` (image) / `category` (content reference with `name`)

## Structure

- `app/page.tsx` … Top page
- `app/blog/page.tsx` … Article list (ISR 60s)
- `app/articles/[id]/page.tsx` … Article detail (ISR 60s, new articles generated on first request)
- `app/api/contact/route.ts` … Contact form submission (nodemailer + optional reCAPTCHA v3)
- `lib/microcms.ts` … microCMS client

## Scripts

- `npm run dev` / `npm run build` / `npm start`
- `npm test` … Jest + Testing Library
- `npm run lint`
