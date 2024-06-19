import {useEffect,useState} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import axios from 'axios';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux'
import { getDefaulters } from "../../../redux/studentInfoSlice/defaultersInfoSlice";
import AddDefaulter  from '../../AddDefaulter.jsx';
import BlockStudentDialog from '../../dialogs/BlockStudentDialog.jsx';


const DefaulterInfo = () => {
    const {id} = useParams()
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const [studentInfo,setStudentInfo] = useState(null)
    const [showDefaulterForm,setShowDefaulterForm] = useState(false)

    

    const removeDefaulter = async () =>{
        try {
            const response = await axios.delete(`http://localhost:5000/admin/defaulter/${id}`)
            navigate("/admin/dashboard/student")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const getStudentInfo = async () =>{
            try{
            const response = await axios.get(`http://localhost:5000/admin/defaulter/${id}`)
            
            setStudentInfo(response.data)
            dispatch(getDefaulters(response.data))
         


        }catch(e){
            console.log(e)
        }
        }

        getStudentInfo()
    },[])
  return (
    <div>
         <div className='bg-[#202020] w-screen h-screen text-white py-5 px-3'>
    <div className=' text-[40px] size-20 flex items-center justify-center bg-[#111111] rounded-full cursor-pointer'>
        <Link to={"/admin/dashboard/student"}>
        <FaChevronLeft/>
        </Link>
        </div>

        <main>
            {studentInfo &&(
               <div className="flex flex-col gap-4">
                <div className='flex flex-col'>
               <h1 className="text-[80px] font-bold ">{studentInfo.name}</h1>
               <h1 className="text-[20px]">{studentInfo.email}</h1>
               </div>
               <ul className="flex flex-col gap-4  text-2xl">
                 <li className=""><span>Reason : </span> {studentInfo.reason}</li>
                 <li className=""><span>Price to pay : </span>&#8358; {studentInfo.price}</li>
                 <li className=""><span>Date of Incident  : </span> {studentInfo.date}</li>
                
               </ul>
             </div>
            )}

            <div className='flex gap-9 items-center justify-center  p-10'>
            {/* <BlockStudentDialog/> */}
            <Button variant="contained" color='error' onClick={removeDefaulter}>Remove Defaulter</Button>
           
            

            </div>
        </main>
        {showDefaulterForm && <AddDefaulter close={showDefaulterForm} sendData={showDefaulter}  />}
    </div>
    </div>
  )
}

export default DefaulterInfo
