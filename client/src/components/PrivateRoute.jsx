import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
import StudentDashboard from '../pages/students/StudentDashBoard'

const PrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user)
  return (
    currentUser ? <StudentDashboard /> : <Navigate to={"/login"}/>
  )
}

export default PrivateRoute