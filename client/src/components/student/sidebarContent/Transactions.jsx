import { useEffect,useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

const Transactions = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [transaction,setTransaction] = useState([])
    useEffect(()=>{
    const amountInAccount = async()=>{
        try {
            const res = await axios.get(`http://localhost:5000/student/${currentUser._id}`) 
            setTransaction(res.data)
        } catch (error) {
            console.log(error)
        }}

        amountInAccount()
  },[])
  const totalAmount = transaction?.amountDeposited?.reduce((a,c)=>a +c, 0)

    return (

    <div>
        <div className='text-xl font-medium px-2 py-4'><span>Total Amount : </span> <span>&#8358; {totalAmount?.toLocaleString()}</span></div>
        <div>
        <ul>{transaction?.amountDeposited?.map(t=>(
            <li key={t._id} className={`text-xl px-2 py-3 font-medium flex items-center gap-4 justify-between border-b ${t > 0? 'text-green-500': 'text-red-500'}`}> <span>{t > 0 ? <FaMoneyBillTransfer /> : <CiLogout />}</span> <span>&#8358; {t > 0 && '+'}{t?.toLocaleString()}</span></li>
        ))}
        </ul>
        </div>
    </div>
  )
}

export default Transactions