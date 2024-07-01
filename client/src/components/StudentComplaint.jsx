import { useEffect,useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";


const StudentComplaint = () => {
    const {currentUser} = useSelector(state => state.user)
    const [complaints, setComplaints] = useState({})
    const [deleteComplaint,setDeleteComplaint] = useState({})
    useEffect(()=>{
        const fetchComplaint = async ()=>{
            const response  =await axios.get(`http://localhost:5000/student/complaint/${currentUser._id}`)
            const data =  response.data
            setComplaints(data)
            
        }
        fetchComplaint()

    },[])

    const handleAgree =async () =>{
        
        const response = await axios.put(`http://localhost:5000/student/studentComplaint/${currentUser._id}`)
        const data = response.data
        
        
    }
   

    const handleDisagree = async() =>{
        const response  =await axios.put(`http://localhost:5000/student/complaint/${complaints._id}`)
            const data =  response.data
            setComplaints(data)
    }
  return (
    <div >
        <h1>Student Complaint</h1>
        <div className="flex flex-col gap-8 mt-4 py-2 px-4 md:flex-row justify-between  mx-3 bg-white rounded-lg">
            <div>
                <p>{complaints?.complaint}</p>
                <p className=" text-gray-500  font-semibold text-sm">{complaints?.room}</p>
                
                </div>
            <div className="flex items-center gap-3">
                <span>Status:</span>  <div className={`inline-block size-4 border rounded-full ${complaints?.status ? ' bg-green-400':' bg-red-500'}`}></div>
            </div>
        </div>

        <div className=" flex items-center  mx-3 mt-4 gap-4">
            <div onClick={handleAgree} className=" size-12 bg-white flex items-center justify-center text-4xl text-green-600 cursor-pointer hover:bg-slate-300 duration-300"><FaCheck/></div> 
            <div onClick={handleDisagree} className=" size-12 bg-white flex items-center justify-center text-4xl text-red-600 cursor-pointer hover:bg-slate-300 duration-300"> <FaXmark/></div>
        </div>
         
    
    </div>
  )
}

export default StudentComplaint