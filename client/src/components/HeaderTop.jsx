import logo from '../assets/WhatsApp_Image_2024-05-26_at_18.20.44-removebg-preview.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderBottom from './HeaderBottom';
import { useState } from 'react';

const HeaderTop = () => {
  const navigate = useNavigate();
  const [display,setDisplay] = useState(false)

  const handleMenudisplay = () =>{
    setDisplay(!display)
  }
  return (
    <>
    <div className="flex items-center justify-between p-2">
    <div>
        <img className="w-32 h-32" src={logo} alt="" />
    </div>

    <div className='flex items-center gap-4'>
    <Button onClick={()=> navigate("/login")} variant="outlined" color='success'>Login</Button>
    <GiHamburgerMenu onClick={handleMenudisplay} className=' text-[2rem] md:hidden' />
    </div>
    
    
 

    </div>
    <HeaderBottom  menu={display} menuDisplay={handleMenudisplay}/>
    </>
  )
}

export default HeaderTop