'use client'

import { useEffect, useState } from 'react'

export default function useNow(interval: number = 1000): Date {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
    }, interval)

    return () => clearInterval(id)
  }, [interval])

  return now
}
