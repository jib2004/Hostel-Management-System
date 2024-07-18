import AdminNav from '../../components/AdminNav'
import Assigned from '../../components/roomsComponents/Assigned'
import Furniture from '../../components/roomsComponents/Furniture'
import Hostel from '../../components/roomsComponents/Hostel'
import Occupancy from '../../components/roomsComponents/Occupancy'
import Room from '../../components/roomsComponents/Rooms'
import RoomSideBar from '../../components/roomsComponents/RoomSideBar'
import { useLocation } from 'react-router-dom'

const Rooms = () => {
  const path = useLocation().pathname
  return (
    <div className='bg-black'>
        <AdminNav />
        <div className="mt-2 gap-4 py-2 px-4 ">
        <RoomSideBar />
        {path === "/admin/rooms" && <Occupancy />}
        {path === "/admin/rooms/hostel" && <Hostel />}
        {path === "/admin/rooms/room" && <Room />}
        {path === "/admin/rooms/assigned" && <Assigned />}
        {path === "/admin/rooms/furniture" && <Furniture /> }
        </div>
    </div>
  )
}

export default Rooms