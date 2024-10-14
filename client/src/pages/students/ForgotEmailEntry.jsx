import axios from 'axios';
import {useState,useEffect} from 'react'
import { toast,Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';


const ForgotEmailEntry = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [isDisabled,setDisabled] = useState(false)

    const hadleOtp = async(e)=>{
        e.preventDefault()
        setDisabled(true)
        try {
            await axios.put('http://localhost:5000/api/auth/forgot-password',{email})
            toast.success('OTP sent to your email')
            navigate('/student/api/forgot-password')
            localStorage.setItem('email',email)
            setTimeout(() => {
               setDisabled(false) 
            }, 30000);
            
        } catch (error) {
            setDisabled(false)
            toast.error(error.response.data)

        }
    } 

    useEffect(()=>{

    },[isDisabled])
  return (
    <div className=' flex justify-center items-center h-screen bg-[hsl(0,0%,49%)]'>
        <form onSubmit={hadleOtp} className='bg-[hsl(0,0%,18%)] p-5 flex flex-col gap-6'>
            <h1 className='text-white font-semibold text-4xl'>Kindly enter your Email</h1>
        <div>
        <input type="email" className='border px-4 py-2 w-[450px]' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
        <button type='submit'  className='bg-[#00868D] text-white p-3 rounded-lg hover:bg-[#33a0a5] active:bg-[#00868D] duration-150 disabled:bg-[#19666a]' disabled={isDisabled}>Send OTP</button>

        </div>
        <span className='text-white'>Wait for 30 secs before requesting for another otp</span>
        </form>
        <Toaster />
    </div>
  )
}

export default ForgotEmailEntry