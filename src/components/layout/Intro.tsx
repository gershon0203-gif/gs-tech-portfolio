import { useEffect, useState } from 'react'
import { getLenis } from '../../lib/motion'

const STORAGE_KEY = 'gs-intro-seen'

/**
 * The opening title card.
 *
 * Under two and a half seconds, never a fake loading screen. It is skipped
 * entirely for reduced-motion users, small/touch-first screens and once per
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
    // The smooth-scroll instance is created in the parent effect, which runs
    // after this child effect — stop it on the next tick instead of missing it.
    const stopTimer = window.setTimeout(() => getLenis()?.stop(), 0)

    const finishTimer = window.setTimeout(() => setDone(true), 1350)
    const removeTimer = window.setTimeout(() => {
      document.body.classList.remove('is-locked')
      getLenis()?.start()
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      setActive(false)
    }, 2420)

    return () => {
      window.clearTimeout(stopTimer)
      window.clearTimeout(finishTimer)
      window.clearTimeout(removeTimer)
      document.body.classList.remove('is-locked')
      getLenis()?.start()
    }
  }, [active])

  if (!active) return null

  return (
    <div className={`intro ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="intro__frame" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="intro__top">
        <span>GS TECH</span>
        <span>Independent practice</span>
        <span>Chennai, IN</span>
      </div>

      <div className="intro__stage">
        <div className="intro__wordmark">
          <span className="intro__word">
            <span>GS</span>
          </span>
          <span className="intro__word intro__word--outline">
            <span>TECH</span>
          </span>
        </div>
        <p className="intro__sub">Gershon S — independent developer</p>
      </div>

      <div className="intro__bottom">
        <span>Design / Engineering / Curiosity</span>
        <span className="intro__line" aria-hidden="true">
          <i />
        </span>
        <span>00 — 09</span>
      </div>
    </div>
  )
}
