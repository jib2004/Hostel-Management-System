import React from 'react'
import { Link , useLocation} from 'react-router-dom'

const DashbordSidebar = () => {
    const path = useLocation().pathname
  return (
    <div className='bg-[#202020] text-[#B0B0B0] text-xl'>
        <ul>
            <li >
                <Link to={'/admin/dashboard'}>Analytics</Link>
            </li>
            <li>
                <Link>Students</Link>
            </li>
            <li>
                <Link>Complaints</Link>
            </li>
            <li>
                <Link>Stock</Link>
            </li>
            <li>
                <Link>Users</Link>
            </li>
            <li>
                <Link>Meals</Link>
            </li>
        </ul>
    </div>
  )
}

export default DashbordSidebar