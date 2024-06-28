import {useState,useEffect} from 'react'
import StudentSidebar from '../../components/student/StudentSidebar'
import Student from '../../components/student/sidebarContent/Student'
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from 'react-router-dom';
import StudentRooms from '../../components/student/sidebarContent/StudentRooms';
import Attendance from '../../components/student/sidebarContent/Attendance';
import Complaint from '../../components/student/sidebarContent/Complaint';
import CheckOut from '../../components/student/sidebarContent/CheckOut';
import BlockedStudent from '../../components/student/BlockedStudent';
import {useSelector} from 'react-redux'


const StudentDashBoard = () => {
  const path = useLocation().pathname
  const [sidebar,setSidebar] = useState(false)
  const handleDisplay = () =>{
    setSidebar(!sidebar)
  }
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div>
      {
        currentUser?.isBlocked  ? 
        <BlockedStudent/> 
        :
        (
      <div className='bg-[#F8F2F9] min-h-screen  md:flex relative overflow-x-hidden'>
      <div className="md:hidden text-[25px]" onClick={handleDisplay}><GiHamburgerMenu/></div>
      <StudentSidebar display={sidebar} nodisplay={handleDisplay}/>
      <div className='md:ml-[260px]'>
      {path  === '/student/dashboard' && <Student />}
      {path  === '/student/room' && <StudentRooms />}
      {path  === '/student/attendance' && <Attendance />}
      {path  === '/student/complaint' && <Complaint />}
      {path  === '/student/check-out' && <CheckOut />}
      </div>
    </div>
        )
      }

</div>

    
  )
}

export default StudentDashBoard
