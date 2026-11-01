import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let tickerAttached = false

const tick = (time: number) => {
  lenis?.raf(time * 1000)
}

export function startSmoothScroll(reducedMotion: boolean): void {
  if (reducedMotion || lenis) return

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    wheelMultiplier: 0.92,
    touchMultiplier: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  lenis.on('scroll', ScrollTrigger.update)

  if (!tickerAttached) {
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    tickerAttached = true
  }
}

export function stopSmoothScroll(): void {
  if (!lenis) return
  gsap.ticker.remove(tick)
  tickerAttached = false
  lenis.destroy()
  lenis = null
}

export function getLenis(): Lenis | null {
  return lenis
}

export function scrollToSection(hash: string): void {
  const id = hash.replace('#', '')
  const target = document.getElementById(id)
  if (!target) return

  const offset = -12
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.15 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function scrollToTop(): void {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/**
 * Page-level scroll choreography. Runs after each route renders and is fully
 * reverted on unmount so client-side navigation never leaves stale triggers.
 */
export function initPageMotion(scope: HTMLElement, reducedMotion: boolean): () => void {
  if (reducedMotion) {
    scope.querySelectorAll('[data-reveal]').forEach((el) => gsap.set(el, { opacity: 1, y: 0 }))
    scope.querySelectorAll('[data-rule]').forEach((el) => gsap.set(el, { scaleX: 1 }))
    return () => {}
  }

  let observer: IntersectionObserver | null = null

  const ctx = gsap.context(() => {
    // IntersectionObserver replaces dozens of ScrollTriggers here: no layout
    // reads on load, no forced reflow, and the same reveal behaviour.
    const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope)
    const rules = gsap.utils.toArray<HTMLElement>('[data-rule]', scope)

    // Empty lists are skipped: gsap.set with an empty target array warns.
    if (reveals.length) gsap.set(reveals, { y: 26, opacity: 0 })
    if (rules.length) gsap.set(rules, { scaleX: 0 })

    observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          if (el.hasAttribute('data-rule')) {
            gsap.to(el, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' })
          } else {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              delay: Number(el.dataset.revealDelay ?? 0),
              ease: 'power3.out',
              overwrite: true,
            })
          }
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )

    reveals.forEach((el) => observer?.observe(el))
    rules.forEach((el) => observer?.observe(el))

    gsap.utils.toArray<HTMLElement>('[data-parallax]', scope).forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
  }, scope)

  return () => {
    observer?.disconnect()
    ctx.revert()
  }
}

export { gsap, ScrollTrigger }
