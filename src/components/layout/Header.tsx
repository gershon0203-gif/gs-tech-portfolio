import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { site } from '../../data/site'
import { getLenis, scrollToSection, scrollToTop } from '../../lib/motion'
import { useScrolled } from '../../lib/useScrolled'

const navItems = [
  { id: 'work', label: 'Work', index: '04' },
  { id: 'story', label: 'Story', index: '03' },
  { id: 'skills', label: 'Skills', index: '05' },
  { id: 'process', label: 'Process', index: '06' },
]

const menuItems = [
  { id: 'top', label: 'Home', index: '02' },
  { id: 'story', label: 'Story', index: '03' },
  { id: 'work', label: 'Work', index: '04' },
  { id: 'skills', label: 'Skills', index: '05' },
  { id: 'process', label: 'Process', index: '06' },
  { id: 'contact', label: 'Contact', index: '08' },
]

export function Header() {
  const scrolled = useScrolled(30)
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const menuRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const isHome = location.pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!isHome) {
      setActiveSection('')
      return
    }
    const ids = ['top', 'story', 'work', 'skills', 'process', 'contact']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: [0, 0.25, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

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
      // Return focus to the trigger instead of leaving it inside a closed,
      // inert dialog.
      if (menuRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus()
      }
    }
  }, [menuOpen])

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMenuOpen(false)
    if (!isHome) return
    event.preventDefault()
    scrollToSection(id)
    window.history.replaceState(null, '', id === 'top' ? '/' : `#${id}`)
  }

  const handleHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return
    event.preventDefault()
    scrollToTop()
    window.history.replaceState(null, '', '/')
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <Link to="/" className="brand" onClick={handleHome}>
            <span className="brand__mark">GS</span>
            <span className="brand__dot" aria-hidden="true" />
            <span className="brand__word">TECH</span>
            <span className="sr-only"> home</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                className={`desktop-nav__link ${activeSection === item.id ? 'is-active' : ''}`}
                onClick={(event) => handleAnchor(event, item.id)}
              >
                <sup aria-hidden="true">{item.index}</sup>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <span className="header-availability">
              <span className="pulse" aria-hidden="true" />
              {site.availability.open ? 'Available' : 'Unavailable'}
            </span>
            <Link
              to="/#contact"
              className="btn btn--sm btn--accent header-cta"
              onClick={(event) => handleAnchor(event, 'contact')}
            >
              Let&rsquo;s talk
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
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === 'top' ? '/' : `/#${item.id}`}
              className="mobile-menu__link"
              onClick={(event) => {
                if (item.id === 'top') {
                  if (isHome) {
                    event.preventDefault()
                    scrollToTop()
                    window.history.replaceState(null, '', '/')
                  }
                  setMenuOpen(false)
                  return
                }
                handleAnchor(event, item.id)
              }}
            >
              <span className="mobile-menu__index">{item.index}</span>
              {item.label}
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
          <span className="mono" style={{ width: '100%', opacity: 0.6 }}>
            Chennai, India — {site.availability.open ? 'open to work' : 'not available'}
          </span>
        </div>
      </div>
    </>
  )
}
