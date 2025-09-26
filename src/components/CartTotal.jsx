import React, { useRef } from 'react'
import { OrangeButton } from './atoms/OrangeButton'
import { useStore } from '../store/useStore'
import { Link } from 'react-router-dom';

export const CartTotal = ({className = "", buttonText = "", submitRef}) => {
    const cart = useStore(state => state.cart);
    const closeCart = useStore(state => state.closeCart);
    const total = cart.reduce((total, current) => total + current.total_price ,0);
    const submit = () => {
        if(submitRef.current) submitRef.current.requestSubmit();
    }
  return (
    <div className = {`absolute bottom-7 w-full pr-10 overflow-hidden ${className}`}>
        <div className = "flex justify-between">
            <p className = "text-[#3E424A] text-[16px]">Items subtotal</p>
            <p className = "text-[#3E424A] text-[16px]">$ {total}</p>
        </div>
        <div className = "flex justify-between mt-2">
            <p className = "text-[#3E424A] text-[16px]">Delivery</p>
            <p className = "text-[#3E424A] text-[16px]">$ 5</p>
        </div>
        <div className = "flex justify-between mt-2">
            <p className = "text-[#10151F] font-[500] text-[20px]">Total</p>
            <p className = "text-[#10151F] font-[500] text-[20px]">$ {total + 5}</p>
        </div>
        <Link to = "/checkout" onClick = {buttonText ? submit : closeCart}>
            <OrangeButton className = "mt-12 !rounded-[10px] w-full h-[50px] text-[18px] font-[500]">
                {buttonText ? buttonText : "Go to checkout"}
            </OrangeButton>
        </Link>
    </div>
  )
}
