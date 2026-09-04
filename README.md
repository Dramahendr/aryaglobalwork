# Arya Global Work

Marketing website for **Arya Global Work** — the public brand of **Inspiration Manpower Consultancy Pvt. Ltd**, a Bangalore-based international recruitment consultancy founded December 15, 2008.

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
| `index.html` | The entire site — markup, Tailwind config, custom CSS and JS, all inline |
| `BUSINESS_INFO.md` | Source of truth for business facts: contacts, services, stats, job listings |
| `design-system/arya-global-work/MASTER.md` | Design system: colors, typography, components, accessibility rules |
| `logo.png`, `favicon*.png`, `favicon.ico`, `apple-touch-icon.png` | Brand & icon assets |
| `site.webmanifest` | PWA manifest |

The temporary `_*.html` files used during the rebuild were removed. They were iframe-based viewport and overflow test harnesses, not pages required by the site.

## Tech stack

- **HTML5** single page with anchor-nav sections: Destinations, Opportunities, How it works, Why us, FAQ, Apply
- **Tailwind CSS** via CDN, configured inline (`primary` navy, `accent` blue, brand orange)
- **Phosphor Icons** (web font)
- **Plus Jakarta Sans** via Google Fonts
- Vanilla JS for the mobile menu, footer year, scroll reveals, counters, sticky mobile actions, and the enquiry toast

## Deployment

Any static host works (GitHub Pages, Netlify, Vercel, S3…). Publish the repository root as-is — no build command needed.

## Content & design governance

- Changing business facts (phone, email, address, jobs, stats)? Update `BUSINESS_INFO.md` **and** the HTML together.
- Changing look & feel? Follow `design-system/arya-global-work/MASTER.md`, including its accessibility checklist and anti-pattern list.

## Known work in progress

- The enquiry form shows a success toast but does not send data anywhere yet.
- Destination and sector content is static; connect a verified ATS/job board before treating it as live vacancies.
- Legal policy pages and social profiles still need real URLs before launch.

## Contact

- **Email:** info@inspirationmanpower.co.in
- **Phone:** +91-80-40966772 · +91-9686454870
- **Office:** No 5, Lakshmi Complex, 10th Main, 15th Cross, RMV Extension, Opp to CPRI, Bangalore, Karnataka 560080, INDIA
