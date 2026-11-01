import { useEffect, useRef, useState } from 'react'
import { processSteps } from '../data/process'
import { SectionLabel } from '../components/ui/SectionLabel'
import { getLenis } from '../lib/motion'

export function Process() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const activeStep = processSteps[active]

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const steps = Array.from(list.querySelectorAll<HTMLElement>('[data-step]'))
    if (!steps.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(entry.target.getAttribute('data-step'))
          if (!Number.isNaN(index)) setActive(index)
        })
      },
      { rootMargin: '-44% 0px -44% 0px', threshold: 0 },
    )

    steps.forEach((step) => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  const goToStep = (index: number) => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-step="${index}"]`)
    if (!node) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(node, { offset: -120, duration: 1.1 })
    else node.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="section process theme-paper" id="process">
      <div className="shell">
        <SectionLabel index="06" label="How I build" />

        <div className="process__head">
          <h2 className="section-title" data-reveal>
            Thoughtful process.
            <br />
            <span className="serif">Practical results.</span>
          </h2>
          <p className="lead" data-reveal>
            Six steps, but not a straight line. Research, design and build inform each
            other — the goal is a working product that respects the problem and the person
            using it.
          </p>
        </div>

        <div className="process__layout">
          <aside className="process__aside">
            <div className="process__counter" key={activeStep.number}>
              <span className="process__counter-num">{activeStep.number}</span>
              <span className="process__counter-title">{activeStep.title}</span>
              <p>{activeStep.lede}</p>
            </div>

            <div className="process__nav" role="group" aria-label="Process steps">
              {processSteps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  className={`process__nav-item ${index === active ? 'is-active' : ''}`}
                  onClick={() => goToStep(index)}
                  aria-label={`Go to step ${step.number} — ${step.title}`}
                  aria-current={index === active ? 'step' : undefined}
                >
                  <span>{step.number}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>

            <span className="caption process__aside-note">
              06 steps / one continuous loop
            </span>
          </aside>

          <ol className="process__steps" ref={listRef}>
            {processSteps.map((step, index) => (
              <li
                className={`process-step ${index === active ? 'is-active' : ''}`}
                data-step={index}
                key={step.number}
              >
                <div className="process-step__head">
                  <span className="process-step__index">{step.number}</span>
                  <h3>{step.title}</h3>
                  <span className="process-step__rule" aria-hidden="true" />
                </div>
                <p className="process-step__lede">{step.lede}</p>
                <p className="process-step__body">{step.body}</p>
                <ul className="process-step__tags">
                  {step.detail.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
