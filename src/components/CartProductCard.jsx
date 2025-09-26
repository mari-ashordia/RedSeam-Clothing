import React from 'react'
import { useStore } from '../store/useStore';

export const CartProductCard = ({product}) => {
    const {
        name,
        price,
        color,
        size,
        cover_image,
        quantity,
        id
    } = product;
    
    const addToCart = useStore(state => state.addToCart);
    const removeFromCart = useStore(state => state.removeFromCart);
    const clearCart = useStore(state => state.clearCart);
    const updateProductQuantity = useStore(state => state.updateProductQuantity);
    const decreaseQuantity = () => {
        if(quantity === 1) removeFromCart(id);
        else updateProductQuantity(id, {quantity: quantity -1});
    }
  return (
    <div className = "flex gap-2 w-full mt-5 items-center">
        <img src = {cover_image} alr = "product image" className = "w-[100px]"/>
        <div className = "w-full">
            <div className = "flex justify-between">
                <p className = "text-[#10151F] text-[14px] font-[500]">{name}</p>
                <p className = "text-[#10151F] font-[500] text-[18px]">$ {price}</p>
            </div>
            <p className = "text-[#3E424A] text-[12px]">{color}</p>
            <p className = "text-[#3E424A] text-[12px] mt-1">{size}</p>
            <div className = "flex justify-between mt-3 items-center">
                <div className = "flex gap-1 w-[70px] justify-center border border-[#E1DFE1]  px-[8px] rounded-[22px] items-center">
                    <button onClick = {() => decreaseQuantity()} className = "cursor-pointer p-1 text-[#3E424A]">-</button>
                    <p className = "text-[12px] text-[#3E424A]">{quantity}</p>
                    <button onClick = {() => updateProductQuantity(id, {quantity: quantity + 1})} className = "cursor-pointer p-1 text-[#3E424A]">+</button>
                </div>
                <p onClick = {() => removeFromCart(id)} className = "text-[#3E424A] text-[12px] cursor-pointer">Remove</p>
            </div>
        </div>
    </div>
  )
}
