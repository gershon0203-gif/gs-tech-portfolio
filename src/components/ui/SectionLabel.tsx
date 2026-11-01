export function SectionLabel({
  index,
  label,
  align = 'left',
}: {
  index: string
  label: string
  align?: 'left' | 'right'
}) {
  return (
    <div className="section-label" data-align={align}>
      <span className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="section-label__sep" aria-hidden="true" />
        {label}
      </span>
      <span className="rule" data-rule aria-hidden="true" />
    </div>
  )
}
