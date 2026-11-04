import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import { doors } from '../../data/doors'
import { useMediaQuery, usePrefersReducedMotion } from '../../lib/useMediaQuery'
import { DoorGrid } from './DoorGrid'

const LazyDoorwayScene = lazy(() => import('./DoorwayScene'))

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn('Doorway 3D scene fell back to the DOM hall.', error, info)
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

/**
 * The threshold stage. Desktop gets the real 3D hall; phones, reduced-motion
 * users and WebGL failures get the architectural DOM doors, which share the
 * same four finishes and the same hinge animation.
 */
export function DoorwayStage({
  opening,
  onEnter,
  onHoverDoor,
}: {
  opening: number | null
  onEnter: (index: number) => void
  onHoverDoor?: (index: number | null) => void
}) {
  const reduced = usePrefersReducedMotion()
  const compact = useMediaQuery('(max-width: 899px), (hover: none), (pointer: coarse)')
  const [webgl, setWebgl] = useState<boolean | null>(null)

  useEffect(() => {
    setWebgl(hasWebGL())
  }, [])

  const use3D = webgl === true && !reduced && !compact

  return (
    <div className={`dw-stage ${use3D ? 'is-3d' : 'is-dom'}`}>
      {use3D ? (
        <SceneBoundary fallback={<DoorGrid opening={opening} onEnter={onEnter} />}>
          <Suspense fallback={<StageLoading />}>
            <LazyDoorwayScene
              opening={opening}
              onOpenDoor={onEnter}
              onHoverDoor={onHoverDoor}
            />
          </Suspense>
        </SceneBoundary>
      ) : webgl === null ? (
        <StageLoading />
      ) : (
        <DoorGrid opening={opening} onEnter={onEnter} compact={compact} />
      )}

      <div className="dw-sr-only">
        <p>Four doors lead to the four rooms of this portfolio.</p>
        {doors.map((door, index) => (
          <button key={door.id} type="button" onClick={() => onEnter(index)}>
            Open door {door.number} — {door.title}, {door.room}
          </button>
        ))}
      </div>
    </div>
  )
}

function StageLoading() {
  return (
    <div className="dw-stage-loading" aria-hidden="true">
      <div className="dw-stage-loading__arches">
        <i />
        <i />
        <i />
        <i />
      </div>
      <span>Preparing the hall / 04 doors</span>
    </div>
  )
}
