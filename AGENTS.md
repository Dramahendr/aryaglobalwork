# AGENTS.md — Arya Global Work

Guidance for AI agents working in this repository.

## What this project is

A single-page static website for **Arya Global Work** (legal entity: **Inspiration Manpower Consultancy Pvt. Ltd**), focused on verified international recruitment for Indian professionals across the Gulf and Asia-Pacific. The consultancy is based in Bangalore and was founded December 15, 2008. There is **no build step, framework, or backend**.

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
    pages/                 ← Per-page rule overrides (checked first; home.md applies)
```

## Tech stack & constraints

- **Tailwind CSS via Play CDN** (`cdn.tailwindcss.com`) with an inline `tailwind.config` in `index.html`. There is no compiled CSS and no `package.json` for the site itself — do not introduce a build pipeline without explicit user approval.
- **Phosphor Icons** via unpkg web-font CDN (`<i class="ph ph-...">`). Do not swap icon libraries; the design system requires a consistent set.
- **Google Fonts**: Plus Jakarta Sans for body copy and Fraunces for display headings. Self-hosting is not set up.
- Custom theme tokens live in the inline Tailwind config. Prefer the named classes (`bg-ink`, `text-accent`, `bg-brand-orange`, …) over new hardcoded colors.
- The inline JavaScript handles the footer year, header state, mobile menu, reveal/counter animations, desktop hero parallax, sticky mobile CTA, and the client-side enquiry toast.
- `.opencode/` is git-ignored tooling config — never edit or commit it.

## Rules when editing `index.html`

1. **Design system is law.** Follow `design-system/arya-global-work/MASTER.md`: color palette, Plus Jakarta Sans, accessible & ethical style, and its anti-pattern list (no emojis as icons, `cursor-pointer` on all clickables, 150–300ms transitions, 4.5:1 contrast, visible focus states, respect `prefers-reduced-motion`). A file in `design-system/arya-global-work/pages/` overrides MASTER if one is added later.
2. **Business facts come from `BUSINESS_INFO.md`** — phone numbers, email, address, founded date, service list, job listings. If asked to change a fact, update both the HTML and `BUSINESS_INFO.md`.
3. **Accessibility is a stated requirement**, not a nicety: semantic landmarks, aria attributes on the mobile menu, focus rings (`focus-ring` class), 44px touch targets. Do not regress these.
4. Keep the single-file architecture: sections are marked with HTML comments. Preserve the current anchor ids (`#top`, `#why`, `#destinations`, `#opportunities`, `#process`, `#trust`, `#faq`, `#apply`) — nav links depend on them.
5. External links that open a new tab must keep `target="_blank" rel="noopener noreferrer"`.
6. After any UI change, run MASTER.md's pre-delivery checklist (responsive at 375/768/1024/1440, no horizontal scroll on mobile, nothing hidden behind the sticky nav).

## How to verify changes

There are no tests or build commands. Open `index.html` in a browser (or `python3 -m http.server`) and manually check: layout at mobile/desktop widths, mobile menu open/close, anchor navigation, form toast behavior.

## Known gaps (do not "fix" silently — confirm with the user first)

- **The enquiry form is front-end only** — submission is prevented and a confirmation toast is shown; no endpoint or resume upload is connected.
- **The destination and sector content is static** — openings should eventually come from a verified ATS/job board.
- **Legal policy pages and social profiles are not linked yet.** Do not invent URLs.
- **Business copy must be reconciled with `BUSINESS_INFO.md`** before publishing any new claims or statistics.
