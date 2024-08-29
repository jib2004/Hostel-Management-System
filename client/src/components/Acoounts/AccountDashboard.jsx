import { useEffect,useState } from "react"
import axios from "axios"
import PieChartWithCenterLabel from "../analyticComponenets/FeeBreakdown"

const AccountDashboard = () => {
    const [credit,setCredit] = useState([])
    useEffect(()=>{
        const getCredits =async ()=>{
            try{
              const res = await axios.get('http://localhost:5000/admin/paymentMade')
              setCredit(res.data)
            }catch(e){
                console.log(e)
            }
        }

        getCredits()
    },[])
  return (
    
    <div className="text-white ml-[260px] w-[75%] px-3">
        <PieChartWithCenterLabel />
        <div className="flex gap-2 mt-4">
            <div className="basis-1/2 h-[450px] bg-[#202020] overflow-y-auto px-3 py-4 relative">
            <h1 className="font-semibold text-[20px] mb-[20px] ">Credit</h1>
            <div className="flex flex-col gap-3 ">
            {
                credit && credit?.map(credits=>(
                    <div key={credits._id} className="h-[64px] bg-[#111111] px-4 py-2 flex justify-between items-center text-[16px]">
                        <span>{credits.name} </span>
                        <span className="text-[#00FFF5]">+{credits.amountPaid}</span>
                    </div>
                ))
            }
            </div>
            </div>


            <div className="basis-1/2 h-[450px] bg-[#202020]"></div>
        </div>
    </div>
  )
}

export default AccountDashboard