import { AiOutlineClose } from "react-icons/ai";
import { useLocation,Link} from "react-router-dom";
import LogOut from "../../pages/students/LogOut";



const StudentSidebar = ({display,nodisplay}) => {
  

    const handleClick = () => {
        nodisplay(false);
      };
      const path = useLocation().pathname
  
  return (
    <div className={` flex flex-col justify-between fixed top-0 -translate-x-[364px] bg-[#D97DEF] h-screen w-[260px] md:w-auto md:!block md:translate-x-0 transition-transform z-30 ${display && " !translate-x-0"} `}>
    
    <ul className="">
        <li className=" flex justify-end  py-2 px-4 text-[20px] md:hidden cursor-pointer" ><AiOutlineClose onClick={handleClick}/></li>
        <li className={`py-2 px-4 text-[20px] font-medium md:text-[40px] ${path  === '/student/dashboard' &&  "text-[#707DA2]"}`}><Link to={"/student/dashboard"} onClick={handleClick}>profile</Link> </li>
        <li className={`py-2 px-4 text-[20px] font-medium md:text-[40px] ${path  === '/student/room' &&  "text-[#707DA2]"}`}><Link to={'/student/room'} onClick={handleClick}>Rooms</Link></li>
        <li className={`py-2 px-4 text-[20px] font-medium md:text-[40px] ${path  === '/student/pick' &&  "text-[#707DA2]"}`}><Link to={'/student/pick'} onClick={handleClick}>Pick A Room</Link></li>
        <li className={`py-2 px-4 text-[20px] font-medium md:text-[40px] ${path  === '/student/deposit' &&  "text-[#707DA2]"}`}><Link to={'/student/deposit'} onClick={handleClick}>Deposit And Pay</Link></li>
        <li className={`py-2 px-4 text-[20px] font-medium md:text-[40px] ${path  === '/student/complaint' &&  "text-[#707DA2]"}`}><Link to={'/student/complaint'} onClick={handleClick}>Complaint</Link> </li>
        <li className={`py-2 px-4 text-[20px] font-medium md:text-[40px] ${path  === '/student/check-out' &&  "text-[#707DA2]"}`}><Link to={'/student/check-out'} onClick={handleClick}>Check-Out</Link> </li>
    </ul>

    <LogOut />
    </div>
  )
}

export default StudentSidebar
