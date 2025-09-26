import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useStore } from '../store/useStore';
import { Link, useLocation } from 'react-router-dom';
import { HandEye, shoppingCart } from '../assets';
import { IoIosArrowDown } from "react-icons/io";
import { LoadingWrapper } from './atoms/LoadingWrapper';

export const Header = () => {
    const user = useStore(state => state.user);
    const clearUser = useStore(state => state.clearUser);
    const openCart = useStore(state => state.openCart);
    const [logOutVisible, setLogOutVisible] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setLogOutVisible(false);
    }, [location])
  return (
    <header className = "flex justify-between py-[20px] px-[100px] items-center">
        <Link to = "/">
            <div className = "flex gap-1 items-center cursor-pointer">
                <img src = {HandEye} alt = "RedSeam logo"/>
                <h2 className = "text-[#10151F] text-[16px] font-[600]">RedSeam Clothing</h2>
            </div>
        </Link>
        <div className = "flex gap-1">
            {Object.keys(user).length > 0 ? 
                (<div>
                   <div className = "flex gap-5 items-center">
                        <img onClick = {() => openCart()} src = {shoppingCart} alt = "shopping-cart icon" className = "cursor-pointer w-[24px] h-[24px]"/>
                        <div className = "flex gap-1 items-center cursor-pointer" onClick = {() => setLogOutVisible(prev => !prev)}>
                            {user?.avatar ? 
                                <img src = {user.avatar} className = "w-[36px] h-[36px] object-cover object-top rounded-[50%]" alt = "user avatar"/> :
                                <FaUser fill = "#10151F" size = {18}/>
                            }
                            <IoIosArrowDown />
                        </div>
                    </div> 
                    {
                        logOutVisible && 
                            <button 
                                className = "absolute right-25 bg-[#FF4000] px-3 py-1 mt-2 cursor-pointer text-white rounded-[10px]" 
                                onClick = {() => {
                                    clearUser();
                                    setLogOutVisible(false);
                                }}
                            >
                                Log out
                            </button>
                    }
                </div>)
                
                 : 
                (<Link to = "/login">
                    <div className = "flex gap-1">
                        <FaUser fill = "#10151F" size = {18}/>
                        <button className = "text-[#10151F] font-[500] text-[12px] flex items-center cursor-pointer">Log in</button>
                    </div>
                    
                </Link>)}
        </div>
    </header>
  )
}
