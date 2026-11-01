# Content checklist before launch

This site was built from the available brief and source material. Where a fact could not be verified, the UI says so instead of inventing it. The items below are the remaining human decisions.

Legend: **Blocker** = must fix before publishing · **Verify** = confirm the claim · **Polish** = optional improvement.

---

## 1. Identity & contact (blockers)

- [ ] **Real email address.** `src/data/site.ts` → `site.email` is `gs.tech@example.com`. Replace it; the footer, contact section, error fallbacks and `mailto:` drafts all read from here.
- [ ] **Real social profiles.** `site.socials` currently points at `https://github.com/`, `https://www.linkedin.com/` and `https://www.fiverr.com/` with `placeholder: true`. Replace the URLs (or remove entries you do not want) and drop the `placeholder` flag.
- [ ] **Production domain.** `https://gstech.dev` is a placeholder used in:
  - `src/data/site.ts` → `site.domain`
  - `index.html` → canonical, Open Graph URL, Twitter, JSON-LD
  - `public/robots.txt`
  - `public/sitemap.xml` (all `<loc>` values)
  - `README.md` examples
- [ ] **Availability.** `site.availability.open` is `true` with the label “Open to internships & collaborations”. Set it to `false` when that stops being accurate.
- [ ] **Resend delivery.** Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in Netlify. Until then the function returns `503` and the form shows the real error + email fallback. Test one live submission.

---

## 2. Case-study accuracy (verify each)

Statuses and stack items are the most sensitive claims. Confirm or correct each in `src/data/projects.ts`.

| # | Project | Current status | Items marked pending |
| --- | --- | --- | --- |
| 01 | ACA Connect | In Progress | Front-end framework, Hosting |
| 02 | ACA Ministries | Completed | — |
| 03 | Campus Water | Concept | Application stack, Database |
| 04 | GST Calculator | Prototype | Front-end implementation |
| 05 | HSN Calculator | Concept | Application stack |
| 06 | Blood Donation | Concept | Application stack |
| 07 | GAMA Java ATM | Prototype | — (verify Java / OOP claim) |
| 08 | Image → SVG | Concept | Application stack |

For each project:

- [ ] Confirm the **status** fits the four allowed values: Completed / In Progress / Prototype / Concept.
- [ ] Confirm or replace every `confirmed: false` stack item. Once verified, set `confirmed: true` (or replace the item with the real technology).
- [ ] Re-read the **problem, contribution, scope, challenges, learnings and next** copy for accuracy. It is deliberately plain and avoids metrics, clients, awards and outcomes, but you are the only person who can confirm the details.
- [ ] Add real **source / live links** when they exist. `src/pages/CaseStudy.tsx` currently renders “Source and live links have not been published yet” for all projects. Add per-project link fields to the `Project` type and render them.
- [ ] Remove or update editorial notes once evidence improves. Notes live on each project as `note`.

---

## 3. Imagery

- [ ] **ACA Ministries photography.** Four images in `public/images/work/aca-ministries-01..04.webp` came from the real ACA project. Review them and write accurate `alt` and `caption` text in `projects.ts` — the current text is generic (“frame 01”, “gallery photography”) because the image contents were not reviewed in detail during the build.
- [ ] **Permission.** The case-study note says photography is shown with permission. Confirm that permission covers public portfolio use, or replace the note.
- [ ] **Other seven projects.** Their visuals are original CSS/SVG “case plates”, explicitly not screenshots. If real screenshots become available, add them as `images` and optionally keep the plate for the index.
- [ ] **Open Graph image.** `public/og-cover.jpg` is generated for this build. Re-export at 1200×630 if branding changes, and keep the absolute URL in `index.html` in sync with the domain.

---

## 4. Copy & credibility

- [ ] Read the story, skills, process and explorations sections (`src/data/story.ts`, `skills.ts`, `process.ts`, `explorations.ts`). They describe working style and learning, not unverified achievements — keep it that way when editing.
- [ ] `index.html` `<noscript>` copy says the email will be available “once the address is published”. Update it after the real email is in place.
- [ ] Check the “Currently exploring” items are still current. They are framed as explorations, not shipped products.

---

## 5. SEO & metadata

- [ ] Update title/description if the positioning changes.
- [ ] Regenerate `sitemap.xml` if routes are added or removed.
- [ ] Re-run a link checker after replacing social URLs.
- [ ] Validate the deployed page with a social-card debugger (Open Graph / Twitter) once the real domain and OG image URL are live.
- [ ] Optional: add analytics only if you are prepared to disclose it; the site currently ships none.

---

## 6. Quality checks (already run, repeat after content edits)

- [ ] `npm run build`
- [ ] `npm run preview` and check desktop, tablet and mobile widths.
- [ ] Keyboard-only pass: skip link, header menu, 3D mode buttons, mobile “Load interactive 3D” button, all links, form errors.
- [ ] Reduced-motion pass: no smooth scroll, no camera drift, static hero art.
- [ ] Contact form: invalid fields, mailto fallback, and one real submission with Resend configured.
- [ ] Deep-link refresh on `/work/aca-connect` in the deployed environment.

---

## Known intentional omissions

- No invented clients, testimonials, metrics, awards, download counts or “live” badges.
- No fake screenshots for projects without source material.
- No custom cursor (usability/performance trade-off).
- No analytics, cookie banner or tracking scripts.
- The contact function has honeypot + timing checks but no per-IP rate limiting or CAPTCHA. Add one if the form is targeted.
