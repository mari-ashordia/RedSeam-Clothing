import React from 'react'

export const ProductCard = ({coverImg, productName, price}) => {
  return (
    <div className = "flex flex-col cursor-pointer">
        <img src = {coverImg} alt = "product image" className = "w-[412px] border border-[#c5c5c5] rounded-[10px]"/>
        <p className = "text-[#10151F] font-[500] text-[18px] mt-">{productName}</p>
        <p className = "text-[#10151F] font-[500] text-[16px]">${price}</p>
    </div>
  )
}
