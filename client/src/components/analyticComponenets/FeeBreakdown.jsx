import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { SlShareAlt } from "react-icons/sl";
import { useEffect,useState } from 'react';
import axios from 'axios';




   



const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill:'white',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
  
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2} color='white'>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  const [hostel, setHostel] = useState ([])
  const [Payment, setPayment] = useState ([])
  useEffect(()=>{
    const getHostel = async() =>{
      const response = await axios.get('http://localhost:5000/admin/hostel')
      setHostel(response.data)
 
    }

    const getPayment = async () =>{
      const response = await axios.get('http://localhost:5000/admin/paymentMade')
      setPayment(response.data)
      

    }

    getHostel()
    getPayment()
  },[])


  const total =Payment.reduce((a,c)=>a + c.amountPaid,0) // a + c , initialValue

  const ex = hostel.map((h)=>((h.capacity * h.numOfFloors * h.roomsPerFloor) *h.price))

  
  const expected =  ex.reduce((a,c)=>a +c ,0)

  const collected = 2600000
  const overdue =  0
   const remaining = expected - total 
  
  const percentageFee =Math.round(collected/expected * 100)

  const data = [
    { value: remaining, label: 'Remaining' },
    { value: expected, label: 'Expected' },
    { value: total, label: 'Collected' },
    { value: overdue, label: 'Overdue' }
   
  ];
  

  
  
  return (
    <div className='bg-[#202020] w-full p-4 rounded-xl mt-4 flex '>
        <div>
        <h3 className=" font-semibold mb-4 text-white text-xl flex items-center gap-2">Fee Collection <SlShareAlt className="inline-block" /></h3>
        <PieChart series={[{ data, innerRadius: 60,  }]} {...size} slotProps={{ legend: { hidden: true } }} >
       
      <PieCenterLabel >{percentageFee}%</PieCenterLabel>
    </PieChart>
        </div>
    

    <div className=' text-white flex gap-4 basis-[70%] '>

        <div className='basis-1/2  flex flex-col justify-around '>
            <div className="bg-[#111111] p-4 rounded-xl">
                <p className='text-lg font-semibold'> Expected</p>
                <span className='text-2xl flex justify-between items-center'>&#8358; {expected.toLocaleString()} <SlShareAlt className="inline-block" /></span>
            </div>
            
            <div className="bg-[#111111] p-4 rounded-xl">
            <p className='text-lg font-semibold'>Collected</p>
            <span className='text-2xl flex justify-between items-center text-purple-600'>&#8358; {total.toLocaleString()} <SlShareAlt className="inline-block" /></span>
            </div>
        </div>
        
        <div className='basis-1/2  flex flex-col justify-around '>

        <div className="bg-[#111111] p-4 rounded-xl">
        <p className='text-lg font-semibold'>Remaining</p>
        <span className='text-2xl flex justify-between items-center text-green-400'>&#8358; {remaining.toLocaleString()} <SlShareAlt className="inline-block" /></span>
        </div>

            <div className="bg-[#111111] p-4 rounded-xl">
            <p className='text-lg font-semibold'>Overdue</p>
            <span className='text-2xl flex justify-between items-center text-blue-500'>&#8358; {overdue.toLocaleString()} <SlShareAlt className="inline-block" /></span>
            </div>
        </div>
    </div>

    </div>
  );
}
