import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { isSignInStart,isSignInSuccess,isSignInFailure } from '../../redux/userSlice/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { FaEye,FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading} = useSelector((state) => state.user)

  const handleInput = (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
      e.preventDefault()
      dispatch(isSignInStart())
      try{
    const response = await axios.post("http://localhost:5000/api/auth/student", formData)
    const data = response
    dispatch(isSignInSuccess(data))
    toast.success("Register Successful")
    navigate("/login")
      }
      catch(e){
        dispatch(isSignInFailure(e.response.data.message))
        toast.error(e.response.data.message)
      }
  }

  useEffect(()=>{
    setFormData({...formData,profilePicture:selectedImage})
  },[selectedImage])

  return (
    <div className=' min-h-screen  py-16 bg-[hsl(0,0%,49%)]'>
      <form className='w-[95vw] md:w-1/2 p-4 bg-[hsl(0,0%,18%)] rounded-lg mx-auto shadow-2xl' onSubmit={handleSubmit}>
        <h1 className='text-3xl text-white font-light mb-4'>Add Student</h1>
        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
         
        id="name" 
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        variant="outlined"
        label={"Name Of Student"}
        className='w-[100%]'
        />
        
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
        id="email" 
        label="Email" 
        type='email'
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        <div className='mb-3 relative'>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id="password" 
        label="Password"
        type={showPassword?'text':'password'} 
        variant="outlined"
        className='w-[100%]'
        />
        <div className='text-[25px] absolute top-4 right-2 text-white' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEye className='cursor-pointer' /> : <FaEyeSlash className='cursor-pointer' />}</div>
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id="emergencyContactName" 
        label="Emergency Contact Name"
        type='text' 
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        <div className='mb-3 flex gap-2'>
        <TextField
        onChange={handleInput} 
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id="phoneNumber" 
        label="Phone Number" 
        variant="outlined"
        className='basis-1/2'
        
        />

        <TextField
        onChange={handleInput} 
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id='emergencyPhoneNumber'
        label='Emergency Contact Number'
        variant='outlined'
        className='basis-1/2'
        />
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput} 
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id="address" 
        label="Address Of Student" 
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        <div className='mb-3'>

        <select name="" id='gender' className=' bg-black text-[#B0B0B0] w-full p-2' onChange={handleInput}>
          <option value="" selected disabled hidden>Gender</option>
          <option value="Male" id='gender'>Male</option>
          <option value="Female" id='gender'>Female</option>
        </select>

       
        </div>

        <div className='flex justify-end my-5'>
        <Button disabled={isLoading} className='bg-[#00868D]' sx={{backgroundColor:"#00868D", color:"white"}} type='submit' >
        {isLoading && <CircularProgress  color="secondary" className='mr-2 size-2'/>}
        Register 
      </Button>
      </div>


      <div>
        <span className='text-[#B0B0B0]'>Are you a student already ?</span> <Link to={"/login"} className='underline text-[#00868D]'>Sign In</Link>
      </div>
      </form>


      <Toaster richColors  />
    </div>
  )
}

export default Register
