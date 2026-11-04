import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { site } from '../data/site'
import { CaseArt } from '../components/work/CaseArt'
import { StatusPill } from '../components/ui/StatusPill'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (!project) return
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content')
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.href
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const previousOgTitle = ogTitle?.getAttribute('content')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const previousOgDescription = ogDescription?.getAttribute('content')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    const previousOgUrl = ogUrl?.getAttribute('content')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const previousTwitterTitle = twitterTitle?.getAttribute('content')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    const previousTwitterDescription = twitterDescription?.getAttribute('content')

    const caseUrl = `${site.domain}/work/${project.slug}`
    document.title = `${project.title} — GS TECH`
    meta?.setAttribute('content', project.summary)
    if (canonical) canonical.href = caseUrl
    if (ogTitle) ogTitle.setAttribute('content', `${project.title} — GS TECH`)
    if (ogDescription) ogDescription.setAttribute('content', project.summary)
    if (ogUrl) ogUrl.setAttribute('content', caseUrl)
    if (twitterTitle) twitterTitle.setAttribute('content', `${project.title} — GS TECH`)
    if (twitterDescription) twitterDescription.setAttribute('content', project.summary)

    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.setAttribute('content', previousDescription)
      if (canonical && previousCanonical) canonical.href = previousCanonical
      if (ogTitle && previousOgTitle) ogTitle.setAttribute('content', previousOgTitle)
      if (ogDescription && previousOgDescription) ogDescription.setAttribute('content', previousOgDescription)
      if (ogUrl && previousOgUrl) ogUrl.setAttribute('content', previousOgUrl)
      if (twitterTitle && previousTwitterTitle) twitterTitle.setAttribute('content', previousTwitterTitle)
      if (twitterDescription && previousTwitterDescription) twitterDescription.setAttribute('content', previousTwitterDescription)
    }
  }, [project])

  if (!project) return <NotFound />

  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const elsewhere = projects.filter((item) => item.slug !== project.slug).slice(0, 3)
  const pendingStack = project.stack.filter((item) => !item.confirmed)

  return (
    <article className="case theme-paper">
      <header className="case__hero">
        <div className="shell">
          <nav className="case__crumbs" aria-label="Breadcrumb">
            <Link to="/projects">Selected work</Link>
            <span aria-hidden="true">/</span>
            <span>{project.number}</span>
          </nav>

          <div className="case__hero-grid">
            <div className="case__hero-copy">
              <span className="eyebrow">
                Case study <span className="eyebrow__index">/ {project.number}</span>
              </span>
              <h1 className="case__title">{project.title}</h1>
              <p className="case__summary">{project.summary}</p>

              <dl className="case__meta">
                <div>
                  <dt className="caption">Status</dt>
                  <dd>
                    <StatusPill status={project.status} />
                  </dd>
                </div>
                <div>
                  <dt className="caption">Focus</dt>
                  <dd>{project.focus}</dd>
                </div>
                <div>
                  <dt className="caption">Index</dt>
                  <dd>
                    {project.number} / {String(projects.length).padStart(2, '0')}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="case__hero-art">
              <CaseArt project={project} />
            </div>
          </div>
        </div>
      </header>

      <div className="section section--tight case__body">
        <div className="shell case__body-grid">
          <aside className="case__aside">
            <div className="case__aside-block">
              <span className="caption">The problem</span>
              <p>{project.problem}</p>
            </div>

            <div className="case__aside-block">
              <span className="caption">Technologies & practice</span>
              <ul className="case__stack">
                {project.stack.map((item) => (
                  <li key={item.name} className={item.confirmed ? 'is-confirmed' : 'is-pending'}>
                    <span className="case__stack-dot" aria-hidden="true" />
                    {item.name}
                    {!item.confirmed && <span className="case__stack-flag">pending</span>}
                  </li>
                ))}
              </ul>
              {pendingStack.length > 0 && (
                <p className="case__stack-note">
                  Items marked pending are described in the brief but could not be verified
                  from source at build time. They are not presented as confirmed.
                </p>
              )}
            </div>

            <div className="case__aside-block case__aside-links">
              <span className="caption">Project links</span>
              <p>Source and live links have not been published yet.</p>
              <span className="caption">Update in src/data/projects.ts</span>
            </div>
          </aside>

          <div className="case__main">
            <section className="case__section" aria-labelledby="case-contribution">
              <span className="case__label">01 / Contribution</span>
              <h2 id="case-contribution">What I did</h2>
              <ul className="case__contribution">
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case__section" aria-labelledby="case-scope">
              <span className="case__label">02 / Scope</span>
              <h2 id="case-scope">{project.scopeTitle}</h2>
              <div className="case__scope">
                {project.scope.map((item, scopeIndex) => (
                  <div className="case__scope-item" key={item.title}>
                    <span className="case__scope-index">
                      {String(scopeIndex + 1).padStart(2, '0')}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="case__duo" aria-label="Challenges and learnings">
              <div>
                <span className="case__label">03 / Challenges</span>
                <h2>What was hard</h2>
                <ul className="case__list">
                  {project.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="case__label">04 / Learnings</span>
                <h2>What it taught me</h2>
                <ul className="case__list">
                  {project.learnings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {project.images.length > 1 && (
              <section className="case__gallery" aria-labelledby="case-gallery">
                <span className="case__label">05 / Project imagery</span>
                <h2 id="case-gallery">Photography from the project</h2>
                <div className="case__gallery-grid">
                  {project.images.map((image, imageIndex) => (
                    <figure
                      key={image.src}
                      className={imageIndex === 0 ? 'case__figure case__figure--wide' : 'case__figure'}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        width={1600}
                        height={1067}
                      />
                      <figcaption className="caption">{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <section className="case__section" aria-labelledby="case-next">
              <span className="case__label">
                {project.images.length > 1 ? '06' : '05'} / Next
              </span>
              <h2 id="case-next">What comes next</h2>
              <p className="case__next">{project.next}</p>
            </section>

            {project.note && (
              <p className="case__note">
                <span className="caption">Editorial note</span>
                {project.note}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="case__elsewhere">
          <span className="caption">Elsewhere in the index</span>
          <ul>
            {elsewhere.map((item) => (
              <li key={item.slug}>
                <Link to={`/work/${item.slug}`} className="link-line">
                  {item.title}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav className="case__pager" aria-label="Case study navigation">
          <Link to={`/work/${previous.slug}`} className="case__pager-link">
            <span className="caption">
              <ArrowLeft size={13} aria-hidden="true" /> Previous
            </span>
            <span>{previous.title}</span>
          </Link>
          <Link to="/projects" className="case__pager-center caption">
            All selected work
          </Link>
          <Link to={`/work/${next.slug}`} className="case__pager-link case__pager-link--next">
            <span className="caption">
              Next <ArrowUpRight size={13} aria-hidden="true" />
            </span>
            <span>{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  )
}
