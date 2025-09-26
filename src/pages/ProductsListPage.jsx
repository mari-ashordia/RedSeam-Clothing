import { ProductsFilterBar } from '../components/ProductsFilterBar'
import { ProductsGrid } from '../components/ProductsGrid'
import { Pagination } from '../components/Pagination'

export const ProductsListPage = () => {

  return (
    <main className = "mx-24 mt-8">
        <ProductsFilterBar />
        <ProductsGrid />
        <Pagination />
    </main>
  )
}
