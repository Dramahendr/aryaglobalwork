# Arya Global Work

Marketing website for **Arya Global Work** — the public brand of **Inspiration Manpower Consultancy Pvt. Ltd**, a recruitment, contract-staffing, outsourcing and statutory-compliance consultancy based in Bangalore, India (est. December 15, 2008).

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

## Tech stack

- **HTML5** single page with anchor-nav sections: Home, About, Services, Find Jobs, Contact
- **Tailwind CSS** via CDN, configured inline (`primary` navy, `accent` blue, brand orange)
- **Phosphor Icons** (web font)
- **Plus Jakarta Sans** via Google Fonts
- Vanilla JS for the mobile menu and footer year

## Deployment

Any static host works (GitHub Pages, Netlify, Vercel, S3…). Publish the repository root as-is — no build command needed.

## Content & design governance

- Changing business facts (phone, email, address, jobs, stats)? Update `BUSINESS_INFO.md` **and** the HTML together.
- Changing look & feel? Follow `design-system/arya-global-work/MASTER.md`, including its accessibility checklist and anti-pattern list.

## Known work in progress

- Vision / Mission / Values copy is placeholder text.
- Contact & newsletter forms show a success toast but don't send data anywhere yet.
- Footer legal links (Privacy Policy, Terms) and LinkedIn are placeholders.
- Job cards are static samples.

## Contact

- **Email:** info@inspirationmanpower.co.in
- **Phone:** +91-80-40966772 · +91-9686454870
- **Office:** No 5, Lakshmi Complex, 10th Main, 15th Cross, RMV Extension, Opp to CPRI, Bangalore, Karnataka 560080, INDIA
