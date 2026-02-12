import type { SubjectId } from './subjects'

export const subjectsData: {
  id: SubjectId
  grades: {
    multiplier: number
    value: number
  }[]
  missed: number
}[] = [
  {
    id: 'algebra',
    grades: [
      { multiplier: 1.2, value: 4 },
      { multiplier: 0.9, value: 3 },
      { multiplier: 1.5, value: 5 },
    ],
    missed: 2,
  },
  {
    id: 'biology',
    grades: [
      { multiplier: 1.0, value: 5 },
      { multiplier: 1.3, value: 4 },
    ],
    missed: 1,
  },
  {
    id: 'vis',
    grades: [
      { multiplier: 0.8, value: 4 },
      { multiplier: 1.1, value: 3 },
    ],
    missed: 4,
  },
  {
    id: 'geography',
    grades: [
      { multiplier: 1.4, value: 5 },
      { multiplier: 1.0, value: 4 },
    ],
    missed: 0,
  },
  {
    id: 'geometry',
    grades: [
      { multiplier: 1.2, value: 3 },
      { multiplier: 1.6, value: 4 },
      { multiplier: 1.1, value: 5 },
    ],
    missed: 3,
  },
  {
    id: 'foreignLanguage',
    grades: [
      { multiplier: 1.3, value: 5 },
      { multiplier: 0.7, value: 4 },
    ],
    missed: 1,
  },
  {
    id: 'informatics',
    grades: [
      { multiplier: 1.5, value: 5 },
      { multiplier: 1.2, value: 4 },
    ],
    missed: 0,
  },
  {
    id: 'history',
    grades: [
      { multiplier: 1.0, value: 3 },
      { multiplier: 1.4, value: 4 },
      { multiplier: 1.2, value: 5 },
    ],
    missed: 2,
  },
  {
    id: 'literature',
    grades: [
      { multiplier: 1.1, value: 4 },
      { multiplier: 0.9, value: 5 },
    ],
    missed: 1,
  },
  {
    id: 'socialStudies',
    grades: [
      { multiplier: 1.3, value: 3 },
      { multiplier: 1.0, value: 4 },
    ],
    missed: 5,
  },
  {
    id: 'obzr',
    grades: [
      { multiplier: 0.8, value: 5 },
      { multiplier: 1.0, value: 4 },
    ],
    missed: 0,
  },
  {
    id: 'russian',
    grades: [
      { multiplier: 1.4, value: 3 },
      { multiplier: 1.2, value: 4 },
      { multiplier: 1.1, value: 5 },
    ],
    missed: 3,
  },
  {
    id: 'physics',
    grades: [
      { multiplier: 1.6, value: 4 },
      { multiplier: 1.3, value: 5 },
    ],
    missed: 2,
  },
  {
    id: 'pe',
    grades: [
      { multiplier: 0.7, value: 5 },
      { multiplier: 0.9, value: 5 },
    ],
    missed: 1,
  },
  {
    id: 'chemistry',
    grades: [
      { multiplier: 1.5, value: 3 },
      { multiplier: 1.2, value: 4 },
      { multiplier: 1.4, value: 5 },
    ],
    missed: 2,
  },
]
