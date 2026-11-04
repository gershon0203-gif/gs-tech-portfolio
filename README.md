# GS TECH — Portfolio

The portfolio of **Gershon S** (GS TECH): an editorial, motion-led site built around an interactive 3D "doorway" — a front door with four arched doors, each opening into a room of the site (Work, Projects, About, Expertise) — and a light/dark theme pair connected by a pull-rope.

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
| Routes | `/` Home · `/about` · `/projects` · `/expertise` · `/contact` · `/work/:slug` (eight case studies) · `*` 404 |
| Home | Intro, interactive 3D hero (the doorway), selected work, invite, footer |
| 3D hero | React Three Fiber hall of four doors: pointer parallax, hover glow, click-to-open navigation, reduced-motion and no-WebGL fallback (architectural DOM doors), opt-out on small/touch devices |
| Two worlds | Light "editorial paper" and dark "matte charcoal" themes, toggled by the hanging rope (keyboard accessible) or the header button; persisted in `localStorage`; follows `prefers-color-scheme` on first visit |
| Motion | GSAP + IntersectionObserver reveals (batched, with a 2 s failsafe so content never stays hidden); Lenis smooth scroll; CSS transitions for UI |
| Styling | Design tokens (`tokens.css`), fluid type, hand-written sections — no framework |
| Accessibility | Semantic landmarks, skip link, keyboard-operable menu and scene, visible focus, reduced-motion support, labelled form errors, failsafe reveal |
| SEO | Per-page title/description/canonical, Open Graph + Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml` |
| Contact | Client validation, loading/error/success states, honeypot + timing trap, Netlify function + Resend, mailto fallback |

### Directory map

```
src/
  components/     layout (Header/Footer/Intro/ScrollProgress), UI primitives,
                  doorway 3D scene (DoorwayScene/DoorGrid/DoorwayStage),
                  rope theme toggle, experience (custom cursor), case artwork
  data/           site config + editable content (doors, projects, story, skills, process)
  lib/            motion setup, theme context, media-query hooks, utilities
  pages/          Home, About, Projects, Expertise, Contact, CaseStudy, NotFound
  sections/       ContactForm (the only remaining section)
  styles/         tokens, base, layout, pages (page heroes/gallery/skill board),
                  sections, case study, cinematic, experience, doorway
netlify/functions/contact.mjs   contact handler (Resend)
docs/             repository audit and implementation plan
public/           images, favicon, robots.txt, sitemap.xml, OG image
```

### Editing content

Everything user-facing lives in `src/data/`. Start with:

- `site.ts` — name, availability, email, socials, domain, contact endpoint
- `doors.ts` — the four doors (labels, finishes, routes, 3D positions)
- `projects.ts` — the eight case studies (status, stack, narrative, images)
- `story.ts`, `skills.ts`, `process.ts` — the About and Expertise sections

**Read `CONTENT-TODO.md` before launch.** Some project details still need confirmation.

---

## The doorway (3D hero)

`src/components/doorway/DoorwayScene.tsx` builds a night hall from primitives — arched doors, frames, pendant lights, floor glow — with no external models or textures. It:

- eases the camera toward the pointer for parallax;
- opens the door on click / keyboard activation and navigates to the matching route;
- reduces DPR and disables antialiasing on smaller screens;
- falls back to `DoorGrid` (DOM doors with the same geometry language) when WebGL is unavailable, reduced motion is requested, the device is small/touch-first, or the scene errors (error boundary);
- is lazy-loaded so it never blocks first paint.

On small or touch-first devices the DOM doors render instead of the 3D scene, so the ~900 kB scene chunk is never downloaded there.

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

- Confirm every project status and any stack item marked **pending** (see `CONTENT-TODO.md`).
- Point `og:image` / canonical URLs at the real domain if it changes.
- Run `npm run build` and test the deployed form once.

---

## Performance & accessibility notes

- three.js is a fully separate, lazy chunk; the 3D scene is never loaded on small or touch-first devices.
- Fonts are self-hosted through Fontsource; images are pre-optimised WebP/JPEG.
- CSS is hand-written and tree-shaken by hand — the production stylesheet is ~18 kB gzipped.
- Scroll reveals use a single IntersectionObserver with a 2 s failsafe; off-screen work rows use `content-visibility` on mobile to cut layout cost.
- All animation respects `prefers-reduced-motion`.
- The 3D scene is decorative but keyboard-operable; the same information is present in the surrounding copy and in the visually-hidden door list.

---

## Honesty policy

This portfolio only states what can be supported:

- Only ACA Ministries uses real project photography and verified features.
- The other seven projects use original abstract "case plates", clearly labelled as such — never fake screenshots.
- Stack items that could not be verified are marked **pending** rather than presented as confirmed.
- Project links say they have not been published yet instead of inventing URLs.
- The contact form never reports success unless a backend accepted the message.

See `docs/AUDIT.md` and `docs/IMPLEMENTATION-PLAN.md` for how the source material was assessed.
