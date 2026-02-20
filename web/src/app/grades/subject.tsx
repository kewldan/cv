import { differenceInWeeks } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { subjects } from '@/app/grades/subjects'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { type SubjectData, useSubjectsData } from '@/features/subjects'
import { useTimetable } from '@/features/timetable'

const requiredGrades: Record<number, number> = {
  1: 6,
  2: 10,
  3: 14,
}

function countDays(startDate: Date, endDate: Date, index: number): number {
  let count = 0
  const current = new Date(startDate.getTime())
  const end = new Date(endDate.getTime())

  current.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  while (current <= end) {
    if (current.getDay() === index) {
      count++
    }

    current.setDate(current.getDate() + 1)
  }

  return count
}

const start = new Date('2026-01-12')
const end = new Date('2026-05-22')

export default function SubjectCard({ item }: { item: SubjectData }) {
  const { setSubjects, subjects: subjectsData } = useSubjectsData()
  const { timetable } = useTimetable()
  const lessonsWeek = timetable.map(
    (day) => day.filter((j) => j === item.id).length,
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

  return (
    <AccordionItem
      value={item.id}
      className='p-4 bg-card border-border border relative rounded-xl'
    >
      <AccordionTrigger className='flex items-center gap-3 p-0'>
        <div className='border-border bg-neutral-800 rounded-lg p-2'>
          {subjects[item.id].icon}
        </div>
        <div className='w-full flex flex-col gap-1'>
          <p className='font-medium'>{subjects[item.id].name}</p>
          <Progress
            value={Math.min(
              (visits / requiredVisits) * 100,
              (item.grades.length / requiredGrade) * 100,
              100,
            )}
          />
          <p className='text-[10px] text-muted-foreground'>
            {visits}/{requiredVisits} посещений • {item.grades.length}/
            {requiredGrade} оценок
          </p>
        </div>
        <p className='text-2xl font-semibold text-nowrap'>
          {item.grades.length > 0
            ? item.grades
                .reduce((p, a) => (p + a.value) / 2, item.grades[0]?.value ?? 1)
                .toFixed(2)
            : 'Н/А'}
        </p>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-muted-foreground'>Оценки</span>
            <div className='flex flex-wrap items-center gap-1'>
              {item.grades.length > 0 ? (
                item.grades.map((grade) => (
                  <button
                    type='button'
                    key={grade.id}
                    className='bg-neutral-800 cursor-pointer outline outline-border flex items-center justify-center rounded-sm text-xs size-8 relative'
                    onClick={() => {
                      setSubjects(
                        subjectsData.map((j) =>
                          j.id === item.id
                            ? {
                                ...j,
                                grades: j.grades.filter(
                                  (k) => k.id !== grade.id,
                                ),
                              }
                            : j,
                        ),
                      )
                    }}
                  >
                    {grade.value}
                    {/*<span className='absolute top-0 right-0.5 origin-top-right text-[9px] text-neutral-300'>*/}
                    {/*  {grade.multiplier}.1*/}
                    {/*</span>*/}
                  </button>
                ))
              ) : (
                <span className='text-center w-full text-muted-foreground text-xs pb-2'>
                  Добавь оценки кнопками ниже
                </span>
              )}
            </div>
            <div className='grid grid-cols-4 gap-1'>
              {new Array(4).fill(0).map((_, i) => (
                <Button
                  key={i}
                  size='icon'
                  variant='outline'
                  className='h-8 w-full flex items-center justify-center shrink-0 cursor-pointer'
                  onClick={() => {
                    setSubjects(
                      subjectsData.map((j) =>
                        j.id === item.id
                          ? {
                              ...j,
                              grades: [
                                ...j.grades,
                                {
                                  multiplier: 1,
                                  value: i + 2,
                                  id: crypto.randomUUID(),
                                  timestamp: Date.now(),
                                },
                              ],
                            }
                          : j,
                      ),
                    )
                  }}
                >
                  {i + 2}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm text-muted-foreground'>Пропуски</span>
            <div className='flex gap-2'>
              <Button
                size='icon'
                variant='outline'
                className='size-8'
                onClick={() => {
                  if (item.missed === 0) return

                  setSubjects(
                    subjectsData.map((j) =>
                      j.id === item.id
                        ? {
                            ...j,
                            missed: j.missed - 1,
                          }
                        : j,
                    ),
                  )
                }}
              >
                <ChevronLeft />
              </Button>
              <div className='bg-neutral-800 outline outline-border flex items-center justify-center rounded-sm text-xs size-8 relative'>
                {item.missed}
              </div>
              <Button
                size='icon'
                className='size-8'
                variant='outline'
                onClick={() => {
                  if (item.missed >= pastLessons) return
                  setSubjects(
                    subjectsData.map((j) =>
                      j.id === item.id
                        ? {
                            ...j,
                            missed: j.missed + 1,
                          }
                        : j,
                    ),
                  )
                }}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
