'use client'

import { create } from 'zustand'
import type { SubjectId } from '@/app/grades/subjects'

type TimetableSubject = SubjectId | null

type TimetableStore = {
  timetable: TimetableSubject[][]
  setTimetable: (v: TimetableSubject[][]) => void
}

export const useTimetable = create<TimetableStore>()((set) => ({
  timetable: [
    [
      null,
      'foreignLanguage',
      'russian',
      'literature',
      'physics',
      'history',
      'vis',
    ],
    [
      'algebra',
      'algebra',
      'chemistry',
      'literature',
      'literature',
      'socialStudies',
      'pe',
    ],
    [
      'informatics',
      'algebra',
      'geometry',
      'physics',
      'foreignLanguage',
      'geography',
      'obzr',
    ],
    [
      'history',
      'socialStudies',
      'russian',
      'biology',
      'geometry',
      'geometry',
      'informatics',
    ],
    [
      'algebra',
      'informatics',
      'informatics',
      'pe',
      'physics',
      'foreignLanguage',
    ],
  ],
  setTimetable: (timetable: TimetableSubject[][]) => {
    set((state) => ({ ...state, timetable }))
  },
}))
