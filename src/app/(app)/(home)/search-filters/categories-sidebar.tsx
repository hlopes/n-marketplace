'use client'

import { useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { CustomCategory } from '@/app/(app)/(home)/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: CustomCategory[]
}

type NullableCustomCategories = CustomCategory[] | null

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter()

  const [parentCategories, setParentCategories] =
    useState<NullableCustomCategories>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null)

  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null)
    setParentCategories(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (category: CustomCategory) => {
    if (category?.subcategories?.length > 0) {
      setParentCategories(category.subcategories)
      setSelectedCategory(category)
    } else {
      //   this is a leaf category
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        // this is a main category
        if (category.slug === 'all') {
          router.push('/')
        } else {
          router.push(`/${category.slug}`)
        }
      }

      handleOpenChange(false)
    }
  }

  const backgroundColor = selectedCategory?.color ?? 'white'

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Category</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {parentCategories && (
            <button
              className="flex w-full cursor-pointer items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onClick={() => handleOpenChange(true)}
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category?.subcategories?.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
