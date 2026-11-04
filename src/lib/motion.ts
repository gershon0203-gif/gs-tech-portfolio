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
    scope
      .querySelectorAll('[data-reveal-lines] .reveal-line > span')
      .forEach((el) => gsap.set(el, { yPercent: 0 }))
    scope
      .querySelectorAll('[data-stagger] > *')
      .forEach((el) => gsap.set(el, { opacity: 1, y: 0 }))
    return () => {}
  }

  let observer: IntersectionObserver | null = null
  let failsafe = 0

  const ctx = gsap.context(() => {
    // IntersectionObserver replaces dozens of ScrollTriggers here: no layout
    // reads on load, no forced reflow, and the same reveal behaviour.
    const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope)
    const rules = gsap.utils.toArray<HTMLElement>('[data-rule]', scope)
    const lineGroups = gsap.utils.toArray<HTMLElement>('[data-reveal-lines]', scope)
    const staggers = gsap.utils.toArray<HTMLElement>('[data-stagger]', scope)

    // Empty lists are skipped: gsap.set with an empty target array warns.
    if (reveals.length) gsap.set(reveals, { y: 26, opacity: 0 })
    if (rules.length) gsap.set(rules, { scaleX: 0 })

    const lines = lineGroups.flatMap((group) =>
      gsap.utils.toArray<HTMLElement>('.reveal-line > span', group),
    )
    if (lines.length) gsap.set(lines, { yPercent: 110 })

    const staggerChildren = staggers.flatMap((group) =>
      gsap.utils.toArray<HTMLElement>(':scope > *', group),
    )
    if (staggerChildren.length) gsap.set(staggerChildren, { y: 22, opacity: 0 })

    const revealElement = (el: HTMLElement) => {
      if (el.hasAttribute('data-rule')) {
        gsap.to(el, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' })
      } else if (el.hasAttribute('data-reveal-lines')) {
        const targets = gsap.utils.toArray<HTMLElement>('.reveal-line > span', el)
        gsap.to(targets, {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.075,
          ease: 'power4.out',
          overwrite: true,
        })
      } else if (el.hasAttribute('data-stagger')) {
        const targets = gsap.utils.toArray<HTMLElement>(':scope > *', el)
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: 'power3.out',
          overwrite: true,
        })
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
    }

    const pending = new Set<HTMLElement>([
      ...reveals,
      ...rules,
      ...lineGroups,
      ...staggers,
    ])

    const revealAndForget = (el: HTMLElement) => {
      pending.delete(el)
      revealElement(el)
    }

    observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          revealAndForget(el)
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )

    reveals.forEach((el) => observer?.observe(el))
    rules.forEach((el) => observer?.observe(el))
    lineGroups.forEach((el) => observer?.observe(el))
    staggers.forEach((el) => observer?.observe(el))

    // Failsafe: IntersectionObserver never fires in hidden documents
    // (prerenderers, headless captures, some embedded webviews). Content must
    // never stay invisible, so reveal everything shortly after mount.
    failsafe = window.setTimeout(() => {
      pending.forEach(revealAndForget)
      observer?.disconnect()
    }, 2000)

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

    gsap.utils.toArray<HTMLElement>('[data-parallax-deep]', scope).forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    })
  }, scope)

  return () => {
    observer?.disconnect()
    window.clearTimeout(failsafe)
    ctx.revert()
  }
}

export { gsap, ScrollTrigger }
