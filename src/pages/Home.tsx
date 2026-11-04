import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { doors } from '../data/doors'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { RopePull } from '../components/rope/RopePull'
import { DoorwayStage } from '../components/doorway/DoorwayStage'
import { CaseArt } from '../components/work/CaseArt'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'
import { gsap } from '../lib/motion'

const featured = ['aca-ministries', 'aca-connect', 'campus-water']
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project))

export default function Home() {
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const timerRef = useRef<number | null>(null)
  const [opening, setOpening] = useState<number | null>(null)
  const [hoveredDoor, setHoveredDoor] = useState<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (reduced || !heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(min-width: 901px)', () => {
        gsap.to('.tw-hero__stage', {
          yPercent: 7,
          scale: 1.035,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
        gsap.to('.tw-hero__copy, .tw-hero__rail', {
          y: -34,
          opacity: 0.24,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, heroRef)
    return () => ctx.revert()
  }, [reduced])

  const enterDoor = (index: number) => {
    if (opening !== null) return
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setOpening(index)
    timerRef.current = window.setTimeout(() => {
      navigate(doors[index].route)
    }, 980)
  }

  const activeDoor = opening !== null ? doors[opening] : hoveredDoor !== null ? doors[hoveredDoor] : null

  return (
    <>
      <section className="tw-hero" id="top" ref={heroRef}>
        <div className="shell tw-hero__grid">
          {/* Left: copy */}
          <div className="tw-hero__copy">
            <p className="tw-kicker">
              <span>Independent developer</span>
              <span aria-hidden="true">/</span>
              <span>Chennai, India</span>
            </p>

            <h1 className="tw-hero__title" data-reveal-lines>
              <span className="reveal-line">
                <span>Hi, I&rsquo;m</span>
              </span>
              <span className="reveal-line">
                <span className="serif--up">Gershon.</span>
              </span>
            </h1>

            <p className="tw-hero__subtitle">
              I build ideas into digital experiences.
            </p>

            <p className="tw-hero__lede">
              Computer science engineering student and developer. I work at the
              point where a clear idea becomes something people can actually
              use — interface, engineering and the craft in between.
            </p>

            <div className="tw-hero__actions">
              <Link to="/projects" className="tw-btn">
                See the work
                <ArrowDown size={16} aria-hidden="true" />
              </Link>
              <Link to="/about" className="tw-btn tw-btn--ghost">
                Meet the maker
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <span className="tw-hero__meta">
              {site.availability.label} &middot; {site.location}
            </span>
          </div>

          {/* Right: four interactive doors */}
          <div className="tw-hero__door-wrap">
            <div className="tw-hero__stage">
              <DoorwayStage
                opening={opening}
                onEnter={enterDoor}
                onHoverDoor={setHoveredDoor}
              />
            </div>
            <div className="tw-hero__rail">
              <span className="dw-hud tw-hero__rail-label">
                {activeDoor ? `${activeDoor.number} / ${activeDoor.room}` : 'Choose a door'}
              </span>
              <div className="tw-hero__rail-links">
                {doors.map((door, index) => (
                  <button
                    key={door.id}
                    type="button"
                    className={`tw-hero__rail-link ${opening === index ? 'is-opening' : ''}`}
                    onClick={() => enterDoor(index)}
                    disabled={opening !== null}
                  >
                    <span>{door.number}</span>
                    {door.title}
                  </button>
                ))}
              </div>
              <span className="dw-hud tw-hero__rail-note">Open a door to enter</span>
            </div>
          </div>
        </div>

        <RopePull />

        <div className="tw-hero__scroll" aria-hidden="true">
          <span />
          Explore
        </div>

        {opening !== null && (
          <div className="tw-hero__departing" aria-live="polite">
            <span>Entering</span>
            <strong>{doors[opening].room}</strong>
            <em>{doors[opening].title}</em>
          </div>
        )}
      </section>

      <section className="tw-selected" id="work">
        <div className="shell">
          <header className="tw-section-head">
            <div>
              <p className="tw-kicker">
                <span>Selected passages</span>
                <span aria-hidden="true">/</span>
                <span>03 of 08</span>
              </p>
              <h2 className="tw-section-title">
                Work that holds
                <br />
                a door <em>open.</em>
              </h2>
            </div>
            <Link to="/projects" className="tw-text-link">
              Enter the full gallery
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </header>

          <div className="tw-work-list" data-stagger>
            {featured.map((project) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="tw-work-row"
                data-cursor="Open"
              >
                <span className="tw-work-row__index">{project.number}</span>
                <div className="tw-work-row__copy">
                  <span className="tw-work-row__kicker">
                    {project.kicker} / {project.status}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="tw-tags" aria-label="Technologies">
                    {project.stack
                      .filter((item) => item.confirmed)
                      .slice(0, 4)
                      .map((item) => (
                        <li key={item.name}>{item.name}</li>
                      ))}
                  </ul>
                </div>
                <div className="tw-work-row__art">
                  <CaseArt project={project} />
                </div>
                <span className="tw-work-row__arrow" aria-hidden="true">
                  <ArrowUpRight size={22} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tw-invite">
        <div className="shell">
          <div className="tw-invite__grid">
            <div>
              <p className="tw-kicker">
                <span>Start a project</span>
                <span aria-hidden="true">/</span>
                <span>04</span>
              </p>
              <h2 className="tw-section-title">
                Four rooms.
                <br />
                One open <em>door.</em>
              </h2>
            </div>
            <div className="tw-invite__body">
              <p>
                I work across interface design and front-end engineering —
                taking an unclear problem, giving it shape, and building the
                thing that makes it usable. If you have an idea on the other
                side of a door, I would like to hear it.
              </p>
              <div className="tw-invite__actions">
                <Link to="/contact" className="tw-btn">
                  Start a project
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/about" className="tw-btn tw-btn--ghost">
                  Read the story
                </Link>
              </div>
              <span className="tw-invite__note">
                {site.availability.label} / {site.location}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
