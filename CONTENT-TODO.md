# Content checklist before launch

Legend: **Blocker** = must fix before publishing · **Verify** = confirm the claim · **Polish** = optional improvement.

Updated after the multi-page redesign (doorway hero, About / Projects / Expertise / Contact routes).

---

## 1. Identity & contact

- [x] **Real email address.** `site.email` is `gershon0203@gmail.com` (footer, contact page, error fallbacks and `mailto:` drafts all read from here).
- [x] **Production domain.** `gs-tech-portfolio.netlify.app` is wired through `site.domain`, `index.html` (canonical / Open Graph / Twitter / JSON-LD), `robots.txt` and `sitemap.xml`.
- [ ] **Social profiles.** `site.socials`:
  - GitHub → `https://github.com/` (generic homepage, no profile)
  - LinkedIn → `https://www.linkedin.com/` (generic homepage, no profile)
  - Fiverr → `https://www.fiverr.com/` (generic homepage, no profile)
  - Instagram → `https://www.instagram.com/gershonnnnnn` (set)
  - WhatsApp → `https://wa.me/8608292336` (set)
  
  Replace the three generic URLs with the real profiles, or drop them.
- [ ] **Availability.** `site.availability.open` is `true` with the label "Open to internships & collaborations". Set `open: false` (and adjust the label) when it stops being accurate.
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
- [ ] Confirm or replace every `confirmed: false` stack item. Once verified, set `confirmed: true`. The gallery and case studies already render pending items with a dashed style and a "not yet verified" title, and the home page only shows confirmed items.
- [ ] Re-read the **problem, contribution, scope, challenges, learnings and next** copy for accuracy. It is deliberately plain and avoids metrics, clients, awards and outcomes.
- [ ] Add real **source / live links** when they exist. `src/pages/CaseStudy.tsx` renders "Source and live links have not been published yet" for every project today. Add per-project link fields to the `Project` type and render them.
- [ ] Remove or update editorial notes once evidence improves. Notes live on each project as `note`.

---

## 3. Imagery

- [ ] **ACA Ministries photography.** Four images in `public/images/work/aca-ministries-01..04.webp` came from the real ACA project. Review them and write accurate `alt` and `caption` text in `projects.ts` — the current text is generic.
- [ ] **Permission.** The case-study note says photography is shown with permission. Confirm that permission covers public portfolio use.
- [ ] **Other seven projects.** Their visuals are original CSS/SVG "case plates", explicitly not screenshots. If real screenshots become available, add them as `images`.
- [ ] **Open Graph image.** `public/og-cover.jpg`. Re-export at 1200×630 if branding changes, and keep the absolute URL in `index.html` in sync with the domain.

---

## 4. Copy & credibility

- [ ] Read the story, skills and process content (`src/data/story.ts`, `skills.ts`, `process.ts`). They describe working style and learning, not unverified achievements — keep it that way.
- [ ] `index.html` `<noscript>` copy lists `gershon0203@gmail.com` — keep it in sync if the address changes.
- [ ] Check the availability framing anywhere it appears (hero meta, footer, contact page, noscript).

---

## 5. SEO & metadata

- [x] `sitemap.xml` covers all indexable routes (`/`, `/about`, `/projects`, `/expertise`, `/contact`, and the eight `/work/*` case studies).
- [ ] Update title/description if the positioning changes.
- [ ] Validate the deployed page with a social-card debugger (Open Graph / Twitter) once the domain and OG image URL are live.
- [ ] Optional: add analytics only if you are prepared to disclose it; the site currently ships none.

---

## 6. Quality checks (repeat after any content edits)

- [ ] `npm run build`
- [ ] `npm run preview` and check desktop, tablet and mobile widths — including the reduced-motion and no-WebGL fallbacks for the doorway scene.
- [ ] Keyboard-only pass: skip link, header menu, theme toggle, rope toggle, 3D doors (keyboard activation), mobile menu, form labels and errors.
- [ ] Reduced-motion pass: no smooth scroll, no camera drift, static hall.
- [ ] Contact form: invalid fields, mailto fallback, and one real submission with Resend configured.
- [ ] Deep-link refresh on `/work/aca-ministries` in the deployed environment.

---

## Known intentional omissions

- No invented clients, testimonials, metrics, awards, download counts or "live" badges.
- No fake screenshots for projects without source material.
- No analytics, cookie banner or tracking scripts.
- The contact function has honeypot + timing checks but no per-IP rate limiting or CAPTCHA. Add one if the form is targeted.

---

## Recently resolved

- [x] Migration from single-page to the multi-page doorway design (About / Projects / Expertise / Contact routes).
- [x] Theme system: light/dark "two worlds" via rope + header toggle, persisted choice, `prefers-color-scheme` default.
- [x] CSS rebuilt as a theme-aware layer — the previous dark-only "broadcast" overrides no longer affect the light world; ~50 % of the compiled CSS removed (172 kB → ~103 kB).
- [x] Scroll-reveal failsafe: content is never stuck invisible if IntersectionObserver does not fire (hidden tab, prerender, headless capture).
- [x] `.dw-sr-only` added (screen-reader-only content was previously visible to everyone).
- [x] Hard-coded "05 case studies" stat replaced with a value derived from `projects.ts`.
- [x] Untracked reference photography moved out of `public/` to `docs/references/` so it is not deployed.
