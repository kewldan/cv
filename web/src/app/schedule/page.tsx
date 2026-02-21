'use client'

import { subjects } from '@/app/grades/subjects'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useTimetable } from '@/features/timetable'

const arr: string[] = [
  '9:00 - 9:45',
  '9:55 - 10:40',
  '11:00 - 11:45',
  '12:05 - 12:50',
  '13:10 - 13:55',
  '14:05 - 14:50',
  '15:00 - 15:45',
]

export default function Page() {
  const { timetable } = useTimetable()

  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {timetable.map((day, i) => (
          <CarouselItem key={i} className='flex flex-col items-center w-full'>
            <div className='flex flex-col gap-2 w-full p-4 font-medium'>
              <p className='border backdrop-blur-2xl rounded-full bg-black/40 border-white/10 py-1 select-none px-4 w-full text-center font-bold'>
                {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'][i]}
              </p>
              <div className='flex flex-col gap-2 px-4 w-full text-sm'>
                {day.map((item, j) => (
                  <div
                    key={j}
                    className='border backdrop-blur-2xl rounded-full bg-black/10 border-white/10 text-white/95 py-1 select-none px-4 flex items-center justify-between'
                  >
                    <div>
                      {j + 1}. {item ? subjects[item].name : '-'}
                    </div>
                    <span className='text-white/70 font-medium text-xs'>
                      {arr[j]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
