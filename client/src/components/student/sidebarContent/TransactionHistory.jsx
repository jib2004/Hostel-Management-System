
import { MdArrowLeft } from 'react-icons/md'
import { Link,useLocation } from 'react-router-dom'
import { GrTransaction } from "react-icons/gr";
import { FcStatistics } from "react-icons/fc";
import Statistics from './Statistics';
import Transactions from './Transactions';

const TransactionHistory = () => {
   const {pathname} = useLocation()
  return (
    <div>
        <Link to={'/student/deposit'} className='border bg-purple-300 text-white size-12 flex justify-center items-center rounded-full mt-2 ml-2 cursor-pointer hover:bg-purple-500 duration-150'>
            <MdArrowLeft className=' size-10' />
        </Link>
        <nav>
          <ul className='flex'>
            <Link to={'/student/transaction'} className={`flex items-center gap-2 text-xl basis-1/2 px-2 py-4 mt-2 ${pathname === '/student/transaction' && 'bg-purple-300 text-white'}`}>Transactions <GrTransaction /></Link>
            <Link to={'/student/transaction/statistics'} className={`flex items-center gap-2 text-xl basis-1/2 px-2 py-4 mt-2 ${pathname === '/student/transaction/statistics' && 'bg-purple-300 text-white'}`}>Statistics <FcStatistics /></Link>
          </ul>
        </nav>
        {pathname === '/student/transaction' ? <Transactions /> : <Statistics />}
    </div>
  )
}

export default TransactionHistory