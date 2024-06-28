import {useSelector} from 'react-redux'
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import { toast,Toaster } from 'sonner';



const PayStack = () => {
    const {currentUser} = useSelector(state=> state.user)
    const {currentHostel} = useSelector(state=> state.hostel)

 
    const config ={
        reference: (new Date()).getTime().toString(),
        email: currentUser.email,
        metadata:{
            name:currentUser.name,
            hostel:currentHostel.name
        },
        amount: currentHostel?.price * 100,
        publicKey:import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
        
    }


     
     const handlePaystackSuccessAction = async(reference) => {
      try {
        if(reference.status === "success"){
           const response =await axios.post("http://localhost:5000/student/payment",
            {
            reference:reference,
            name:currentUser.name,
            email:currentUser.email,
            hostel:currentHostel.name,
            plan:currentHostel.plan,
            amountPaid:currentHostel.price
           })
           toast.success('Payment Successful');
        }

      } catch (error) {
      
        toast.error(error.response.data.message);
      }
        
        
      };
  
      // you can call this function anything
      const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        
      }
  
      const componentProps = {
          ...config,
          text: `Pay `,
          onSuccess: (reference) => handlePaystackSuccessAction(reference),
          onClose: handlePaystackCloseAction,
      };
  return (
  <>
    <PaystackButton className='bg-[#D945FD] px-4 py-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300' {...componentProps}/>
    <Toaster/>
    </>
  )
}

export default PayStack
