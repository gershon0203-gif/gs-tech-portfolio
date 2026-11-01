export type ProjectStatus = 'Completed' | 'In Progress' | 'Prototype' | 'Concept'

export type VisualKey =
  | 'connect'
  | 'ministries'
  | 'water'
  | 'gst'
  | 'hsn'
  | 'blood'
  | 'atm'
  | 'svg'

export interface StackItem {
  name: string
  /** false = named in the brief but not verifiable from available source. */
  confirmed: boolean
}

export interface ProjectImage {
  src: string
  alt: string
  caption: string
}

export interface Project {
  slug: string
  number: string
  title: string
  kicker: string
  status: ProjectStatus
  focus: string
  summary: string
  problem: string
  contribution: string[]
  stack: StackItem[]
  scopeTitle: string
  scope: { title: string; body: string }[]
  challenges: string[]
  learnings: string[]
  next: string
  visual: VisualKey
  images: ProjectImage[]
  /** Editorial note shown on the case study when evidence is incomplete. */
  note?: string
  size: 'large' | 'medium' | 'small'
}

export const projects: Project[] = [
  {
    slug: 'aca-connect',
    number: '01',
    title: 'ACA Connect',
    kicker: 'Church member management',
    status: 'In Progress',
    focus: 'Full-stack · Auth · Community',
    summary:
      'A church member management platform that gives a congregation one clear, secure home for member records, ministry information and role-based access.',
    problem:
      'Church records spread across spreadsheets, messages and memory. Leaders needed one place to find member details, understand ministry involvement and control who can see personal information.',
    contribution: [
      'Mapped member, admin and leadership needs into a role-based product structure.',
      'Designed and implemented member profiles, authentication screens and admin workflows.',
      'Integrated Supabase for member data, with profile access scoped to the signed-in member.',
      'Defined access boundaries between regular members and administrators.',
    ],
    stack: [
      { name: 'Supabase', confirmed: true },
      { name: 'Authentication', confirmed: true },
      { name: 'Role-based access', confirmed: true },
      { name: 'Front-end framework', confirmed: false },
      { name: 'Hosting', confirmed: false },
    ],
    scopeTitle: 'Product scope',
    scope: [
      {
        title: 'Member directory',
        body: 'A searchable register of members with the details a church office actually needs.',
      },
      {
        title: 'Member profiles',
        body: 'Individual records covering contact details, ministry involvement and membership information.',
      },
      {
        title: 'Authentication',
        body: 'Sign-in for members and staff, with member-specific profile access after login.',
      },
      {
        title: 'Admin & roles',
        body: 'Administrative tools separated from member views, so sensitive actions stay with the right people.',
      },
    ],
    challenges: [
      'Designing access rules that protect personal member data without making everyday admin work slow.',
      'Modelling members, ministries and roles as related data before building screens on top of it.',
    ],
    learnings: [
      'Access control is a product decision as much as a technical one — every role needs a clear answer to “what should this person see?”',
      'Starting from real church workflows produces a simpler interface than starting from database tables.',
    ],
    next: 'Complete the remaining admin workflows, test every role boundary and document the handover process for church staff.',
    visual: 'connect',
    images: [],
    note: 'Case study written from the project brief. Repository and screenshots were not available at build time; stack items marked “pending” still need confirmation.',
    size: 'large',
  },
  {
    slug: 'aca-ministries',
    number: '02',
    title: 'ACA Ministries',
    kicker: 'Church website & digital experience',
    status: 'Completed',
    focus: 'Front-end · Storytelling · Deployment',
    summary:
      'A complete digital home for ACA Pozhichalur Ministries — history, ministries, services, media and giving, built around real photography and a calm, reverent visual language.',
    problem:
      'A church with more than three decades of history needed a digital presence that felt as considered as its physical one: easy to navigate for members, welcoming to visitors and able to carry a large archive of stories and photographs.',
    contribution: [
      'Designed the visual direction and responsive page system around the church’s identity.',
      'Built a multi-page React application with reusable layout, hero, gallery and story components.',
      'Structured a long-form history archive into a readable timeline with photography.',
      'Implemented multilingual content scaffolding for English, Tamil, Hindi and Malayalam.',
      'Configured the build for Netlify with redirects, headers and a content admin entry point.',
    ],
    stack: [
      { name: 'React', confirmed: true },
      { name: 'Vite', confirmed: true },
      { name: 'React Router', confirmed: true },
      { name: 'CSS', confirmed: true },
      { name: 'Netlify', confirmed: true },
      { name: 'Decap / Netlify CMS config', confirmed: true },
    ],
    scopeTitle: 'Delivered scope',
    scope: [
      {
        title: 'Story-driven home',
        body: 'A cinematic hero, church introduction, service information and featured stories.',
      },
      {
        title: 'History archive',
        body: 'A decades-long church story told through a structured, photo-led timeline.',
      },
      {
        title: 'Ministries & services',
        body: 'Clear pages for ministries, weekly services, the pastor and the church’s mission.',
      },
      {
        title: 'Media & giving',
        body: 'Live-stream entry point, blog stories, gallery photography and giving information.',
      },
      {
        title: 'Multilingual layer',
        body: 'Interface content prepared for English, Tamil, Hindi and Malayalam audiences.',
      },
      {
        title: 'Deployment setup',
        body: 'Netlify build configuration, SPA redirects, security headers and a CMS config file.',
      },
    ],
    challenges: [
      'Giving a large historical archive a rhythm that invites reading instead of overwhelming visitors.',
      'Balancing many photographic assets against fast loading on mobile connections.',
      'Keeping a strong church identity while leaving room for content editors to update the site.',
    ],
    learnings: [
      'Editorial pacing — when to show a photograph full-bleed, when to let type carry the page — changes how a story lands.',
      'A multilingual site is a content architecture problem before it is a translation problem.',
    ],
    next: 'Add verified live and repository links, review the photography set for the final production build, and hand content editing over to the church team.',
    visual: 'ministries',
    images: [
      {
        src: '/images/work/aca-ministries-01.webp',
        alt: 'Site photography from the ACA Pozhichalur Ministries project, frame 01',
        caption: 'Homepage photography — ACA Pozhichalur Ministries',
      },
      {
        src: '/images/work/aca-ministries-02.webp',
        alt: 'Site photography from the ACA Pozhichalur Ministries project, frame 02',
        caption: 'Gallery photography — ACA Pozhichalur Ministries',
      },
      {
        src: '/images/work/aca-ministries-03.webp',
        alt: 'Site photography from the ACA Pozhichalur Ministries project, frame 03',
        caption: 'Story archive photography — ACA Pozhichalur Ministries',
      },
      {
        src: '/images/work/aca-ministries-04.webp',
        alt: 'Site photography from the ACA Pozhichalur Ministries project, frame 04',
        caption: 'Community photography — ACA Pozhichalur Ministries',
      },
    ],
    note: 'Photography shown with permission from the ACA Pozhichalur Ministries project assets. Live and repository URLs still need to be added.',
    size: 'large',
  },
  {
    slug: 'campus-water',
    number: '03',
    title: 'Campus Water',
    kicker: 'Campus water complaint system',
    status: 'Concept',
    focus: 'Problem solving · Workflow · Civic',
    summary:
      'A reporting and tracking concept for campus water shortages — routing complaints from students to the right department and up to the HOD.',
    problem:
      'When water runs short on campus, the information that matters is scattered: which restroom, which block, how long it has been out, and who is responsible for fixing it. Without a shared record, the same problem is reported repeatedly and resolution is hard to verify.',
    contribution: [
      'Defined the reporting flow and the information a complaint needs to be actionable.',
      'Sketched a status model for affected locations and restroom availability.',
      'Proposed a department and HOD notification path for escalation.',
      'Planned the application as a concept, not a shipped product.',
    ],
    stack: [
      { name: 'Application stack', confirmed: false },
      { name: 'Database', confirmed: false },
    ],
    scopeTitle: 'Proposed scope',
    scope: [
      {
        title: 'Report a shortage',
        body: 'A short report capturing location, affected facility and urgency.',
      },
      {
        title: 'Location status',
        body: 'A live view of affected blocks and boys’ / girls’ restroom availability.',
      },
      {
        title: 'Department routing',
        body: 'Complaints assigned to the responsible maintenance department.',
      },
      {
        title: 'HOD escalation',
        body: 'A notification workflow that raises unresolved issues to the head of department.',
      },
    ],
    challenges: [
      'Deciding how much detail a student can reasonably submit while still producing an actionable report.',
      'Escalation without noise: not every shortage needs to reach the HOD immediately.',
      'Modelling “availability” as a changing state rather than a one-off complaint.',
    ],
    learnings: [
      'A civic tool succeeds on trust: users need to see that a report moved, not just that it was submitted.',
      'The workflow matters more than the form — who receives what, and when.',
    ],
    next: 'Validate the flow with students and maintenance staff, then build a small prototype for one block before scaling campus-wide.',
    visual: 'water',
    images: [],
    note: 'Concept project. No implementation or screenshots were available at build time.',
    size: 'medium',
  },
  {
    slug: 'gst-calculator',
    number: '04',
    title: 'GST Calculator',
    kicker: 'Tax utility',
    status: 'Prototype',
    focus: 'Utility · Precision · Interface',
    summary:
      'A focused utility for working out GST-inclusive and exclusive amounts without spreadsheet friction.',
    problem:
      'Quick tax maths is repetitive and easy to get wrong. A small, legible calculator removes the friction of opening a spreadsheet for a single calculation.',
    contribution: [
      'Defined the calculation inputs, outputs and rounding rules.',
      'Built the utility interface around a single, fast workflow.',
      'Kept the result presentation clear enough to check by hand.',
    ],
    stack: [
      { name: 'Front-end implementation', confirmed: false },
    ],
    scopeTitle: 'Scope',
    scope: [
      {
        title: 'Forward calculation',
        body: 'Add GST to a base amount at a chosen rate.',
      },
      {
        title: 'Reverse calculation',
        body: 'Extract the base amount and tax from a GST-inclusive total.',
      },
      {
        title: 'Readable breakdown',
        body: 'Show base, tax and total separately so the result can be verified.',
      },
    ],
    challenges: [
      'Rounding: a total that looks right can still be a paisa off depending on where rounding happens.',
      'Keeping the interface minimal without hiding the calculation logic.',
    ],
    learnings: [
      'Small utilities are a good place to practise precise state handling and input validation.',
      'Showing the working builds more trust than showing a single number.',
    ],
    next: 'Confirm the implemented feature set and rates, then add tests for edge cases and rounding.',
    visual: 'gst',
    images: [],
    note: 'Prototype per the project brief. Implementation details and screenshots still need confirmation.',
    size: 'small',
  },
  {
    slug: 'hsn-calculator',
    number: '05',
    title: 'HSN Calculator',
    kicker: 'Classification utility',
    status: 'Concept',
    focus: 'Utility · Data · Search',
    summary:
      'An HSN-related utility concept for making product classification and rate lookup faster to reason about.',
    problem:
      'HSN classification is a lookup problem wrapped in a usability problem: the information exists, but finding the relevant code and understanding its tax implications takes too many steps.',
    contribution: [
      'Framed the lookup and calculation flow as a single tool.',
      'Explored a search-first interface instead of a long static table.',
      'Defined the concept only; implementation is not confirmed.',
    ],
    stack: [{ name: 'Application stack', confirmed: false }],
    scopeTitle: 'Proposed scope',
    scope: [
      {
        title: 'Code lookup',
        body: 'Search HSN codes by product description or code fragment.',
      },
      {
        title: 'Rate context',
        body: 'Surface the applicable GST rate alongside the selected code.',
      },
      {
        title: 'Quick calculation',
        body: 'Carry the selected rate into a simple tax calculation.',
      },
    ],
    challenges: [
      'Classification is contextual; a search tool must not imply more certainty than the source data allows.',
      'Keeping a large reference dataset fast and maintainable.',
    ],
    learnings: [
      'Reference tools live or die on search quality and clear disclaimers.',
    ],
    next: 'Confirm scope, source a reliable reference dataset and prototype the search experience.',
    visual: 'hsn',
    images: [],
    note: 'Concept project. No implementation or screenshots were available at build time.',
    size: 'small',
  },
  {
    slug: 'blood-donation',
    number: '06',
    title: 'Blood Donation',
    kicker: 'Hackathon emergency app',
    status: 'Concept',
    focus: 'Social impact · Location · Emergency',
    summary:
      'A donor discovery and emergency assistance concept built around location — helping find the right donor faster when time matters.',
    problem:
      'In an emergency, finding a compatible donor depends on informal networks and phone calls. Location, blood group and availability are rarely in one place.',
    contribution: [
      'Defined the emergency and discovery user journeys during a hackathon setting.',
      'Explored location-based donor matching and privacy-safe contact.',
      'Kept the project at concept stage; no live donor network exists.',
    ],
    stack: [{ name: 'Application stack', confirmed: false }],
    scopeTitle: 'Proposed scope',
    scope: [
      {
        title: 'Donor discovery',
        body: 'Find nearby donors by blood group and availability.',
      },
      {
        title: 'Emergency request',
        body: 'A time-boxed request that reaches relevant donors without exposing personal contact details.',
      },
      {
        title: 'Location context',
        body: 'Distance and area information to prioritise realistic matches.',
      },
    ],
    challenges: [
      'Privacy: donor location and contact details are sensitive and cannot be treated like ordinary profile data.',
      'Trust: an emergency tool must not create false hope or stale availability.',
    ],
    learnings: [
      'In high-stakes tools, the safest design is often the one that narrows what is shown.',
      'Location features need a clear consent model from the first screen.',
    ],
    next: 'Research a safe consent and verification model before writing any matching logic.',
    visual: 'blood',
    images: [],
    note: 'Hackathon concept. No live donor network, metrics or outcomes exist.',
    size: 'medium',
  },
  {
    slug: 'gama-java-atm',
    number: '07',
    title: 'GAMA Java ATM',
    kicker: 'Java console application',
    status: 'Prototype',
    focus: 'Java · OOP · State',
    summary:
      'An ATM-style Java programming project exploring account state, transactions and a menu-driven interface.',
    problem:
      'An ATM is a compact exercise in state: balances, withdrawals, deposits and authentication all have to stay consistent, and every invalid action needs a safe response.',
    contribution: [
      'Implemented the ATM flow as a menu-driven Java application.',
      'Modelled account balance changes and transaction operations.',
      'Handled invalid input and insufficient-funds cases.',
    ],
    stack: [{ name: 'Java', confirmed: true }],
    scopeTitle: 'Scope',
    scope: [
      {
        title: 'Authentication',
        body: 'A simple account access step before any transaction.',
      },
      {
        title: 'Transactions',
        body: 'Balance enquiry, withdrawal and deposit operations.',
      },
      {
        title: 'Safe failures',
        body: 'Clear responses for invalid amounts and insufficient funds.',
      },
    ],
    challenges: [
      'Keeping balance state correct when operations fail part-way through.',
      'Designing a console flow that stays readable without a visual interface.',
    ],
    learnings: [
      'Working in Java made the value of small, single-purpose methods obvious.',
      'Input validation is part of the feature, not an afterthought.',
    ],
    next: 'Add persistent storage, unit tests for transaction rules and a simple graphical interface.',
    visual: 'atm',
    images: [],
    note: 'Prototype per the project brief. Source and screenshots still need confirmation.',
    size: 'small',
  },
  {
    slug: 'image-to-svg',
    number: '08',
    title: 'Image → SVG',
    kicker: 'Creative web utility',
    status: 'Concept',
    focus: 'Creative tooling · Graphics · Web',
    summary:
      'A creative utility concept for turning raster artwork into usable vector shapes without leaving the browser.',
    problem:
      'Designers and developers often need a quick vector version of a simple graphic, but the round trip through desktop software is slow and the output is rarely clean.',
    contribution: [
      'Defined the conversion and preview workflow.',
      'Explored controls for detail, colour count and output size.',
      'Kept the project at concept stage; no converter is claimed.',
    ],
    stack: [{ name: 'Application stack', confirmed: false }],
    scopeTitle: 'Proposed scope',
    scope: [
      {
        title: 'Upload & preview',
        body: 'Bring in an image and see the original beside the vector result.',
      },
      {
        title: 'Shape controls',
        body: 'Adjust detail, colour reduction and simplification with live feedback.',
      },
      {
        title: 'Useful export',
        body: 'Download a clean SVG with sensible size and structure.',
      },
    ],
    challenges: [
      'Vectorisation quality is unpredictable; the interface must set honest expectations.',
      'Large images can stall a browser tab if processing is not chunked or moved off the main thread.',
    ],
    learnings: [
      'Creative tools need a fast feedback loop more than they need a long list of options.',
    ],
    next: 'Prototype a worker-based conversion pipeline and test it against a small set of simple graphics.',
    visual: 'svg',
    images: [],
    note: 'Concept project. No implementation or screenshots were available at build time.',
    size: 'small',
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const statusTone: Record<ProjectStatus, string> = {
  Completed: 'done',
  'In Progress': 'live',
  Prototype: 'proto',
  Concept: 'concept',
}
