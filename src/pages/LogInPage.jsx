import { Input } from "../components/atoms/Input"
import {photo} from "../assets"
import { useInput } from "../utils/customHooks/useInput"
import { OrangeButton } from "../components/atoms/OrangeButton";
import { axiosInstance } from "../utils/helperFunctions/axiosInstance";
import { useState } from "react";
import { useStore } from "../store/useStore";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

export const LogInPage = () => {
  const setToken = useStore(state => state.setToken);
  const setUser = useStore(state => state.setUser);
  const fetchCart = useStore(state => state.fetchCart);
  const {value, setValue, handleChange} = useInput({
    email: "",
    password: ""
  });

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState(null);
  const [authenticated, setAuthenticated] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors(null);
    setAuthenticated("");
    try {
      const {data} = await axiosInstance.post("/login", value);
      setAuthenticated("Authenticated.");
      setToken(data.token);
      setUser(data.user);
      fetchCart();
      setValue({
        email: "",
        password: ""
      });
      navigate("/");

    }
    catch(err) {
      Object.keys(err.response.data).includes("errors") ?
          setValidationErrors(err.response.data.errors) :
          setAuthenticated(err.response.data.message);
    }
  }

  return (
    <main className = "flex gap-7">
      <div>
        <img 
          src = {photo} 
          alt = "RedSeam Photo" 
          className = "w-[50vw] h-[calc(100vh-65px)] object-cover object-top overflow-y-hidden"
        />
      </div>
      <div className = "mx-auto mt-[10vh]">
        <h1 className = "text-[#10151F] font-[600] text-[42px] mb-[25px]">Log in</h1>
        <form className = "flex flex-col w-[400px]" onSubmit = {(e) => handleSubmit(e)}>
          <div className = "relative">
            <Input 
              placeholder = "Email" 
              name = "email" 
              value = {value.email} 
              onChange = {handleChange}
              className = "w-full"
            />
          {value.email === "" && <span className = "text-[#ff0000] absolute bottom-1 left-[50px]">*</span>}
          </div>
          {validationErrors?.email && <p className = "text-[#FF0000] text-[14px] pl-2">{validationErrors.email[0]}</p>}
          <div className = "w-full relative">
            <Input 
              placeholder = "Password"
              name = "password"
              type = {`${isVisible ? "text" : "password"}`}
              value = {value.password}
              onChange = {handleChange}
              className = "mt-4 w-full"
            />
            {value.password === "" && <span className = "text-[#ff0000] absolute bottom-1 left-[75px]">*</span>}
            {
              isVisible ? <IoEyeOffOutline onClick = {() => setIsVisible(false)} className = "absolute bottom-[5px] right-3 cursor-pointer"/> :
                <MdOutlineRemoveRedEye onClick = {() => setIsVisible(true)} className = "absolute bottom-[5px] right-3 cursor-pointer"/>
            }
          </div>
          {validationErrors?.password && <p className = "text-[#FF0000] text-[14px] pl-2">{validationErrors.password[0]}</p>}

          {authenticated === "Unauthenticated." && <p className = "text-[#FF0000] text-[16px] mt-2.5 pl-2">{authenticated}</p>}
          <OrangeButton type = "submit" className = "mt-[34px]">Log in</OrangeButton>
        </form>
        <div className = "flex gap-2 justify-center mt-2 items-baseline">
          <p className = "text-[#3E424A] text-[14px] mt-[12px] text-center">Not a member?</p>
          <Link to = "/register">
            <button className = "text-[#FF4000] text-[14px] font-[500] cursor-pointer">Register</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
