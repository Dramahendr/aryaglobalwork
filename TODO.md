# Arya Global Workforce — TODO

## Before launch

- [ ] Connect the enquiry form to an approved endpoint or CRM; add privacy/consent copy and error handling.
- [ ] Add a secure resume upload flow, or link to the chosen ATS.
- [ ] Publish current vacancies (employer + contract conditions) and past-recruitment details, as MEA licence condition (xiii)(c) requires.
- [ ] Confirm the destination and sector lists with the client.
- [ ] Resolve the open questions in `BUSINESS_INFO.md`: WhatsApp on +91 99560 52200, PGE PIN, brand name vs domain.
- [ ] Add Privacy Policy and Terms of Service pages.
- [ ] Confirm the production domain, then add `og:image`, `og:url` and the logo URL to the JSON-LD.

## Content

- [ ] Replace illustrative stock photos with the client's own (office, team, deployed candidates, with consent) and update `images/CREDITS.md`.
- [ ] Add verified statistics (placements, employers) only once the client supplies them.
- [ ] Consider a photo of the licence signboard / office front for the trust section.
- [ ] Get a higher-resolution portrait of Dr. Ashish (the current one is 400×542).

## Quality

- [ ] Test keyboard focus and screen-reader announcements for the mobile menu, ticker pause button, FAQ details, sticky CTA and form toast.
- [ ] Run a final manual pass at 375, 768, 1024 and 1440px, with and without reduced motion, after any content changes.
- [ ] Recheck performance once the production domain is known. Consider self-hosting fonts and GSAP, and replacing the Tailwind Play CDN with a compiled stylesheet (needs approval for a build step).
