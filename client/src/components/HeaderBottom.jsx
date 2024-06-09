import { Link,useLocation } from "react-router-dom";

const HeaderBottom = () => {
    const path = useLocation().pathname;
    
    
  return (
    <nav>
        <ul className="flex items-center justify-around bg-[#F1CD52] p-1">
            <li className={` text-white py-2 opacity-80 ${path === '/' && "border-b-4 border-white opacity-100"}`}>
                <Link to={'/'} className="">Home</Link> 
            </li>

            <li className={` text-white py-2 opacity-80 ${path === '/hall-Facilities' && "border-b-4 border-white opacity-100"}`}>
                <Link to={'/hall-Facilities'}>Hall Facilities</Link>
            </li>
            <li className={` text-white py-2 opacity-80 ${path === '/In-Room-Facilities' && "border-b-4 border-white opacity-100"}`}>
                <Link to={'/In-Room-Facilities'}>In-Room Facilities</Link>
            </li>
            <li className={` text-white py-2 opacity-80 ${path === '/location' && "border-b-4 border-white opacity-100"}`}>
                <Link to={"/location"}>Location</Link>
            </li>
            <li className={` text-white py-2 opacity-80 `}>
                <Link to={"/hall-portal"}>Hall Portal</Link>
            </li>
        </ul>
    </nav>
  )
}

export default HeaderBottom