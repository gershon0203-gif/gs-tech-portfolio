import { explorations } from '../data/explorations'
import { SectionLabel } from '../components/ui/SectionLabel'

export function Explorations() {
  return (
    <section className="section explorations theme-paper-2" id="explorations">
      <div className="shell">
        <SectionLabel index="07" label="Current explorations" />

        <div className="explorations__head">
          <h2 className="section-title" data-reveal>
            Right now,
            <br />
            <span className="serif">I&rsquo;m exploring.</span>
          </h2>
          <p className="lead" data-reveal>
            A live list of what is occupying my attention — not a trophy shelf. These are
            active lines of study and experiment, with the honest state of each.
          </p>
        </div>

        <div className="explorations__list">
          {explorations.map((item, index) => (
            <article
              className="exploration-row"
              key={item.number}
              data-reveal
              data-reveal-delay={index * 0.04}
            >
              <span className="exploration-row__index">{item.number}</span>
              <div className="exploration-row__title">
                <span className={`exploration-row__state state-${item.state.toLowerCase()}`}>
                  <i aria-hidden="true" />
                  {item.state}
                </span>
                <h3>{item.title}</h3>
              </div>
              <p className="exploration-row__body">{item.body}</p>
              <div className="exploration-row__current">
                <span className="caption">Right now</span>
                <p>{item.current}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="explorations__note caption">
          No completed achievements are claimed here — only work in progress.
        </p>
      </div>
    </section>
  )
}
