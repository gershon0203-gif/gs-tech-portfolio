import { useEffect, useRef } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../../lib/useMediaQuery'
import { useTheme } from '../../lib/theme'

/**
 * Custom premium cursor — always visible, theme-aware.
 * Light mode: dark graphite pointer. Dark mode: white pointer.
 * Never hides the native cursor without a working replacement.
 */
export function Cursor() {
  const { theme } = useTheme()
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!fine || reduced) return
    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!root || !dot || !ring || !label) return

    document.documentElement.classList.add('has-custom-cursor')

    // Apply theme-aware colors
    root.style.borderColor = theme === 'light' ? '#242424' : '#f5f5f2'
    dot.style.backgroundColor = theme === 'light' ? '#242424' : '#f5f5f2'

    let visible = false

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true
        root.style.opacity = '1'
      }
      root.style.left = event.clientX + 'px'
      root.style.top = event.clientY + 'px'
    }

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, [role="button"]',
      )
      if (!target) {
        root.classList.remove('is-active', 'is-view', 'is-grabbing')
        label.textContent = ''
        return
      }
      const text = target.dataset.cursor
      root.classList.add('is-active')
      if (text) {
        root.classList.add('is-view')
        label.textContent = text
      } else {
        root.classList.remove('is-view')
        label.textContent = ''
      }
      if (target.dataset.cursor === 'grab') {
        root.classList.add('is-grabbing')
      }
    }

    const onLeave = () => {
      visible = false
      root.classList.remove('is-active', 'is-view', 'is-grabbing')
      label.textContent = ''
      root.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced, theme])

  if (!fine || reduced) return null

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef} />
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  )
}
