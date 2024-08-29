import { MdClose } from "react-icons/md";
import { useState,} from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster,toast } from "sonner";

const WithdrawForm = ({openForm,formDisplay}) => {
    const [amount, setAmount] = useState(0)
    const [acctNumber, setAcctNumber] = useState(0)
    const {currentUser} = useSelector(state=>state.user)
    const handleWithdrawal =async (e) =>{
        e.preventDefault()
        try {
             await axios.post(`http://localhost:5000/student/withdraw/${currentUser._id}`,{
                name:currentUser.name,
                email:currentUser.email,
                accountNumber:acctNumber,
                amountToWithdraw:amount,
            })
            toast.success('Request Successful')
            formDisplay()
        } catch (error) {
            toast.error("Request Unsuccessful")
            formDisplay()
            console.log(error)
        }
    }

   
  return (
    <div className={`absolute top-[50%] left-[50%] -translate-x-[50%] bg-white border w-screen md:w-[450px] px-4 py-2  ${openForm ? 'block': 'hidden'}`}>
        <div className="w-full flex justify-end"><MdClose className="size-6 cursor-pointer" onClick={formDisplay} /></div>
        <h1 className=' font-semibold text-xl'> Withdrawal Form</h1>

        <form onSubmit={handleWithdrawal}>

        <div className="mb-3">
            <label htmlFor="amount">Kindly Enter your Account Number</label>
            <input type="text" className="border w-full" onChange={e=>setAcctNumber(e.target.value)} />
            </div>

            <div className="mb-3">
            <label htmlFor="amount">Kindly Enter the amount you want to withdraw</label>
            <input type="text" className="border w-full" onChange={e=>setAmount(e.target.value)} />
            </div>
            <button className='bg-[#D945FD] px-4 py-2 mt-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300 text-white'>Request Withdrawal</button>
        </form>
        <Toaster />
    </div>
  )
}

export default WithdrawForm