import {useState,useEffect} from 'react'
import { SlShareAlt } from "react-icons/sl";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple,grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import axios from 'axios';



const StudentStats = () => {
    const [list, setlist] = useState([]);
    const [checkOut, setCheckOut] = useState([]);
    const {students} = useSelector((state)=> state.student_info)
    const [defaulterFees, setDefaulterFees] = useState([]);

    useEffect(()=>{

        const fetchStudents= async () =>{
            try {
                const response = await axios.get("http://localhost:5000/admin/students")
                setlist(response.data)
       
                
                
            } catch (error) {
                console.log(error)
            }
        }

    



        const getCheckOut = async() =>{
            const res = await axios.get('http://localhost:5000/admin/checkOut')
            setCheckOut(res.data)
        }

        const getDefaulter = async () =>{
            try {
                const res = await axios.get('http://localhost:5000/admin/defaulters')
                setDefaulterFees(res.data)
            } catch (error) {
                console.log(error)
            }
            
            
        }

        fetchStudents()
        getCheckOut()
        getDefaulter()
        
    },[students])

    

    let  assigned

    assigned = list?.filter(s => s.isPaid === true)

    
    const fees = defaulterFees?.map(d => d.price)
    const totalFees = fees.reduce((a,b) => a + b, 0)

    const ColorButton = styled(Button)(({ theme }) => ({
        color: 'white',
        backgroundColor: "#292929",
        width:"100%",
    
        '&:hover': {
          backgroundColor: grey[700],
        },
      }));

  return (
    <div className='bg-[#202020] w-full p-2 rounded-xl flex text-white gap-4'>
        <div className='basis-[25%]'>
            <ul className='flex flex-col gap-3'>
                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>Total Students</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl'>{list.length.toLocaleString()}</h3>
                </li>

                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>Students Assigned</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl text-[#FF05C8]'>{assigned.length.toLocaleString()}</h3>
                </li>
            </ul>
        </div>

        <div className='basis-[25%]'>
        <ul className='flex flex-col gap-3'>
                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>In Hostel</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl text-[#00FFF5]'>{list.length - checkOut.length}</h3>
                </li>

                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>Students Removed</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl text-[#F10606]'>1000</h3>
                </li>
            </ul>
        </div>

        <div className='basis-[25%]'>
        <ul className='flex flex-col gap-3'>
                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>Outside Hostel</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl text-[#B0B0B0]'>{checkOut.length}</h3>
                </li>
            </ul>
        </div>

        <div className='basis-[25%] bg-[#111111] flex flex-col justify-around p-4 rounded-xl'>
        <span className=' text-md'>Fees Defaulters</span>
        <h3 className=' text-2xl text-[##FFE605]'>&#8358;{totalFees.toLocaleString()}</h3>
        <ColorButton> View List</ColorButton>
        </div>
    </div>
  )
}

export default StudentStats