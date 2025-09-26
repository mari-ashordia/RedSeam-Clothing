import { check } from '../assets'
import { OrangeButton } from './atoms/OrangeButton'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom';

export const CongratsModal = () => {
  const closeCongrats = useStore(state => state.closeCongrats);
  const navigate = useNavigate();

  return (
    <div className = "fixed inset-0 bg-black/50" onClick = {closeCongrats}>
      <div className = "bg-white absolute top-20 bottom-20 left-90 right-90" onClick = {(e) => e.stopPropagation()}>
        <div className = "absolute right-6">
          <button onClick = {closeCongrats} className = "text-[40px] cursor-pointer text-[#3E424A] font-[500]">&times;</button>
        </div>
        <div className = "relative left-[50%] top-[50%] -translate-[50%] flex flex-col justify-center items-center">
          <img src = {check} alt = "checkmark" className = "w-[76px] mb-10"/>
          <p className = "text-[#10151F] font-[600] text-[42px] mb-3">Congrats!</p>
          <p className = "text-[14px] text-[#3E424A] mb-15">Your order is placed successfully!</p>
          <OrangeButton className = "!rounded-[10px] !w-[200px]" onClick = {() => {closeCongrats(); navigate("/");}}>
            Continue shopping
          </OrangeButton>
        </div>
      </div>
        
    </div>
  )
}
