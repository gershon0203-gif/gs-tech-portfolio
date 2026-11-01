export interface StoryChapter {
  number: string
  label: string
  title: string
  body: string
}

export const story = {
  headline: ['Curious by nature.', 'Built through', 'experimentation.'],
  intro:
    'I’m Gershon — a computer science engineering student and developer from Chennai. I’m interested in the point where a clear idea becomes something people can actually use.',
  paragraphs: [
    'I started with a diploma in Computer Technology, where I learned how software, hardware and networks fit together. That foundation led me into a B.E. in Computer Science and Engineering through lateral entry at Sri Muthukumaran Institute of Technology.',
    'Most of what I know now has come from building. A church platform. A campus problem-solving concept. Small utilities. Java exercises. Interface experiments. Each one begins with the same question: what is actually broken, and what is the simplest honest way to fix it?',
    'I care about how a product feels as much as how it works. Typography, pacing and interaction are not decoration to me — they are how a person understands what to do next. That is why I keep moving between design and engineering instead of choosing one.',
    'I’m still early in this journey, and I’m not going to pretend otherwise. What I can offer is curiosity, care with detail, and the willingness to keep learning in public.',
  ],
  chapters: [
    {
      number: '01',
      label: 'Foundation',
      title: 'Diploma in Computer Technology',
      body: 'Programming fundamentals, systems and the practical side of how technology works.',
    },
    {
      number: '02',
      label: 'Progression',
      title: 'B.E. Computer Science & Engineering',
      body: 'Lateral entry at Sri Muthukumaran Institute of Technology, continuing into computer science.',
    },
    {
      number: '03',
      label: 'Practice',
      title: 'Building across the stack',
      body: 'Web development, application development, software engineering, UI/UX and database-driven applications.',
    },
    {
      number: '04',
      label: 'Now',
      title: 'Design × engineering',
      body: 'Exploring full-stack products, interactive 3D and the craft of making digital experiences feel considered.',
    },
  ] satisfies StoryChapter[],
  caption: 'Still learning. Still building. No seniority claimed.',
}
