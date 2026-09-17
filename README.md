# Arya Global Workforce

Marketing website for **Arya Global Workforce** (*Dream · Work · Grow*). It is a Ministry of External Affairs–registered recruiting agent in Hazratganj, Lucknow (proprietor: Ashish Mahendra), placing skilled Indians with employers across the Gulf and Asia-Pacific.

The site is a single static page: no build step, no framework, no backend.

## Quick start

Open `index.html` directly in a browser, or serve the folder locally:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## What's inside

| File / Folder | Purpose |
|---|---|
| `index.html` | The entire site: markup, Tailwind config, custom CSS and JS, all inline |
| `images/` | Section photos (WebP), ticker thumbnails, and `CREDITS.md` with every source and licence |
| `BUSINESS_INFO.md` | Source of truth for business facts: licence, contacts, fees, open questions |
| `design-system/arya-global-work/` | `MASTER.md` base rules + `pages/home.md` overrides (palette, motion, photography) |
| `logo-horizontal.png`, `logo.png`, `logo-mark.png` | Logo variants derived from the client's `newlogo.jpeg` |
| `favicon*.png`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest` | Icons & PWA manifest |
| `colorpallaet.png` | Client palette reference |
| `docs/` | Client certificates. **Git-ignored**: they contain personal and financial data |

## Tech stack

- **HTML5** single page with anchor-nav sections: Destinations, Opportunities, How it works, Why us, Fees & grievances, FAQ, Follow, Apply
- **Tailwind CSS** via CDN, configured inline with the client palette: violet `#4B0AF3`, indigo `#6D62F4`, purple `#A468F2`, amber `#F6CE7D`
- **GSAP 3.15** (ScrollTrigger + SplitText) for the hero intro, scroll reveals, image masks, parallax and the process rail. All motion is skipped under `prefers-reduced-motion`.
- **Phosphor Icons** (web font) and **Fraunces + Plus Jakarta Sans** (Google Fonts)

## Deployment

Any static host works (GitHub Pages, Netlify, Vercel, S3…). Publish the repository root as-is; no build command is needed. `docs/` is never committed.

## Content & design governance

- Changing business facts (phone, email, address, licence, fees)? Update `BUSINESS_INFO.md` **and** the HTML together. The MEA licence requires advertising to be genuine and factually correct, so don't add unverified claims.
- Changing look & feel? Follow `design-system/arya-global-work/pages/home.md` and `MASTER.md`, including the accessibility checklist.
- Adding photos? Record them in `images/CREDITS.md`.

## Known work in progress

- The enquiry form shows a success toast but does not send data anywhere yet.
- Current vacancies and past-recruitment details are still needed (a licence requirement for the agency's website).
- Photos are illustrative stock/public-domain images until the client provides real ones.
- Privacy policy and terms pages still need to be written.

## Contact

- **Email:** aryaglobalworkforce@gmail.com
- **Phone / WhatsApp:** +91 99560 52200
- **Office:** Hall No. 1, Ground Floor, T.S. Tower, Plot No. 15, Ashok Marg, Hazratganj, Lucknow, Uttar Pradesh 226001
- **Instagram:** [@drashish_official](https://www.instagram.com/drashish_official/) · **YouTube:** [@drashishmahendra](https://www.youtube.com/@drashishmahendra)
