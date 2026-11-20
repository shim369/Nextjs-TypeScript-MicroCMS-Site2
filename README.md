# NEXT BASE

Corporate site built with Next.js 16 (App Router, Cache Components) + React 19 + TypeScript + microCMS.

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
| `MICROCMS_WEBHOOK_SECRET` | Secret of the microCMS webhook that refreshes the blog cache |
| `CONTACT_TO_EMAIL` / `SMTP_*` | Contact mail via nodemailer (Server Action `app/actions/contact.ts`; use an app password for Gmail) |
| `RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 (optional; verification is skipped when unset) |

## microCMS schema (`blogs`)

`title` (text) / `content` (rich editor) / `eyecatch` (image) / `category` (content reference with `name`)

## Structure

- `app/page.tsx` … Top page
- `app/blog/page.tsx` … Article list
- `app/articles/[id]/page.tsx` … Article detail (known articles prerendered; new ones rendered on first request)
- `app/actions/contact.ts` … Contact form Server Action (nodemailer + optional reCAPTCHA v3)
- `app/api/revalidate/route.ts` … microCMS webhook → `revalidateTag('blogs')`
- `lib/microcms.ts` … microCMS client, cached with `"use cache"` + `cacheLife('hours')` + `cacheTag('blogs')`

## Caching

Blog data is cached for an hour (Cache Components). To reflect edits immediately, add a webhook in
microCMS (API settings → Webhook → Custom) pointing to `https://<your-domain>/api/revalidate`
with the same secret as `MICROCMS_WEBHOOK_SECRET`.

## Scripts

- `npm run dev` / `npm run build` / `npm start`
- `npm test` … Jest + Testing Library
- `npm run lint` … ESLint (flat config)
- `npm run typecheck` … route types + `tsc`
