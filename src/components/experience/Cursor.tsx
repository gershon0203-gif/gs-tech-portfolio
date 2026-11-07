import { useEffect, useRef } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../../lib/useMediaQuery'
import { useTheme } from '../../lib/theme'

/**
 * Fluid Morph Cursor — premium, elegant, organic.
 *
 * A small soft dot follows the mouse with smooth interpolation.
 * When hovering interactive elements, the ring expands gently.
 * When hovering project cards, the ring opens wide and reveals "VIEW".
 * All motion is handled via requestAnimationFrame with velocity-based
 * morphing for a natural, liquid feel.
 */
export function Cursor() {
  const { theme } = useTheme()
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = usePrefersReducedMotion()

  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  // Fluid motion state
  const currentRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const prevRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const stateRef = useRef<{ isView: boolean; isHover: boolean }>({
    isView: false,
    isHover: false,
  })

  useEffect(() => {
    if (!fine || reduced) return

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!root || !dot || !ring || !label) return

    document.documentElement.classList.add('has-custom-cursor')

    // Keep cursor hidden until the first pointer move.
    root.style.opacity = '0'
    visibleRef.current = false

    // --- Fluid motion loop (requestAnimationFrame) ---
    const lerp = (start: number, end: number, t: number) =>
      start + (end - start) * t

    const animate = () => {
      // Smooth follow with damping
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.15)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.15)

      // Velocity-based morphing
      const dx = targetRef.current.x - prevRef.current.x
      const dy = targetRef.current.y - prevRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      prevRef.current.x = targetRef.current.x
      prevRef.current.y = targetRef.current.y

      root.style.left = `${currentRef.current.x}px`
      root.style.top = `${currentRef.current.y}px`

      // Stretch dot in direction of movement (max 4px)
      const stretch = Math.min(speed * 0.5, 4)
      const stretchX = Math.cos(angle) * stretch
      const stretchY = Math.sin(angle) * stretch

      if (stateRef.current.isView) {
        dot.style.transform = `translate(-50%, -50%)`
      } else {
        dot.style.transform = `translate(${stretchX}px, ${stretchY}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    // --- Pointer events ---
    const onMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX
      targetRef.current.y = event.clientY
      if (!visibleRef.current) {
        visibleRef.current = true
        root.style.opacity = '1'
      }
    }

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, [role="button"]',
      )
      if (!target) {
        stateRef.current.isView = false
        stateRef.current.isHover = false
        updateCursorState()
        return
      }

      const text = target.dataset.cursor
      const isView = text === 'VIEW'

      stateRef.current.isView = isView
      stateRef.current.isHover = !isView && Boolean(target)
      updateCursorState()
    }

    const onLeave = () => {
      stateRef.current.isView = false
      stateRef.current.isHover = false
      visibleRef.current = false
      root.style.opacity = '0'
      updateCursorState()
    }

    const updateCursorState = () => {
      if (stateRef.current.isView) {
        root.classList.add('is-view')
        root.classList.remove('is-hover')
        label.textContent = 'VIEW'
      } else if (stateRef.current.isHover) {
        root.classList.add('is-hover')
        root.classList.remove('is-view')
        label.textContent = ''
      } else {
        root.classList.remove('is-hover', 'is-view')
        label.textContent = ''
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced, theme])

  if (!fine || reduced) return null

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef}>
          VIEW
        </span>
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  )
}
