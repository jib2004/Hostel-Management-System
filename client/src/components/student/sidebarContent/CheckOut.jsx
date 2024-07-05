import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { isSignInSuccess } from "../../../redux/userSlice/userSlice"
import { toast,Toaster } from 'sonner';
import CheckOutFilled from "../CheckOutFilled"

const CheckOut = () => {

  const {currentUser} = useSelector(state => state.user)
  const [day , setDay] = useState(null)

  const [checkOut,setCheckOut] = useState({
    name:currentUser.name,
    hostel:currentUser.hostelName
  })
  const [maxCharacter,setMaxCharacter] = useState(0)
  const [student,setStudent] = useState({})
  const date = new Date()
  const dayName = date.toLocaleString('default', { weekday: 'long' })
 
  const handleChange =(e) =>{
    setCheckOut({...checkOut,[e.target.name]:e.target.value})
  }

  const handleMaxCharacters = (e) =>{
    setMaxCharacter(e.target.value.length)
    setCheckOut({...checkOut,[e.target.name]:e.target.value})
  }

  const handleSubmit= async(e)=>{
    
    try {
      const response = axios.post(`http://localhost:5000/student/checkOut/${currentUser._id}`,checkOut)
      toast.success("Submitted successfully")
    } catch (error) {
      console.log(error)
    }
    
}

  useEffect(()=>{
    if(dayName === "Monday"|| dayName === "Tuesday" || dayName === "Wednesday" ){
      setDay(true)
    }else{
      setDay(false)
    }
    const getCheckOut = async() =>{
      try {
          const response = await axios.get(`http://localhost:5000/student/${currentUser._id}`)
          setStudent(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getCheckOut()

  },[])
 
  


  return (
    <>
    {student.isCheckOut && <CheckOutFilled />}
     {
      currentUser.isPaid ? 
      (<div className={`${student.isCheckOut ? 'hidden':'block'}`} >
      {
        day ?(
        <form  onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-semibold md:text-4xl">Check-Out Form</h1>
          <p className="text-[13px]  font-semibold px-4 py-2 ">
            Kindly Note if you are traveling fill the form on or before Wednesday or the form will be closed thank you for underStanding
          </p>

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
            <input type="text" onChange={handleChange}  name="room" id="room" className=' py-2 px-4'  />
          </div>

          <div className="px-4 py-2 flex flex-col md:flx-row gap-7">
            <div>
            <label htmlFor="DateOfLeave" className='block text-lg font-semibold mb-3'>Date Of Leave:</label>
            <input type="date" name="dateOfLeave" onChange={handleChange} id="" className=' py-2 px-4'  />
            </div>

            <div>
              <label htmlFor="DateOfArrival" className='block text-lg font-semibold mb-3'>Date Of Arrival:</label>
              <input type="date" name="dateOfArrival" onChange={handleChange} id="" className=' py-2 px-4'  />
            </div>
          </div>

          <div className="px-4 py-2 relative ">
            <label htmlFor="reasonForLeave" className='block text-lg font-semibold mb-3'>Kindly State Your reason for the leave :</label>
            <textarea name="reasonForLeave" id="" maxLength={250} minLength={0} onChange={handleMaxCharacters} cols="30" rows="10" className="w-full resize-none py-2 px-4 focus:outline-none">
            
            </textarea>
            <span className="absolute bottom-4 right-7 z-30 text-gray-500 ">{`${maxCharacter}/250`}</span>
          </div>
  



          <button type="submit" className="bg-[#D945FD] px-4 py-2 my-3 text-white ml-4  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300 "  >
              Submit
              </button>
        </form>
        ):
        (
          <div className=" flex h-screen items-center justify-center">
            <p className="text-center font-semibold ">
            Sorry  Today is {dayName} and checkout is closed till Monday and it will end by Wednesday....
            </p>
          </div>
        )
      }
        </div>
      )
      
      :(
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className='text-center text-2xl font-semibold md:text-4xl'>Oops... You have not paid for a room</h1>
          <p className='text-center text-lg font-semibold'>Please pay for a room to access this page </p>

          <Link to={"/student/room"} className="bg-[#D945FD] px-4 py-2 text-white ml-4  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300">
               Click To Pay
            </Link>
        </div>
      )
     }
     <Toaster />
    </>
  )
}

export default CheckOut
