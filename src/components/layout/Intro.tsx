import { useEffect, useState } from 'react'
import { getLenis } from '../../lib/motion'

const STORAGE_KEY = 'gs-intro-seen'

/**
 * A short entrance composition — under two seconds, never a fake loading screen.
 * Skipped for reduced-motion users, small/touch-first screens and once per
 * session, so it never delays the first meaningful paint on a phone.
 */
export function Intro() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false
    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce), (max-width: 900px), (hover: none), (pointer: coarse)',
      ).matches
    ) {
      return false
    }
    return window.sessionStorage.getItem(STORAGE_KEY) !== '1'
  })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) return
    document.body.classList.add('is-locked')
    getLenis()?.stop()

    const finishTimer = window.setTimeout(() => setDone(true), 1150)
    const removeTimer = window.setTimeout(() => {
      document.body.classList.remove('is-locked')
      getLenis()?.start()
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      setActive(false)
    }, 2050)

    return () => {
      window.clearTimeout(finishTimer)
      window.clearTimeout(removeTimer)
      document.body.classList.remove('is-locked')
      getLenis()?.start()
    }
  }, [active])

  if (!active) return null

  return (
    <div className={`intro ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="intro__top">
        <span>GS TECH</span>
        <span>Portfolio / {new Date().getFullYear()}</span>
      </div>
      <div className="intro__center">
        GS<i>.</i>TECH
        <span>Independent developer</span>
      </div>
      <div className="intro__bottom">
        <span
          className="mono"
          style={{ textTransform: 'uppercase', letterSpacing: '0.18em' }}
        >
          Gershon S — Chennai, IN
        </span>
        <span className="intro__line">
          <span />
        </span>
        <span className="mono">00 — 09</span>
      </div>
    </div>
  )
}
