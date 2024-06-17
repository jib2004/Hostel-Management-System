import { MdClose } from "react-icons/md";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";


const AddDefaulter = ({close,sendData}) => {
    const {students} = useSelector((state)=> state.student_info)
    const [defaulter, setDefaulter] = useState({});
    const [studentName,setStudentName] = useState('')
    const [closeDefaulterForm,setCloseDefaulterForm] = useState(close)
    
    const handleClose = () =>{
        setCloseDefaulterForm(!closeDefaulterForm)
        sendData(!closeDefaulterForm)
    }

    const handleInput = (e) =>{
        setStudentName(students.name)
        setDefaulter({...defaulter,name:studentName, [e.target.id]: e.target.value})}

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/admin/defaulter/${students._id}`, defaulter)
            const data = response.data
            setCloseDefaulterForm(!closeDefaulterForm)
        sendData(!closeDefaulterForm)
            

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="absolute w-[748px] h-[819px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2E2E2E] shadow-md p-4">
        <h1 className="flex text-2xl items-center justify-between py-4 px-2">AddDefaulter <MdClose className=" cursor-pointer" onClick={handleClose}/></h1> 
        <form onSubmit={handleSubmit}>
        <div className='mb-3 '>
        <TextField
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
        id="name" 
        type='Name of Student'
        label="Name of Student" 
        variant="outlined"
        className='w-[100%]'
        value={students.name}
        
        />
        </div>

        <div className='mb-3 '>
        <TextField
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
        id="reason" 
        type='Reason'
        label="Reason" 
        variant="outlined"
        className='w-[100%] '
        multiline
        onChange={handleInput}
        />
        </div>

        <div className='mb-3 '>
        <TextField
        sx={{ backgroundColor: 'black' , color:'#fff !important', '& > :not(style)': { color: '#B0B0B0' },}} 
        id="price" 
        type='text'
        label="Price" 
        variant="outlined"
        className='w-[100%]'
        onChange={handleInput}
        />
        </div>
            <div className="mb-3">
            <input type="date"
            id="date" 
            className=' text-black  w-full px-2 py-4 '
            onChange={handleInput}
            />
            </div>

            <div className=" flex justify-center">

            <Button variant="contained" color="success" type="submit">Add Defaulter</Button>
            </div>
        </form>
        </div>
  )
}

export default AddDefaulter