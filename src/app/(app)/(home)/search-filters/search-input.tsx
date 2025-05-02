'use client'

import { useState } from 'react'

import { ListFilterIcon, SearchIcon } from 'lucide-react'

import { CategoriesSidebar } from '@/app/(app)/(home)/search-filters/categories-sidebar'
import { CustomCategory } from '@/app/(app)/(home)/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  disabled?: boolean
  data: CustomCategory[]
}

export const SearchInput = ({ disabled, data }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex w-full items-center gap-2">
      <CategoriesSidebar open={isOpen} onOpenChange={setIsOpen} data={data} />
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>
      <Button
        variant="elevated"
        className="flex size-12 shrink-0 lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <ListFilterIcon />
      </Button>

      {/* TODO: add categories view all button */}
      {/* TODO: add library button */}
    </div>
  )
}
