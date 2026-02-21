import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function round(num: number, digits: number) {
  return Math.round(num * (10 ^ digits)) / (10 ^ digits)
}

export function mapNumber(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export const requiredGrades: Record<number, number> = {
  1: 6,
  2: 10,
  3: 14,
}

export function countDays(
  startDate: Date,
  endDate: Date,
  index: number,
): number {
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

export const start = new Date('2026-01-12')
export const end = new Date('2026-05-22')
