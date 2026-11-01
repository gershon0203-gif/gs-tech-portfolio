import { ArrowUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../../data/site'
import { scrollToSection, scrollToTop } from '../../lib/motion'
import { useLocalTime } from '../../lib/useLocalTime'

const footerNav = [
  { id: 'story', label: 'Story' },
  { id: 'work', label: 'Selected work' },
  { id: 'skills', label: 'Skills' },
  { id: 'process', label: 'How I build' },
  { id: 'contact', label: 'Contact' },
]

export function Footer() {
  const time = useLocalTime(site.timeZone)
  const location = useLocation()
  const year = new Date().getFullYear()
  const isHome = location.pathname === '/'

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return
    event.preventDefault()
    scrollToSection(id)
    window.history.replaceState(null, '', `/#${id}`)
  }

  return (
    <footer className="site-footer theme-dark" id="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <span className="eyebrow">
              <span className="eyebrow__index">09</span>
              <span aria-hidden="true">/</span>
              Colophon
            </span>
            <p className="footer-tagline">
              Made with curiosity. Shaped by creativity. Built with code.
            </p>
            <div className="footer-wordmark" aria-label="GS TECH">
              Gs<span aria-hidden="true" />tech
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h2>Index</h2>
              <ul>
                {footerNav.map((item) => (
                  <li key={item.id}>
                    <Link to={`/#${item.id}`} onClick={(event) => handleAnchor(event, item.id)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h2>Elsewhere</h2>
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

            <div className="footer-col">
              <h2>Say hello</h2>
              <p>
                <a href={`mailto:${site.email}`} className="footer-email">
                  {site.email}
                </a>
              </p>
              <p style={{ marginTop: 10 }}>
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
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom__meta">
            <span>
              © {year} GS TECH — Gershon S
            </span>
            <span aria-hidden="true">/</span>
            <span>Designed &amp; built from scratch</span>
          </div>
          <button type="button" className="footer-top-btn" onClick={scrollToTop}>
            Back to top
            <span aria-hidden="true">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
