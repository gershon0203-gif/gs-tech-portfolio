import { useCallback, useRef, useState, useEffect } from 'react'
import { useTheme } from '../../lib/theme'
import { usePrefersReducedMotion } from '../../lib/useMediaQuery'

/**
 * The hanging rope: a physical, draggable SVG rope that toggles the
 * light/dark theme when pulled past threshold. It returns naturally to
 * its resting position after release.
 */
export function RopePull() {
  const { theme, toggleTheme } = useTheme()
  const reduced = usePrefersReducedMotion()
  const [pull, setPull] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const startY = useRef(0)
  const startPull = useRef(0)
  const committed = useRef(false)

  const THRESHOLD = 0.55

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      startY.current = event.clientY
      startPull.current = pull
      setDragging(true)
      setHovered(false)
      committed.current = false
    },
    [pull]
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!dragging) return
      const delta = (event.clientY - startY.current) / 180
      const next = Math.max(0, Math.min(1, startPull.current + delta))
      setPull(next)
    },
    [dragging, pull]
  )

  const onPointerUp = useCallback(() => {
    if (!dragging) return
    setDragging(false)
    if (pull > THRESHOLD && !committed.current) {
      committed.current = true
      toggleTheme()
      // Snap back to rest
      setPull(0)
    } else {
      setPull(0)
    }
  }, [dragging, pull, toggleTheme])

  // Keep tracking pointer movement globally so dragging doesn't break
  // when the pointer leaves the rope element mid-drag.
  useEffect(() => {
    if (!dragging) return
    const onWindowMove = (event: PointerEvent) => {
      const delta = (event.clientY - startY.current) / 180
      const next = Math.max(0, Math.min(1, startPull.current + delta))
      setPull(next)
    }
    const onWindowUp = () => {
      if (!dragging) return
      setDragging(false)
      if (pull > THRESHOLD && !committed.current) {
        committed.current = true
        toggleTheme()
        setPull(0)
      } else {
        setPull(0)
      }
    }
    window.addEventListener('pointermove', onWindowMove)
    window.addEventListener('pointerup', onWindowUp)
    window.addEventListener('pointercancel', onWindowUp)
    return () => {
      window.removeEventListener('pointermove', onWindowMove)
      window.removeEventListener('pointerup', onWindowUp)
      window.removeEventListener('pointercancel', onWindowUp)
    }
  }, [dragging, pull, toggleTheme])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        toggleTheme()
      }
    },
    [toggleTheme]
  )

  // Reduced motion: skip spring, snap directly
  useEffect(() => {
    if (reduced && pull > 0) {
      setPull(0)
    }
  }, [reduced, pull])

  const ropeY = -pull * 40
  const ropeScaleY = 1 + pull * 0.15
  const loopRotate = pull * 12
  const hintOpacity = Math.max(0, 1 - pull * 1.5)
  const instructionOpacity = Math.min(1, pull * 1.8)

  return (
    <div className="dw-rope-wrap">
      <div
        className={`dw-rope ${dragging ? 'is-grabbing' : ''} ${hovered ? 'is-hovered' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={
          theme === 'light'
            ? 'Pull to change to dark world'
            : 'Pull to change to light world'
        }
        aria-pressed={dragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setDragging(false)}
        onPointerEnter={() => setHovered(true)}
        onKeyDown={onKeyDown}
        style={{
          transform: `translateX(-50%) translateY(${ropeY}px) scaleY(${ropeScaleY}) rotate(${loopRotate}deg)`,
        }}
      >
        <svg
          className="dw-rope__line"
          width="2"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="0" y1="0" x2="0" y2="100%" />
        </svg>

        <div className="dw-rope__body" aria-hidden="true" />
        <div className="dw-rope__loop" aria-hidden="true" />

        <div className="dw-rope__hint" style={{ opacity: hintOpacity }}>
          {theme === 'light' ? 'Pull to darken' : 'Pull to brighten'}
        </div>

        <div className="dw-rope__instruction" style={{ opacity: instructionOpacity }}>
          PULL TO CHANGE THE WORLD
        </div>
      </div>
    </div>
  )
}
