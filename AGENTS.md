# AGENTS.md — Arya Global Workforce

Guidance for AI agents working in this repository.

## What this project is

A single-page static website for **Arya Global Workforce**, a proprietorship of **Ashish Mahendra** based in Hazratganj, Lucknow. It is registered with the **Ministry of External Affairs as a recruiting agent** (RC No. B-3525/UP/PER/1000+/5/11528/2026, valid to 26 Aug 2031) and places Indian workers with employers in the Gulf and Asia-Pacific. There is **no build step, framework, or backend**.

## Repository layout

```
index.html                 ← The entire website (markup, Tailwind config, styles, scripts inline)
images/                    ← Site photos (WebP) + thumbs/ + CREDITS.md (sources and licences)
logo-horizontal.png        ← Header/footer lockup (transparent), derived from newlogo.jpeg
logo.png, logo-mark.png    ← Stacked lockup and "A" mark (transparent)
newlogo.jpeg               ← Client-supplied logo (source)
colorpallaet.png           ← Client-supplied palette reference
favicon*.{png,ico}         ← Favicon set (generated from the mark)
apple-touch-icon.png       ← iOS icon
site.webmanifest           ← PWA manifest
BUSINESS_INFO.md           ← SOURCE OF TRUTH for all business facts/copy (licence, contacts, fees, open questions)
design-system/
  arya-global-work/
    MASTER.md              ← Base design rules (a11y checklist, anti-patterns)
    pages/home.md          ← Overrides for index.html (palette, motion, photography) — checked first
docs/                      ← Client certificates. GIT-IGNORED: they contain PAN, bank and personal data
```

## Tech stack & constraints

- **Tailwind CSS via Play CDN** (`cdn.tailwindcss.com`) with an inline `tailwind.config` in `index.html`. There is no compiled CSS and no `package.json` for the site itself. Do not introduce a build pipeline without explicit user approval.
- **GSAP 3.15** (`gsap`, `ScrollTrigger`, `SplitText`) from jsDelivr, loaded at the end of `<body>`.
- **Phosphor Icons** via the unpkg web-font CDN (`<i class="ph ph-...">`, plus `ph-fill` / `ph-duotone`). Do not swap icon libraries.
- **Google Fonts**: Plus Jakarta Sans for body copy and Fraunces for display headings.
- **Theme tokens** live in the inline Tailwind config: `ink`, `paper` (`tint`, `sun`), `brand` (`dark`, `light`), `iris`, `orchid`, `sun` (`dark`). Use them instead of new hardcoded colours.
- `.opencode/` and `.claude/` are local tooling config. Never commit them.

## Motion system (in `index.html`)

- `html.motion` is set in `<head>` unless the user prefers reduced motion. It hides `[data-hero]` until GSAP runs, and a 2.5 s timeout un-hides it if GSAP never loads.
- **Hero**: SplitText word reveal on `#heroTitle`, a staggered intro for `[data-hero]`, palette stripes drawing in, and a clip-path reveal on `[data-hero-photo]`.
- **Scroll**: `[data-reveal]` elements animate in batches. `[data-reveal-group]` staggers its direct children. `[data-img-reveal]` gets a clip-path mask reveal. `[data-parallax] > img` gets subtle parallax (≥768px only). `[data-count]` counters (`data-plain` means no thousands separator).
- **Process**: a scroll-scrubbed rail (`#railFill`, `#railPlane`); `.step.is-active` lights up each step.
- **Other**: a magnetic hover on `[data-magnetic]` (fine pointers only), a CSS destinations ticker with a pause button, and CSS `chip-float`. The boarding-pass plane uses SVG `animateMotion`.
- Never put `chip-float` on an element that GSAP also moves or that has a Tailwind rotate: the CSS animation overrides its transform. Wrap it in another element instead.
- Everything must still render with no JS and with `prefers-reduced-motion: reduce`.

## Rules when editing `index.html`

1. **The design system is law.** Follow `design-system/arya-global-work/pages/home.md` first, then `MASTER.md`: accessibility checklist, `cursor-pointer` on clickables, 150–300ms transitions, 4.5:1 contrast, visible focus states, and `prefers-reduced-motion`.
2. **Business facts come only from `BUSINESS_INFO.md`.** This agency's licence requires advertisements to be *genuine and factually correct*. Never invent statistics, testimonials, employer names, response-time promises or years in business. If asked to change a fact, update both the HTML and `BUSINESS_INFO.md`.
3. **Never publish** PAN, bank details, date of birth or other personal data from `docs/`.
4. **Accessibility is a stated requirement**: semantic landmarks, aria attributes on the mobile menu and ticker toggle, focus rings (`focus-ring` / `focus-ring-dark`), 44px touch targets, meaningful `alt` text (decorative images use `alt=""`).
5. Keep the single-file architecture; sections are marked with HTML comments. Preserve the anchor ids that nav links depend on: `#top`, `#why`, `#destinations`, `#opportunities`, `#process`, `#trust`, `#fees`, `#faq`, `#follow`, `#apply` (and `#licence`).
6. External links that open a new tab must keep `target="_blank" rel="noopener noreferrer"`.
7. Photos: always set `width`/`height`, use `loading="lazy"` below the fold, and record each new image's source and licence in `images/CREDITS.md`. Stock photos are illustrative only — never caption them as real candidates or staff.
8. After any UI change, run the pre-delivery checklist: 375 / 768 / 1024 / 1440px, no horizontal scroll, nothing hidden behind the sticky nav, and reduced-motion rendering.

## How to verify changes

There are no tests or build commands. Serve the folder (`python3 -m http.server 8000`) and manually check:
- layout at phone and desktop widths
- mobile menu open/close
- ticker pause
- anchor navigation
- the process rail while scrolling
- the form toast
- rendering with reduced motion enabled

## Known gaps (do not "fix" silently — confirm with the user first)

- **The enquiry form is front-end only.** Submission is prevented and a confirmation toast appears; no endpoint or resume upload is connected.
- **No vacancy listings or past-recruitment details yet.** Licence condition (xiii)(c) expects them on the website. They need real data from the client.
- **Destination and sector content is industry-typical**, pending client confirmation.
- **Photos are stock/public-domain placeholders** until the client supplies real ones.
- **Legal policy pages** (privacy, terms) are not written yet. Do not invent URLs.
- See "Open questions" in `BUSINESS_INFO.md` (title "Dr.", WhatsApp number, PGE PIN, brand name vs domain).
