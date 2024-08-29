import { useEffect,useState,useRef } from "react"
import axios from "axios"
import { useSelector,useDispatch } from "react-redux"
import DepositForm from "./DepositForm"
import { Toaster,toast } from "sonner";
import { getHostel } from '../../../redux/hostelSlice/hostelSlice'
import {isSignInSuccess } from '../../../redux/userSlice/userSlice';
import randomize from 'randomatic'
import WithdrawForm from "./WithdrawForm";
import { Link } from "react-router-dom";

const Deposit = () => {
    const [deposit,setDeposit] = useState(0)
    const {currentUser} = useSelector(state=>state.user)
    const {currentHostel} = useSelector(state=> state.hostel)
    const [depositForm,setDepositForm] = useState(false)
    const [withdrawForm,setWithdrawForm] = useState(false)
    const [hostels,setHostels] = useState([])
    const [plan,setPlan] = useState()
    const spanRef = useRef(null)
    const dispatch =useDispatch()

    useEffect(()=>{
        const amountInAccount = async()=>{
        try {
            const res = await axios.get(`http://localhost:5000/student/${currentUser._id}`) 
            setDeposit(res.data)
        } catch (error) {
            console.log(error)
        }}

        const fetchHostel = async ()=>{
            const response = await axios.get("http://localhost:5000/student/hostel")
            setHostels(response.data)
          }
        amountInAccount()
        fetchHostel()
    },[])

    const totalAmount = deposit.amountDeposited?.reduce((a,c)=> a+c, 0)

    const handlePay = async() =>{
        try { 
            if(currentHostel.price < totalAmount){ 
               const response =await axios.post("http://localhost:5000/student/payment",
                {
                reference:{
                    status:"success",
                    reference:randomize('Aa0!', 16)
                },
                name:currentUser.name,
                email:currentUser.email,
                hostel:currentHostel.name,
                plan:currentHostel.plan,
                amountPaid:currentHostel.price
               })
               toast.success('Payment Successful');
               await axios.put(`http://localhost:5000/student/deposit/${currentUser._id}`,{amount:-currentHostel.price})
    
               const res = await axios.get(`http://localhost:5000/student/${currentUser._id}`)
               dispatch(isSignInSuccess(res.data))
            }else{
                return toast.error('Insufficient Funds')
            }
            
          } catch (error) {
            toast.error(error.response.data.message);
          }
    }

    const handleDeposit = () =>{
        setDepositForm(!depositForm)
    }

    const handleWithdraw = () =>{
      setWithdrawForm(!withdrawForm)
  }

    const handlePlan = (e) =>{
        const {value} = e.target
        setPlan(hostels.filter(hostel =>(
          hostel.plan === value
        ) ))
      }

    const handleAmount =async (id)=>{
        if(deposit.isPaid) return toast.error("You have already paid ")
        const response =await axios.get(`http://localhost:5000/student/hostel/${id}`)
        dispatch(getHostel(response.data))
        
      }

  return (
    <div className="px-4 relative ">
        <div className="">
            <div className="mb-4 text-xl font-medium">
            <span>Amount In Account : </span> 
            <span>&#8358; {totalAmount?.toLocaleString()}</span> 
            </div>
            <div>
            <button onClick={handleDeposit} className="px-4 py-3 border rounded-lg bg-green-400 hover:bg-green-200 text-white duration-300">Deposit</button>
            {<DepositForm openForm={depositForm} formDisplay={handleDeposit} />}
            
            <button onClick={handleWithdraw} className="px-4 py-3 border rounded-lg bg-red-400 ml-2 md:ml-4  hover:bg-red-200 text-white duration-300">Withdraw</button>
            {<WithdrawForm openForm={withdrawForm} formDisplay={handleWithdraw} />}
            
            <Link to={'/student/transaction'} className="text-gray-400 ml-2 md:ml-5 underline text-[14px] cursor-pointer hover:text-black duration-300"> Transaction History</Link>
            </div>
            
        </div>

        <div className={`${deposit.isPaid? 'hidden':'block' }`}>
      <h1 className=' text-xl font-semibold px-4 py-2 '>Student Rooms (Kindly select a room of your choice)</h1> 
    <p className=' text-[13px]  font-semibold px-4 py-2 '>
      Before you click on pay always ensure to click on pick first all the time
       </p>
      <div className='flex  items-center md:gap-7'>
        <span className='text-xl font-medium px-4 py-2'>Filter :</span>
        <div>
          
         <span className='text-lg font-semibold mr-2'>Plan :</span>  
          <select name="" id="" onChange={handlePlan} className='px-4 py-2'>
            <option value="" hidden selected disabled>kindly Select a plan</option>
            <option value="Classic" >Classic</option>
            <option value="Premium">Premium</option>
            <option value="Regular">Regular</option>
          </select>
        </div>
      </div>

      <div className='px-4 py-2 flex flex-col gap-3 overflow-x-hidden'>
        {plan !== undefined ? 
        plan?.map(hostel=>(
          <div key={hostel._id} className='bg-[#edc8f7] px-4 py-2'>
           
            <h1 className='text-xl font-semibold'>{hostel.name}</h1>
            <p className='text-gray-500 font-medium text-sm'>{hostel.plan}</p>
            <p className='text-lg font-semibold'>No of Students per room : {hostel.capacity}</p>
            <p className='text-lg font-semibold'>Available Spaces:{ (hostel.capacity * hostel.numOfFloors * hostel.roomsPerFloor) - hostel.selectedSpace}</p>
            <p className='text-lg font-semibold'>&#8358;<span>{hostel.price}</span></p>
            <div className='flex justify-between'>
            
            <button onClick={()=> handleAmount(hostel._id)}  className='bg-[#D945FD] px-4 py-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300'>Pick</button>
            </div>
          </div>
        ))
        : 
        hostels?.map(hostel=>(
          <div key={hostel._id} className='bg-[#edc8f7] px-4 py-2'>
           
            <h1 className='text-xl font-semibold'>{hostel.name}</h1>
            <p className='text-gray-500 font-medium text-sm'>{hostel.plan}</p>
            <p className='text-lg font-semibold'>No of Students per room : {hostel.capacity}</p>
            <p className='text-lg font-semibold'>Available Spaces:{ (hostel.capacity * hostel.numOfFloors * hostel.roomsPerFloor) - hostel.selectedSpace}</p>
            <p className='text-lg font-semibold'>&#8358; <span ref={spanRef}>{hostel.price}</span></p>

            <div className='flex justify-between'>
             <button onClick={handlePay} className='bg-[#D945FD] px-4 py-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300'>Pay</button>
            <button onClick={()=> handleAmount(hostel._id)}  className='bg-[#D945FD] px-4 py-2  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300'>Pick</button>
            </div>
          </div>
        ))
        }
      </div>
      </div>
      <Toaster />

        </div>
  )
}

export default Deposit