import React from 'react'
import { Link,useLocation } from "react-router-dom";
import { FaCalendar,FaBell,FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux'

const AdminNav = () => {
    const path = useLocation().pathname
    const {currentUser} = useSelector((state) => state.user)

  return (
    <nav className='w-full bg-[#202020] items-center text-white py-10 px-8 pb-0 flex justify-between'>
      <h1 className='flex items-center gap-1'><div className='size-5 rounded-full bg-[#00FFF5]'></div> HMS</h1>


      <ul className='flex gap-6 text-xl text-[#B0B0B0] items-center'>
        <li className={path.includes("/admin/dashboard") && " text-white bg-black border border-b-0 py-4 px-5 border-[#00FFF5] rounded-t-2xl  "}>
            <Link to={'/admin/dashboard'}><span>Dashboard</span> </Link>
        </li>
        <li className={path === "/admin/rooms" && " text-white bg-black border border-b-0 py-4 px-5 border-[#00FFF5] rounded-t-2xl  "}>
            <Link to={'/admin/rooms'}><span>Rooms</span> </Link>
        </li>
        <li className={path === "/admin/attendance" && " text-white bg-black border border-b-0 py-4 px-5 border-[#00FFF5] rounded-t-2xl  "}>
            <Link to={'/admin/attendance'}><span>Attendance</span> </Link>
        </li>
        <li className={path === "/admin/accounts" && " text-white bg-black border border-b-0 py-4 px-5 border-[#00FFF5] rounded-t-2xl  "}>
            <Link to={'/admin/accounts'}><span>Accounts</span> </Link>
        </li>
        <li className={path === "/admin/maintenance" && " text-white bg-black border border-b-0 py-4 px-5 border-[#00FFF5] rounded-t-2xl  "}>
            <Link to={'/admin/maintenance'}><span>Maintenance</span> </Link>
        </li>
      </ul>


      <ul className='flex gap-6 text-3xl items-center'>
        <li className=' size-10 bg-[#2F2F2F] flex items-center justify-center rounded-full p-3 cursor-pointer hover:bg-[#5c5b5b] duration-300' title='Calender'>
           <FaCalendar /> 
        </li>
        <li className=' size-10 bg-[#2F2F2F] text-[#FFE605] flex items-center justify-center rounded-full p-3 cursor-pointer hover:bg-[#5c5b5b] duration-300' title='Notification'>
            <FaBell />
        </li>
        <li className=' size-10 bg-[#2F2F2F] text-[#00FFF5] flex items-center justify-center rounded-full p-3 cursor-pointer hover:bg-[#5c5b5b] duration-300' title={currentUser.name}> 
            <FaUser /> 
        </li>

        <span className='text-lg'>{currentUser.name}</span>

      </ul>
    </nav>
  )
}

export default AdminNav
