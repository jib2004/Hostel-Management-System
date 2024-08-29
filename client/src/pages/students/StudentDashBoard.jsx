import {useState} from 'react'
import StudentSidebar from '../../components/student/StudentSidebar'
import Student from '../../components/student/sidebarContent/Student'
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from 'react-router-dom';
import StudentRooms from '../../components/student/sidebarContent/StudentRooms';
import Complaint from '../../components/student/sidebarContent/Complaint';
import CheckOut from '../../components/student/sidebarContent/CheckOut';
import BlockedStudent from '../../components/student/BlockedStudent';
import {useSelector} from 'react-redux'
import PickRoom from '../../components/student/sidebarContent/PickRoom';
import Deposit from '../../components/student/sidebarContent/Deposit';



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
      <div className="md:hidden text-[25px] p-2 cursor-pointer w-fit" onClick={handleDisplay}><GiHamburgerMenu/></div>
      <StudentSidebar display={sidebar} nodisplay={handleDisplay}/>
      <div className='md:ml-[370px] md:basis-[70%]'>
      {path  === '/student/dashboard' && <Student />}
      {path  === '/student/room' && <StudentRooms />}
      {path  === '/student/pick' && <PickRoom />}
      {path  === '/student/deposit' && <Deposit />}
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
