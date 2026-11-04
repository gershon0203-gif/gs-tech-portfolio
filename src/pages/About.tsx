import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { story } from '../data/story'
import { site } from '../data/site'
import { useLocalTime } from '../lib/useLocalTime'

const focusAreas = [
  'Web development',
  'Application development',
  'Software engineering',
  'UI / UX',
  'Database-driven applications',
]

export default function About() {
  const time = useLocalTime(site.timeZone)

  return (
    <>
      <section className="dw-page-hero dw-page-hero--about" id="top">
        <div className="shell">
          <div className="dw-page-hero__topline">
            <span className="dw-hud">
              <span>01 / The archive</span>
            </span>
            <span className="dw-hud">Chennai, IN — {time} IST</span>
          </div>

          <div className="dw-page-hero__grid">
            <div>
              <p className="dw-kicker">
                <span>The story so far</span>
                <span aria-hidden="true">/</span>
                <span>No seniority claimed</span>
              </p>
              <h1 className="dw-page-title" data-reveal-lines>
                <span className="reveal-line">
                  <span>Behind</span>
                </span>
                <span className="reveal-line">
                  <span>the <em>door.</em></span>
                </span>
              </h1>
            </div>

            <aside className="dw-page-hero__aside" data-reveal>
              <p className="dw-page-hero__lede">{story.intro}</p>
              <dl className="dw-facts">
                <div>
                  <dt>Base</dt>
                  <dd>{site.location}</dd>
                </div>
                <div>
                  <dt>Practice</dt>
                  <dd>Design × Engineering</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{site.availability.label}</dd>
                </div>
                <div>
                  <dt>Now</dt>
                  <dd>Learning in public</dd>
                </div>
              </dl>
            </aside>
          </div>

          <p className="dw-page-hero__caption">
            {story.caption}
          </p>
        </div>
      </section>

      <section className="dw-about-story">
        <div className="shell dw-about-story__grid">
          <aside className="dw-about-story__aside">
            <p className="dw-kicker">
              <span>The longer version</span>
            </p>
            <h2>
              A practice built
              <br />
              one <em>problem</em> at a time.
            </h2>
            <span className="dw-about-story__mark" aria-hidden="true">
              01
            </span>
          </aside>

          <div className="dw-about-story__body">
            {story.paragraphs.map((paragraph, index) => (
              <p key={paragraph.slice(0, 24)} data-reveal>
                <span className="dw-about-story__para-index" aria-hidden="true">
                  0{index + 1}
                </span>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="dw-timeline">
        <div className="shell">
          <header className="dw-section-head dw-section-head--compact">
            <div>
              <p className="dw-kicker">
                <span>Foundation</span>
                <span aria-hidden="true">/</span>
                <span>Education & practice</span>
              </p>
              <h2 className="dw-section-title">
                The road to
                <br />
                this <em>hall.</em>
              </h2>
            </div>
            <span className="dw-hud">04 chapters / ongoing</span>
          </header>

          <ol className="dw-chapters">
            {story.chapters.map((chapter) => (
              <li key={chapter.number} className="dw-chapter" data-reveal>
                <span className="dw-chapter__number">{chapter.number}</span>
                <div className="dw-chapter__body">
                  <span className="dw-chapter__label">{chapter.label}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.body}</p>
                </div>
                <span className="dw-chapter__line" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dw-about-focus">
        <div className="shell dw-about-focus__grid">
          <div>
            <p className="dw-kicker">
              <span>Current focus</span>
              <span aria-hidden="true">/</span>
              <span>{site.established}</span>
            </p>
            <h2 className="dw-section-title">
              The next door
              <br />
              is <em>unfinished.</em>
            </h2>
          </div>

          <div className="dw-about-focus__body">
            <ul className="dw-focus-list">
              {focusAreas.map((area, index) => (
                <li key={area}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {area}
                </li>
              ))}
            </ul>
            <p className="dw-about-focus__note">
              The work is early, honest and in motion. If you want the detail behind it,
              the archive is open.
            </p>
            <div className="dw-about-focus__actions">
              <Link to="/projects" className="dw-btn">
                Step into the gallery
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="dw-btn dw-btn--ghost">
                Start a conversation
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
