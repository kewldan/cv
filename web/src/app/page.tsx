import { differenceInCalendarDays, format } from 'date-fns'
import {
  ArrowRight,
  Calendar,
  Crown,
  Leaf,
  Sprout,
  TrendingDown,
  Wand2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const weekend = new Date(2026, 3, 21)

export default function Page() {
  const leftBeforeWeekend = differenceInCalendarDays(weekend, new Date())

  return (
    <div className='flex flex-col items-center p-4 gap-3'>
      <div className='flex items-center gap-3 justify-between bg-card border-border w-full p-4 rounded-xl border'>
        <div className='flex items-center gap-3'>
          <div className='size-10 rounded-full flex items-center justify-center shrink-0'>
            <Leaf size={32} />
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Текущая активность</p>
            <h3 className='text-lg font-semibold'>Отдых</h3>
          </div>
        </div>
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
            <p className='font-bold text-2xl'>34%</p>
            <Progress
              value={34}
              indicatorClassName='bg-linear-to-r from-orange-300 opacity-80 to-orange-500 rounded-full'
            />
          </div>
          <p className='text-orange-500 text-xs'>48/64 уроков</p>
        </div>
        <div className='flex flex-col gap-3 bg-card border-border w-full p-4 rounded-xl border'>
          <div className='flex items-center gap-1 text-xs font-medium'>
            <TrendingDown size={16} className='text-green-500' />
            Средний балл
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-bold text-2xl'>4.13</p>
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
          <p className='font-bold text-2xl'>27%</p>
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
      <div className='flex gap-3 flex-col justify-between bg-card border-border w-full p-4 rounded-xl border'>
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
    </div>
  )
}
