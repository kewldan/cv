import {
  Atom,
  BookOpen,
  ChartNoAxesCombined,
  Dna,
  Dumbbell,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  Laptop,
  PenTool,
  Radical,
  Shield,
  Triangle,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'

export type SubjectId =
  | 'algebra'
  | 'biology'
  | 'vis'
  | 'geography'
  | 'geometry'
  | 'foreignLanguage'
  | 'informatics'
  | 'history'
  | 'literature'
  | 'socialStudies'
  | 'obzr'
  | 'russian'
  | 'physics'
  | 'pe'
  | 'chemistry'

export const subjects: Record<
  SubjectId,
  {
    name: string
    icon: ReactNode
  }
> = {
  algebra: { name: 'Алгебра', icon: <Radical /> },
  biology: { name: 'Биология', icon: <Dna /> },
  vis: { name: 'ВиС', icon: <ChartNoAxesCombined /> },
  geography: { name: 'География', icon: <Globe /> },
  geometry: { name: 'Геометрия', icon: <Triangle /> },
  foreignLanguage: { name: 'Иностранный язык', icon: <Languages /> },
  informatics: { name: 'Информатика', icon: <Laptop /> },
  history: { name: 'История', icon: <Landmark /> },
  literature: { name: 'Литература', icon: <BookOpen /> },
  socialStudies: { name: 'Обществознание', icon: <Users /> },
  obzr: { name: 'ОБЗР', icon: <Shield /> },
  russian: { name: 'Русский язык', icon: <PenTool /> },
  physics: { name: 'Физика', icon: <Atom /> },
  pe: { name: 'Физ-ра', icon: <Dumbbell /> },
  chemistry: { name: 'Химия', icon: <FlaskConical /> },
}
