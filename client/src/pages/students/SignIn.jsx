import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isSignInStart,isSignInSuccess,isSignInFailure } from '../../redux/userSlice/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash } from 'react-icons/fa';

import { Toaster,toast } from 'sonner';

const SignIn = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading,error} = useSelector((state) => state.user)

  const [formData, setFormData] = useState({})


  const handleInput = (e) =>{
    
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
      e.preventDefault()
      dispatch(isSignInStart())
      try{

    const response = await axios.post("http://localhost:5000/api/auth/login", formData)

    const data = response.data

    dispatch(isSignInSuccess(data))

       navigate("/student/dashboard")
      }
      catch(e){
        dispatch(isSignInFailure(e.response.data.message))
        toast.error(e.response.data.message)
      }

  } 



  useEffect(()=>{},[selectedImage])
  return (
    <div className=' min-h-screen  py-16 bg-[hsl(0,0%,49%)]'>
      <form className='w-[90vw] md:w-1/2 p-4 bg-[hsl(0,0%,18%)] rounded-lg mx-auto shadow-2xl' onSubmit={handleSubmit}>
        <h1 className='text-3xl text-white font-light mb-4'>Sign In</h1>
       

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
        id="email" 
        type='email'
        label="Email" 
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        <div className='mb-3 relative'>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },outline:'none'}}
        id="password" 
        label="Password"
        type={showPassword?'text':'password'} 
        variant="outlined"
        className='w-[100%] outline-none !focus:border-b-0'
        />
        <div className='text-[25px] absolute top-4 right-2 text-white' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEye className='cursor-pointer' /> : <FaEyeSlash className='cursor-pointer' />}</div>
        </div>

        

        <div className='flex justify-end my-5'>
        <Button disabled={isLoading} className='bg-[#00868D]' sx={{backgroundColor:"#00868D", color:"white"}} type='submit' >
        {isLoading && <CircularProgress  color="secondary" className='mr-2 size-2'/>}
        Sign In
      </Button>
      </div>


      <div>
        <span className='text-[#B0B0B0]'>Have you never stayed with us ?</span> <Link to={"/student/register"} className='underline text-[#00868D]'>Sign Up</Link>
      </div>

      <div>
        <Link to={'/student/api/email'} className='underline text-[#00868D]'>Forgot Password ?</Link>
      </div>
      </form>


      <Toaster  />      
    </div>
  )
}

export default SignIn
