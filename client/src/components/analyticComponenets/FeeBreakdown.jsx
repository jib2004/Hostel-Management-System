import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { SlShareAlt } from "react-icons/sl";

const expected = 5200000
    const collected = 2600000
    const overdue =  1040000
     const remaining = expected - (collected + overdue) 
    
    const percentageFee =Math.round(collected/expected * 100)


const data = [
  { value: remaining, label: 'Remaining' },
  { value: overdue, label: 'Overdue' },
  { value: collected, label: 'Collected' },
 
];

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
  return (
    <div className='bg-[#202020] w-full p-4 rounded-xl mt-4 flex '>
        <div>
        <h3 className=" font-semibold mb-4 text-white text-xl flex items-center gap-2">Fee Collection <SlShareAlt className="inline-block" /></h3>
        <PieChart series={[{ data, innerRadius: 60,  }]} {...size} slotProps={{ legend: { hidden: true } }} >
       
      <PieCenterLabel >{percentageFee}%</PieCenterLabel>
    </PieChart>
        </div>
    

    <div className=' text-white flex gap-5 basis-[60%]'>
        <div className='basis-1/2  flex flex-col justify-around'>
            <div className="bg-[#111111] p-4 rounded-xl">
                <p className='text-lg font-semibold'> Expected</p>
                <span className='text-3xl flex justify-between items-center'>&#8358; {expected} <SlShareAlt className="inline-block" /></span>
            </div>
            
            <div className="bg-[#111111] p-4 rounded-xl">
            <p className='text-lg font-semibold'>Collected</p>
            <span className='text-3xl flex justify-between items-center text-purple-600'>&#8358; {collected} <SlShareAlt className="inline-block" /></span>
            </div>
        </div>
        
        <div className='basis-1/2  flex flex-col justify-around'>

        <div className="bg-[#111111] p-4 rounded-xl">
        <p className='text-lg font-semibold'>Remaining</p>
        <span className='text-3xl flex justify-between items-center text-green-400'>&#8358; {remaining} <SlShareAlt className="inline-block" /></span>
        </div>

            <div className="bg-[#111111] p-4 rounded-xl">
            <p className='text-lg font-semibold'>Overdue</p>
            <span className='text-3xl flex justify-between items-center text-blue-500'>&#8358; {overdue} <SlShareAlt className="inline-block" /></span>
            </div>
        </div>
    </div>

    </div>
  );
}
