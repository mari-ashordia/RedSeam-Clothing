import React, { useRef } from 'react'
import { CheckoutForm } from '../components/CheckoutForm'
import { CartProducts } from '../components/CartProducts'
import {CartTotal} from "../components/CartTotal"
import { useStore } from '../store/useStore'

export const CheckoutPage = () => {
    const submitRef = useRef();
    const cart = useStore(state => state.cart);
  return (
    <main className = "mx-24 mt-5 mb-0">
      <h1 className = "text-[#10151F] text-[42px] font-[600] mb-[25px]">Checkout</h1>
      <div className = "flex gap-20">
          <CheckoutForm submitRef={submitRef}/>
        <div className = "relative -top-11" >
          <CartProducts className = "!h-[300px]"/>
          {cart.length > 0 && <CartTotal submitRef={submitRef} buttonText = "Pay" className = "!w-[500px] relative top-8 left-6"/>}
        </div>
      </div>
    </main>
  )
}

