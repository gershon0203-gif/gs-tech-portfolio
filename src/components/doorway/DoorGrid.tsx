import type { CSSProperties } from 'react'
import { doors, type Door } from '../../data/doors'

/**
 * DOM doorway composition. Used for phones, reduced-motion users and as the
 * WebGL fallback. The doors are real 3D CSS objects — same geometry language,
 * same hinge, light spill and finish — not shrunken canvas copies.
 */
export function DoorGrid({
  opening,
  onEnter,
  compact = false,
}: {
  opening: number | null
  onEnter: (index: number) => void
  compact?: boolean
}) {
  return (
    <div className={`dw-door-grid ${compact ? 'is-compact' : ''}`} aria-label="Choose a door">
      {doors.map((door: Door, index) => {
        // Alternate hinge sides: outer doors open inward, inner doors open outward
        const hingeSide = index % 2 === 0 ? 'left' : 'right'
        const style = {
          '--door-color': door.finish.color,
          '--door-accent': door.finish.accent,
          '--door-metalness': door.finish.metalness,
          '--door-roughness': door.finish.roughness,
          '--door-delay': `${index * 90}ms`,
        } as CSSProperties

        return (
          <button
            key={door.id}
            type="button"
            data-hinge={hingeSide}
            className={`dw-door dw-door--hinge-${hingeSide} ${opening === index ? 'is-open' : ''} ${
              opening !== null && opening !== index ? 'is-dimmed' : ''
            }`}
            style={style}
            onClick={() => onEnter(index)}
            aria-label={`Open door ${door.number} — ${door.title}, ${door.room}`}
            aria-disabled={opening !== null}
          >
            <span className="dw-door__frame" aria-hidden="true">
              <span className="dw-door__void" />
              <span className="dw-door__leaf">
                <span className="dw-door__surface" />
                <span className="dw-door__groove dw-door__groove--a" />
                <span className="dw-door__groove dw-door__groove--b" />
                <span className="dw-door__groove dw-door__groove--c" />
                <span className="dw-door__rail" />
                <span className="dw-door__number">{door.number}</span>
                <span className="dw-door__handle">
                  <i />
                </span>
                <span className="dw-door__hinges">
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <span className="dw-door__spill" />
              <span className="dw-door__threshold" />
            </span>
            <span className="dw-door__meta">
              <span className="dw-door__meta-top">
                <span>{door.number}</span>
                <span>{door.finish.name}</span>
              </span>
              <strong>{door.title}</strong>
              <em>{door.room}</em>
              <span className="dw-door__open-label">
                Open door <i aria-hidden="true">↗</i>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
