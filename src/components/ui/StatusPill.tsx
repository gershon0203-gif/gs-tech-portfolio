import type { ProjectStatus } from '../../data/projects'
import { statusTone } from '../../data/projects'

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status status--${statusTone[status]}`}>
      <span className="status__dot" aria-hidden="true" />
      {status}
    </span>
  )
}
