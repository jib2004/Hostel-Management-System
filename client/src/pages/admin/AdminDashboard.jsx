import { useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";
import AnalyticPage from '../../components/AnalyticPage';

const AdminDashboard = () => {
  const {currentUser} = useSelector((state) => state.user)
  const path = useLocation().pathname
  return (
    <div className='w-screen h-screen bg-black'>
        <AdminNav />
        <div className="flex mt-2 gap-4 h-[85%] py-2 px-4 ">
        <DashboardSidebar />
        <AnalyticPage />
        <div>

        </div>
        </div>
    </div>
  )
}

export default AdminDashboard