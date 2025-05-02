'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'

import type { CustomCategory } from '@/app/(app)/(home)/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { SubcategoryMenu } from './subcategory-menu'
import { useDropdownPosition } from './use-dropdown-position'

type Props = {
  category: CustomCategory
  isActive?: boolean
  isNavigationHovered?: boolean
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category?.subcategories) {
      setIsOpen(true)
    }
  }

  const onMouseLeave = () => {
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    if (category?.subcategories?.length > 0) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          onClick={toggleDropdown}
          variant="elevated"
          className={cn(
            'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white',
            isActive && !isNavigationHovered && 'border-primary bg-white',
            isOpen && 'border-primary bg-white',
          )}
        >
          <Link
            prefetch
            href={`/${category.slug === 'all' ? '' : category.slug}`}
          >
            {category.name}
          </Link>
        </Button>
        {category?.subcategories?.length > 0 ? (
          <div
            className={cn(
              'absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-black border-l-transparent opacity-0',
              isOpen && 'opacity-100',
            )}
          ></div>
        ) : null}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={getDropdownPosition()}
      />
    </div>
  )
}
