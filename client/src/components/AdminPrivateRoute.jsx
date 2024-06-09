import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import AdminDashboard from "../pages/admin/AdminDashboard"

const AdminPrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user)
  return (
    currentUser.isAdmin === true && currentUser !== null ? <AdminDashboard /> : <Navigate to={"/admin/login"} />
  )
}

export default AdminPrivateRoute