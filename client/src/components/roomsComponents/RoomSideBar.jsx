import { Link , useLocation} from 'react-router-dom'
import { FiBarChart2 } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { FaComment,FaRegUser } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";

const RoomSideBar = () => {
  const path = useLocation().pathname
  return (
    <div className='bg-[#202020] text-[#B0B0B0] text-lg  w-[250px] h-[450px] rounded-xl fixed '>
    <ul>
        {/* <li className={`py-3 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/rooms" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={'/admin/rooms'}><span className={` inline-block ${path === "/admin/rooms" && 'text-[#00FFF5]' }`}><FiBarChart2 /></span> Occupancy </Link>
        </li> */}
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/rooms/hostel" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/rooms/hostel"}><span className={` inline-block ${path === "/admin/rooms/hostel" && 'text-[#00FFF5]' }`}><PiStudent /></span> Hostels</Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/rooms/room" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/rooms/room"}><span className={` inline-block ${path === "/admin/rooms/room" && 'text-[#00FFF5]' }`}><FaComment /></span> Rooms</Link>
        </li>
        {/* <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/rooms/assigned" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/rooms/assigned"}><span className={` inline-block ${path === "/admin/rooms/assigned" && 'text-[#00FFF5]' }`}><AiOutlineStock /></span> Assigned</Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/rooms/furniture" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/rooms/furniture"}><span className={` inline-block ${path === "/admin/rooms/furniture" && 'text-[#00FFF5]' }`}><FaRegUser /></span> Furniture</Link>
        </li> */}
     
    </ul>
</div>
  )
}

export default RoomSideBar
