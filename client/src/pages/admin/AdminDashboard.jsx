import { useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";
import AnalyticPage from '../../components/AnalyticPage';

const AdminDashboard = () => {
  const {currentUser} = useSelector((state) => state.user)
  const path = useLocation().pathname
  return (
    <div className='  bg-black'>
        <AdminNav />
        <div className=" mt-2 gap-2 py-2   ">
        <DashboardSidebar />
        <AnalyticPage />
        </div>
    </div>
  )
}

export default AdminDashboard