'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { type SubjectId, subjects } from '@/app/grades/subjects'

export type Grade = {
  id: string
  multiplier: number
  value: number
  timestamp: number
}

export type SubjectData = {
  id: SubjectId
  grades: Grade[]
  missed: number
}

type SubjectsStore = {
  subjects: SubjectData[]
  setSubjects: (v: SubjectData[]) => void
}

export function calculateAverage(data: Grade[]): number {
  return data.reduce((p, a) => p + a.value, 0) / data.length
}

export const useSubjectsData = create<SubjectsStore>()(
  persist(
    (set) => ({
      subjects: Object.keys(subjects).map((subject) => ({
        id: subject as SubjectId,
        grades: [],
        missed: 0,
      })),
      setSubjects: (subjects: SubjectData[]) => {
        set((state) => ({ ...state, subjects }))
      },
    }),
    {
      name: 'subjects-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
