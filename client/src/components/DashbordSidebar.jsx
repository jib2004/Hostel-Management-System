import React from 'react'
import { Link , useLocation} from 'react-router-dom'
import { FiBarChart2 } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { FaComment,FaRegUser } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { GiHotMeal } from "react-icons/gi";

const DashbordSidebar = () => {
    const path = useLocation().pathname
  return (
    <div className='bg-[#202020] text-[#B0B0B0] text-lg basis-[15%] rounded-xl'>
        <ul>
            <li className={`py-3 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/dashboard" && 'bg-[#2E2E2E] text-white'}`}>
                <Link to={'/admin/dashboard'}><span className={` inline-block ${path === "/admin/dashboard" && 'text-[#00FFF5]' }`}><FiBarChart2 /></span> Analytics </Link>
            </li>
            <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/dashboard/student" && 'bg-[#2E2E2E] text-white'}`}>
                <Link to={"/admin/dashboard/student"}><span className={` inline-block ${path === "/admin/dashboard/student" && 'text-[#00FFF5]' }`}><PiStudent /></span> Students</Link>
            </li>
            <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/dashboard/complaint" && 'bg-[#2E2E2E] text-white'}`}>
                <Link to={"/admin/dashboard/complaint"}><span className={` inline-block ${path === "/admin/dashboard/complaint" && 'text-[#00FFF5]' }`}><FaComment /></span> Complaints</Link>
            </li>
            <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/dashboard/stock" && 'bg-[#2E2E2E] text-white'}`}>
                <Link to={"/admin/dashboard/stock"}><span className={` inline-block ${path === "/admin/dashboard/stock" && 'text-[#00FFF5]' }`}><AiOutlineStock /></span> Stock</Link>
            </li>
            <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/dashboard/users" && 'bg-[#2E2E2E] text-white'}`}>
                <Link to={"/admin/dashboard/users"}><span className={` inline-block ${path === "/admin/dashboard/users" && 'text-[#00FFF5]' }`}><FaRegUser /></span> Users</Link>
            </li>
            <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${path === "/admin/dashboard/meals" && 'bg-[#2E2E2E] text-white'}`}>
                <Link to={"/admin/dashboard/meals"}><span className={` inline-block ${path === "/admin/dashboard/meals" && 'text-[#00FFF5]' }`}><GiHotMeal /></span> Meals</Link>
            </li>
        </ul>
    </div>
  )
}

export default DashbordSidebar