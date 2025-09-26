import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { colors, shoppingCartWhite } from '../assets';
import { OrangeButton } from '../components/atoms/OrangeButton';

export const ProductDetailsPage = () => {
    const {id} = useParams();
    const selectedProduct = useStore(state => state.selectedProduct);
    const fetchSelectedProduct = useStore(state => state.fetchSelectedProduct);
    const openCart = useStore(state => state.openCart);
    const cart = useStore(state => state.cart);
    const addToCart = useStore(state => state.addToCart);
    const [selectValue, setSelectValue] = useState(1);
    useEffect(() => {
        fetchSelectedProduct(id);
    }, [fetchSelectedProduct])
    const {
        name, 
        description, 
        release_year, 
        cover_image, 
        images, 
        price, 
        available_colors,
        available_sizes,
        brand,
        total_price, 
    } = selectedProduct;

    const user = useStore(state => state.user);
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    
    useEffect(() => {
        if(cover_image) setMainImage(cover_image);
        if(available_colors) setSelectedColor(available_colors[0]);
    }, [cover_image, available_colors])

    const productDetails = {
        quantity: Number(selectValue),
        color: selectedColor,
        size: selectedSize
    }

  return (
    <main className = "mx-24 mt-5 mb-15">
        <p className = "text-[#10151F font-[300] text-[14px] mb-5">listing / products</p>
        <div className = "flex gap-25">
           <div className = "flex gap-8">
                <div className = "flex flex-col gap-3">
                    {
                        images?.map((image, index) => (
                            <img 
                                onClick = {() => {setMainImage(image); setSelectedColor(available_colors[index])}}
                                key = {image} 
                                src = {image} 
                                alt = "product image" 
                                className = "w-[120px] cursor-pointer"
                            />
                        ))
                    }
                </div>
                <div>
                    <img src = {mainImage} alt = "product image" className = "h-[600px]"/>
                </div>
            </div> 
            <div>
                <div className = "mb-[25px]">
                    <p className = "text-[#10151F] mb-[10px] text-[32px] font-[600]">{name}</p>
                    <p className = "text-[#10151F] font-[600] text-[32px]">$ {price}</p>
                </div>
                <div>
                    <p className = "text-[#10151F] mb-3 text-[16px] font-[400]">Color: {selectedColor}</p>
                    <div className = "flex gap-2">
                        {
                            available_colors?.map((col, index) => {
                                const hex = colors[col];
                                if(Array.isArray(hex)){
                                    return (
                                        <div key = {col} className = "flex w-[38px] h-[38px] rounded-[50%] cursor-pointer]">
                                            {
                                                hex.map(color => (
                                                    <div key = {color} style = {{backgroundCOlor: color}}/>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                return (
                                    <div 
                                        key = {col} 
                                        className = {`${selectedColor === col ? "ring-1 ring-offset-2 ring-[#aba4a4]" : "outline-0"} w-[30px]  border border-[#d3c4c4] h-[30px] rounded-[50%] cursor-pointer`} 
                                        style = {{backgroundColor: hex}}
                                        onClick = {() => {
                                            setSelectedColor(col);
                                            setMainImage(images[index]);
                                        }
                                        }
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className = "mt-9">
                    <p className = "text-[#10151F] mb-2.5">Size: {selectedSize}</p>
                    <div className = "flex gap-2">
                        {
                            available_sizes?.map(size => (
                                <div key = {size} onClick = {() => setSelectedSize(size)} className = {`${selectedSize === size ? "border-[#10151F]" : "border-[#E1DFE1]"} border cursor-pointer text-[#10151F] py-[4px] px-[16px] rounded-[10px]`}>
                                    {size}
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
                
                <div className = {`flex flex-col mt-9 w-[70px] ${Object.keys(user).length === 0 && "mb-8"}`}>
                    <p className = "text-[#10151F] text-[16px] mb-2">Quantity</p>
                    <select value = {selectValue} onChange = {(e) => setSelectValue(e.target.value)} className = "border border-[#E1DFE1] py-[4px] px-[16px] rounded-[10px] text-[#10151F] text-[16px]">
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                    </select>
                </div>
                
                {Object.keys(user).length > 0 && (<OrangeButton onClick = {() => {
                        addToCart(id,productDetails);
                        openCart();
                    }} className = "mb-10 mt-12 w-[600px] flex gap-2 justify-center">
                    <img src = {shoppingCartWhite} alt = "shopping cart icon"/>
                    <p className = "text-[18px] font-[500]">Add to cart</p>
                </OrangeButton>)}
                <hr className = "border-[#E1DFE1]"/>
                <div className = "mt-5">
                    <div className = "flex justify-between items-center">
                        <h3 className = "text-[#10151F] font-[500] text-[20px]">Details</h3>
                        <img src = {brand?.image} alt = "brand name" className = "w-[70px]" />
                    </div>
                    <p className = "text-[#3E424A] text-[16px]">Brand: {brand?.name}</p>
                    <p className = "text-[#3E424A] w-[600px] mt-4">{description}</p>
                </div>
            </div>
        </div>
    </main>
  )
}