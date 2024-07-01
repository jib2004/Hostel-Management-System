import { useSelector,useDispatch } from "react-redux"
import { useState,useEffect } from "react"
import { toast,Toaster } from 'sonner';
import { Link } from "react-router-dom";
import axios from "axios";
import { startLoading,stopLoading } from "../../../redux/loadingSlice/loadingSlice";
import CircularProgress from '@mui/material/CircularProgress';
import StudentComplaint from "../../StudentComplaint";


const Complaint = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.user)
  const {isLoading} = useSelector(state => state.loading)
  const [maxCharacter,setMaxCharacter] = useState(0)
  const [complaint,setComplaint] = useState({
    name:currentUser.name,
    hostel:currentUser.hostelName
  })
  const [complaints,setComplaints] = useState({})

  const handleChange =(e) =>{
   setComplaint({...complaint,[e.target.name]:e.target.value})
  } 

  const handleMaxCharacters = (e) =>{
    setMaxCharacter(e.target.value.length)
    setComplaint({...complaint,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) =>{
    
    dispatch(startLoading())
    try {
      const response = await axios.post(`http://localhost:5000/student/complaint/${currentUser._id}`,complaint)
      toast.success('Complaint Successfully Filed')
      setComplaint({...complaint,room:''})
      dispatch(stopLoading())
      console.log(isLoading)
    } catch (error) {
      dispatch(stopLoading())
      console.log(isLoading)
      toast.error('Failed to execute')
      
    }
  }

  useEffect(()=>{
    const getComplaints = async() =>{
      try {
          const response = await axios.get(`http://localhost:5000/student/${currentUser._id}`)
          setComplaints(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getComplaints()
  },[])


 
  return (
    <div className='md:pt-4'>
      <div>{complaints.isComplained && <StudentComplaint />}</div>
      <div className={`${complaints.isComplained ? 'hidden':'block'}`}>
      { complaints.isPaid ? 
      (
        <form onSubmit={handleSubmit}>
          <h1 className='text-center text-2xl font-semibold md:text-4xl'>Complaint Form</h1>
          <div className="px-4 py-2">
            <label htmlFor="name" className='block text-lg font-semibold'>Name:</label>
            <input type="text" name="name" id="name" className='bg-transparent py-2' disabled value={currentUser.name} />
          </div>
  
          <div className="px-4 py-2">
            <label htmlFor="name" className='block text-lg font-semibold'>Hostel:</label>
            <input type="text" name="hostel" id="hostel" className='bg-transparent py-2' disabled value={currentUser.hostelName} />
          </div>
  
          <div className="px-4 py-2 ">
            <label htmlFor="name" className='block text-lg font-semibold mb-3'>Kindly Enter Your Room Number:</label>
            <input type="text" onChange={handleChange} name="room" id="room" className=' py-2 px-4'  />
          </div>
  
          
          <div className="px-4 py-2 ">
            <label htmlFor="service" className='block text-lg font-semibold mb-3'>Whose Services Do you Need:</label>
            <select name="" id="" className=' py-2 px-4' onChange={handleChange}>
              <option value="Services" selected hidden disabled>Services</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Other">Other</option>
              
            </select>
          </div>
  
          <div className="px-4 py-2 relative ">
            <label htmlFor="complaint" className='block text-lg font-semibold mb-3'>Kindly State Your Complaint(Kindly Make It Has Brief As Possible):</label>
            <textarea name="complaint" id="" maxLength={250} minLength={0} onChange={handleMaxCharacters} cols="30" rows="10" className="w-full resize-none py-2 px-4 focus:outline-none">
            
            </textarea>
            <span className="absolute bottom-4 right-7 z-30 text-gray-500 ">{`${maxCharacter}/250`}</span>
          </div>
  
  
            <button type="submit" className="bg-[#D945FD] px-4 py-2 text-white ml-4  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300 "  >
              {/* {isLoading && <CircularProgress/>} Submit */} Submit
              </button>
        </form>
        )
      :(
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className='text-center text-2xl font-semibold md:text-4xl'>Oops... You have not paid for a room</h1>
          <p className='text-center text-lg font-semibold'>Please pay for a room to access this page </p>

          <Link to={"/student/room"} className="bg-[#D945FD] px-4 py-2 text-white ml-4  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300">
               Click To Pay
            </Link>
        </div>
      )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default Complaint
