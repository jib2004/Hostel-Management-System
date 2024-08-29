import {useState,useEffect} from 'react'
import axios from 'axios'
import bed from '../../assets/material-symbols_bed-outline-rounded.png'
import { FaPen } from "react-icons/fa6";

const Room = () => {
  const [hostel,setHostel] = useState([])


  useEffect(()=>{
    const fetchHostel =async ()=>{
      const response = await axios.get("http://localhost:5000/admin/hostels")
      setHostel(response.data)
    }

    fetchHostel()
  },[])

  return (
    <div className='text-white ml-[260px] relative h-[570px] overflow-x-hidden overflow-y-auto'>
    
    <div className=''>
    <div className=''>
      <input type="search" name="" id=""  placeholder='search...' className='px-2 py-4 w-[400px] bg-[#141414]'/>
    </div>
    <div className='flex gap-3 mt-3'>
      <div className='bg-[#141414] p-4 text-md'> 
        Total Rooms : {hostel.map(h=>(
          h.numOfFloors  * h.roomsPerFloor
        )).reduce((a,c)=> a + c,0) }    
            </div>

      <button  className='bg-[#00868D] w-[190px] h-[62px] px-3 hover:bg-[#0d5d61] active:bg-[#00868D] duration-300'>
        + Add Room
      </button>
    </div>
    </div>

    <div className="flex gap-4 my-4">
      <div className='w-[212px] flex flex-col justify-around px-4 h-[122px] rounded-xl bg-[#141414]'>
        <p className='text-[18px] font-light'>Occupied</p>
        <p className='text-[#00FFF5] font-semibold text-[32px]'>{hostel.map(h=> h.selectedSpace).reduce((a,c)=> a + c,0)}</p>
      </div>
      <div className='w-[212px] flex flex-col justify-around px-4 h-[122px] rounded-xl bg-[#141414]'>
        <p className='text-[18px] font-light'>Vacant</p>
        <p className='text-[#FFE605] font-semibold text-[32px]'>{hostel.map(h=>(h.numOfFloors * h.roomsPerFloor) - h.selectedSpace).reduce((a,c)=> a + c,0)}</p>
      </div>
      <div className='w-[212px] flex flex-col justify-around px-4 h-[122px] rounded-xl bg-[#141414]'>
        <p className='text-[18px] font-light'>Types</p>
        <p className=' font-semibold text-[32px]'>3</p>
      </div>
      <div className='w-[212px] flex flex-col justify-around px-4 h-[122px] rounded-xl bg-[#141414]'>
        <p className='text-[18px] font-light'>Tenants</p>
        <p className=' font-semibold text-[32px]'>{hostel.map(h=> h.selectedSpace).reduce((a,c)=> a + c,0)}</p>
      </div>

    </div>

    <div className='flex flex-col gap-4 mt-2  px-4'>
      {
        hostel?.map(hostels=>(
          <div className='bg-[#202020] px-4 py-2 rounded-md' key={hostels._id}>
            <div className='mb-4'>
            <div className='flex items-center gap-5'>
            <h3 className=' text-2xl font-semibold flex items-center gap-2'><img src={bed} alt="" />{hostels.name}</h3>
            <button className='w-[84px] h-[34px] bg-[#3e3e3e] hover:bg-transparent hover:border duration-200 flex items-center justify-center gap-2'><FaPen/> Edit</button>
            </div>
            <p className='text-[#a7a7a7] text-sm'> {hostels.description}</p>
            </div>

            <div>
              <div className='flex'>
                <div>
                  <ul className='grid grid-cols-2 gap-2'>
                    
                    <li className='px-4 py-2 bg-[#111111] w-[226px] h-[77px] rounded-[10px]'>
                      <p className='text-[16px] drop-shadow-md'>Total Rooms</p>
                      <p className='text-[24px]'>{hostels.capacity * hostels.numOfFloors * hostels.roomsPerFloor}</p>
                      </li>
                      
                    <li className='px-4 py-2 bg-[#111111] w-[226px] h-[77px] rounded-[10px]'>
                    <p className='text-[16px] drop-shadow-md'>Tenants</p>
                    <p className='text-[24px]'>{hostels.selectedSpace}</p>
                    </li>

                    <li className='px-4 py-2 bg-[#111111] w-[226px] h-[77px] rounded-[10px]'>
                    <p className='text-[16px] drop-shadow-md'>Rent Per Tenant </p>
                    <p className='text-[24px]'>₦ { hostels.price.toLocaleString() }</p>
                    </li>

                    <li className='px-4 py-2 bg-[#111111] w-[226px] h-[77px] rounded-[10px]'>
                    <p className='text-[16px] drop-shadow-md'>Floors </p>
                    <p className='text-[24px]'>{ hostels.numOfFloors }</p>
                    </li>
                  </ul>
                </div>
                <div></div>
                <div></div>
              </div>

              <div></div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default Room
