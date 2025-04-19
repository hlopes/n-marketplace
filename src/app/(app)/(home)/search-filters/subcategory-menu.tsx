import Link from 'next/link'

import { CustomCategory } from '@/app/(app)/(home)/types'
import { Category } from '@/payload-types'

type Props = {
  category: CustomCategory
  isOpen: boolean
  position: { top: number; left: number }
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null
  }

  const backgroundColor = category.color ?? '#f5f5f5'

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      {/* invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="shadown-[4px_4px_0px_0px_rgba(0,0,0,1)] w-60 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border text-black"
      >
        <div>
          {category.subcategories?.map((subCategory: Category) => (
            <Link
              key={subCategory.slug}
              href="/"
              className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
            >
              {subCategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
