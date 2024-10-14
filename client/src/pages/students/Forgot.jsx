import {useState,useEffect} from 'react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import axios from 'axios'
import { toast,Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Forgot = () => {
  const email =localStorage.getItem('email')
    const [otp,setOTP] = useState('')
    const [isDisabled,setDisabled] = useState(false)
    const navigate = useNavigate('')

    const handleOtp = async (e) =>{
      e.preventDefault()
      setDisabled(true)
      try {
        await axios.put('http://localhost:5000/api/auth/verify-otp',{email,otp})
        toast.success("OTP verified")
        navigate('/student/api/change-password')
        setTimeout(() => {
          setDisabled(false) 
       }, 30000);
       

      } catch (error) {
        setDisabled(false)
        toast(error.response.data)
      }
    }
    useEffect(()=>{},[isDisabled])
  return (
    <div className=' h-screen flex items-center justify-center bg-[hsl(0,0%,49%)] '>
      <div className='bg-[hsl(0,0%,18%)] p-5 flex flex-col gap-6 w-[450px]'>

        <h2 className='text-3xl font-semibold text-white'>Kindly enter the OTP</h2>
        <div>
      <PinInput onChange={(e)=>{setOTP(e)}}>

    <PinInputField w='65px'  h='50px' size='lg' padding={'10px'} borderStartRadius={'10px'} border={"1px solid grey"} />
    <PinInputField w='65px'  h='50px' size='lg' padding={'10px'} border={"1px solid grey"}/>
    <PinInputField w='65px'  h='50px' size='lg' padding={'10px'} border={"1px solid grey"}/>
    <PinInputField w='65px'  h='50px' size='lg' padding={'10px'} border={"1px solid grey"}/>
    <PinInputField w='65px'  h='50px' size='lg' padding={'10px'} border={"1px solid grey"}/>
    <PinInputField w='65px'  h='50px' size='lg' padding={'10px'} borderEndRadius={"10px"} border={"1px solid grey"}/>

  </PinInput>
  </div>
  <button onClick={handleOtp} type='submit' className='bg-[#00868D] text-white p-3 rounded-lg hover:bg-[#33a0a5] active:bg-[#00868D] duration-150 disabled:bg-[#19666a]' disabled={isDisabled}>Enter OTP</button>
  </div>

  <Toaster />
  </div>
  )
}

export default Forgot