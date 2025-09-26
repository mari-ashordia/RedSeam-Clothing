import React from 'react'
import { Input } from './atoms/Input'
import { OrangeButton } from './atoms/OrangeButton'
import { useInput } from '../utils/customHooks/useInput'
import { useStore } from '../store/useStore'

export const FilterBox = () => {
    const {
        value, 
        setValue, 
        handleChange
    } = useInput({from: null, to: null});

    const priceFrom = useStore(state => state["filter[price_from]"]);
    const priceTo = useStore(state => state["filter[price_to]"]);
    const setPriceFrom = useStore(state => state.setPriceFrom);
    const setPriceTo = useStore(state => state.setPriceTo);
    const closeFilter = useStore(state => state.closeFilter);
    const fetchProducts = useStore(state => state.fetchProducts);

    const handleFilter = () => {
        setPriceFrom(value.from);
        setPriceTo(value.to);
        fetchProducts({"filter[price_from]": value.from, "filter[price_to]": value.to});
        closeFilter();
    }

  return (
    <div className = "border border-[#E1DFE1] rounded-[8px] py-[16px] px-3 absolute right-23 top-15 bg-white">
        <h3 className = "text-[#10151F] font-[600] mb-4">Select price</h3>
        <div className = "flex gap-2 mb-3">
            <Input name = "from" placeholder = "From *" value = {value.from} onChange = {handleChange} className = "!border-[#E1DFE1] px-[12px] w-[150px]"/>
            <Input name = "to" placeholder = "To *" value = {value.to} onChange = {handleChange} className = "!border-[#E1DFE1] px-[12px] w-[150px]"/>
        </div>
        <div className = "flex justify-end">
            <OrangeButton onClick = {() => handleFilter()} className = "w-[124px] !rounded-[10px]">
                Apply
            </OrangeButton>
        </div>
    </div>
  )
}
