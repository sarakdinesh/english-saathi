# English Boluya — marketing website

Modern bilingual (Marathi-first) landing site for **English Boluya · इंग्लिश बोलूया**, with Privacy and Terms pages for Play Console.

## Run

```sh
cd website
cp .env.example .env   # optional — set Play URL, support email, waitlist endpoint
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
| `VITE_PLAY_STORE_URL` | Google Play listing. Empty → “Coming soon” CTA |
| `VITE_SUPPORT_EMAIL` | Footer + legal contact (default `support@example.com`) |
| `VITE_WAITLIST_ENDPOINT` | Optional POST URL for waitlist JSON. Empty → `mailto:` fallback |

## Routes

| Path | Page |
| --- | --- |
| `/` | Animated landing |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |
| `/404` | Not found |

Brand assets live under `public/brand` and `public/screenshots` (copied from the app `assets/` and `store-listing/` folders).
