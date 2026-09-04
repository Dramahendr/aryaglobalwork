# AGENTS.md — Arya Global Work

Guidance for AI agents working in this repository.

## What this project is

A single-page marketing website for **Arya Global Work** (legal entity: **Inspiration Manpower Consultancy Pvt. Ltd**), a recruitment, contract-staffing and outsourcing consultancy based in Bangalore, India, founded December 15, 2008. The site is pure static HTML/CSS/JS with **no build step, no framework, no backend**.

## Repository layout

```
index.html                 ← The entire website (markup, Tailwind config, styles, scripts inline)
logo.png                   ← Brand logo
favicon*.{png,ico}         ← Favicon set
apple-touch-icon.png       ← iOS icon
site.webmanifest           ← PWA manifest
BUSINESS_INFO.md           ← SOURCE OF TRUTH for all business facts/copy (contacts, services, stats, jobs)
design-system/
  arya-global-work/
    MASTER.md              ← SOURCE OF TRUTH for design (colors, type, components, anti-patterns)
    pages/                 ← Per-page rule overrides (checked first; currently empty)
```

## Tech stack & constraints

- **Tailwind CSS via Play CDN** (`cdn.tailwindcss.com`) with an inline `tailwind.config` in `index.html`. There is no compiled CSS and no `package.json` for the site itself — do not introduce a build pipeline without explicit user approval.
- **Phosphor Icons** via unpkg web-font CDN (`<i class="ph ph-...">`). Do not swap icon libraries; the design system requires a consistent set.
- **Google Fonts**: Plus Jakarta Sans (400–800). Self-hosting is not set up.
- Custom theme tokens live in the inline Tailwind config: `primary #0F172A`, `secondary #334155`, `accent #0369A1`, `brand.orange #F68A1E`, `brand.navy #142E52`, `muted #E8ECF1`. Use these (`bg-primary`, `text-accent`, …) instead of hardcoding hex values where possible.
- The only JavaScript is a small inline script at the bottom of `index.html` (footer year + mobile nav toggle). Forms are client-side dummies — see Known Gaps.
- `.opencode/` is git-ignored tooling config — never edit or commit it.

## Rules when editing `index.html`

1. **Design system is law.** Follow `design-system/arya-global-work/MASTER.md`: color palette, Plus Jakarta Sans, accessible & ethical style, and its anti-pattern list (no emojis as icons, `cursor-pointer` on all clickables, 150–300ms transitions, 4.5:1 contrast, visible focus states, respect `prefers-reduced-motion`). A file in `design-system/arya-global-work/pages/` overrides MASTER if one is added later.
2. **Business facts come from `BUSINESS_INFO.md`** — phone numbers, email, address, founded date, service list, job listings. If asked to change a fact, update both the HTML and `BUSINESS_INFO.md`.
3. **Accessibility is a stated requirement**, not a nicety: semantic landmarks, aria attributes on the mobile menu, focus rings (`focus-ring` class), 44px touch targets. Do not regress these.
4. Keep the single-file architecture: sections are marked with HTML comments (`<!-- Hero -->`, `<!-- Services -->`, …). Preserve that structure and anchor ids (`#home`, `#about`, `#services`, `#jobs`, `#contact`) — nav links depend on them.
5. External links that open a new tab must keep `target="_blank" rel="noopener noreferrer"`.
6. After any UI change, run MASTER.md's pre-delivery checklist (responsive at 375/768/1024/1440, no horizontal scroll on mobile, nothing hidden behind the sticky nav).

## How to verify changes

There are no tests or build commands. Open `index.html` in a browser (or `python3 -m http.server`) and manually check: layout at mobile/desktop widths, mobile menu open/close, anchor navigation, form toast behavior.

## Known gaps (do not "fix" silently — confirm with the user first)

- **Vision / Mission / Values** cards contain duplicated placeholder copy, explicitly marked as placeholders in the HTML.
- **Contact + newsletter forms do not submit anywhere** — `onsubmit` prevents default and shows a toast. There is no endpoint, and inputs have no `name` attributes.
- **Footer legal links** (Privacy Policy, Terms of Service, Statutory Compliance) and **LinkedIn** are `href="#"` dead links.
- **Job listings are static samples** dated Jan 26, 2026 (per BUSINESS_INFO.md, to be replaced by a real ATS/job board).
- The stats strip has a `data-count` attribute on one number but **no counter-animation JS exists**.
