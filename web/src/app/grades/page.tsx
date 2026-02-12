import { ChevronRight, TrendingDown, Trophy } from 'lucide-react'
import { subjectsData } from '@/app/grades/data'
import { subjects } from '@/app/grades/subjects'
import { Progress } from '@/components/ui/progress'

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
  const averageGrades = subjectsData.map((item) =>
    item.grades.reduce((p, a) => (p + a.value) / 2, item.grades[0]?.value ?? 1),
  )
  const minimalGrade = Math.min(...averageGrades)
  const maxGrade = Math.max(...averageGrades)

  return (
    <div className='flex flex-col p-4 gap-4'>
      <div className='bg-card border-border border rounded-xl p-4 flex justify-between items-center flex-col gap-3'>
        <div className='flex gap-2 w-full items-center justify-between'>
          <div className='flex  flex-col gap-2 '>
            <p className='font-medium'>Средний балл</p>
            <div className='flex gap-2 items-end'>
              <span className='text-3xl font-bold'>4.13</span>
              <div className='text-red-500 flex items-center gap-1 text-xs'>
                <TrendingDown size={16} />
                -0.31 (-4.3%)
              </div>
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
                    item.grades.reduce(
                      (p, a) => (p + a.value) / 2,
                      item.grades[0]?.value ?? 1,
                    ),
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
            <span>{minimalGrade}</span>
            <span>{(maxGrade + minimalGrade) / 2}</span>
            <span>{maxGrade}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {subjectsData.map((item) => (
          <div
            key={item.id}
            className='p-4 bg-card border-border border relative rounded-xl flex items-center gap-3'
          >
            <div className='border-border bg-neutral-800 rounded-lg p-2'>
              {subjects[item.id].icon}
            </div>
            <div className='w-full flex flex-col gap-1'>
              <p className='font-medium'>{subjects[item.id].name}</p>
              <Progress value={60} />
              <p className='text-xs text-muted-foreground'>
                {item.missed} прогулов • {item.grades.length} оценок
              </p>
            </div>
            <p className='text-2xl font-semibold'>
              {item.grades
                .reduce((p, a) => (p + a.value) / 2, item.grades[0]?.value ?? 1)
                .toFixed(2)}
            </p>
            <ChevronRight size={16} className='shrink-0' />
          </div>
        ))}
      </div>
    </div>
  )
}
