import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore';

export const SelectedFiltersList = () => {
    const priceFrom = useStore(state => state["filter[price_from]"]);
    const priceTo = useStore(state => state["filter[price_to]"]);
    const sort = useStore(state => state.sort);
    const fetchProducts = useStore(state => state.fetchProducts);
    
    // useEffect(() => {
    //     if(priceFrom || priceTo)
    //         setIsOpen(prev => ({...prev, filter: true}));
    //     // else setIsOpen(prev => ({...prev, filter: false}));
    // }, [priceFrom, priceTo])

    // useEffect(() => {
    //     if(sort) setIsOpen(prev => ({...prev, sort: true}));
    //     // else setIsOpen(prev => ({...prev, sort: false}));
    // }, [sort])
    const showFilter = Boolean(priceFrom || priceTo);
    const showSort = Boolean(sort);
    console.log("sort: ",showSort, "filter: ",showFilter);

    const rightArrow = "\u2192";
    const sortText = (sort === "price" ? `Price: Low ${rightArrow} High` :
        sort === "-price" ? `Price: High ${rightArrow} Low` : 
        "Newest first"
    );

    const removeFilter = (option) => {
        if(option === "filter") {
            useStore.setState({"filter[price_from]": null, "filter[price_to]": null});
            fetchProducts();
        }
        if(option === "sort") {
            useStore.setState({sort: ""});
            fetchProducts();
        }
            

    }


    return (
    <div className = "flex gap-2 mb-5">
        {
           showFilter && (
                <div className = "flex gap-2 border border-[#E1DFE1] rounded-[50px] py-[8px] pr-[10px] pl-[16px]">
                    <p className = "text-[#3E424A] text-[14px]">Price: {priceFrom}-{priceTo}</p>
                    <button onClick = {() => removeFilter("filter")} className = "text-[#3E424A] w-[12px] p-1 h-[12px] relative bottom-[6px] cursor-pointer ">&times;</button>
                </div>
           )
        }
        {
            showSort && (
                <div className = "flex gap-2 border border-[#E1DFE1] rounded-[50px] py-[8px] pr-[10px] pl-[16px]">
                    <p className = "text-[#3E424A] text-[14px]">{sortText}</p>
                    <button onClick = {() => removeFilter("sort")} className = "text-[#3E424A] w-[12px] p-1 h-[12px] relative bottom-[6px] cursor-pointer ">&times;</button>
                </div>
            )
        }
    </div>
    )
}
