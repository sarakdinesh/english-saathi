# English Boluya — marketing website

Modern bilingual (Marathi-first) landing site for **English Boluya · इंग्लिश बोलूया**, with Privacy and Terms pages for Play Console.

## Run

```sh
cd website
cp .env.example .env   # optional — set Play URL, support email
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```sh
npm run build
npm run preview
```

Static output is written to `dist/`. Host that folder on any static host, then set the Play Console privacy URL to `https://<your-domain>/privacy`.

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_PLAY_STORE_URL` | Google Play listing. Empty → the live listing |
| `VITE_SUPPORT_EMAIL` | Footer + legal contact (default `support@example.com`) |

## Routes

| Path | Page |
| --- | --- |
| `/` | Animated landing |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |
| `/404` | Not found |
| `/learn/*.html` | Static Marathi lesson pages for Google search, generated from the app's content by `../scripts/site-pages.ts` on every `dev`/`build`. Set `SITE_URL=https://<your-domain>` when building to also write `sitemap.xml` and `robots.txt`, then submit the sitemap in Google Search Console. |

Brand assets live under `public/brand` and `public/screenshots` (copied from the app `assets/` and `store-listing/` folders).
