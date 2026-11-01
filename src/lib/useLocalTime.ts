import { useEffect, useState } from 'react'
import { formatTimeInZone } from './utils'

export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState(() => formatTimeInZone(timeZone))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTimeInZone(timeZone)), 30_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}
