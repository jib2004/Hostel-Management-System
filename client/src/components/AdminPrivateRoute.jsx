import { useSelector } from "react-redux"
import { Navigate,useLocation } from "react-router-dom"
import AdminDashboard from "../pages/admin/AdminDashboard"

const AdminPrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user)
    const location = useLocation().pathname
  return (
    currentUser.isAdmin === true && currentUser !== null && location.includes('/admin/') ? <AdminDashboard /> : <Navigate to={"/admin/login"} />
  )
}

export default AdminPrivateRoute