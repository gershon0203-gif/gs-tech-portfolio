import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="not-found theme-paper">
      <div className="shell not-found__inner">
        <span className="eyebrow">
          <span className="eyebrow__index">404</span> / Off the map
        </span>
        <h1>
          This page
          <br />
          <span className="serif">does not exist.</span>
        </h1>
        <p className="lead">
          The link may be old, mistyped or still being built. The work, the story and the
          contact form are all still where you left them.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn">
            <ArrowLeft size={16} aria-hidden="true" />
            Back home
          </Link>
          <Link to="/#work" className="btn btn--ghost">
            View selected work
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <span className="not-found__mark" aria-hidden="true">
          <Compass size={18} />
          404 / GS TECH
        </span>
      </div>
    </section>
  )
}
