# GS TECH — Portfolio

The personal portfolio of **Gershon S** (GS TECH): an editorial, motion-led site built around an interactive 3D workbench, eight honest case studies, and a contact form that never fakes a delivery.

Built with React 19, TypeScript, Vite 6, React Three Fiber, GSAP and Lenis. No UI framework or CSS-in-JS — the design is a small set of hand-written CSS files.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript only
```

Requires Node 20+ (built and tested on Node 24).

---

## What's inside

| Area | Implementation |
| --- | --- |
| Home | Intro, interactive 3D hero, story, selected work, skills, process, explorations, contact, footer |
| Case studies | Eight routes at `/work/:slug`, with status, problem, contribution, scope, challenges, learnings, imagery and next steps |
| 3D hero | React Three Fiber workbench: pointer parallax, scroll-driven camera, three screen modes, click-to-change, reduced-motion and no-WebGL fallback |
| Motion | GSAP + ScrollTrigger for scroll effects and reveals; Lenis for smooth scroll; CSS transitions for UI |
| Styling | Design tokens, fluid type, container-query case plates, dark/light sections |
| Accessibility | Semantic landmarks, skip link, keyboard-operable menu and scene, visible focus, reduced-motion support, labelled form errors |
| SEO | Per-page title/description/canonical, Open Graph + Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml` |
| Contact | Client validation, loading/error/success states, honeypot + timing trap, Netlify function + Resend, mailto fallback |

### Directory map

```
src/
  components/     layout, UI primitives, 3D scene, case artwork
  data/           site config + editable content (projects, story, skills, process, explorations)
  lib/            motion setup, media-query hooks, small utilities
  pages/          Home, CaseStudy, NotFound
  sections/       page sections and the contact form
  styles/         tokens, base, layout, sections, case-study styles
netlify/functions/contact.mjs   contact handler (Resend)
public/           images, favicon, robots.txt, sitemap.xml, OG image
docs/             repository audit and implementation plan
```

### Editing content

Everything user-facing lives in `src/data/`. Start with:

- `site.ts` — name, availability, email, socials, domain, contact endpoint
- `projects.ts` — the eight case studies (status, stack, narrative, images)
- `story.ts`, `skills.ts`, `process.ts`, `explorations.ts` — the remaining sections

**Read `CONTENT-TODO.md` before launch.** Some values are deliberate placeholders, and some project details still need confirmation.

---

## The 3D hero

`src/components/three/Workbench.tsx` builds a desk scene from primitives — monitor, keyboard, stacked cards, an idea object and a ring — with no external models or textures. It:

- eases the camera toward the pointer for parallax;
- moves the camera as the hero scrolls out of view;
- changes the monitor's screen mode on click / keyboard activation;
- reduces DPR, disables antialiasing and limits scene detail on small screens;
- falls back to `StaticHeroArt` when WebGL is unavailable, reduced motion is requested, loading is slow, or the scene errors;
- keeps the static composition on small or touch-first devices and offers an explicit **Load interactive 3D** button, so the 1 MB scene bundle never competes with the first paint.

On larger screens the scene is lazy-loaded after first paint so it never blocks the initial render.

---

## Contact form

The form posts JSON to `site.contactEndpoint`.

- **Production (default):** `/.netlify/functions/contact`, implemented in `netlify/functions/contact.mjs` using the Resend HTTP API.
- **Local / no endpoint:** the form opens a prefilled `mailto:` draft and explicitly states that nothing was submitted.

The function validates lengths and email format, enforces a minimum and maximum form-session time, silently discards honeypot submissions, escapes HTML, and only returns `{ ok: true }` after Resend accepts the message. If Resend is not configured it returns `503` so the UI can show a real error and the direct-email fallback.

### Enabling delivery

1. Create a [Resend](https://resend.com) account and verify a sending domain.
2. Add these environment variables in Netlify (Site configuration → Environment variables):

   | Variable | Purpose |
   | --- | --- |
   | `RESEND_API_KEY` | API key (`re_…`) |
   | `CONTACT_TO_EMAIL` | Inbox that receives enquiries |
   | `CONTACT_FROM_EMAIL` | Verified sender, e.g. `GS TECH <hello@gstech.dev>` |

3. Deploy. No client rebuild is needed for server-only changes.

To use a different backend, set `VITE_CONTACT_ENDPOINT` at build time. It must accept the same JSON payload (`name`, `email`, `message`, `company`, `startedAt`) and return `{ "ok": true }` only after delivery, or JSON with an `error` string. Anything else is treated as a failure.

> The included function is stateless and has no per-IP rate limiting beyond the timing/honeypot checks. If the form is abused, add Netlify rate limiting, a CAPTCHA, or a KV-backed limiter.

---

## Deployment

### Netlify (recommended)

`netlify.toml` is already configured:

- build command `npm run build`
- publish directory `dist`
- functions directory `netlify/functions`
- SPA redirects for `/work/*` and all other routes
- long-lived caching for hashed assets and images
- baseline security headers

Connect the repository, set the environment variables above, and deploy.

### Other static hosts

The site is a client-side SPA, so the host must rewrite unknown paths to `index.html`:

- **Vercel:** framework preset Vite; add a rewrite from `/(.*)` to `/index.html`.
- **Cloudflare Pages:** build `npm run build`, output `dist`; add a single-page-app fallback.
- **GitHub Pages:** build output can be served, but deep links require a `404.html` fallback and the repo subpath must be configured in Vite (`base`).

The contact function only runs on Netlify as written. Elsewhere, either deploy an equivalent endpoint and set `VITE_CONTACT_ENDPOINT`, or leave it unset so the form uses the email-draft fallback.

### Before going live

- Replace the placeholder email, social URLs and domain (see `CONTENT-TODO.md`).
- Confirm every project status and any stack item marked “pending”.
- Point `og:image` / canonical URLs at the real domain.
- Run `npm run build` and test the deployed form once.

---

## Performance & accessibility notes

- Three.js is a fully separate, lazy chunk; the 3D scene is opt-in on small or touch-first devices, and the first-visit intro is skipped there too.
- Fonts are self-hosted through Fontsource; images are pre-optimised WebP/JPEG.
- Scroll reveals are batched and off-screen work rows use `content-visibility` on mobile to cut layout cost.
- All animation respects `prefers-reduced-motion`.
- The scene is decorative but keyboard-operable; the same information is present in the surrounding copy.
- Case art is CSS/SVG, so it costs no image requests. Only ACA Ministries uses real photography.

---

## Honesty policy

This portfolio only states what can be supported:

- Only ACA Ministries uses real project photography and verified features.
- The other seven projects use original abstract “case plates”, clearly labelled as such — never fake screenshots.
- Stack items that could not be verified are marked “pending” rather than presented as confirmed.
- Project links say they have not been published yet instead of inventing URLs.
- The contact form never reports success unless a backend accepted the message.

See `docs/AUDIT.md` and `docs/IMPLEMENTATION-PLAN.md` for how the source material was assessed.
