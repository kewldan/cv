'use client'

import { Trophy } from 'lucide-react'
import SubjectCard from '@/app/grades/subject'
import { Accordion } from '@/components/ui/accordion'
import { calculateAverage, useSubjectsData } from '@/features/subjects'

function mapNumber(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export default function Page() {
  const { subjects: subjectsData } = useSubjectsData()
  const averageGrades = subjectsData
    .filter((item) => item.grades.length > 0)
    .map((item) => calculateAverage(item.grades))
  const minimalGrade = averageGrades.length > 0 ? Math.min(...averageGrades) : 2
  const maxGrade = averageGrades.length > 0 ? Math.max(...averageGrades) : 5

  return (
    <div className='flex flex-col p-4 gap-4'>
      <div className='bg-card border-border border rounded-xl p-4 flex justify-between items-center flex-col gap-3'>
        <div className='flex gap-2 w-full items-center justify-between'>
          <div className='flex  flex-col gap-2 '>
            <p className='font-medium'>Средний балл</p>
            <div className='flex gap-2 items-end'>
              <span className='text-3xl font-bold'>
                {averageGrades.length > 0
                  ? (
                      averageGrades.reduce((p, item) => item + p, 0) /
                      averageGrades.length
                    ).toPrecision(3)
                  : 'Н/А'}
              </span>
              {/*<div className='text-red-500 flex items-center gap-1 text-xs'>*/}
              {/*  <TrendingDown size={16} />*/}
              {/*  -0.31 (-4.3%)*/}
              {/*</div>*/}
            </div>
          </div>
          <div className='p-3 bg-neutral-800 rounded-full flex items-center justify-center'>
            <Trophy size={24} />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <p className='text-sm text-muted-foreground text-left w-full'>
            Распределение баллов
          </p>
          <div className='bg-neutral-800 rounded-full w-full h-3 relative my-2 overflow-hidden'>
            {subjectsData.map((item) => (
              <div
                className='bg-green-500 blur-md absolute rounded-full size-3 top-0 origin-center'
                style={{
                  left: `${mapNumber(
                    calculateAverage(item.grades),
                    minimalGrade,
                    maxGrade,
                    0,
                    100,
                  )}%`,
                }}
                key={item.id}
              />
            ))}
          </div>
          <div className='flex w-full justify-between text-xs text-muted-foreground font-medium'>
            <span>{minimalGrade.toPrecision(3)}</span>
            <span>{((maxGrade + minimalGrade) / 2).toPrecision(3)}</span>
            <span>{maxGrade.toPrecision(3)}</span>
          </div>
        </div>
      </div>
      <Accordion className='flex flex-col gap-2' type='multiple'>
        {subjectsData.map((item) => (
          <SubjectCard item={item} key={item.id} />
        ))}
      </Accordion>
    </div>
  )
}
