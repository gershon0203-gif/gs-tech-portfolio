import { useRef, type PointerEvent, type ReactNode } from 'react'
import { gsap } from '../../lib/motion'
import { useMediaQuery, usePrefersReducedMotion } from '../../lib/useMediaQuery'

/**
 * Subtle magnetic pull for primary actions on precise pointers only.
 * Decorative: it never changes the hit area or the underlying link.
 */
export function Magnetic({
  children,
  strength = 0.18,
}: {
  children: ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const enabled = finePointer && !reduced

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength
    gsap.to(ref.current, { x, y, duration: 0.6, ease: 'power3.out' })
  }

  const onLeave = () => {
    if (!enabled || !ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <span
      ref={ref}
      className="magnetic"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </span>
  )
}
