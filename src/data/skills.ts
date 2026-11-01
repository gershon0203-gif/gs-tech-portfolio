export interface Skill {
  name: string
  evidence: string
  projectSlugs: string[]
}

export interface SkillGroup {
  id: string
  label: string
  items: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'interface',
    label: 'Interface',
    items: [
      {
        name: 'HTML',
        evidence: 'Semantic structure across ACA Ministries and this portfolio.',
        projectSlugs: ['aca-ministries'],
      },
      {
        name: 'CSS',
        evidence: 'Responsive layout, editorial composition and custom design systems.',
        projectSlugs: ['aca-ministries', 'aca-connect'],
      },
      {
        name: 'JavaScript',
        evidence: 'Interaction, state and browser APIs in everyday front-end work.',
        projectSlugs: ['aca-ministries', 'aca-connect'],
      },
      {
        name: 'React',
        evidence: 'Component architecture and routing for the ACA Ministries site.',
        projectSlugs: ['aca-ministries'],
      },
      {
        name: 'Responsive UI',
        evidence: 'Designed and built for mobile, tablet and desktop breakpoints.',
        projectSlugs: ['aca-ministries', 'campus-water'],
      },
      {
        name: 'Accessibility',
        evidence: 'Keyboard access, focus states and reduced-motion handling in this portfolio.',
        projectSlugs: [],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data & identity',
    items: [
      {
        name: 'Supabase',
        evidence: 'Database integration for member records in ACA Connect.',
        projectSlugs: ['aca-connect'],
      },
      {
        name: 'Authentication',
        evidence: 'Sign-in flows and member-specific access in ACA Connect.',
        projectSlugs: ['aca-connect'],
      },
      {
        name: 'Role-based access',
        evidence: 'Separating member and administrator capabilities.',
        projectSlugs: ['aca-connect'],
      },
      {
        name: 'Relational modelling',
        evidence: 'Structuring members, ministries and roles as related records.',
        projectSlugs: ['aca-connect', 'campus-water'],
      },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    items: [
      {
        name: 'Java',
        evidence: 'Menu-driven ATM application and object-oriented practice.',
        projectSlugs: ['gama-java-atm'],
      },
      {
        name: 'JavaScript',
        evidence: 'The main language behind the web projects shown here.',
        projectSlugs: ['aca-ministries', 'aca-connect'],
      },
      {
        name: 'TypeScript',
        evidence: 'Typed React architecture for this portfolio experience.',
        projectSlugs: [],
      },
    ],
  },
  {
    id: 'tooling',
    label: 'Tooling',
    items: [
      {
        name: 'Git',
        evidence: 'Version control across project work.',
        projectSlugs: [],
      },
      {
        name: 'GitHub',
        evidence: 'Repository hosting and project source management.',
        projectSlugs: [],
      },
      {
        name: 'Vite',
        evidence: 'Build tooling for ACA Ministries and this portfolio.',
        projectSlugs: ['aca-ministries'],
      },
      {
        name: 'Netlify',
        evidence: 'Deployment configuration, redirects and headers for ACA Ministries.',
        projectSlugs: ['aca-ministries'],
      },
      {
        name: 'Vercel',
        evidence: 'Listed as a deployment environment in the project brief; not verified in source.',
        projectSlugs: [],
      },
    ],
  },
  {
    id: 'craft',
    label: 'Craft',
    items: [
      {
        name: 'UI/UX',
        evidence: 'Product flows and interfaces for member management and church storytelling.',
        projectSlugs: ['aca-connect', 'aca-ministries'],
      },
      {
        name: 'Editorial layout',
        evidence: 'Typography-led composition across this portfolio.',
        projectSlugs: [],
      },
      {
        name: 'Creative coding',
        evidence: 'Three.js, React Three Fiber and GSAP in this 3D hero.',
        projectSlugs: [],
      },
      {
        name: 'Problem framing',
        evidence: 'Turning open-ended problems into scoped product flows.',
        projectSlugs: ['campus-water', 'blood-donation', 'hsn-calculator'],
      },
    ],
  },
]

export const skillsFootnote =
  'No percentage bars. Every tool listed here is tied to something built, studied or currently in progress. Anything unverified is written as such.'
