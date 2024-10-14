
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner'
import { useSelector } from 'react-redux'
//import { isSignInStart,isSignInSuccess,isSignInFailure } from '../../redux/userSlice/userSlice';
import CircularProgress from '@mui/material/CircularProgress';

const Student = () => {
   const {currentUser} = useSelector(state=>state.user)
   const [formData, setFormData] = useState({})
   const {isLoading} = useSelector((state) => state.user)
   const [selectedImage, setSelectedImage] = useState(null);
   const [getUserInfo,setUserInfo] = useState({})
 
   const handleInput = (e) =>{
     setFormData({...formData,[e.target.id]: e.target.value})
   }

    const handleImageChange = async(e) =>{
      e.preventDefault()
        try {
          const formData = new FormData()
          formData.append('profile', selectedImage)
        await axios.put(`http://localhost:5000/student/upload-image/${currentUser._id}`,formData)
     
        } catch (error) {
          console.log(error)
        }
   };
 
   const handleSubmit = async (e) =>{
       e.preventDefault()
       
       try{
      await axios.post(`http://localhost:5000/student/${currentUser._id}`, formData)
        toast.success("Update Successful")
      }
       catch(e){
         toast.error(e.response.data.message)
       }
   }
 
   useEffect(()=>{
     setFormData({...setFormData})
     const fetchUser = async() =>{
      try {
        const data = await axios.get(`http://localhost:5000/student/${currentUser._id}`)
        setUserInfo(data.data)
      } catch (error) {
        console.log(error)
      }
     }
     fetchUser()
   },[currentUser])

  return (
    <div  className='w-screen '>
      <div className={`${getUserInfo.defaulter ? 'block bg-red-500 py-2 px-4 w-full md:w-[500px] xl:w-full': "hidden"}`}>{getUserInfo.name} You are a defaulter please sort whatever issue you have before you get blocked</div>

      <div >
      <form className='w-[95vw] md:w-1/2 p-4  rounded-lg  ' onSubmit={handleSubmit}>
        <h1 className='text-3xl   mb-4 font-semibold text-black'>Info</h1>
        <div className='flex justify-center my-6'>
          <img src={`http://localhost:5000/${getUserInfo.profilePicture}`} alt="" className='size-36 rounded-full object-cover'/>
        </div>
       

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        placeholder={getUserInfo.name}
        id="name" 
        sx={{ backgroundColor: 'white' , color:'#fff !important', '& > :not(style)': { color: '#0000000' },}}
        variant="outlined"
        className='w-[100%]'
        
        />
        
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'white' , color:'#fff !important', '& > :not(style)': { color: '#0000000' },}} 
        id="email" 
        placeholder={getUserInfo.email}
        type='email'
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'white' , color:'#fff !important', '& > :not(style)': { color: '#0000000' },}}
        id="password" 
        type='password' 
        placeholder={'Password'}
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        

        <div className='mb-3 w-[]'>
        <TextField
        onChange={handleInput} 
        sx={{ backgroundColor: 'white' , color:'#fff !important', '& > :not(style)': { color: '#0000000' },}}
        id="phoneNumber" 
        className=' w-[100%]'
        placeholder={getUserInfo.phoneNumber}

        />
        </div>


        <div className='mb-3 '> 
        <input id='profilePicture' type="file" name='profile'  accept="image/*" onChange={(e)=>setSelectedImage(e.target.files[0])} />
        <Button onClick={handleImageChange} sx={{backgroundColor:"#00868D", color:"white"}}>Upload</Button>
        </div>

        <div className='flex justify-end my-5'>
        <Button disabled={isLoading} className='bg-[#00868D]' sx={{backgroundColor:"#00868D", color:"white"}} type='submit' >
        {isLoading && <CircularProgress  color="secondary" className='mr-2 size-2'/>}
        Update
      </Button>
      </div>


      
      </form>


      <Toaster   />
      </div>
    </div>
  )
}

export default Student
