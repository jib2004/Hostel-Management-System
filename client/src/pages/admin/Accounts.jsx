import AccontSideBar from '../../components/Acoounts/AccontSideBar'
import AccountDashboard from '../../components/Acoounts/AccountDashboard'
import AccountWithdrawalRequest from '../../components/Acoounts/AccountWithdrawalRequest'
import AdminNav from '../../components/AdminNav'
import { useLocation } from 'react-router-dom'

const Accounts = () => {
  const {pathname} = useLocation()
  return (
    <div className=' min-h-screen bg-black'>
        <AdminNav />
        <div className="mt-2 gap-4 py-2 px-4 flex ">
        <AccontSideBar />
        {pathname === '/admin/accounts' && <AccountDashboard />}
        {pathname === '/admin/accounts/withdrawal-requests' && <AccountWithdrawalRequest />}

        </div>
        
    </div>
  )
}

export default Accounts
