import AdminNav from '../../components/AdminNav'
import DashboardSidebar from "../../components/DashbordSidebar";
import ComlaintsAdmin from './ComlaintsAdmin';


const AdminComplaint = () => {
  return (
    <div className=' min-h-screen bg-black'>
    <AdminNav />
    <div className=" mt-2 gap-2 py-2  ">
    <DashboardSidebar />
    <ComlaintsAdmin />
    

    </div>
    </div>
  )
}

export default AdminComplaint