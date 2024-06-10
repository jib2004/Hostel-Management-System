import React from 'react'
import { SlShareAlt } from "react-icons/sl";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple,grey } from '@mui/material/colors';

const StudentStats = () => {
    
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
                    <h3 className=' text-2xl'>3569</h3>
                </li>

                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>Students Assigned</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl text-[#FF05C8]'>3569</h3>
                </li>
            </ul>
        </div>

        <div className='basis-[25%]'>
        <ul className='flex flex-col gap-3'>
                <li className='bg-[#111111] p-4 rounded-xl'>
                    <span className='flex items-center gap-3 text-sm'><span>In Hostel</span> <SlShareAlt /> </span>
                    <h3 className=' text-2xl text-[#00FFF5]'>1569</h3>
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
                    <h3 className=' text-2xl text-[#B0B0B0]'>2500</h3>
                </li>
            </ul>
        </div>

        <div className='basis-[25%] bg-[#111111] flex flex-col justify-around p-4 rounded-xl'>
        <span className=' text-md'>Fees Defaulters</span>
        <h3 className=' text-2xl text-[##FFE605]'>3569</h3>
        <ColorButton> View List</ColorButton>
        </div>
    </div>
  )
}

export default StudentStats