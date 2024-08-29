import { Link,useLocation } from "react-router-dom"

const AccontSideBar = () => {
    const {pathname} = useLocation();
  return (
    <div className='bg-[#202020] text-[#B0B0B0] text-lg  top-28 w-[250px] h-[80%] z-30  rounded-xl fixed'>
    <ul>
        <li className={`py-3 px-2 rounded-md text-[#B0B0B0] font-semibold ${pathname === "/admin/accounts" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={'/admin/accounts'}><span className={` inline-block ${pathname === "/admin/accounts" && 'text-[#00FFF5]' }`}></span> Accounts </Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${pathname === "/admin/accounts/credit" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/accounts/credit"}><span className={` inline-block ${pathname === "/admin/accounts/credit" && 'text-[#00FFF5]' }`}></span> Credit</Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${pathname === "/admin/accounts/debit" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/accounts/debit"}><span className={` inline-block ${pathname === "/admin/accounts/debit" && 'text-[#00FFF5]' }`}></span> Debit</Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${pathname === "/admin/accounts/withdrawal-requests" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/accounts/withdrawal-requests"}><span className={` inline-block ${pathname === "/admin/accounts/withdrawal-requests" && 'text-[#00FFF5]' }`}></span> Withdrawal Requests</Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${pathname === "/admin/accounts/vendors" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/accounts/vendors"}><span className={` inline-block ${pathname === "/admin/accounts/vendors" && 'text-[#00FFF5]' }`}></span> Vendors</Link>
        </li>
        <li className={`py-4 px-2 rounded-md text-[#B0B0B0] font-semibold ${pathname === "/admin/accounts/overdue" && 'bg-[#2E2E2E] text-white'}`}>
            <Link to={"/admin/accounts/overdue"}><span className={` inline-block ${pathname === "/admin/accounts/overdue" && 'text-[#00FFF5]' }`}></span>Overdue</Link>
        </li>
    </ul>
</div>
  )
}

export default AccontSideBar