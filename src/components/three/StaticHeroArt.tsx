/**
 * A deliberate static composition shown when WebGL is unavailable, fails, or the
 * visitor prefers reduced motion. Same visual language, zero GPU requirement.
 */
export function StaticHeroArt({
  reason,
}: {
  reason: 'reduced' | 'unsupported' | 'error' | 'loading' | 'deferred'
}) {
  return (
    <div
      className="static-hero"
      role="img"
      aria-label="Static illustration of a floating digital workbench with a monitor showing code, interface cards, a keyboard and an orbital ring."
    >
      <div className="static-hero__orbit" aria-hidden="true" />
      <div className="static-hero__orbit static-hero__orbit--inner" aria-hidden="true" />

      <div className="static-hero__monitor" aria-hidden="true">
        <div className="static-hero__screen">
          <div className="static-hero__chrome">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="static-hero__code">
            {[88, 54, 72, 40, 64, 48, 80, 58, 34, 68].map((width, index) => (
              <span
                key={index}
                className={index === 3 || index === 7 ? 'is-accent' : ''}
                style={{ width: `${width}%` }}
              >
                <i />
              </span>
            ))}
          </div>
          <div className="static-hero__cursor" />
        </div>
        <div className="static-hero__chin">
          <span />
        </div>
        <div className="static-hero__stand" />
        <div className="static-hero__base" />
      </div>

      <div className="static-hero__card static-hero__card--profile" aria-hidden="true">
        <span className="static-hero__avatar" />
        <span className="static-hero__card-lines">
          <i />
          <i />
          <i />
        </span>
        <span className="static-hero__chip" />
      </div>

      <div className="static-hero__card static-hero__card--chart" aria-hidden="true">
        <span className="static-hero__card-title" />
        <span className="static-hero__bars">
          {[30, 48, 22, 62, 40].map((height, index) => (
            <i key={height + index} style={{ height: `${height}%` }} />
          ))}
        </span>
      </div>

      <div className="static-hero__keyboard" aria-hidden="true">
        {Array.from({ length: 30 }, (_, index) => (
          <span key={index} className={index === 19 ? 'is-accent' : ''} />
        ))}
      </div>

      <div className="static-hero__idea" aria-hidden="true">
        <span />
      </div>

      <div className="static-hero__fallback-note">
        <span className="status">
          <span className="status__dot" aria-hidden="true" />
          {reason === 'reduced'
            ? 'Static mode — reduced motion'
            : reason === 'unsupported'
              ? 'Static mode — WebGL unavailable'
              : reason === 'loading'
                ? 'Preparing workbench'
                : reason === 'deferred'
                  ? 'Static mode — 3D on request'
                  : 'Static mode — renderer stopped'}
        </span>
        <span className="caption" aria-hidden="true">
          Code / Canvas / Product
        </span>
      </div>
    </div>
  )
}
