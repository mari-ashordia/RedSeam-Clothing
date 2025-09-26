import React from 'react'
import { useStore } from '../store/useStore'

export const SortBox = () => {
  const setSort = useStore(state => state.setSort);
  const fetchProducts = useStore(state => state.fetchProducts);
  const sort = useStore(state => state.sort);
  const closeSort = useStore(state => state.closeSort);

  const handleSort = (option) => {
    setSort(option);
    fetchProducts({"sort": option});
    closeSort();
  }

  return (
    <div className = "w-[200px] absolute right-0 bg-white top-15 flex flex-col border border-[#E1DFE1] rounded-[8px] py-[16px]">
        <h3 className = "text-[#10151F] font-[600] px-3 mb-2">Sort By</h3>
        <button onClick = {() => handleSort("created_at")} className = "text-[#10151F] cursor-pointer hover:bg-[#FF4000] hover:text-white p-1 px-3">New products first</button>
        <button onClick = {() => handleSort("price")} className = "text-[#10151F] cursor-pointer hover:bg-[#FF4000] hover:text-white p-1 px-3">Price: low to high</button>
        <button onClick = {() => handleSort("-price")} className = "text-[#10151F] cursor-pointer hover:bg-[#FF4000] hover:text-white p-1 px-3">Price: high to low</button>
    </div>
  )
}
