import { SectionLabel } from '../components/ui/SectionLabel'
import { story } from '../data/story'

const focusAreas = [
  'Web development',
  'Application development',
  'Software engineering',
  'UI / UX',
  'Database-driven applications',
]

export function Story() {
  return (
    <section className="section story theme-paper" id="story">
      <div className="shell">
        <SectionLabel index="03" label="The story" />

        <div className="story__grid">
          <div className="story__title">
            <h2 className="section-title" data-reveal>
              Curious by nature.
              <br />
              <span className="serif">Built through</span>
              <br />
              experimentation.
            </h2>
            <p className="story__caption caption" data-reveal>
              {story.caption}
            </p>
          </div>

          <div className="story__copy">
            <p className="story__lede" data-reveal>
              {story.intro}
            </p>
            {story.paragraphs.map((paragraph, index) => (
              <p key={paragraph.slice(0, 24)} data-reveal data-reveal-delay={index * 0.03}>
                {paragraph}
              </p>
            ))}
            <p className="story__signature">
              <span className="serif">— Gershon</span>
              <span className="caption">Chennai, India</span>
            </p>
          </div>
        </div>

        <div className="story__ledger">
          <div className="story__ledger-head">
            <span className="caption">Learning ledger</span>
            <span className="caption">Foundation → Now</span>
          </div>
          <ol className="story__chapters">
            {story.chapters.map((chapter, index) => (
              <li key={chapter.number} data-reveal data-reveal-delay={index * 0.05}>
                <div className="story__chapter-top">
                  <span className="story__chapter-index">{chapter.number}</span>
                  <span className="caption">{chapter.label}</span>
                </div>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="story__focus">
          <p className="caption">Currently learning and building in</p>
          <ul>
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
