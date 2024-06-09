import logo from '../assets/WhatsApp_Image_2024-05-26_at_18.20.44-removebg-preview.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const HeaderTop = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-2">
    <div>
        <img className="w-32 h-32" src={logo} alt="" />
    </div>

    <div>
    <Button onClick={()=> navigate("/login")} variant="outlined" color='success'>Login</Button>
    </div>

    </div>
  )
}

export default HeaderTop