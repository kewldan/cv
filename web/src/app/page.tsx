'use client'

import { openTelegramLink } from '@telegram-apps/sdk'
import { cloudStorage, hapticFeedback } from '@telegram-apps/sdk-react'
import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  differenceInWeeks,
  format,
} from 'date-fns'
import {
  ArrowRight,
  Calendar,
  Crown,
  Sprout,
  TrendingUp,
  Wand2,
} from 'lucide-react'
import { useMemo } from 'react'
import CurrentActivity from '@/app/current-acitivity'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { calculateAverage, useSubjectsData } from '@/features/subjects'
import { useTimetable } from '@/features/timetable'
import { countDays, end, start } from '@/lib/utils'

const weekend = new Date('2026-03-27')

export default function Page() {
  const leftBeforeWeekend = differenceInCalendarDays(weekend, new Date())
  const { subjects: subjectsData, setSubjects } = useSubjectsData()
  const averageGrades = subjectsData
    .filter((item) => item.grades.length > 0)
    .map((item) => calculateAverage(item.grades))
  const avg =
    averageGrades.reduce((p, item) => item + p, 0) / averageGrades.length

  const { timetable } = useTimetable()

  const lessons =
    timetable.flat().reduce((p, c) => p + (c !== null ? 1 : 0), 0) *
    differenceInWeeks(end, start)

  let pastLessons = 0

  for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
    pastLessons +=
      timetable[dayIndex].filter((item) => item !== null).length *
      countDays(start, new Date(), dayIndex + 1)
  }

  const totalMissed = subjectsData.reduce((p, item) => p + item.missed, 0)

  const visited = pastLessons - totalMissed

  const dataForSaving = useMemo(() => {
    return JSON.stringify(
      subjectsData.map((item) => ({
        id: item.id,
        m: item.missed,
        grades: item.grades.map((grade) => ({
          v: grade.value,
          m: grade.multiplier,
          t: grade.timestamp,
        })),
      })),
    )
  }, [subjectsData])

  console.log(dataForSaving)

  return (
    <div className='flex flex-col items-center p-4 gap-3'>
      <div className='flex items-center gap-3 justify-between bg-card border-border w-full p-4 rounded-xl border'>
        <CurrentActivity />
        <div className='text-right'>
          <p className='text-2xl font-bold'>{format(new Date(), 'HH:mm')}</p>
        </div>
      </div>
      <div className='grid grid-cols-2 w-full gap-3'>
        <div className='flex flex-col gap-3 bg-card border-border w-full p-4 rounded-xl border'>
          <div className='flex items-center gap-1 text-xs font-medium'>
            <Calendar size={16} className='text-orange-500' />
            Посещаемость
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-2xl'>
              {((visited / lessons) * 100).toPrecision(3)}%
            </p>
            <Progress
              value={(visited / lessons) * 100}
              indicatorClassName='bg-linear-to-r from-orange-300 opacity-80 to-orange-500 rounded-full'
            />
          </div>
          <p className='text-orange-500 text-xs'>
            {visited}/{lessons} уроков
          </p>
        </div>
        <div className='flex flex-col gap-3 bg-card border-border w-full p-4 rounded-xl border'>
          <div className='flex items-center gap-1 text-xs font-medium'>
            <TrendingUp size={16} className='text-green-500' />
            Средний балл
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-2xl'>{avg.toPrecision(3)}</p>
            <Progress
              value={83}
              indicatorClassName='bg-linear-to-r from-green-300 opacity-80 to-green-500 rounded-full'
            />
          </div>
          <p className='text-green-500 text-xs'>+12% за месяц</p>
        </div>
      </div>
      <div className='flex flex-col gap-3 bg-card border-border w-full p-4 rounded-xl border'>
        <div className='flex items-center gap-1 text-xs font-medium'>
          <Crown size={16} />
          Окончание второго полугодия
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-bold text-2xl'>
            {(
              (differenceInBusinessDays(new Date(), start) /
                differenceInBusinessDays(end, start)) *
              100
            ).toPrecision(2)}
            %
          </p>
          <Progress
            value={27}
            indicatorClassName='bg-linear-to-r from-neutral-100 to-neutral-300 rounded-full'
          />
        </div>
        <p className='text-muted-foreground text-xs'>
          Все по графику. Так держать!
        </p>
      </div>
      <div className='flex gap-3 justify-between items-center bg-card border-border w-full p-4 rounded-xl border'>
        <div className='flex items-center gap-3'>
          <div className='size-10 flex items-center justify-center shrink-0'>
            <Sprout size={32} />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-xs text-muted-foreground'>До весенних каникул</p>
            <p className='text-lg font-semibold'>{leftBeforeWeekend} дней</p>
          </div>
        </div>
        <p className='text-2xl font-bold'>{leftBeforeWeekend}</p>
      </div>
      <div className='flex gap-3 flex-col justify-between bg-card border-border w-full p-4 rounded-xl border opacity-35'>
        <div className='flex items-center gap-3'>
          <div className='size-10 flex items-center justify-center shrink-0'>
            <Wand2 size={32} />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-xs text-muted-foreground'>Совет от ChatGPT</p>
            <p className='text-xs text-ellipsis line-clamp-3 font-medium'>
              Привет! Твой балл по Алгебре сильно упал за последний месяц сильно
              упал (с 4.83 до 3.9), чтобы получить 5 за полугодие, тебе
              необходимо сильно постараться!
            </p>
          </div>
        </div>
        <Button size='sm' className='w-full' variant='secondary'>
          Читать полностью
          <ArrowRight />
        </Button>
      </div>
      <div className='flex flex-col gap-2 justify-between bg-card border-border w-full p-4 rounded-xl border text-xs text-muted-foreground'>
        <div className='flex items-center justify-between'>
          <button
            type='button'
            onClick={() => {
              openTelegramLink('https://t.me/kewldan')
            }}
          >
            by @kwldn with {'<3'}
          </button>
          <div className='flex gap-1'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                cloudStorage
                  .setItem('subjects-storage', dataForSaving)
                  .then(() => {
                    hapticFeedback.impactOccurred('soft')
                  })
                  .catch(() => {
                    hapticFeedback.impactOccurred('heavy')
                  })
              }}
            >
              Экспорт
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                cloudStorage
                  .getItem('subjects-storage')
                  .then((item) => {
                    if (item) {
                      const data = JSON.parse(item)
                      setSubjects(
                        data.map((j: any) => ({
                          id: j.id,
                          missed: j.m,
                          grades: j.grades.map((i: any) => ({
                            value: i.v,
                            multiplier: i.m,
                            timestamp: i.t,
                            id: crypto.randomUUID(),
                          })),
                        })),
                      )
                    }
                  })
                  .then(() => {
                    hapticFeedback.impactOccurred('soft')
                  })
                  .catch(() => {
                    hapticFeedback.impactOccurred('heavy')
                  })
              }}
            >
              Импорт
            </Button>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span>
            {dataForSaving.length}/{4096}
          </span>
          <Progress value={(dataForSaving.length / 4096) * 100} />
        </div>
      </div>
    </div>
  )
}
