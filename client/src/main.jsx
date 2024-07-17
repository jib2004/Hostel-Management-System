import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage';
import './index.css'
import Location from './pages/Location';
import axios from 'axios';

import { Provider } from 'react-redux'
import { store,persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'




import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import HallFacilities from './pages/HallFacilities';
import InRoomFaciliities from './pages/InRoomFaciliities';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/students/Register';
import SignIn from './pages/students/SignIn';
import StudentDashBoard from './pages/students/StudentDashBoard';
import RegisterAdmin from './pages/admin/RegisterAdmin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Rooms from './pages/admin/Rooms';
import Attendance from './pages/admin/Attendance';
import Accounts from './pages/admin/Accounts';
import Maintenance from './pages/admin/Maintenance';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminDashboardStudent from './pages/admin/AdminDashboardStudent.jsx';
import StudentInfo from './components/dashboardStudent/studentLD/StudentInfo.jsx';
import DefaulterInfo from './components/dashboardStudent/studentLD/DefaulterInfo.jsx';
import Forgot from './pages/students/Forgot.jsx';
import AdminComplaint from './components/adminDashboardComponents/AdminComplaint.jsx';


axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true


const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>,
    index:true
  },
  {
    path:"/hall-Facilities",
    element:<HallFacilities />
  },
  {
    path:"/In-Room-Facilities",
    element:<InRoomFaciliities />
  },
  {
    path:"/location",
    element:<Location />
  },
  {
    path:"/student/register",
    element:<Register />
  },
  {
    path:"/login",
    element:<SignIn />
  },
  {
    path:"/student/api/forgot-password",
    element:<Forgot />
  },
  {
    path:"/student/dashboard",
    element:(
      <PrivateRoute>
    <StudentDashBoard />
    </PrivateRoute>
  )
  },
  {
    path:"/student/:section",
    element:(
      <PrivateRoute>
    <StudentDashBoard />
    </PrivateRoute>
  )
  },
  {
    path:"/admin/register",
    element:<RegisterAdmin />
  },
  {
    path:"/admin/dashboard",
    element:(
      <AdminPrivateRoute>
    <AdminDashboard />
    </AdminPrivateRoute>
  )
  },
  {
    path:"/admin/dashboard/student",
    element:<AdminDashboardStudent />
  },
  {
    path:"/admin/dashboard/complaint",
    element:<AdminComplaint />
  },
  {
    path:"/admin/dashboard/student/:id",
    element:<StudentInfo/>
  },
  {
    path:"/admin/dashboard/defaulter/:id",
    element:<DefaulterInfo />
  },
  {
    path:"/admin/login",
    element:(
    <AdminLogin />
  )
  },
  {
    path:"/admin/rooms/",
    element:<Rooms />
  }, 
  {
    path:"/admin/rooms/:section",
    element:<Rooms />
  },
  {
    path:"/admin/attendance",
    element:<Attendance />
  }, 
  {
    path:"/admin/accounts",
    element:<Accounts />
  }, 
  {
    path:"/admin/maintenance",
    element:<Maintenance />
  }, 
  {
    path:"*",
    element:<ErrorPage />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
    < RouterProvider router={router} />
    </Provider>
    </PersistGate>


  </React.StrictMode>,
)
