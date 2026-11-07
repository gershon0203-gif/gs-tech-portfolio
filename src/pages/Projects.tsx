import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { projects, type ProjectStatus } from '../data/projects'
import { CaseArt } from '../components/work/CaseArt'
import { StatusPill } from '../components/ui/StatusPill'
import { site } from '../data/site'
import { useLocalTime } from '../lib/useLocalTime'

type FilterId = 'all' | ProjectStatus

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All projects' },
  { id: 'Completed', label: 'Completed' },
  { id: 'In Progress', label: 'In progress' },
  { id: 'Prototype', label: 'Prototype' },
  { id: 'Concept', label: 'Concept' },
]

const layouts = ['wide', 'split-right', 'split-left', 'tall'] as const

const counts = projects.reduce<Record<string, number>>((acc, project) => {
  acc[project.status] = (acc[project.status] ?? 0) + 1
  return acc
}, {})

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>('all')
  const time = useLocalTime(site.timeZone)

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.status === filter),
    [filter],
  )

  const activeFilter = filters.find((item) => item.id === filter) ?? filters[0]

  return (
    <>
      <section className="dw-page-hero dw-page-hero--projects" id="top">
        <div className="dw-page-hero__light" aria-hidden="true" />
        <div className="dw-page-hero__arches" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className="shell">
          <div className="dw-page-hero__topline">
            <span className="dw-hud">
              <span>02 / The gallery</span>
            </span>
            <span className="dw-hud">Chennai, IN — {time} IST</span>
            <span className="dw-hud">Eight plates / one practice</span>
          </div>

          <div className="dw-page-hero__grid">
            <div>
              <p className="dw-kicker">
                <span>Selected work</span>
                <span aria-hidden="true">/</span>
                <span>2024 — now</span>
              </p>
              <h1 className="dw-page-title" data-reveal-lines>
                <span className="reveal-line">
                  <span>The project</span>
                </span>
                <span className="reveal-line">
                  <span>
                    <em>gallery.</em>
                  </span>
                </span>
              </h1>
            </div>

            <aside className="dw-page-hero__aside" data-reveal>
              <p className="dw-page-hero__lede">
                Eight real projects — shipped, in progress, prototype and concept.
                Each plate opens into a full case study: the problem, the decisions,
                the stack and what is still unresolved.
              </p>
              <div className="dw-page-hero__stats">
                <span>
                  <strong>{String(projects.length).padStart(2, '0')}</strong>
                  Projects
                </span>
                <span>
                  <strong>{String(counts.Completed ?? 0).padStart(2, '0')}</strong>
                  Shipped
                </span>
                <span>
                  <strong>{String(counts['In Progress'] ?? 0).padStart(2, '0')}</strong>
                  In progress
                </span>
              </div>
              <a href="#gallery" className="dw-text-link">
                Skip to the plates
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="dw-gallery dw-gallery--compact" id="gallery">
        <div className="shell">
          <div className="dw-gallery__bar">
            <div className="dw-filter dw-filter--compact" role="group" aria-label="Filter projects by status">
              {filters.map((item) => {
                const count = item.id === 'all' ? projects.length : counts[item.id] ?? 0
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`dw-filter__button ${filter === item.id ? 'is-active' : ''}`}
                    onClick={() => setFilter(item.id)}
                    aria-pressed={filter === item.id}
                  >
                    {item.label}
                    <span>{String(count).padStart(2, '0')}</span>
                  </button>
                )
              })}
            </div>
            <span className="dw-hud dw-gallery__count" aria-live="polite">
              {String(visible.length).padStart(2, '0')} plates / {activeFilter.label}
            </span>
          </div>

          <div className="dw-plates dw-plates--compact">
            {visible.map((project, index) => {
              const layout = layouts[index % layouts.length]
              return (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className={`dw-plate dw-plate--compact dw-plate--${layout}`}
                  data-cursor="VIEW"
                  data-reveal
                >
                  <span className="dw-plate__number" aria-hidden="true">
                    {project.number}
                  </span>

                  <div className="dw-plate__art">
                    <CaseArt project={project} compact />
                    <span className="dw-plate__art-glow" aria-hidden="true" />
                    <span className="dw-plate__open">
                      Open case study
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="dw-plate__copy dw-plate__copy--compact">
                    <div className="dw-plate__meta">
                      <StatusPill status={project.status} />
                      <span className="dw-hud">{project.focus}</span>
                    </div>
                    <span className="dw-plate__kicker">{project.kicker}</span>
                    <h2>{project.title}</h2>
                    <p>{project.summary}</p>
                    <ul className="dw-tags dw-tags--compact" aria-label="Technologies">
                      {project.stack.slice(0, 4).map((item) => (
                        <li
                          key={item.name}
                          className={item.confirmed ? '' : 'is-pending'}
                          title={item.confirmed ? undefined : 'Named in the brief; not yet verified in source.'}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                    <span className="dw-plate__link">
                      Read the full story
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {visible.length === 0 && (
            <p className="dw-gallery__empty">
              No plates in this cut yet. Choose another status.
            </p>
          )}

          <div className="dw-gallery__foot dw-gallery__foot--compact">
            <p>
              Some case studies are written from project briefs where screenshots or
              repositories were not available. Unverified stack items are marked as
              pending rather than guessed.
            </p>
            <Link to="/contact" className="dw-btn dw-btn--small">
              Discuss a project
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
