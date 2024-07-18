import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";
import AnalyticPage from '../../components/AnalyticPage';

const AdminDashboard = () => {

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