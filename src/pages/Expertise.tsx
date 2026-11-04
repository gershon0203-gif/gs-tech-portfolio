import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { skillGroups, skillsFootnote, type Skill } from '../data/skills'
import { getProject } from '../data/projects'
import { processSteps } from '../data/process'
import { site } from '../data/site'
import { useLocalTime } from '../lib/useLocalTime'

export default function Expertise() {
  const time = useLocalTime(site.timeZone)
  const [selected, setSelected] = useState<Skill>(skillGroups[0].items[0])
  const [hovered, setHovered] = useState<Skill | null>(null)

  const active = hovered ?? selected
  const activeGroup =
    skillGroups.find((group) =>
      group.items.some(
        (item) => item.name === active.name && item.evidence === active.evidence,
      ),
    ) ?? skillGroups[0]
  const related = active.projectSlugs.map((slug) => getProject(slug)).filter(Boolean)
  const toolCount = skillGroups.reduce((total, group) => total + group.items.length, 0)

  return (
    <>
      <section className="dw-page-hero dw-page-hero--expertise" id="top">
        <div className="dw-page-hero__light" aria-hidden="true" />
        <div className="dw-page-hero__arches" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className="shell">
          <div className="dw-page-hero__topline">
            <span className="dw-hud">
              <span>03 / The workshop</span>
            </span>
            <span className="dw-hud">Chennai, IN — {time} IST</span>
            <span className="dw-hud">Evidence over percentages</span>
          </div>

          <div className="dw-page-hero__grid">
            <div>
              <p className="dw-kicker">
                <span>Technology space</span>
                <span aria-hidden="true">/</span>
                <span>{toolCount} entries</span>
              </p>
              <h1 className="dw-page-title" data-reveal-lines>
                <span className="reveal-line">
                  <span>A toolkit.</span>
                </span>
                <span className="reveal-line">
                  <span>
                    Not a <em>scorecard.</em>
                  </span>
                </span>
              </h1>
            </div>

            <aside className="dw-page-hero__aside" data-reveal>
              <p className="dw-page-hero__lede">
                Languages, databases, tools and craft — each one tied to something built,
                studied or currently in progress. No percentage bars, no invented
                seniority. Select an entry to see the evidence.
              </p>
              <a href="#board" className="dw-text-link">
                Enter the workshop
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="dw-expertise-board" id="board">
        <div className="shell">
          <div className="dw-expertise-board__head">
            <p className="dw-kicker">
              <span>On the bench</span>
              <span aria-hidden="true">/</span>
              <span>{toolCount} entries / 05 groups</span>
            </p>
            <p className="dw-expertise-board__hint">
              Hover or focus an entry to inspect its evidence.
            </p>
          </div>

          <div className="dw-skills">
            <div className="dw-skills__groups">
              {skillGroups.map((group) => (
                <section key={group.id} className="dw-skill-group" aria-labelledby={`skill-${group.id}`}>
                  <div className="dw-skill-group__head">
                    <h2 id={`skill-${group.id}`}>{group.label}</h2>
                    <span>{String(group.items.length).padStart(2, '0')}</span>
                  </div>
                  <div className="dw-skill-group__chips">
                    {group.items.map((skill) => {
                      const isActive =
                        active.name === skill.name && active.evidence === skill.evidence
                      return (
                        <button
                          key={`${group.id}-${skill.name}`}
                          type="button"
                          className={`dw-skill-chip ${isActive ? 'is-active' : ''}`}
                          aria-pressed={isActive}
                          onClick={() => setSelected(skill)}
                          onMouseEnter={() => setHovered(skill)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(skill)}
                          onBlur={() => setHovered(null)}
                        >
                          {skill.name}
                          <i aria-hidden="true" />
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            <aside className="dw-skill-panel" aria-live="polite">
              <div className="dw-skill-panel__orbit" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="dw-hud">On the bench / {activeGroup.label}</span>
              <h2>{active.name}</h2>
              <p className="dw-skill-panel__evidence">{active.evidence}</p>

              <div className="dw-skill-panel__seen">
                <span className="dw-hud">Seen in</span>
                {related.length ? (
                  <div className="dw-skill-panel__links">
                    {related.map((project) =>
                      project ? (
                        <Link key={project.slug} to={`/work/${project.slug}`}>
                          {project.title}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      ) : null,
                    )}
                  </div>
                ) : (
                  <p>Documented through this portfolio and ongoing practice.</p>
                )}
              </div>

              <div className="dw-skill-panel__foot">
                <span>{String(toolCount).padStart(2, '0')} entries</span>
                <span>No percentage bars</span>
              </div>
            </aside>
          </div>

          <p className="dw-skills__footnote">{skillsFootnote}</p>
        </div>
      </section>

      <section className="dw-method" id="method">
        <div className="shell">
          <header className="dw-section-head dw-section-head--compact">
            <div>
              <p className="dw-kicker">
                <span>The method</span>
                <span aria-hidden="true">/</span>
                <span>Six moves</span>
              </p>
              <h2 className="dw-section-title">
                How a door
                <br />
                gets <em>opened.</em>
              </h2>
            </div>
            <span className="dw-hud">Discover → Deliver</span>
          </header>

          <ol className="dw-method__list">
            {processSteps.map((step) => (
              <li key={step.number} className="dw-method-step" data-reveal>
                <span className="dw-method-step__number">{step.number}</span>
                <div className="dw-method-step__body">
                  <div className="dw-method-step__head">
                    <h3>{step.title}</h3>
                    <span>{step.detail.join(' / ')}</span>
                  </div>
                  <p>{step.lede}</p>
                  <p className="dw-method-step__copy">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dw-expertise-outro">
        <div className="dw-expertise-outro__light" aria-hidden="true" />
        <div className="shell dw-expertise-outro__grid">
          <div>
            <p className="dw-kicker">
              <span>The toolkit is a means</span>
              <span aria-hidden="true">/</span>
              <span>Not the point</span>
            </p>
            <h2 className="dw-section-title">
              Tools change.
              <br />
              The problem <em>stays.</em>
            </h2>
          </div>
          <div>
            <p>
              The stack on this page is the current one, not a permanent identity. What
              carries across projects is the way a problem is framed, tested and turned
              into something someone can use.
            </p>
            <div className="dw-expertise-outro__actions">
              <Link to="/projects" className="dw-btn">
                See the evidence
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="dw-btn dw-btn--ghost">
                Bring a problem
              </Link>
            </div>
            <span className="dw-invite__note">
              {site.availability.label} / {site.location}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
