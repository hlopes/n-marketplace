import { getPayload } from 'payload'

import { Category } from '@/payload-types'
import configPromise from '@payload-config'

import { Footer } from './footer'
import { Navbar } from './navbar'
import { SearchFilters } from './search-filters'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 1, // populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: 'name',
  })

  const formattedData = data.docs.map((category) => ({
    ...category,
    subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
      // because depth 1 will be Category
      ...(subcategory as Category),
      subcategories: undefined,
    })),
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchFilters data={formattedData} />
      <main className="flex-grow bg-[#f4f4f0]">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
