import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Box } from 'lucide-react'
import { site } from '../data/site'
import { gsap, scrollToSection } from '../lib/motion'
import { supportsWebGL } from '../lib/utils'
import { useIsTouch, useMediaQuery, usePrefersReducedMotion } from '../lib/useMediaQuery'
import { useLocalTime } from '../lib/useLocalTime'
import { Magnetic } from '../components/ui/Magnetic'
import { StaticHeroArt } from '../components/three/StaticHeroArt'
import type { ScreenMode } from '../components/three/Workbench'

const HeroThree = lazy(() => import('../components/three/HeroThree'))

const modes: { id: ScreenMode; label: string }[] = [
  { id: 'code', label: 'Code' },
  { id: 'canvas', label: 'Canvas' },
  { id: 'product', label: 'Product' },
]

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const compact = useMediaQuery('(max-width: 900px)')
  const touch = useIsTouch()
  const heroRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)
  const [mode, setMode] = useState<ScreenMode>('code')
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const [renderError, setRenderError] = useState(false)
  const [loadScene, setLoadScene] = useState(false)
  const [optIn3D, setOptIn3D] = useState(false)
  const time = useLocalTime(site.timeZone)

  // Small or touch-first devices start with the static composition so the
  // 1 MB 3D bundle never competes with the first paint. Visitors can still
  // opt in to the real-time scene with one tap.
  const liteDevice = compact || touch

  useEffect(() => {
    setWebgl(supportsWebGL())
    const timer = window.setTimeout(() => setLoadScene(true), 400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (reduced || !heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(progressRef, {
        current: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to('.hero__copy', {
        y: -36,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    return () => {
      document.body.style.cursor = ''
    }
  }, [])

  const cycleMode = () => {
    setMode((current) => {
      const index = modes.findIndex((item) => item.id === current)
      return modes[(index + 1) % modes.length].id
    })
  }

  const deferred = liteDevice && !optIn3D && webgl === true && !reduced && !renderError
  const show3D = !reduced && webgl === true && !renderError && loadScene && !deferred
  const fallbackReason = reduced
    ? 'reduced'
    : renderError
      ? 'error'
      : webgl === false
        ? 'unsupported'
        : deferred
          ? 'deferred'
          : 'loading'

  return (
    <section className="hero theme-paper" id="top" ref={heroRef}>
      <div className="shell hero__inner">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__kicker">
              <span className="hero__kicker-main">
                {site.owner} — <span className="serif">{site.role}</span>
              </span>
              <span className="hero__kicker-index">Portfolio / 2026</span>
            </p>

            <h1 className="hero-title">
              <span className="hero-title__line">
                <span>I build digital</span>
              </span>
              <span className="hero-title__line">
                <span>experiences that</span>
              </span>
              <span className="hero-title__line">
                <span>
                  turn <em className="serif">ideas</em> into
                </span>
              </span>
              <span className="hero-title__line">
                <span>
                  reality<i className="hero-title__dot">.</i>
                </span>
              </span>
            </h1>

            <div className="hero__body">
              <p className="hero__lede">
                I&rsquo;m Gershon, a computer science engineering student and developer
                exploring the intersection of design, technology and real-world problem
                solving.
              </p>
              <div className="hero__actions">
                <Magnetic>
                  <Link
                    to="/#work"
                    className="btn"
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection('work')
                      window.history.replaceState(null, '', '#work')
                    }}
                  >
                    Explore selected work
                    <ArrowDown className="btn__arrow" aria-hidden="true" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    to="/#contact"
                    className="btn btn--ghost"
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection('contact')
                      window.history.replaceState(null, '', '#contact')
                    }}
                  >
                    Start a conversation
                    <ArrowUpRight className="btn__arrow" aria-hidden="true" />
                  </Link>
                </Magnetic>
              </div>
              <p className="hero__secondary">
                From an idea to an interface. From an interface to a working product.
              </p>
            </div>
          </div>

          <div className="hero__stage" id="hero-stage">
            <div className="hero__stage-meta">
              <span className="caption">Fig. 01 — The workbench</span>
              <span className="caption hero__stage-meta-right">
                {show3D ? 'Realtime / WebGL' : 'Static composition'}
              </span>
            </div>

            <div className="hero__visual">
              {show3D ? (
                <SceneBoundary onError={() => setRenderError(true)}>
                  <Suspense fallback={<StaticHeroArt reason="loading" />}>
                    <HeroThree
                      mode={mode}
                      onCycle={cycleMode}
                      compact={compact || touch}
                      progressRef={progressRef}
                      onError={() => setRenderError(true)}
                    />
                  </Suspense>
                </SceneBoundary>
              ) : (
                <StaticHeroArt reason={fallbackReason} />
              )}
            </div>

            {show3D ? (
              <div className="hero__controls">
                <div className="hero__mode-switch" role="group" aria-label="Screen content">
                  {modes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`hero__mode ${mode === item.id ? 'is-active' : ''}`}
                      aria-pressed={mode === item.id}
                      onClick={() => setMode(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <span className="hero__hint caption">
                  Click the screen to switch
                </span>
              </div>
            ) : (
              <div className="hero__fallback">
                <p className="hero__fallback-caption caption">
                  {fallbackReason === 'reduced'
                    ? 'Motion reduced by your system preference.'
                    : fallbackReason === 'unsupported'
                      ? 'This browser has no WebGL — the composition still tells the story.'
                      : fallbackReason === 'error'
                        ? 'The 3D renderer stopped. The static composition remains.'
                        : fallbackReason === 'deferred'
                          ? '3D is paused here to keep the first load quick.'
                          : 'Preparing the interactive workbench…'}
                </p>
                {deferred && (
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm hero__fallback-action"
                    onClick={() => setOptIn3D(true)}
                  >
                    Load interactive 3D
                    <Box className="btn__arrow" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hero__rail" aria-hidden="true">
        Design / Engineering / Curiosity
      </div>

      <div className="shell">
        <div className="hero__foot">
          <a
            href="#story"
            className="hero__scroll"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('story')
              window.history.replaceState(null, '', '#story')
            }}
          >
            <span className="caption">Scroll to explore</span>
            <span className="hero__scroll-line" aria-hidden="true">
              <i />
            </span>
          </a>

          <div className="hero__availability">
            <span className={`status ${site.availability.open ? 'status--live' : 'status--concept'}`}>
              <span className="status__dot" aria-hidden="true" />
              {site.availability.label}
            </span>
          </div>

          <div className="hero__loc">
            <span className="caption">Chennai, India</span>
            <span className="caption">{time} IST</span>
          </div>

          <span className="hero__index caption">01 / 09</span>
        </div>
      </div>
    </section>
  )
}
