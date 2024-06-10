import axios from "axios"
import { useEffect,useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getStudent } from "../../../redux/studentInfoSlice/studentInfoSlice";

const StudentsList = () => {
    const dispatch = useDispatch()
    const {students} = useSelector((state)=> state.student_info)
    const [studentNames, setStudentNames] = useState(null)
    useEffect(()=>{
        const fetchStudents= async () =>{
            try {
                const response = await axios.get("http://localhost:5000/admin/students")
                setStudentNames(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchStudents()
        
    },[])
    
  return (
    <div className="text-white basis-1/2 bg-[#202020] p-4">{
        students === null ? (
            <div className=" w-full p-2 bg-[#111111]">
                No Students Currently...
            </div>
        ):""
    }</div>
  )
}

export default StudentsList