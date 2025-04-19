import { Category } from './payload-types'

export type FormattedCategory = {
  id: string
  name: string
  slug: string
  subcategories: {
    subcategories: undefined
    id: string
    name: string
    slug: string
    color?: string | null
    parent?: (string | null) | Category
    updatedAt: string
    createdAt: string
  }[]
  createdAt: string
  updatedAt: string
  color?: string | null
}
