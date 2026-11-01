import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Intro } from './components/layout/Intro'
import { ScrollProgress } from './components/layout/ScrollProgress'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import {
  ScrollTrigger,
  initPageMotion,
  scrollToSection,
  startSmoothScroll,
  stopSmoothScroll,
} from './lib/motion'
import { usePrefersReducedMotion } from './lib/useMediaQuery'

const HOME_TITLE = 'GS TECH — Gershon S · Creative Developer'

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
    if (location.pathname === '/') document.title = HOME_TITLE
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
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Intro />
      <ScrollProgress />
      <Header />

      <main id="main" tabIndex={-1}>
        <div className="route-enter" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  )
}
