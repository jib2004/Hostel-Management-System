import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import {toast,Toaster} from 'sonner'

const AddHOstel = ({close}) => {
    const [formData, setFormData] = useState({})

    const handleInput = (e) =>{
    
        setFormData({...formData,[e.target.id]: e.target.value})
      }

      const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            await axios.post('http://localhost:5000/admin/hostel',formData)
            toast.success('Hostel Added')
            close()
        
        } catch (error) {
            
            toast.error(error.response.data.message)
        }

      }
  return (
    <form className=' absolute w-1/2 p-4 bg-[hsl(0,0%,18%)] rounded-lg mx-auto shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onSubmit={handleSubmit}>
    <div className='flex justify-between items-center'>
      <h1 className='text-3xl text-white font-semibold mb-4'>ADD HOSTEL</h1>
        <IoMdClose className='text-2xl cursor-pointer' onClick={close} />
      </div>
      <div className='mb-3 '>
      <TextField
      onChange={handleInput}
       
      id="name" 
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      variant="outlined"
      label={"Name "}
      className='w-[100%]'
      />
      
      </div>

      <div className='mb-3 '>
      <TextField
      onChange={handleInput}
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
      id="plan" 
      label="Plan" 
      type='text'
      variant="outlined"
      className='w-[100%]'
      />
      </div>

      <div className='mb-3 '>
      <TextField
      onChange={handleInput}
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      id="numOfFloors" 
      label="Number Of Floors"
      type='number' 
      variant="outlined"
      className='w-[100%]'
      />
      </div>

      <div className='mb-3  gap-2'>
      <TextField
      onChange={handleInput} 
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      id="roomsPerFloor" 
      label="Rooms Per Floor" 
      type='number'
      variant="outlined"
      className='w-full'
      />
      </div>

      <div className='mb-3  gap-2'>
      <TextField
      onChange={handleInput} 
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      id="capacity" 
      type="number"
      label="Capacity" 
      variant="outlined"
      className='w-full'
      />
      </div>

      <div className='mb-3  gap-2'>
      <TextField
      onChange={handleInput} 
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      id="numOfKitchens" 
      type='number'
      label="Number Of Kitchens" 
      variant="outlined"
      className='w-full'
      />
      </div>

      <div className='mb-3  gap-2'>
      <TextField
      onChange={handleInput} 
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      id="price" 
      label="Price" 
      type='number'
      variant="outlined"
      className='w-full'
      />
      </div>

      <div className='mb-3  gap-2'>
      <TextField
      onChange={handleInput} 
      sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}}
      id="description" 
      label="Description" 
      variant="outlined"
      className='w-full'
      />
      </div>

      <div className='flex justify-end my-5'>
      <Button  className='bg-[#00868D]' sx={{backgroundColor:"#00868D", color:"white"}} type='submit' >
   
      Register 
    </Button>
    </div>
    <Toaster position='top-center'/>
    </form>
  )
}

export default AddHOstel