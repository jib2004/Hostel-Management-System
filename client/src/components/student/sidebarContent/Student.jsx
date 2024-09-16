
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
   },[])

  return (
    <div  className='w-screen '>
      <div className={`${currentUser.defaulter ? 'block bg-red-500 py-2 px-4 w-full md:w-[500px] xl:w-full': "hidden"}`}>{currentUser.name} You are a defaulter please sort whatever issue you have before you get blocked</div>

      <div >
      <form className='w-[95vw] md:w-1/2 p-4  rounded-lg  ' onSubmit={handleSubmit}>
        <h1 className='text-3xl   mb-4 font-semibold text-black'>Info</h1>
        <div className='flex justify-center my-6'>
          <img src={`http://localhost:5000/${currentUser.profilePicture}`} alt="" className='size-36 rounded-full object-cover'/>
        </div>
       

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        id="name" 
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        variant="outlined"
        className='w-[100%]'
        
        />
        
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
        id="email" 
        type='email'
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        <div className='mb-3 '>
        <TextField
        onChange={handleInput}
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id="password" 
        type='password' 
        variant="outlined"
        className='w-[100%]'
        />
        </div>

        

        <div className='mb-3 w-[]'>
        <TextField
        onChange={handleInput} 
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
        id="phoneNumber" 
        className=' w-[100%]'

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
