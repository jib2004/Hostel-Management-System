import { useState,useEffect } from 'react'; 
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses }  from '@mui/material/LinearProgress';
import { SlShareAlt } from "react-icons/sl";
import axios from 'axios';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#FFE605",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#00FFF5",
    },
  }));



export default function LinearDeterminate() {
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
    const Total = complaint?.length
    const res =complaint.map(r=>(
      Number(r.status)
    ))
     const resolved = res.reduce((a,b)=>a+b,0)
     
    
    const open = Total - resolved

    const percentage = Math.round(resolved/Total * 100) 
    
    

  return (
    <div className='bg-[#202020] p-4 mt-4 flex items-center gap-2 rounded-md' >
        <div className='basis-[20%]'>
    <Box sx={{ width: '100%' }}>
    <BorderLinearProgress variant="determinate" value={percentage} sx={{width:"100%", padding:"40px"}} />
    
    </Box>
    </div>

    <div className='flex text-white basis-[80%] gap-3'>
        <div className='bg-[#111111] p-4 rounded-xl basis-[33.33%]'>
            <p className='text-lg font-light'>Total Complaints</p>
            {Total}
        </div>

        <div className='bg-[#111111] p-4 rounded-xl basis-[33.33%]'>
        <p className='text-lg font-light flex items-center gap-2'>Resolved <SlShareAlt className="inline-block" /></p>
        <span className='text-2xl text-[#00FFF5]'>{resolved}</span> 
        </div>

        <div className='bg-[#111111] p-4 rounded-xl basis-[33.33%]'>
            <p className='text-lg font-light flex items-center gap-2 '>Open <SlShareAlt className="inline-block" /></p>
            <span className='text-[#FFE605] text-2xl'>{open}</span> 
        </div>

    </div>

    </div>
  );
}
