import React from 'react'

export const Input = ({placeholder, onChange, value, name, type = "text", className = ""}) => {
  return (
    <input 
        className = {`rounded-[8px] bg-white border-[1px] border-[#E1DFE1] px-[12px] py-[3px] text-[#3E424A] text-[14px] ${className}`}
        placeholder={placeholder}
        onChange = {onChange}
        value = {value}
        name = {name}
        type = {type}
    />
  )
}
