import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";
import Student from '../../components/dashboardStudent/Student';

const AdminDashboardStudent = () => {
  return (
    <div className='w-screen h-screen bg-black'>
    <AdminNav />
    <div className="flex mt-2 gap-4 h-[85%] py-2 px-4 ">
    <DashboardSidebar />
    <Student />
    </div>
</div>    
  )
}

export default AdminDashboardStudent