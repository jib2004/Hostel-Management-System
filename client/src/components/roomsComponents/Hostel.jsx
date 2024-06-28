import {useState,useEffect} from 'react'
import axios from 'axios'

const Hostel = () => {
  const [hostel,setHostel] = useState([])
  const [student,setStudent] = useState([])

  useEffect(()=>{
    const fetchHostel =async ()=>{
      const response = await axios.get("http://localhost:5000/admin/hostels")
      setHostel(response.data)
    }

    fetchHostel()
  },[])
  return (
    <div className='text-white basis-[80%]'>
      <div className=''>
        <input type="search" name="" id=""  placeholder='search...' className='px-2 py-4 w-[400px] bg-[#141414]'/>
      </div>
      <div className='flex gap-3 mt-3'>
        <div className='bg-[#141414] p-4 text-md'> 
          Total Hostel: {hostel?.length}    
              </div>

        <button className='bg-[#00868D] px-3 hover:bg-[#0d5d61] active:bg-[#00868D] duration-300'>
          + Add Hostel
        </button>
      </div>

      <div>
        {
          hostel?.map(hostels=>(
            <div key={hostels._id}>
              <div>
              <h3>{hostels.name}</h3>
              <span>Plan: {hostels.plan}</span>
              </div>

              <div>
                <div>
                  <div>
                    <ul>
                      <li>
                        <span>Total Rooms</span>
                        <h3>{hostels.capacity * hostels.numOfFloors * hostels.roomsPerFloor}</h3>
                        </li>
                      <li>
                      <span>Occupied</span>
                      <h3>52</h3>
                      </li>
                      <li>
                      <span>Floors</span>
                      <h3>{ hostels.numOfFloors }</h3>
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
