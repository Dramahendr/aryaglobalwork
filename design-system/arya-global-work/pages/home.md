# Page Override: Home (`index.html`)

> Per MASTER.md logic, rules here **override** the Master file for the home page.
> Everything not mentioned here still follows MASTER.md (anti-patterns, a11y checklist, etc.)

**Redesigned:** 2026-09-04 · **Rebranded:** 2026-09-17 (client logo + palette, photography, GSAP motion)
**Audience:** Primary = Indian candidates seeking jobs **abroad** (B2C). Secondary = foreign employers (one "Hiring Indian talent" block).

---

## Palette (client-supplied — `colorpallaet.png`)

| Token | Value | Usage |
|-------|-------|-------|
| `brand` | `#4B0AF3` | Primary CTA fill (white text, 7.96:1), links/eyebrows on light (7.49:1), accent sections |
| `brand-dark` | `#3A06C4` | CTA hover, cards that sit on `brand` |
| `brand-light` | `#C4A0FF` | Soft violet text on dark (8.7:1 on ink) |
| `iris` | `#6D62F4` | Graphic accents, icon tiles. **Not for small text on light** (4.46:1) |
| `orchid` | `#A468F2` | Graphic accents; text only on dark (5.17:1 on ink) |
| `sun` | `#F6CE7D` | Highlights on dark, CTA fill on dark (ink text, 12.4:1), callout borders |
| `sun-dark` | `#8A5A00` | Amber text on light (5.9:1) |
| `ink` / `ink-deep` / `ink-soft` | `#140C33` / `#0C0722` / `#231A4D` | Text and dark sections (deep violet-black) |
| `paper` / `paper-tint` / `paper-sun` | `#F8F7FF` / `#EFECFF` / `#FFF7E6` | Page background / alternate section / amber callout |

**Overrides MASTER's "no AI purple/pink gradients" only to allow the client's purple palette.** The spirit still applies: no purple-to-pink gradient text or gradient buttons. Use flat palette blocks and the stripe motif. Blurred background glows are fine.

**Contrast rules:** body text on light uses `text-ink/70` or darker; small labels use `/60` minimum. On dark, use `text-white/60` minimum.

**Logo colours** (navy / red / gold) appear only inside the logo image. Always place the logo on white or `paper` (on dark sections, inside a white pill).

## Brand motifs

- **Palette stripes** (`.stripes`): four bands in the palette card's proportions (41 / 27 / 18 / 14), violet → indigo → purple → amber. Used for the hero backdrop, the menu and footer top edges, the certificate card and the Instagram card. Never place a violet band on a `brand` background (it disappears); use `brand-dark` or `ink-soft` behind it.
- **Tick** (`.tick`): four small bars before every section eyebrow.
- **Boarding pass** (LKO → DXB) and the **Registration Certificate card**: the two signature "document" visuals.
- **Tagline** "Dream · Work · Grow" (from the logo) appears in the footer and on the why-section photo.

## Typography

- **Display/headings:** `Fraunces` (Google Fonts, optical-size axis, weights 500–600; italic 500 for the emphasis line). Overrides Master's "Plus Jakarta Sans for headings".
- **Body/UI:** Plus Jakarta Sans (unchanged).
- Large numerals (stats, fee cap, country names on photo cards) use Fraunces. The certificate number uses the monospace font.

## Photography (replaces the old "no stock photos" rule)

- Photos are welcome, and expected. Destinations and sectors are photo cards; the why, process, trust, employer, follow and apply sections each carry an image.
- Use only licence-clean sources (Unsplash License, CC0, Public Domain). Record every file in `images/CREDITS.md`.
- Destination photos must show the **actual country** (verified landmark or skyline). Never reuse a Dubai shot for another country.
- Stock people are illustrative only. Never caption them as candidates, staff or clients.
- WebP; set `width`/`height`; lazy-load below the fold; text on photos sits on an `ink-deep` gradient.

## Motion (GSAP 3.15 + ScrollTrigger + SplitText)

| Element | Preset (ui-ux-pro-max) | Notes |
|---|---|---|
| Hero headline | Stagger List / SplitText, *Complex* | Word reveal inside line masks, `expo.out`, headline only |
| Hero collage | Scroll Reveal, *Standard* | Stripes scaleX in, main photo clip-path wipe + image de-zoom |
| Sections | Scroll Reveal, *Standard* | `ScrollTrigger.batch`, y 24 → 0, 0.7s, `power2.out`, stagger 0.08 |
| Photos | Mask reveal | clip-path inset 14% → 0, 1.3s `expo.out`, once |
| Photo layers | Parallax, *Subtle* | yPercent −6 → 6, scrub, ≥768px, images only (never text) |
| Process | Scrub timeline | Rail fill + plane follow scroll; steps get `.is-active` |
| Primary hero CTA | Magnetic hover, *Complex* | One element only; fine pointers only |
| Ticker | CSS marquee | Pauses on hover/focus; visible pause button; static + wrapped under reduced motion |

All motion is skipped under `prefers-reduced-motion`, and content is visible without JS.

## Patterns specific to this page

- **Mobile-first extras:** full-screen overlay menu; a sticky bottom CTA bar (`lg:hidden`) that appears after the hero and hides while `#apply` is visible. Sector cards are 2-up on phones.
- **Regulatory content is a feature, not fine print.** The licence band, the certificate card, and the Fees & grievance section (₹30,000 cap, online/DD only, PGE contact) are required by the agency's MEA registration. Keep them prominent.
- **Section rhythm:** paper (hero) → brand (ticker) → ink (licence) → paper → ink-deep (destinations) → paper → paper-tint (process) → ink (trust) → paper (fees) → paper-tint (FAQ) → paper (follow) → ink-deep (apply) → ink-deep footer.

## Content rules (hard constraints)

- **Never invent** statistics, testimonials, certifications, employer names, response-time promises or destination counts. Facts come only from `BUSINESS_INFO.md`. The MEA licence requires advertisements to be genuine and factually correct.
- Do not add testimonials until verified ones exist.
- The destination list (Gulf + Singapore/Malaysia) and sector mappings are **industry-typical**, pending client verification.
