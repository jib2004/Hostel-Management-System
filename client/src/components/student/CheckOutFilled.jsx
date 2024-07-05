import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Toaster,toast } from "sonner"


const CheckOutFilled = () => {
    const {currentUser} = useSelector(state => state.user)
    const [checkOut, setCheckOut] = useState([])

    const handleDelete = async () =>{
       
        try{
            const response = await axios.delete(`http://localhost:5000/student/checkOut/${currentUser._id}`)
        
            toast.success(response.data.message)
        }catch(e){
            console.log(e)
        }
    }
   

    useEffect(()=>{
        const getCheckOut= async() =>{
            try {
            const response = await axios.get(`http://localhost:5000/student/checkOut/${currentUser._id}`)
            setCheckOut(response.data)    
            } catch (error) {
                console.log(error)
            }
            
        }

        getCheckOut()
        
    },[])


    
  return (
    <>{
        checkOut?.map((check)=>(
            <div key={check._id}>
                 <h1>CheckOut</h1>
        <div className="flex flex-col gap-8 mt-4 py-2 px-4 md:flex-row justify-between  mx-3 bg-white rounded-lg">
            <div>

                <p>{check?.name}</p>
                <p>{check?.hostel}</p>
                <p className=" text-gray-500  font-semibold text-sm">{check?.room}</p>
                
                </div>
            <div className="flex items-center gap-3">
                <span>Status:</span> {check?.isApproved ?'Approved':"Pending"}  <div className={`inline-block size-4 border rounded-full ${check?.isApproved ? ' bg-green-400':' bg-red-500'}`}></div>
            </div>
        </div> 

     <button onClick={handleDelete} className="bg-[#D945FD] px-4 py-2 text-white ml-4  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300 mt-4"> { check?.isApproved ? "Click To Signify you've returned":'Cancel Request'}</button> 
            </div>
        ))
    }
    <Toaster />
    </>
  )
}

export default CheckOutFilled