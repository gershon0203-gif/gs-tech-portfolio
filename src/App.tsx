import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Intro } from './components/layout/Intro'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Cursor } from './components/experience/Cursor'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Expertise from './pages/Expertise'
import Contact from './pages/Contact'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { ThemeProvider, useTheme } from './lib/theme'
import { getProject } from './data/projects'
import {
  ScrollTrigger,
  initPageMotion,
  scrollToSection,
  startSmoothScroll,
  stopSmoothScroll,
} from './lib/motion'
import { usePrefersReducedMotion } from './lib/useMediaQuery'

const PAGE_TITLES: Record<string, string> = {
  '/': 'GS TECH · Gershon S',
  '/about': 'About · GS TECH',
  '/projects': 'Projects · GS TECH',
  '/expertise': 'Expertise · GS TECH',
  '/contact': 'Contact · GS TECH',
}

function ThemeVeil() {
  const { theme } = useTheme()
  return (
    <div className="dw-theme-veil" data-theme={theme} aria-hidden="true" />
  )
}

export default function App() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    if (reduced) {
      stopSmoothScroll()
      return
    }
    startSmoothScroll(false)
    return () => stopSmoothScroll()
  }, [reduced])

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname]
    if (title) {
      document.title = title
      return
    }
    const workSlug = location.pathname.startsWith('/work/')
      ? location.pathname.slice('/work/'.length)
      : null
    if (!workSlug || !getProject(workSlug)) {
      document.title = 'Page not found · GS TECH'
    }
  }, [location.pathname])

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return

    const cleanup = initPageMotion(main, reduced)
    const pathChanged = previousPath.current !== location.pathname
    previousPath.current = location.pathname

    if (pathChanged && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    const timer = window.setTimeout(() => {
      if (location.hash) scrollToSection(location.hash)
      ScrollTrigger.refresh()
    }, 140)

    return () => {
      window.clearTimeout(timer)
      cleanup()
    }
  }, [location.pathname, location.hash, reduced])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <ThemeProvider>
      <>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Intro />
        <ThemeVeil />
        <Cursor />
        <ScrollProgress />
        <Header />

        <main id="main" tabIndex={-1}>
          <div className="route-enter" key={location.pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        {location.pathname !== '/' && location.pathname !== '/contact' && <Footer />}
      </>
    </ThemeProvider>
  )
}
