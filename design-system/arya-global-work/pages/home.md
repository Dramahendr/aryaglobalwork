# Page Override: Home (`index.html`)

> Per MASTER.md logic: rules here **override** the Master file for the home page.
> Everything not mentioned here still follows MASTER.md (anti-patterns, a11y checklist, etc.)

**Redesigned:** 2026-09-04
**Audience:** Primary = Indian candidates seeking jobs **abroad** (B2C). Secondary = employers (single "For employers" block).

---

## Palette (evolved from Master — warm + editorial)

| Token | Value | Usage |
|-------|-------|-------|
| `ink` | `#0F172A` | Primary text / dark sections (was `primary`) |
| `ink-deep` | `#0A101D` | Footer, deepest sections |
| `paper` | `#FAF8F4` | Page background (replaces cold `#F8FAFC`) |
| `paper-warm` | `#F4F0E8` | Alternate light section background |
| `accent` | `#0369A1` | Links, secondary emphasis (unchanged) |
| `brand-orange` | `#F68A1E` | Graphic accents, CTA fill **on dark only** |
| `brand-orange-dark` | `#C2410C` | Orange **text on light** (4.5:1 contrast) |
| `brand-orange-soft` | `#FBA94C` | Orange **text/accents on dark** |

**Contrast rules:** Never use `#F68A1E` for text on light backgrounds (fails 4.5:1). Primary CTA on light = ink bg + white text. Primary CTA on dark = brand-orange bg + ink text.

## Typography

- **Display/headings:** `Fraunces` (Google Fonts, optical size axis, weights 500–600) — overrides Master's "Plus Jakarta Sans for headings"
- **Body/UI:** Plus Jakarta Sans (unchanged)
- Large numerals (stats, step numbers, country codes) use Fraunces.

## Patterns specific to this page

- **No stock photos.** Visuals are built from inline SVG (route arcs), typographic cards, and a boarding-pass motif. Keep it that way until real photography exists.
- **Destination cards** use typographic country codes (UAE, KSA…) — never flag emojis.
- **Mobile-first extras:** full-screen overlay menu; sticky bottom CTA bar (`lg:hidden`) that appears after the hero and hides while `#apply` is visible.
- **Animation system:** `data-reveal` + IntersectionObserver (`.is-in`), rAF stat counters (`data-count`), hero load-in keyframes, subtle hero parallax (desktop only). All motion must no-op under `prefers-reduced-motion`.
- Section rhythm alternates paper → ink → paper → ink-deep → paper → paper-warm → ink → paper → ink → ink-deep.

## Content rules (hard constraints)

- **Never invent** statistics, testimonials, certifications, employer names, or destination counts. Facts must come from `BUSINESS_INFO.md`.
- No testimonial section exists because no verified testimonials exist yet — do not add placeholder quotes.
- Destination list (Gulf + Singapore/Malaysia) and sector mappings are **best-effort industry-typical**, pending client verification.
