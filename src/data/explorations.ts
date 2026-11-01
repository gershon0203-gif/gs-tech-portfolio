export interface Exploration {
  number: string
  title: string
  state: 'Learning' | 'Experimenting' | 'Researching'
  body: string
  current: string
}

export const explorations: Exploration[] = [
  {
    number: '01',
    title: 'Full-stack engineering',
    state: 'Learning',
    body: 'Moving beyond interface work: data modelling, authentication, access rules and the unglamorous parts that make an application reliable.',
    current: 'Relational data and auth patterns with Supabase, applied through ACA Connect.',
  },
  {
    number: '02',
    title: 'Interactive 3D for the web',
    state: 'Experimenting',
    body: 'Using real-time 3D as a communication tool rather than decoration. Learning where depth and movement add meaning — and where they do not.',
    current: 'The WebGL workbench in this portfolio, built with Three.js, React Three Fiber and GSAP.',
  },
  {
    number: '03',
    title: 'Application development',
    state: 'Learning',
    body: 'Strengthening object-oriented thinking and software fundamentals through Java, with an interest in desktop and utility applications.',
    current: 'Java practice and refining the ATM project’s transaction logic.',
  },
  {
    number: '04',
    title: 'AI-assisted development',
    state: 'Researching',
    body: 'Exploring where AI tools genuinely improve the build process — research, refactoring, testing — without handing over judgement or design thinking.',
    current: 'Using AI as a review partner for code and content; documenting what works.',
  },
  {
    number: '05',
    title: 'Creative UI engineering',
    state: 'Experimenting',
    body: 'The overlap of art direction and front-end engineering: typography, motion systems, scroll choreography and performance budgets.',
    current: 'Building the motion and design system you are looking at right now.',
  },
]
