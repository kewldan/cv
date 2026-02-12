'use client'

import { GraduationCap, Home, LibraryBig } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const routes: { name: string; icon: ReactNode; href: string }[] = [
  {
    name: 'Расписание',
    icon: <LibraryBig size={16} />,
    href: '/schedule',
  },
  {
    name: 'Главная',
    icon: <Home size={16} />,
    href: '/',
  },
  {
    name: 'Оценки',
    icon: <GraduationCap size={16} />,
    href: '/grades',
  },
]

export default function BottomBar() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-4 rounded-full backdrop-blur-2xl border bg-white/4 border-white/10 p-1 left-3 w-[calc(100vw-1.5rem)] flex gap-2 justify-between'>
      {routes.map((item) => (
        <Link
          href={item.href}
          className={cn(
            'bg-transparent rounded-full text-white/70 flex flex-col gap-0.5 w-full text-[10px] items-center py-1 px-4 font-medium transition-colors',
            pathname === item.href && 'bg-neutral-400/30 text-white',
          )}
          key={item.href}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  )
}
