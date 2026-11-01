import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { CaseArt } from '../components/work/CaseArt'
import { SectionLabel } from '../components/ui/SectionLabel'
import { StatusPill } from '../components/ui/StatusPill'

export function Work() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0]

  return (
    <section className="section work theme-paper" id="work">
      <div className="shell">
        <SectionLabel index="04" label="Selected work" />

        <div className="work__head">
          <h2 className="section-title" data-reveal>
            Built around
            <br />
            real problems.
            <br />
            <span className="serif">Not hypothetical ones.</span>
          </h2>
          <div className="work__intro" data-reveal>
            <p className="lead">
              Eight projects across church management, community storytelling, campus
              problem solving, utilities and Java. Some are shipped. Some are in progress.
              Some are honest concepts.
            </p>
            <p className="caption">
              Status labels are deliberate. No invented clients, users, metrics or results.
            </p>
          </div>
        </div>

        <div className="work__layout">
          <ul className="work__list">
            {projects.map((project) => {
              const isActive = project.slug === activeSlug
              return (
                <li className="work__item" key={project.slug}>
                  <Link
                    to={`/work/${project.slug}`}
                    className={`work-row ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                  >
                    <span className="work-row__index">{project.number}</span>
                    <span className="work-row__body">
                      <span className="work-row__title">{project.title}</span>
                      <span className="work-row__kicker">{project.kicker}</span>
                    </span>
                    <span className="work-row__status">
                      <StatusPill status={project.status} />
                    </span>
                    <span className="work-row__arrow" aria-hidden="true">
                      <ArrowUpRight size={18} strokeWidth={1.6} />
                    </span>
                    <span className="work-row__thumb" aria-hidden="true">
                      <CaseArt project={project} compact />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <aside className="work__preview" aria-hidden="true">
            <div className="work__preview-sticky">
              <div className="work__preview-art" key={activeProject.slug}>
                <CaseArt project={activeProject} />
              </div>
              <div className="work__preview-meta">
                <div>
                  <span className="caption">
                    Selected work / {activeProject.number}
                  </span>
                  <h3>{activeProject.title}</h3>
                </div>
                <span className="caption">{activeProject.focus}</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="work__foot">
          <p className="caption">
            Select a project to read the full case study — problem, contribution,
            challenges and honest status.
          </p>
          <span className="caption">08 projects / 2025—2026</span>
        </div>
      </div>
    </section>
  )
}
