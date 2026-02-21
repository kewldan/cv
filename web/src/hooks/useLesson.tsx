'use client'

import { differenceInWeeks } from 'date-fns'
import type { SubjectId } from '@/app/grades/subjects'
import { useSubjectsData } from '@/features/subjects'
import { useTimetable } from '@/features/timetable'
import { countDays, end, requiredGrades, start } from '@/lib/utils'

export default function useLesson(subjectId: SubjectId): {
  visits: number
  requiredVisits: number
  requiredGrades: number
  grades: number
  lessonsInWeek: number[]
  totalLessonsInWeek: number
  pastLessons: number
} {
  const { subjects } = useSubjectsData()
  const item = subjects.find((j) => j.id === subjectId)

  if (!item) throw new Error('Failed to find subject')

  const { timetable } = useTimetable()
  const lessonsWeek = timetable.map(
    (day) => day.filter((j) => j === subjectId).length,
  )
  const lessonWeekTotal = lessonsWeek.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  )

  const requiredGrade = requiredGrades[Math.min(lessonWeekTotal, 3)]
  const requiredVisits = Math.ceil(
    differenceInWeeks(end, start) * lessonWeekTotal * 0.4,
  )

  let pastLessons = 0

  for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
    pastLessons +=
      lessonsWeek[dayIndex] * countDays(start, new Date(), dayIndex + 1)
  }

  const visits = pastLessons - item.missed

  return {
    visits,
    requiredVisits,
    requiredGrades: requiredGrade,
    lessonsInWeek: lessonsWeek,
    totalLessonsInWeek: lessonWeekTotal,
    grades: item.grades.length,
    pastLessons,
  }
}
