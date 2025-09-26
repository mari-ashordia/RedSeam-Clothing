import React from 'react'
import { useStore } from '../store/useStore'
import { CartProducts } from './CartProducts';
import { CartTotal } from './CartTotal';
import { startShopping } from '../assets';
import { OrangeButton } from './atoms/OrangeButton';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
    const isCartOpen = useStore(state => state.isCartOpen);
    const closeCart = useStore(state => state.closeCart)
    const cart = useStore(state => state.cart);
  return (
        <div onClick = {() => closeCart()} className = {`${isCartOpen ? "block" : "hidden"} inset-0 fixed bg-black/50`}>
            <div onClick = {(e) => e.stopPropagation()} id = "cart" className = "bg-white absolute top-0 bottom-0 right-0 w-[480px] pl-7 overflow-hidden py-6 overflow-y-scroll">
                <div className = "flex justify-between items-center">
                    <h1 className = "text-[#10151F] font-[500] text-[20px]">Shopping cart ({cart.length})</h1>
                    <p onClick = {() => closeCart()} className = "text-[35px] font-[350] text-[#10151F] cursor-pointer mr-3">&times;</p>
                </div>
                {cart.length > 0 ? <CartProducts /> : (
                    <div className = "mt-26 flex flex-col items-center">
                        <img src = {startShopping} alt = "shopping cart icon" className = "w-[120px]"/>
                        <p className = "text-[#10151F] font-[600] text-[24px] mt-6">Ooops!</p>
                        <p className = "text-[#3E424A] text-[14px] mt-1">You've got nothing in your cart just yet...</p>
                        <Link to = "/" onClick = {closeCart}>
                            <OrangeButton className = "mt-10 w-[200px]">
                                Start Shopping
                            </OrangeButton>
                        </Link>
                    </div>
                )}
                {cart.length > 0 && <CartTotal />}
            </div>
        </div>
  )
}
