import {useEffect,useState} from 'react'
import axios from 'axios'
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";


const ComlaintsAdmin = () => {
    const [complaint, setComplaint] = useState([]);
    useEffect(()=>{
      async function getComplaints(){
        try {
           const response = await axios.get('http://localhost:5000/admin/complaint');
           setComplaint(response.data);
           
        } catch (error) {
          console.log(error)
        }
      }
      getComplaints();
    },[])

    const unresolved =complaint.filter(item => item.status === false)
    const resolved =complaint.filter(item => item.status === true)

    const handleResolve= async (id) =>{
      console.log(id)
      try {
        await axios.put(`http://localhost:5000/admin/complaint/${id}`)
      
      } catch (error) {
        console.log(error)
      } 
    }

    const handleAgree = async (id) =>{
      console.log(id)
      try {
        await axios.delete(`http://localhost:5000/admin/complaint/${id}`)
      
      } catch (error) {
        console.log(error)
      }
      
  }


  return (
    <div className=' ml-[255px] w-[1000px] flex flex-col gap-4 text-white'>
        <h1 className='text-2xl font-bold'>Complaints</h1>
        <span>Unresolved Issues : {unresolved.length}</span>
        {
            unresolved.map(complain =>(
                <div className='bg-[#202020] px-2 py-3 flex justify-between' key={complain._id}>
                    <div>
                    <p>{complain.complaint}</p>
                    <p>Hostel Name : {complain.hostel}</p>
                    <p>Name : {complain.name}</p>
                    <p>Room Number : {complain.room}</p>
                    <p>In need of a {complain.service}</p>
                    <p>{complain.date.slice(0,10)}</p>
                    </div>
                    <div className='flex items-center  mx-3 mt-4 gap-4'>
                      <span>Status:</span>
                      <div className={`${complain?.status ? ' text-green-400': 'text-red-500'}`}>{complain.status ? 'Resolved' : 'Pending'}</div>

                     <div  onClick={()=>handleResolve(complain._id)} className=" size-12 bg-white flex items-center justify-center text-4xl text-green-600 cursor-pointer hover:bg-slate-300 duration-300"><FaCheck/></div> 
                     
                    </div>
                </div>
            ))
        }

        <h1>Resolves Issues : {resolved.length} </h1>

        {
          complaint.filter(item => item.status === true).map(complain =>(
            <div className='bg-[#202020] px-2 py-3 flex justify-between' key={complain._id}>
                    <div>
                    <p>{complain.complaint}</p>
                    <p>Hostel Name : {complain.hostel}</p>
                    <p>Name : {complain.name}</p>
                    <p>Room Number : {complain.room}</p>
                    <p>In need of a {complain.service}</p>
                    </div>
                    <div className='flex items-center  mx-3 mt-4 gap-4'>
                      <span>Status:</span>
                      <div className={`${complain?.status ? ' text-green-400': 'text-red-500'}`}>{complain.status ? 'Resolved' : 'Pending'}</div>

                      <div onClick={()=>handleAgree(complain.studentId)}  className=" size-12 bg-white flex items-center justify-center text-4xl text-red-600 cursor-pointer hover:bg-slate-300 duration-300"> <FaXmark/></div>
                    </div>
                </div>
          ))
        }
        </div>
  )
}

export default ComlaintsAdmin