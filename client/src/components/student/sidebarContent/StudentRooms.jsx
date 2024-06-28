import {useState, useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux'
import { getHostel } from '../../../redux/hostelSlice/hostelSlice'
import axios from 'axios'
import PayStack from '../../PayStack'

const StudentRooms = () => {
const [hostels,setHostels] = useState([])
const [plan,setPlan] = useState()
const [amount,setAmount] = useState(false)
const dispatch =useDispatch()
const spanRef = useRef(null)



useEffect(()=>{
    const fetchHostel = async ()=>{
      const response = await axios.get("http://localhost:5000/student/hostel")
      setHostels(response.data)
    }

    fetchHostel()

},[plan])

const handlePlan = (e) =>{
  const {value} = e.target
  setPlan(hostels.filter(hostel =>(
    hostel.plan === value
  ) ))


}

const handleAmount =async (id)=>{
  const response =await axios.get(`http://localhost:5000/student/hostel/${id}`)
  setAmount(true)
  dispatch(getHostel(response.data))
  
}

  return (
    <div className='overflow-x-hidden'>
      <h1 className=' text-xl font-semibold px-4 py-2 '>Student Rooms (Kindly select a room of your choice)</h1> 

      <div className='flex items-center md:gap-7'>
        <span className='text-xl font-medium px-4 py-2'>Filter :</span>
        <div>
         <span className='text-lg font-semibold mr-2'>Plan :</span>  
          <select name="" id="" onChange={handlePlan} className='px-4 py-2'>
            <option value="" hidden selected disabled>kindly Select a plan</option>
            <option value="Classic" >Classic</option>
            <option value="Premium">Premium</option>
            <option value="Regular">Regular</option>
          </select>
        </div>
      </div>

      <div className='px-4 py-2 flex flex-col gap-3 overflow-x-hidden'>
        {plan !== undefined ? 
        plan?.map(hostel=>(
          <div key={hostel._id} className='bg-[#edc8f7] px-4 py-2'>
           
            <h1 className='text-xl font-semibold'>{hostel.name}</h1>
            <p className='text-gray-500 font-medium text-sm'>{hostel.plan}</p>
            <p className='text-lg font-semibold'>No of Students per room : {hostel.capacity}</p>
            <p className='text-lg font-semibold'>Available Spaces:{ (hostel.capacity * hostel.numOfFloors * hostel.roomsPerFloor) - hostel.selectedSpace}</p>
            <p className='text-lg font-semibold'>&#8358;<span>{hostel.price}</span></p>
            <div className='flex justify-between'>
             <PayStack />
            <button onClick={()=> handleAmount(hostel._id)}  className='bg-[#D945FD] px-4 py-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300'>Pick</button>
            </div>
          </div>
        ))
        : 
        hostels.map(hostel=>(
          <div key={hostel._id} className='bg-[#edc8f7] px-4 py-2'>
           
            <h1 className='text-xl font-semibold'>{hostel.name}</h1>
            <p className='text-gray-500 font-medium text-sm'>{hostel.plan}</p>
            <p className='text-lg font-semibold'>No of Students per room : {hostel.capacity}</p>
            <p className='text-lg font-semibold'>Available Spaces:{ (hostel.capacity * hostel.numOfFloors * hostel.roomsPerFloor) - hostel.selectedSpace}</p>
            <p className='text-lg font-semibold'>&#8358; <span ref={spanRef}>{hostel.price}</span></p>

            <div className='flex justify-between'>
             <PayStack />
            <button onClick={()=> handleAmount(hostel._id)}  className='bg-[#D945FD] px-4 py-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300'>Pick</button>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default StudentRooms
