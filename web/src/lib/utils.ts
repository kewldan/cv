import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function round(num: number, digits: number) {
  return Math.round(num * (10 ^ digits)) / (10 ^ digits)
}
