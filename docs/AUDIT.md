# GS TECH — Repository Audit

**Date:** 2026-11-01
**Auditor:** OpenCode
**Project owner:** Gershon S
**Workspace:** `D:\portfolio`

---

## 1. Existing project state

| Check | Result |
| --- | --- |
| Working directory | `D:\portfolio` |
| Git repository | Initialised, branch `main` |
| Commits | **None** — empty repository |
| Tracked / untracked files | **None** |
| Framework | None detected |
| Package manager | npm (Node v24.14.1 / npm 11.11.0 available) |
| Deployment configuration | None in this repository |
| Assets / screenshots / logos | None in this repository |
| Existing code to preserve | None |

**Conclusion:** this is a greenfield build. There is no existing site, design system or
deployment to protect. A baseline Git commit is created before implementation begins.

## 2. Related project material found on the machine

The portfolio brief references eight projects. I searched the machine for their source
code and screenshots. Only one project was found:

### ACA Pozhichalur Ministries — `C:\Users\sunit\OneDrive\Desktop\new-church-site`

- React 18 + Vite multi-page site, React Router, custom CSS, Netlify config.
- Contains genuine project photography in `public/images/` (hero, history, team, gallery).
- Contains multilingual content (English, Tamil, Hindi, Malayalam), a church history
  timeline, service information, live-stream page, contact form, Decap/Netlify CMS
  admin config, and a `dist/` build.
- **This is treated as the real source for PROJECT 02 (ACA Ministries).**
- Selected photographs are copied into this portfolio, optimised, and credited in the
  case study as assets from the ACA Pozhichalur Ministries project.

### Not found

- ACA Connect source, screenshots or schema
- Campus Water Complaint application
- GST Calculator
- HSN Calculator
- Blood Donation hackathon app
- GAMA Java ATM
- Image-to-SVG tool
- Any résumé, profile URLs, client names, metrics or testimonials

Because those artefacts are unavailable, their case studies describe **only what the
brief states**. No invented clients, users, downloads, revenue or results are added.
Visuals for these projects are original editorial "case plates" (abstract, art-directed
compositions), **not** fake screenshots. Each card is labelled honestly and the
`CONTENT-TODO.md` file lists exactly what to replace.

## 3. Reusable material

| Asset | Use |
| --- | --- |
| ACA photography (`image2/4/5/6.jpeg`) | Hero + gallery imagery for ACA Ministries case study |
| ACA project facts (name, stack, features) | Case study content |
| Brief copy (hero, story, process, contact) | Site content, edited for tone only |

No existing component or configuration is reused because none exists.

## 4. Missing information requiring confirmation

See `CONTENT-TODO.md`. Key unknowns:

1. Real email address and LinkedIn / GitHub / Fiverr profile URLs.
2. Production domain (used in `sitemap.xml`, canonical and Open Graph URLs).
3. Confirmed implementation status and repository links for projects 01, 03–08.
4. Confirmed tech stack for each project.
5. Real screenshots for projects other than ACA Ministries.
6. Whether "available for work" should be shown, and with what wording.
7. Contact-form delivery credentials (Resend API key, destination inbox).

## 5. Risk notes

- The empty repo means nothing can break, but also no rollback target existed. A
  baseline commit is created before the build.
- Google-hosted fonts are avoided; fonts are self-hosted through Fontsource so the site
  has no third-party render-blocking requests.
- The 3D hero must not be allowed to block content. It is lazy-loaded, WebGL-detected,
  reduced on touch devices, honoured with `prefers-reduced-motion`, and backed by a
  static composition.
- Contact form success is never faked. If no endpoint is configured, the form opens a
  prefilled email draft and says so explicitly.
