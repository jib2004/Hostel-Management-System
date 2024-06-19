import axios from "axios"
import { useEffect,useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getDefaulters } from "../../../redux/studentInfoSlice/defaultersInfoSlice";
import Autocomplete from '@mui/material/Autocomplete';
import { FaEye } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import {Link} from 'react-router-dom'

const DefaultersList = () => {
  const dispatch = useDispatch()
  const {students} = useSelector((state)=> state.student_info)
  const {defaulter} = useSelector((state)=> state.defaulter)
  const [studentNames, setStudentNames] = useState([])
  const [options, setOptions] = useState([]); 
  
  useEffect(()=>{
      const fetchStudents= async () =>{
          try {
              const response = await axios.get("http://localhost:5000/admin/defaulters")
              setStudentNames(response.data)
              dispatch(getDefaulters(response.data))
              setOptions(response.data.map(studentN => studentN.name))
              console.log(response.data)
              
          } catch (error) {
              console.log(error)
          }
      }
      
      
     

      fetchStudents()
      
  },[])


  return (
    <div className="text-white basis-1/2 bg-[#202020] p-4 h-[full]">{
      defaulter === null ? (
          <div className=" w-full p-2 bg-[#111111] ">
              No Students Currently...
          </div>
      ):(
          <div className="text-white basis-1/2 bg-[#202020] overflow-hidden relative p-4 h-full ">
              <h1>Students</h1>
          
              <div className=" flex gap-3 mt-3 mb-5">
              
      <Autocomplete
      sx={{
        display: 'inline-block',
        '& input': {
          width: 450,
          bgcolor: 'black',
          color: 'white',
          padding:'10px 12px'

          
        },
      }}
      id="custom-input-demo"
      options={options}
      renderInput={(params) => (
      <div ref={params.InputProps.ref}>
      <input type="text" {...params.inputProps} 
          />
        </div>
      )}
    />

      <button className="flex items-center py-[10px] px-[12px] bg-[#3E3E3E] hover:bg-[#515151] duration-300 font-normal text-[16px]"><MdFilterList/> Filter </button>



      </div>

      

              {studentNames && studentNames.length ?(
                  <ul className="flex flex-col gap-4 overflow-auto mt-3 h-[80%]">

                  {studentNames.map((student)=>(
                          <li key={student._id} className="flex items-center justify-between gap-4 bg-[#111111] text-[#D9D9D9] py-4 px-5 rounded-2xl">
                              <div>
                              <img   src={student.profilePicture} alt="" className=" size-14 mr-4 rounded-full inline-block object-cover" /> 
                              <span >{student.name}</span> 
                              </div>
                              <Link to={`/admin/dashboard/defaulter/${student._id}`}><FaEye className=" cursor-pointer text-[25px]"/> </Link> 
                              </li>
                  ))} 
                  
                  
                  
                  </ul>
              ) :""}
          </div>
      )
  }</div>
  )
}

export default DefaultersList
