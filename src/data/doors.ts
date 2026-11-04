export type DoorId = 'webdev' | 'projects' | 'about' | 'expertise'

export interface Door {
  id: DoorId
  number: string
  title: string
  room: string
  route: string
  caption: string
  finish: {
    name: string
    color: string
    accent: string
    metalness: number
    roughness: number
  }
  /** World position of the door in the 3D hall. */
  position: [number, number, number]
}

export const doors: Door[] = [
  {
    id: 'webdev',
    number: '01',
    title: 'Web Development',
    room: 'Interface & Engineering',
    route: '/projects',
    caption: 'Interface design, front-end engineering and digital products.',
    finish: {
      name: 'Deep blue',
      color: '#0d2c4f',
      accent: '#5aa0ff',
      metalness: 0.55,
      roughness: 0.42,
    },
    position: [-4.62, 0, -4.95],
  },
  {
    id: 'projects',
    number: '02',
    title: 'Projects',
    room: 'The gallery',
    route: '/projects',
    caption: 'Eight real projects — shipped, in progress, prototype and concept.',
    finish: {
      name: 'Graphite',
      color: '#0a1119',
      accent: '#9cc8ff',
      metalness: 0.72,
      roughness: 0.3,
    },
    position: [-1.54, 0, -4.95],
  },
  {
    id: 'about',
    number: '03',
    title: 'About Me',
    room: 'The archive',
    route: '/about',
    caption: 'The story, the foundation and what is being learned now.',
    finish: {
      name: 'Ivory white',
      color: '#f4f8ff',
      accent: '#ffffff',
      metalness: 0.18,
      roughness: 0.38,
    },
    position: [1.54, 0, -4.95],
  },
  {
    id: 'expertise',
    number: '04',
    title: 'Expertise',
    room: 'The workshop',
    route: '/expertise',
    caption: 'Languages, tools and practice — tied to evidence, not percentages.',
    finish: {
      name: 'Warm grey',
      color: '#8a8a8a',
      accent: '#c8c8c8',
      metalness: 0.62,
      roughness: 0.34,
    },
    position: [4.62, 0, -4.95],
  },
]

export function getDoor(id: DoorId): Door {
  return doors.find((door) => door.id === id) ?? doors[0]
}
