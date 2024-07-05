import { Link,useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const HeaderBottom = ({menuDisplay,menu}) => {
    const path = useLocation().pathname;
    
    
  return (
    <nav>
        <ul className={`flex flex-col fixed right-0 top-0 w-[90vw] transition-transform   ${menu ? ' translate-x-0':'translate-x-[900px]'} md:translate-x-0 md:w-auto h-screen md:h-auto md:static md:flex-row md:items-center md:justify-around bg-[#F1CD52] p-1`}>
            <li className="flex justify-end md:hidden py-2 px-4">
                <AiOutlineClose className=" text-[1.5rem] text-white " onClick={menuDisplay}/>
            </li>

            <li className={` text-white py-2 opacity-80 px-4 md:px-0 ${path === '/' && " bg-[#b88d00] md:bg-transparent md:border-b-4 border-white opacity-100"}`}>
                <Link onClick={menuDisplay} to={'/'} className="">Home</Link> 
            </li>

            <li className={` text-white py-2 opacity-80 px-4 md:px-0 ${path === '/hall-Facilities' && "bg-[#b88d00] md:bg-transparent md:border-b-4 border-white opacity-100"}`}>
                <Link onClick={menuDisplay} to={'/hall-Facilities'}>Hall Facilities</Link>
            </li>
            <li className={` text-white py-2 opacity-80 px-4 md:px-0 ${path === '/In-Room-Facilities' && "bg-[#b88d00] md:bg-transparent md:border-b-4 border-white opacity-100"}`}>
                <Link onClick={menuDisplay} to={'/In-Room-Facilities'}>In-Room Facilities</Link>
            </li>
            <li className={` text-white py-2 opacity-80 px-4 md:px-0 ${path === '/location' && "bg-[#b88d00] md:bg-transparent md:border-b-4 border-white opacity-100"}`}>
                <Link onClick={menuDisplay} to={"/location"}>Location</Link>
            </li>
            <li className={` text-white py-2 opacity-80 px-4 md:px-0 `}>
                <Link onClick={menuDisplay} to={"/hall-portal"}>Hall Portal</Link>
            </li>
        </ul>
    </nav>
  )
}

export default HeaderBottom