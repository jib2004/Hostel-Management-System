import {useState,useEffect} from 'react'
import axios from 'axios'
import AddHOstel from './AddHOstel'

const Hostel = () => {
  const [hostel,setHostel] = useState([])
  const [diplayForm,setDisplayForm] = useState(false)

  useEffect(()=>{
    const fetchHostel =async ()=>{
      const response = await axios.get("http://localhost:5000/admin/hostels")
      setHostel(response.data)
    }

    fetchHostel()
  },[])

  const handleMenu = ()=>{
    setDisplayForm(!diplayForm)
  }
  return (
    <div className='text-white ml-[260px] relative'>
      {diplayForm && <AddHOstel close={handleMenu} />}
      <div className=''>
        <input type="search" name="" id=""  placeholder='search...' className='px-2 py-4 w-[400px] bg-[#141414]'/>
      </div>
      <div className='flex gap-3 mt-3'>
        <div className='bg-[#141414] p-4 text-md'> 
          Total Hostel: {hostel?.length}    
              </div>

        <button onClick={handleMenu} className='bg-[#00868D] px-3 hover:bg-[#0d5d61] active:bg-[#00868D] duration-300'>
          + Add Hostel
        </button>
      </div>

      <div className='flex flex-col gap-4 mt-2 '>
        {
          hostel?.map(hostels=>(
            <div className='bg-[#202020] px-4 py-2 rounded-md' key={hostels._id}>
              <div>
              <h3 className=' text-2xl font-semibold'>{hostels.name}</h3>
              <span>Plan: {hostels.plan}</span>
              </div>

              <div>
                <div>
                  <div>
                    <ul>
                      <li>
                        <span>Total Rooms: {hostels.capacity * hostels.numOfFloors * hostels.roomsPerFloor}</span>
                        </li>
                      <li>
                      <span>Occupied: {hostels.selectedSpace}</span>
                      </li>
                      <li>
                      <span>Floors: { hostels.numOfFloors }</span>
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

export default Hostel
