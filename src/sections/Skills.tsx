import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { skillGroups, skillsFootnote, type Skill } from '../data/skills'
import { getProject } from '../data/projects'
import { SectionLabel } from '../components/ui/SectionLabel'

export function Skills() {
  const [selected, setSelected] = useState<Skill>(skillGroups[0].items[0])
  const [hovered, setHovered] = useState<Skill | null>(null)
  const active = hovered ?? selected

  return (
    <section className="section skills theme-dark" id="skills">
      <div className="shell">
        <SectionLabel index="05" label="Skills & technology" />

        <div className="skills__head">
          <h2 className="section-title" data-reveal>
            A toolkit.
            <br />
            <span className="serif">Not a scorecard.</span>
          </h2>
          <p className="lead" data-reveal>
            Tools I have used, studied or am actively learning. Every entry is tied to a
            project or a deliberate practice — not a percentage bar.
          </p>
        </div>

        <div className="skills__layout">
          <div className="skills__groups">
            {skillGroups.map((group, groupIndex) => (
              <div className="skills__group" key={group.id}>
                <div className="skills__group-head">
                  <span className="caption">{String(groupIndex + 1).padStart(2, '0')}</span>
                  <h3>{group.label}</h3>
                </div>
                <div className="skills__chips">
                  {group.items.map((skill) => {
                    const isActive = active.name === skill.name && active.evidence === skill.evidence
                    return (
                      <button
                        key={`${group.id}-${skill.name}`}
                        type="button"
                        className={`skill-chip ${isActive ? 'is-active' : ''}`}
                        aria-pressed={selected.name === skill.name && selected.evidence === skill.evidence}
                        onMouseEnter={() => setHovered(skill)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(skill)}
                        onBlur={() => setHovered(null)}
                        onClick={() => setSelected(skill)}
                      >
                        <span className="skill-chip__dot" aria-hidden="true" />
                        {skill.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="skills__panel">
            <div className="skills__panel-inner">
              <span className="caption">On the bench</span>
              <h3>{active.name}</h3>
              <p>{active.evidence}</p>

              {active.projectSlugs.length > 0 && (
                <div className="skills__related">
                  <span className="caption">Seen in</span>
                  <ul>
                    {active.projectSlugs.map((slug) => {
                      const project = getProject(slug)
                      if (!project) return null
                      return (
                        <li key={slug}>
                          <Link to={`/work/${slug}`} className="link-line">
                            {project.title}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <p className="skills__panel-note">{skillsFootnote}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
