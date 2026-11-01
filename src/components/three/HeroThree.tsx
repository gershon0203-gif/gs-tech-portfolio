import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react'
import { Workbench, type ScreenMode } from './Workbench'

export default function HeroThree({
  mode,
  onCycle,
  compact,
  progressRef,
  onError,
}: {
  mode: ScreenMode
  onCycle: () => void
  compact: boolean
  progressRef: MutableRefObject<number>
  onError: () => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 },
    )
    observer.observe(node)

    const onVisibility = () => {
      if (document.hidden) setActive(false)
      else setActive(true)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="hero-three" ref={wrapRef} aria-hidden="true">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, compact ? 1.4 : 1.8]}
        gl={{ alpha: true, antialias: !compact, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.52, 9], fov: 34, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.domElement.addEventListener(
            'webglcontextlost',
            (event) => {
              event.preventDefault()
              onError()
            },
            { once: true },
          )
        }}
      >
        <Suspense fallback={null}>
          <Workbench
            mode={mode}
            onCycle={onCycle}
            compact={compact}
            progressRef={progressRef}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
