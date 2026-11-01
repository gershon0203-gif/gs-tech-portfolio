# GS TECH — Implementation Plan

## Stack decision

| Layer | Choice | Reason |
| --- | --- | --- |
| Build | Vite 6 + React 19 + TypeScript | Fast, static-deployable, existing ecosystem |
| Routing | React Router 6 | Case-study pages with real URLs |
| Styling | Organised custom CSS with design tokens | Editorial layouts need control that utility classes fight |
| 3D | Three.js + React Three Fiber + Drei | Actual WebGL scene, declarative, tree-shakeable |
| Scroll motion | GSAP + ScrollTrigger | One animation system for scroll choreography |
| Smooth scroll | Lenis | Integrated with ScrollTrigger; disabled for reduced motion |
| UI motion | CSS transitions + small GSAP timelines | Avoids a second animation library |
| Icons | Lucide React | Consistent, tree-shaken |
| Fonts | Fontsource (self-hosted) | No third-party blocking requests |

Not installed: Tailwind, Motion, Spline, extra icon packs, state managers.

## Design system summary

- **Canvas:** warm paper `#F3EEE4`; deep charcoal `#151412`.
- **Accent:** signal vermilion `#D8431C`, used sparingly (status dots, rules, one word).
- **Display:** Space Grotesk. **Interface:** Inter. **Editorial:** Instrument Serif.
- **Grid:** 12 columns, asymmetric spans, fluid gutters, max width 1560 px.
- **Motion:** 400–900 ms, cubic-bezier(0.22, 1, 0.36, 1); reveals only; reduced-motion
  removes all non-essential movement.

## Build stages

- **A. Audit** — complete (`docs/AUDIT.md`).
- **B. Design system** — tokens, reset, type scale, grid, buttons, captions, status pills.
- **C. Structure** — header, intro, hero, story, work, skills, process, explorations,
  contact, footer, case studies, 404. Responsive from 320 px up.
- **D. 3D hero** — "The Workbench": floating monitor, keyboard, UI cards, idea wireframe,
  orbital ring; pointer parallax; scroll-driven camera; clickable screen modes; mobile
  reduction; static fallback.
- **E. Motion** — Lenis, GSAP reveals, parallax, process progress, hero camera, cursor.
- **F. Storytelling** — all eight projects with honest status, problem, contribution,
  stack, challenges, learnings and case-study pages.
- **G. Contact** — validated form, Netlify function + Resend, honeypot, timing trap,
  mailto fallback; no fake success.
- **H. Testing** — production build, typecheck, responsive checks at 360 / 768 / 1024 /
  1440 / 1920, console and network review.
- **I. Polish** — performance, metadata, sitemap, robots, deployment docs.

## Acceptance mapping

1. All nine sections + case studies + 404.
2. Header, footer, mobile menu, CTAs and back-to-top all wired.
3. Real WebGL hero with fallbacks.
4. Scroll animations via GSAP; reduced-motion safe.
5. Project statuses honest; unverified data flagged in `CONTENT-TODO.md`.
6. Dedicated mobile layouts and no horizontal overflow.
7. Works without WebGL.
8. No fabricated achievements, metrics or testimonials.
9. Contact has real states and a delivery path.
10. Typecheck + production build verified.
11. Deployment instructions in `README.md`.
