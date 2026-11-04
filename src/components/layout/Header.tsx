import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, X, Sun, Moon } from 'lucide-react'
import { site } from '../../data/site'
import { getLenis } from '../../lib/motion'
import { useScrolled } from '../../lib/useScrolled'
import { useLocalTime } from '../../lib/useLocalTime'
import { useTheme } from '../../lib/theme'

const navItems = [
  { to: '/', label: 'Home', index: '00' },
  { to: '/about', label: 'About', index: '01' },
  { to: '/projects', label: 'Projects', index: '02' },
  { to: '/expertise', label: 'Expertise', index: '03' },
  { to: '/contact', label: 'Contact', index: '04' },
]

function isActivePath(pathname: string, to: string): boolean {
  if (to === '/') return pathname === '/'
  if (to === '/projects') return pathname.startsWith('/projects') || pathname.startsWith('/work/')
  return pathname.startsWith(to)
}

export function Header() {
  const scrolled = useScrolled(30)
  const location = useLocation()
  const time = useLocalTime(site.timeZone)
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return

    document.body.classList.add('is-locked')
    getLenis()?.stop()
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab' || !menuRef.current) return
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('is-locked')
      getLenis()?.start()
      if (menuRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus()
      }
    }
  }, [menuOpen])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="GS TECH — return home">
            <span className="brand__mark">GS</span>
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__word">TECH</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActivePath(location.pathname, item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`desktop-nav__link ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <sup aria-hidden="true">{item.index}</sup>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Switch to dark world' : 'Switch to light world'}
              onClick={toggleTheme}
              data-cursor="grab"
            >
              {theme === 'light' ? (
                <Moon size={14} aria-hidden="true" />
              ) : (
                <Sun size={14} aria-hidden="true" />
              )}
            </button>
            <span className="header-clock">
              <i aria-hidden="true" />
              Chennai {time}
            </span>
            <Link to="/contact" className="btn btn--sm btn--accent header-cta">
              Start a project
              <ArrowUpRight className="btn__arrow" aria-hidden="true" />
            </Link>
            <button
              type="button"
              ref={toggleRef}
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
            >
              Menu
              <span className="menu-toggle__bars" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-menu__top">
          <span className="brand">
            <span className="brand__mark">GS</span>
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__word">TECH</span>
          </span>
          <button
            type="button"
            className="mobile-menu__close"
            ref={closeRef}
            onClick={() => setMenuOpen(false)}
          >
            Close
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-menu__link ${
                isActivePath(location.pathname, item.to) ? 'is-active' : ''
              }`}
              style={{ animationDelay: menuOpen ? `${120 + index * 55}ms` : '0ms' }}
              aria-current={isActivePath(location.pathname, item.to) ? 'page' : undefined}
            >
              <span className="mobile-menu__index">{item.index}</span>
              <span>{item.label}</span>
              <ArrowUpRight size={22} strokeWidth={1.2} aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <a href={`mailto:${site.email}`} className="footer-email">
            {site.email}
          </a>
          <div className="mobile-menu__socials">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="mobile-menu__meta">
            <span className="hud">Chennai, India — {time} IST</span>
          </div>
        </div>
      </div>
    </>
  )
}
