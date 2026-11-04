import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { scrollToTop } from '../../lib/motion'
import { useLocalTime } from '../../lib/useLocalTime'

const footerNav = [
  { to: '/', label: '00 / Hall' },
  { to: '/about', label: '01 / About' },
  { to: '/projects', label: '02 / Projects' },
  { to: '/expertise', label: '03 / Expertise' },
  { to: '/contact', label: '04 / Contact' },
]

export function Footer() {
  const time = useLocalTime(site.timeZone)
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="footer">
      <div className="shell">
        <div className="footer-callout">
          <div>
            <span className="hud">
              <span className="hud__index">04</span> / The last door
            </span>
            <h2 className="footer-callout__title">
              The hall is open.
              <br />
              <span className="serif">What is behind yours?</span>
            </h2>
          </div>
          <Link to="/contact" className="footer-callout__cta" data-cursor="Open">
            <span>Open the last door</span>
            <ArrowUpRight size={30} strokeWidth={1.2} aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-wordmark" aria-label="GS TECH">
              GS<span aria-hidden="true" />TECH
            </div>
            <p className="footer-tagline">
              An architectural portfolio of four rooms — built around the idea that every
              door opens a new possibility. Designed and developed from Chennai.
            </p>
            <span className="footer-est">
              The doorway / independent practice / est. {site.established}
            </span>
          </div>

          <div className="footer-col">
            <h3>Rooms</h3>
            <ul>
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Elsewhere</h3>
            <ul>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${social.label} — external profile`}
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--direct">
            <h3>Direct</h3>
            <a href={`mailto:${site.email}`} className="footer-email">
              {site.email}
            </a>
            <p>
              {site.location}
              <br />
              {time} IST
            </p>
            <span className="footer-availability">
              <span className="status__dot" aria-hidden="true" />
              {site.availability.open ? 'Open to internships' : 'Currently unavailable'}
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom__meta">
            <span>© {year} GS TECH — Gershon S</span>
            <span aria-hidden="true">/</span>
            <span>The doorway / four rooms / one practice</span>
          </div>
          <button type="button" className="footer-top-btn" onClick={scrollToTop}>
            Return to the threshold
            <span aria-hidden="true">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
