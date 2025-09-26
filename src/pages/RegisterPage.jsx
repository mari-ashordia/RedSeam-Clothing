import {photo} from "../assets"
import { Input } from "../components/atoms/Input"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { OrangeButton } from "../components/atoms/OrangeButton";
import { useRef, useState } from "react";
import { useInput } from "../utils/customHooks/useInput";
import { axiosInstance } from "../utils/helperFunctions/axiosInstance";
import { FaCamera } from "react-icons/fa";
import { useStore } from "../store/useStore";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {

  const setToken = useStore(state => state.setToken);
  const setUser = useStore(state => state.setUser);
  const fetchCart = useStore(state => state.fetchCart);

  const [visible, setVisible] = useState({
    password: false,
    password_confirmation: false
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const {value, setValue, handleChange} = useInput({
    avatar: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  })
  const [validationErrors, setValidationErrors] = useState({});
  const avatarRef = useRef();
  const handleAvatar = (e) => {
    const avatar = e.target.files[0];
    setValue(prev => ({
      ...prev,
      avatar: avatar
    }))
    const avatarPreview = URL.createObjectURL(avatar);
    setAvatarPreview(avatarPreview);
    }

    const handleDeleteAvatar = () => {
      setValue(prev => ({
        ...prev,
        avatar: ""
      }));
      setAvatarPreview("");
    }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", value.username);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("password_confirmation", value.password_confirmation);
    console.log([...formData]);
    if(value.avatar) 
      formData.append("avatar", value.avatar);
    try {
      const {data} = await axiosInstance.post("/register", formData);
      setToken(data.token);
      setUser(data.user);
      fetchCart();
      setValue({
        avatar: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      });
      setValidationErrors({});
      navigate("/");
    }
    catch(err) {
      setValidationErrors(err.response?.data.errors);
      console.log("err: ",err);
      alert("not registered");
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
        <h1 className = "text-[#10151F] font-[600] text-[42px] mb-[25px]">Registration</h1>
        <form className = "flex flex-col w-[400px]" onSubmit = {(e) => handleSubmit(e)}>
          <div className = "relative pb-8">
            <input 
              type = "file" 
              accept = {"image/*"} 
              name = "avatar" 
              className = "hidden"
              onChange = {(e) => handleAvatar(e)} 
              ref = {avatarRef} 
            />
            {avatarPreview ? (
              <div className = {`flex gap-4 ${!validationErrors.avatar && "mb-3"}`} >
                <img src = {avatarPreview} alt = "avatarPreview" className = "w-[100px] h-[100px] rounded-[50%] object-cover"/>
                <button type = "button" onClick = {() => avatarRef.current.click()} className = "text-[#3E424A] text-[14px]">Upload new</button>
                <button type = "button" className = "text-[#3E424A] text-[14px]" onClick = {() => handleDeleteAvatar()}>Remove</button>
              </div>
            ):(
              <div className = {`flex gap-4`} >
                <div className = "relative w-[100px] h-[100px] rounded-[50%] border border-[#c5c5c7] cursor-pointer" onClick = {() => avatarRef.current.click()} >
                    <FaCamera 
                      size = {25} fill = "#3E424A" 
                      className = "absolute top-1/2 left-1/2 -translate-1/2"/>
                </div>
                <button type = "button" onClick = {() => avatarRef.current.click()} className = "text-[#3E424A] text-[14px] mb-3">Upload image</button>
              </div>
          
            )}
             {validationErrors?.avatar && validationErrors.avatar.map(err => <p className = "text-[#FF0000] text-[14px] pl-2 absolute">{err}</p>)}
          </div>
      

          <div className = "relative w-full pb-5">
            <Input placeholder = "Username" value = {value.username} onChange = {handleChange} name = "username" className = {` w-full`}/>
            {value.username === "" && <span className = "text-[#ff0000] absolute bottom-6 left-20">*</span>}
            {validationErrors?.username && validationErrors.username.map(err => <p className = "text-[#FF0000] absolute text-[14px] mb-3 pl-2">{err}</p>)}
          </div>

          <div className = "relative w-full pb-5">
            <Input placeholder = "Email" name = "email" value = {value.email} onChange = {handleChange}  className = {`w-full`}/>
            {value.email === "" && <span className = "text-[#ff0000] absolute bottom-6 left-13">*</span>}
            {validationErrors?.email && validationErrors.email.map(err => <p className = "text-[#FF0000] text-[14px] absolute mb-3 pl-2">{err}</p>)}
          </div>

          <div className = "w-[400px] relative pb-5">
            <Input 
              placeholder = "Password" 
              value = {value.password} 
              onChange = {handleChange} 
              className = {`w-full`}
              type = {visible.password ? "text" : "password"} 
              name = "password"
            />
            {value.password === "" && <span className = "text-[#ff0000] absolute left-19">*</span>}
            {visible.password ? 
              <IoEyeOffOutline onClick = {() => setVisible(prev => ({...prev, password: !prev.password}))} stroke="#0F172A" fill = "#0F172A" className = "relative bottom-[22px] left-[370px] cursor-pointer"/> :
              <MdOutlineRemoveRedEye onClick = {() => setVisible(prev => ({...prev, password: !prev.password}))} stroke="#0F172A" fill = "#0F172A" className = "relative bottom-[22px] left-[370px] cursor-pointer"/>
            }
            {(validationErrors?.password?.length > 0) && 
               <p className = "text-[#FF0000] text-[14px] mb-8 pl-2 absolute -mt-4">{validationErrors.password[0]}</p>}
          </div>

          <div className = "w-[400px] relative -mt-4 pb-5">
            <Input 
              placeholder = "Confirm password" 
              value = {value.password_confirmation} 
              onChange = {handleChange}
              className = {`w-full`} 
              type = {visible.password_confirmation ? "text" : "password"} 
              name = "password_confirmation"
            />
            {value.password_confirmation === "" && <span className = "text-[#ff0000] absolute bottom-10 left-33">*</span>}
            {visible.password_confirmation ? 
              <IoEyeOffOutline onClick = {() => setVisible(prev => ({...prev, password_confirmation: !prev.password_confirmation}))} stroke="#0F172A" fill = "#0F172A" className = "relative bottom-[22px] left-[370px] cursor-pointer"/> :
              <MdOutlineRemoveRedEye onClick = {() => setVisible(prev => ({...prev, password_confirmation: !prev.password_confirmation}))} stroke="#0F172A" fill = "#0F172A" className = "relative bottom-[22px] left-[370px] cursor-pointer"/>
            }
            {(validationErrors?.password?.length > 0) &&
               <p className = "absolute text-[14px] mb-3 pl-2 -mt-4 text-[#FF0000]">{validationErrors.password[0]}</p>}
          </div>

          <OrangeButton type = "submit" className = "mt-[6px]">Register</OrangeButton>

        </form>
        <div className = "flex gap-2 items-baseline justify-center">
          <p className = "text-[#3E424A] text-[14px] mt-[12px] text-center">Already a member?</p>
          <Link to = "/login">
            <button className = "text-[#FF4000] text-[14px] font-[500] cursor-pointer">Log in</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
