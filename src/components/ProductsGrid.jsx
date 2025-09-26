import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';

export const ProductsGrid = () => {
    const products = useStore(state => state.products);
    const fetchProducts = useStore(state => state.fetchProducts);
    const productFilters = useStore(state => state.productFilters);
    const setProductFilters = useStore(state => state.setProductFilters);
    useEffect(() => {
        fetchProducts();
    }, [])
  return (
        <section className = "mb-10">
            <div className = "grid grid-cols-4 gap-x-6 gap-y-6">
                {
                    products?.map(({id,cover_image, name, price}) => 
                        <Link to = {`/products/${id}`} key = {id} >
                            <ProductCard 
                                coverImg = {cover_image} 
                                productName = {name} 
                                price = {price}
                             />
                        </Link>
                       
                    )
                }
            </div>
            
        </section>
  )
}
