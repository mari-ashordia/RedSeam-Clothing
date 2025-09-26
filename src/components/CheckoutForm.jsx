import { Input } from "./atoms/Input"
import {useInput} from '../utils/customHooks/useInput'
import { envelope } from "../assets";
import { useRef, useState } from "react";
import { useStore } from "../store/useStore";
import { axiosInstance } from "../utils/helperFunctions/axiosInstance";

export const CheckoutForm = ({submitRef}) => {
    const user = useStore(state => state.user);
    const token = useStore(state => state.token);
    const openCongrats = useStore(state => state.openCongrats);
    const clearCart = useStore(state => state.clearCart);
    const {
        value,
        setValue,
        handleChange
    } = useInput({
        name: "",
        surname: "",
        email: user.email,
        address: "",
        zip_code: ""
    });

    const [validationErrors, setValidationErrors] = useState({});
    const submit = async (e) => {
        e.preventDefault();
        try {
              await axiosInstance.post("/cart/checkout", value, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
              });
              setValue({
                name: "",
                surname: "",
                email: "",
                address: "",
                zip_code: ""
              });
                openCongrats();
                clearCart();
                setValidationErrors(err.response.data.errors);
                // localStorage.
            }
            catch(err) {
              setValidationErrors(err.response.data.errors);
            }
    }
  return (
    <form ref = {submitRef} onSubmit = {(e) => submit(e)} className = "bg-[#F8F6F7] w-[780px] h-[502px] p-[35px] rounded-[16px]">
        <h2 className = "text-[#3E424A] font-[500] text-[22px] mt-[15px] mb-[30px]">Order details</h2>
        <div className = "flex gap-5 mb-[25px]">
            <div>
                <Input 
                    placeholder = "Name" 
                    name = "name" 
                    value = {value.name} 
                    onChange = {handleChange}
                    className ={`w-[277px] h-[42px] ${validationErrors?.name && "border-[#ff0000]"}`}
                />
                {validationErrors?.name && <p className = "text-[#ff0000] text-[14px]">{validationErrors?.name[0]}</p>}
            </div>
            <div>
                <Input 
                    placeholder = "Surname" 
                    name = "surname" 
                    value = {value.surname} 
                    onChange = {handleChange}
                    className ={`w-[277px] h-[42px] ${validationErrors?.surname && "border-[#ff0000]"}`}
                />
                {validationErrors?.surname && <p className = "text-[#ff0000] text-[14px]">{validationErrors?.surname[0]}</p>}
            </div>
        </div>
        <div className = "mb-[25px]">
            <div className = "relative">
                <img src = {envelope} alt = "email icon" className = "w-[20px] absolute top-3 left-2.5"/>
                <Input 
                    placeholder = "Email" 
                    name = "email" 
                    value = {value.email} 
                    onChange = {handleChange}
                    className = {`w-[574px] h-[42px] pl-8 ${validationErrors?.email && "border-[#ff0000]"}`}
                />
                {validationErrors?.email && <p className = "text-[#ff0000] text-[14px]">{validationErrors?.email[0]}</p>}
            </div>
        </div>
        <div className = "flex gap-5">
            <div>
                <Input 
                    placeholder = "Address" 
                    name = "address" 
                    value = {value.address} 
                    onChange = {handleChange}
                    className ={`w-[277px] h-[42px] ${validationErrors?.address && "border-[#ff0000]"}`}
                />
                {validationErrors?.address && <p className = "text-[#ff0000] text-[14px]">{validationErrors?.address[0]}</p>}
            </div>
            <div>
                <Input 
                    placeholder = "Zip code" 
                    name = "zip_code" 
                    value = {value.zip_code} 
                    onChange = {handleChange}
                    className ={`w-[277px] h-[42px] ${validationErrors?.zip_code && "border-[#ff0000]"}`}
                />
                {validationErrors?.zip_code && <p className = "text-[#ff0000] text-[14px]">{validationErrors?.zip_code[0]}</p>}
            </div>
        </div>
    </form>
  )
}
