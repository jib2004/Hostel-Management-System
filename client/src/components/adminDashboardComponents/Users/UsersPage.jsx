import AdminNav from '../../../components/AdminNav'
import DashboardSidebar from "../../../components/DashbordSidebar";
import AllUsers from './AllUsers';
const UsersPage = () => {
  return (
    <div className='  bg-black h-screen '>
    <AdminNav />
    <div className=" mt-2 gap-2 py-2   ">
    <DashboardSidebar />
    <AllUsers />
    </div>
</div>
  )
}

export default UsersPage