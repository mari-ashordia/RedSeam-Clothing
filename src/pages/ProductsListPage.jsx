import React from 'react'
import { ProductsFilterBar } from '../components/ProductsFilterBar'
import { ProductsGrid } from '../components/ProductsGrid'
import { Pagination } from '../components/Pagination'
import { LoadingWrapper } from '../components/atoms/LoadingWrapper'
import { useStore } from '../store/useStore'

export const ProductsListPage = () => {
  const loading = useStore(state => state.loading);

  return (
    <main className = "mx-24 mt-8">
        <ProductsFilterBar />
        {/* <LoadingWrapper loading = {loading}>
          <> */}
            <ProductsGrid />
            <Pagination />
          {/* </>
        </LoadingWrapper> */}
        
    </main>
  )
}
