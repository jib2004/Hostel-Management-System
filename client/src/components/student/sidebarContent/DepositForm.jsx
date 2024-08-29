import { useSelector } from "react-redux"
import axios from "axios"
import { useState,} from "react"
import { PaystackButton } from 'react-paystack';
import { MdClose } from "react-icons/md";
import { Toaster,toast } from "sonner";

const DepositForm = ({openForm,formDisplay}) => {
    const {currentUser} = useSelector(state=>state.user)
    const [amountToDeposit, setAmount] = useState(0)
  
    
    const config ={
        reference: (new Date()).getTime().toString(),
        email: currentUser.email,
        amount: amountToDeposit * 100,
        publicKey:import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
        
    }

    const handlePaystackSuccessAction = async(reference) => {
        try {
          // toast.success("Money Successfully Credited")
          if(reference.status === "success"){
            const res = await axios.put(`http://localhost:5000/student/deposit/${currentUser._id}`,{amount:amountToDeposit})
            toast.success(res.data.message)
            setAmount('')
            formDisplay()
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
        };

        const componentProps = {
            ...config,
            text: `Pay `,
            onSuccess: (reference) => handlePaystackSuccessAction(reference),
            
        };
  return (
    <div className={`absolute top-[50%] left-[50%] -translate-x-[50%] bg-white border w-screen md:w-[450px] px-4 py-2  ${openForm ? 'block': 'hidden'}`}>
        <div className="w-full flex justify-end"><MdClose className="size-6 cursor-pointer" onClick={formDisplay} /></div>
        <h1 className=' font-semibold text-xl'> Deposit Form</h1>

        <form onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor="amount">Kindly Enter the amount you want to enter</label>
            <input type="text" className="border w-full" onChange={e=>setAmount(e.target.value)} />
            <PaystackButton className='bg-[#D945FD] px-4 py-2 mt-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300' {...componentProps} />
        </form>
        <Toaster />
    </div>
  )
}

export default DepositForm