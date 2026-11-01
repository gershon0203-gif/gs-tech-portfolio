export interface ProcessStep {
  number: string
  title: string
  lede: string
  body: string
  detail: string[]
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    lede: 'Understand the problem before touching the interface.',
    body: 'I start with the people and the constraint: who is this for, what is actually broken, and what would a good outcome look like? Requirements are written in plain language before they become screens.',
    detail: ['Context & users', 'Constraints', 'Definition of done'],
  },
  {
    number: '02',
    title: 'Explore',
    lede: 'Research the space and choose a direction.',
    body: 'I look at how similar problems are solved, collect visual references and test a few routes. The aim is not the trendiest answer — it is the one that makes the problem easier to understand.',
    detail: ['References', 'Content shape', 'Technical options'],
  },
  {
    number: '03',
    title: 'Design',
    lede: 'Plan the experience and the interface.',
    body: 'Layout, hierarchy, type and interaction are designed together. I prefer to resolve the hard parts — the flow, the empty state, the mobile version — before polishing detail.',
    detail: ['User flow', 'Type & grid', 'Responsive plan'],
  },
  {
    number: '04',
    title: 'Build',
    lede: 'Turn the design into a working product.',
    body: 'I build in small, testable pieces with reusable components and real content where possible. Accessibility and performance are part of the build, not a cleanup phase.',
    detail: ['Components', 'Real content', 'Progressive enhancement'],
  },
  {
    number: '05',
    title: 'Refine',
    lede: 'Test, debug and improve the details.',
    body: 'I check the experience at real widths, on a real phone, with a keyboard. Then I cut what is decorative, fix what is confusing and make the motion quieter.',
    detail: ['Device testing', 'Edge cases', 'Performance'],
  },
  {
    number: '06',
    title: 'Deliver',
    lede: 'Ship, document and keep it maintainable.',
    body: 'Deployment, configuration and handover are part of the work. A product is not finished when it looks right; it is finished when someone else can use and maintain it.',
    detail: ['Deployment', 'Documentation', 'Handover'],
  },
]
