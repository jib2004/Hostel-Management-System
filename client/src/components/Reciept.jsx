import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Reciept = () => {
    const {currentUser} = useSelector(state=> state.user)
    const [reciept,setReciept] = useState([])
    const handlePrint =()=>{
        window.print()
    }
    useEffect(()=>{
        const fetchReceipt = async ()=>{
            const response = await axios.get(`http://localhost:5000/student/payment/${currentUser._id}`)
            setReciept(response.data)
            console.log(response.data)
        }

        fetchReceipt()
    },[])
  return (
    <div className=' md:p-5'>
        <h1 className='text-center text-2xl font-semibold md:text-4xl md:py-4'>Reciept</h1>
        <div className='mt-4'>
            {
                reciept.map(r=>(
                    <div key={r._id}>
                        <ul className='flex flex-col items-center gap-6'>
                            <li>
                                <span className='font-semibold md:text-2xl'>Name : {r.name}</span>
                            </li>
                            <li><span className='font-semibold md:text-2xl'>Reference Number : {r.reference.reference}</span></li>
                            <li><span className='font-semibold md:text-2xl'>Status : {r.reference.status}</span></li>
                            <li><span className='font-semibold md:text-2xl'>Plan : {r.plan}</span></li>
                            <li><span className='font-semibold md:text-2xl'> Hostel : {r.hostel}</span></li>
                            <li><span className='font-semibold md:text-2xl'>Amount : {r.amountPaid}</span></li>
                            <li><span className='font-semibold md:text-2xl'>Date of Payment: {r.date}</span></li>

                            <li>
                                <button onClick={handlePrint} className='bg-[#D945FD] px-4 py-2 text-white  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300'>Print</button>
                            </li>
                        </ul>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Reciept