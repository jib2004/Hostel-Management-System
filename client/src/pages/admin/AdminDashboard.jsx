import { useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";

const AdminDashboard = () => {
  const {currentUser} = useSelector((state) => state.student)
  const path = useLocation().pathname
  return (
    <div className='w-screen min-h-screen bg-black'>
        <AdminNav />
        <div className="flex mt-2">
        <DashboardSidebar />
        <div>

        </div>
        </div>
    </div>
  )
}

export default AdminDashboard