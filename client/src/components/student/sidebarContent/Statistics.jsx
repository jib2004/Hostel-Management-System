import { useEffect,useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Chart } from "react-google-charts";

const Statistics = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [history,setHistory] = useState([])
    const data = [["Transactions","Money"],["0",0]]
    useEffect(()=>{
        const amountInAccount = async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/student/${currentUser._id}`) 
                setHistory(res.data.amountDeposited)
            } catch (error) {
                console.log(error)
            }}
    
            amountInAccount()
      },[])

      history.map((h,index)=>{
        data.push([`${index + 1}`,h < 0? -h : h])
      })

    console.log(data)

        

  return (
    <div className='h-screen border'>
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      legendToggle
    />
    </div>
  )
}

export default Statistics