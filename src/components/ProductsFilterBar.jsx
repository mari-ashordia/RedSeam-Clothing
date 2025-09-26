import React from 'react'
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { useStore } from '../store/useStore';
import { SortBox } from './SortBox';
import { FilterBox } from './FilterBox';
import { SelectedFiltersList } from './selectedFiltersList';

export const ProductsFilterBar = () => {
    const isSortOpen = useStore(state => state.isSortOpen);
    const toggleSort = useStore(state => state.toggleSort);
    const isFilterOpen = useStore(state => state.isFilterOpen);
    const toggleFilter = useStore(state => state.toggleFilter);
    const productMetaData = useStore(state => state.productMetaData);
    const closeSort = useStore(state => state.closeSort);
    const closeFilter = useStore(state => state.closeFilter);
    const sort = useStore(state => state.sort);
    const priceFrom = useStore(state => state["filter[price_from]"]);
    const priceTo = useStore(state => state["filter[price_to]"]);

  return (
    <div>
        <div className = "flex flex-col gap-2 relative">
        <div className = "flex justify-between items-center mb-5">
            <h1 className = "text-[#10151F] text-[42px] font-[600]">Products</h1>
            <div className = "flex items-center gap-8">
                <div className = "text-[#3E424A] text-[12px]">
                    <p>Showing {productMetaData.from}-{productMetaData.to} of {productMetaData.total} results</p>
                </div>
                <p className = "text-[#E1DFE1]">|</p>
                <div className = "flex gap-6">
                    <div onClick = {() => {toggleFilter(); closeSort()}} className = "flex gap-2 cursor-pointer">
                        <HiOutlineAdjustmentsHorizontal size = {25}/>
                        <p className = "text-[#10151F]">Filter</p>
                    </div>
                    <div onClick = {() => {toggleSort(); closeFilter()}} className = "flex gap-2 items-center cursor-pointer">
                        <p className = "#10151F">Sort by</p>
                        <IoIosArrowDown />
                    </div>
                </div>
            </div>
        </div>
        {
            isSortOpen && <SortBox />
        }
        {
            isFilterOpen && <FilterBox />
        }
        </div>
        {(sort || priceFrom || priceTo) && <SelectedFiltersList />}
    </div>
    
  )
}
