/**
 * Central site configuration.
 *
 * ─────────────────────────────────────────────────────────────
 * PLACEHOLDERS: the email address and profile URLs below are
 * intentionally obvious placeholders. Replace them before launch.
 * See CONTENT-TODO.md for the full checklist.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  brand: 'GS TECH',
  owner: 'Gershon S',
  role: 'Independent Developer',
  location: 'Chennai, India',
  timeZone: 'Asia/Kolkata',
  established: '2026',

  /** Toggle manually. Drives the hero availability indicator + contact copy. */
  availability: {
    open: true,
    label: 'Open to internships & collaborations',
  },

  email: 'gs.tech@example.com',
  emailNote: 'Placeholder address — replace with the real inbox.',

  socials: [
    { label: 'GitHub', href: 'https://github.com/', placeholder: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', placeholder: true },
    { label: 'Fiverr', href: 'https://www.fiverr.com/', placeholder: true },
  ],

  /** Netlify function by default in production; set VITE_CONTACT_ENDPOINT to override. */
  contactEndpoint:
    import.meta.env.VITE_CONTACT_ENDPOINT ||
    (import.meta.env.PROD ? '/.netlify/functions/contact' : ''),

  domain: 'https://gstech.dev',
} as const

export type Social = (typeof site.socials)[number]
