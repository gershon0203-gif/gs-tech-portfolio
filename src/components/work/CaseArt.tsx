import type { Project } from '../../data/projects'

/**
 * Art-directed case plates. These are editorial compositions, NOT fake
 * screenshots — except ACA Ministries, which uses real project photography.
 */
export function CaseArt({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { visual, images, number, title } = project

  return (
    <div className={`case-art case-art--${visual} ${compact ? 'is-compact' : ''}`}>
      <span className="case-art__index">{number}</span>
      <span className="case-art__tag">
        {visual === 'ministries' ? 'Project photography' : 'Case plate'}
      </span>

      {visual === 'connect' && (
        <div className="plate-connect">
          <div className="plate-connect__head">
            <span>ACA CONNECT</span>
            <span className="plate-connect__lock">ROLE / ADMIN</span>
          </div>
          <div className="plate-connect__stack">
            <div className="member-card member-card--back">
              <span className="member-card__avatar" />
              <span className="member-card__lines">
                <i />
                <i />
              </span>
              <span className="member-card__chip">MEMBER</span>
            </div>
            <div className="member-card member-card--front">
              <span className="member-card__avatar">GS</span>
              <span className="member-card__lines">
                <i style={{ width: '62%' }} />
                <i style={{ width: '40%' }} />
                <i style={{ width: '72%' }} />
              </span>
              <span className="member-card__chip">PROFILE</span>
            </div>
          </div>
          <div className="plate-connect__foot">
            <span>DIRECTORY</span>
            <span>MINISTRIES</span>
            <span>ACCESS</span>
          </div>
        </div>
      )}

      {visual === 'ministries' && (
        <div className="plate-ministries">
          {images[0] && (
            <img
              src={images[0].src}
              alt={images[0].alt}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="plate-ministries__veil" />
          <div className="plate-ministries__type">
            <span>ACA</span>
            <em>Ministries</em>
          </div>
          <span className="plate-ministries__loc">POZHICHALUR / CHENNAI</span>
        </div>
      )}

      {visual === 'water' && (
        <div className="plate-water">
          <div className="plate-water__grid" aria-hidden="true" />
          <svg className="plate-water__drop" viewBox="0 0 120 160" aria-hidden="true">
            <path
              d="M60 8C60 8 18 56 18 96a42 42 0 0 0 84 0C102 56 60 8 60 8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M38 104c0 14 10 24 22 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 5"
            />
          </svg>
          <div className="plate-water__list">
            {[
              ['BLOCK A', 'REPORTED'],
              ['BOYS / RESTROOM', 'AFFECTED'],
              ['GIRLS / RESTROOM', 'CHECKING'],
              ['HOD', 'ESCALATION'],
            ].map(([label, state], i) => (
              <div className={`plate-water__row ${i === 3 ? 'is-accent' : ''}`} key={label}>
                <span>{label}</span>
                <span className="plate-water__state">
                  <i aria-hidden="true" />
                  {state}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {visual === 'gst' && (
        <div className="plate-gst">
          <div className="plate-gst__label">
            <span>GOODS &amp; SERVICES TAX</span>
            <span>UTILITY / 04</span>
          </div>
          <div className="plate-gst__rates" aria-hidden="true">
            <span>5</span>
            <span>12</span>
            <span className="is-active">18</span>
            <span>28</span>
          </div>
          <div className="plate-gst__meta">
            <span>INCLUSIVE</span>
            <span className="plate-gst__rule" />
            <span>EXCLUSIVE</span>
          </div>
          <div className="plate-gst__bars" aria-hidden="true">
            <i style={{ width: '72%' }} />
            <i style={{ width: '46%' }} />
            <i style={{ width: '88%' }} />
          </div>
        </div>
      )}

      {visual === 'hsn' && (
        <div className="plate-hsn">
          <div className="plate-hsn__search">
            <span aria-hidden="true">⌕</span>
            <span className="plate-hsn__cursor" />
            <span className="plate-hsn__hint">SEARCH BY CODE OR DESCRIPTION</span>
          </div>
          <div className="plate-hsn__rows" aria-hidden="true">
            {[82, 64, 74, 52, 68].map((width, i) => (
              <div className="plate-hsn__row" key={width + i}>
                <span className="plate-hsn__code">— — — —</span>
                <span className="plate-hsn__line" style={{ width: `${width}%` }} />
                <span className="plate-hsn__rate">%</span>
              </div>
            ))}
          </div>
          <span className="plate-hsn__foot">CLASSIFICATION / RATE / CALCULATION</span>
        </div>
      )}

      {visual === 'blood' && (
        <div className="plate-blood">
          <svg className="plate-blood__drop" viewBox="0 0 200 240" aria-hidden="true">
            <defs>
              <pattern id="blood-dots" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.6" fill="currentColor" />
              </pattern>
              <clipPath id="blood-clip">
                <path d="M100 12c0 0-64 74-64 136a64 64 0 0 0 128 0C164 86 100 12 100 12Z" />
              </clipPath>
            </defs>
            <rect width="200" height="240" fill="url(#blood-dots)" clipPath="url(#blood-clip)" />
            <path
              d="M100 12c0 0-64 74-64 136a64 64 0 0 0 128 0C164 86 100 12 100 12Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.45"
            />
            <path
              d="M128 132h-14v-14h-16v14H84v16h14v14h16v-14h14z"
              fill="#f3eee4"
            />
          </svg>
          <div className="plate-blood__chips">
            {['O+', 'A+', 'B+', 'AB+'].map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
          <span className="plate-blood__foot">LOCATION-AWARE DONOR DISCOVERY / CONCEPT</span>
        </div>
      )}

      {visual === 'atm' && (
        <div className="plate-atm">
          <div className="plate-atm__screen">
            <span className="plate-atm__brand">GAMA / ATM</span>
            <span className="plate-atm__prompt">SELECT TRANSACTION</span>
            <div className="plate-atm__options">
              <span>01 BALANCE</span>
              <span>02 WITHDRAW</span>
              <span>03 DEPOSIT</span>
              <span className="is-dim">04 EXIT</span>
            </div>
            <span className="plate-atm__cursor">_</span>
          </div>
          <div className="plate-atm__keypad" aria-hidden="true">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '·', '0', '←'].map((key) => (
              <span key={key}>{key}</span>
            ))}
          </div>
          <span className="plate-atm__foot">JAVA / OBJECT STATE / CONSOLE LOGIC</span>
        </div>
      )}

      {visual === 'svg' && (
        <div className="plate-svg">
          <svg viewBox="0 0 400 300" aria-hidden="true">
            <g stroke="currentColor" strokeOpacity="0.16">
              {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
                <line key={`x${x}`} x1={x} y1="20" x2={x} y2="280" />
              ))}
              {[40, 80, 120, 160, 200, 240].map((y) => (
                <line key={`y${y}`} x1="20" y1={y} x2="380" y2={y} />
              ))}
            </g>
            <path
              d="M56 220C110 60 220 40 336 96"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M56 220C132 250 218 236 336 96"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="4 5"
              opacity="0.4"
            />
            {[
              [56, 220],
              [336, 96],
              [196, 70],
              [214, 244],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x - 4} y={y - 4} width="8" height="8" fill="currentColor" />
                <rect
                  x={x - 10}
                  y={y - 10}
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                />
              </g>
            ))}
          </svg>
          <span className="plate-svg__label">RASTER → VECTOR</span>
          <span className="plate-svg__foot">SHAPE / COLOUR / SIMPLIFY</span>
        </div>
      )}

      <span className="case-art__name">{title}</span>
    </div>
  )
}
