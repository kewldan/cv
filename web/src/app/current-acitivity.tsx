'use client'

import { Leaf } from 'lucide-react'
import { useMemo } from 'react'
import { subjects } from '@/app/grades/subjects'
import { useTimetable } from '@/features/timetable'
import useNow from '@/hooks/useNow'

const schedule: string[] = [
  '9:00 - 9:45',
  '9:55 - 10:40',
  '11:00 - 11:45',
  '12:05 - 12:50',
  '13:10 - 13:55',
  '14:05 - 14:50',
  '15:00 - 15:45',
]

type LessonInterval = {
  index: number
  start: Date
  end: Date
}

function parseTimeToDate(time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const now = new Date()
  const date = new Date(now)
  date.setHours(hours, minutes, 0, 0)
  return date
}

function buildIntervals(): LessonInterval[] {
  return schedule.map((item, index) => {
    const [startStr, endStr] = item.split(' - ')
    return {
      index,
      start: parseTimeToDate(startStr),
      end: parseTimeToDate(endStr),
    }
  })
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return '00:00'

  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function CurrentActivity() {
  const { timetable } = useTimetable()
  const intervals = useMemo(() => buildIntervals(), [])
  const now = useNow()

  const currentDay = new Date().getDay()
  if (currentDay === 0 || currentDay === 6) {
    return (
      <div className='flex items-center gap-3'>
        <div className='size-10 rounded-full flex items-center justify-center shrink-0'>
          <Leaf size={32} />
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Выходной день</p>
          <h3 className='text-lg font-semibold'>Отдыхай</h3>
        </div>
      </div>
    )
  }

  const currentLesson = intervals.find(
    (lesson) => now >= lesson.start && now <= lesson.end,
  )

  if (!currentLesson) {
    return (
      <div className='flex items-center gap-3'>
        <div className='size-10 rounded-full flex items-center justify-center shrink-0'>
          <Leaf size={32} />
        </div>
        <div>
          <p className='text-sm text-muted-foreground'>Текущая активность</p>
          <h3 className='text-lg font-semibold'>Отдых</h3>
        </div>
      </div>
    )
  }

  const nextLesson = intervals.find((lesson) => now < lesson.start)

  let remaining = ''

  if (currentLesson) {
    remaining = formatRemaining(currentLesson.end.getTime() - now.getTime())
  } else if (nextLesson) {
    remaining = formatRemaining(nextLesson.start.getTime() - now.getTime())
  }

  const subject = timetable[currentDay][currentLesson.index]

  return (
    <div className='flex items-center gap-3'>
      <div className='size-10 rounded-full flex items-center justify-center shrink-0'>
        <Leaf size={32} />
      </div>
      <div>
        <p className='text-sm text-muted-foreground'>Осталось: {remaining}</p>
        <h3 className='text-lg font-semibold'>
          {subject ? subjects[subject].name : 'Окно'}
        </h3>
      </div>
    </div>
  )
}
