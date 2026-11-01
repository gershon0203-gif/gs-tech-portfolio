import { Hero } from '../sections/Hero'
import { Story } from '../sections/Story'
import { Work } from '../sections/Work'
import { Skills } from '../sections/Skills'
import { Process } from '../sections/Process'
import { Explorations } from '../sections/Explorations'
import { Contact } from '../sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Work />
      <Skills />
      <Process />
      <Explorations />
      <Contact />
    </>
  )
}
