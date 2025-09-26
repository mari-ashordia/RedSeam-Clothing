import React from 'react'

export const OrangeButton = ({className = "", children, ...props}) => {
  return (
    <button className = {`bg-[#FF4000] cursor-pointer px-[20px] py-[10px] rounded-[20px] text-white text-[14px] ${className}`} {...props}>
      {children}
    </button>
  )
}
