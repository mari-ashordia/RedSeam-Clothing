import React from 'react'
import { CartProductCard } from './CartProductCard'
import { useStore } from '../store/useStore'

export const CartProducts = ({className = ""}) => {
    const cart = useStore(state => state.cart)
  return (
    <div className = {`flex flex-col mt-6 gap-1 h-[400px] pr-5 w-full overflow-y-auto ${className}`}>
        {
            cart?.map(product => (
                <CartProductCard key = {product.id} product = {product} />
            ))
        }
    </div>
  )
}
