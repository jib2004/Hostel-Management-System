import axios from "axios"
import { useState,useEffect } from "react"

const AccountWithdrawalRequest = () => {
    const [requests,setRequests] = useState([])
    const [click,setClick] = useState(0)
    useEffect(()=>{
        const getRequests = async() =>{
            try {
                const res = await axios.get('http://localhost:5000/admin/withdrawal-requests')
                setRequests(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRequests()
    },[click])

    const handleApproval = async(...id) =>{
        try {
            await axios.put(`http://localhost:5000/admin/deposit/${id[0]}`,{
                amount:-id[2]
            })
            await axios.put(`http://localhost:5000/admin/approved/${id[1]}`)
        } catch (error) {
            console.log(error)
        }
        setClick(click + 1)
    }

    

  return (
    <div className='text-white ml-[260px] w-[75%] px-4'>
        <div>
            <h1 className="py-2 text-xl font-semibold">Unapproved Requests</h1>
            <ul>
                {requests.filter(request=> request.isSent === false).map(request=>(
                    <li key={request._id} className="bg-[#111111] py-3 px-5 rounded-lg flex flex-col gap-3">
                        <div>
                        <span>Name : </span><span>{request.name}</span>
                        </div>
                        <div>
                        <span>Email : </span><span>{request.email}</span>
                        </div>
                        <div>
                        <span>Account Number : </span><span>{request.accountNumber}</span>
                        </div>
                        <div>
                            <span>Amount : </span><span>&#8358; {request.amountToWithdraw.toLocaleString()}</span>
                        </div>
                        <div>
                            <button onClick={()=>{handleApproval(request.studentId,request._id,request.amountToWithdraw) }} className={'px-4 py-2 bg-red-500 active:bg-red-400 hover:bg-red-700 duration-150 rounded'}>Approve</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div>

            <div>
            <h1 className="py-2 text-xl font-semibold">Approved Requests</h1>
            <ul>
                {requests.filter(request=> request.isSent ).map(request=>(
                    <li key={request._id} className="bg-[#111111] py-3 px-5 rounded-lg flex flex-col gap-3">
                        <div>
                        <span>Name : </span><span>{request.name}</span>
                        </div>
                        <div>
                        <span>Email : </span><span>{request.email}</span>
                        </div>
                        <div>
                        <span>Account Number : </span><span>{request.accountNumber}</span>
                        </div>
                        <div>
                            <span>Amount : </span><span>&#8358; {request.amountToWithdraw.toLocaleString()}</span>
                        </div>
                        <div>
                            <button disabled className={'px-4 py-2 bg-green-500 rounded'}>Sent</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </div>
  )
}

export default AccountWithdrawalRequest