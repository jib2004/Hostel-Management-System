import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";
import Student from '../../components/dashboardStudent/Student';


const AdminDashboardStudent = () => {
 
  return (
    <div className=' min-h-screen bg-black'>
    <AdminNav />
    <div className=" mt-2 gap-2 py-2  ">
    <DashboardSidebar />
     <Student />
    

    </div>
</div>    
  )
}

export default AdminDashboardStudent