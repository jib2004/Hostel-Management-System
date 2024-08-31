import { useState,useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"


const PickRoom = () => {
  const {currentUser} = useSelector(state=>state.user)
  const [userInfo,setUserInfo] = useState({}) 
  const [hostel,setHostel] = useState([])
  const [roomNumbers,setRoomNumbers] = useState([])

useEffect(()=>{
   const getUser = async () =>{
    try {
    const response =  await axios.get(`http://localhost:5000/student/${currentUser._id}`)
    setUserInfo(response.data)
    } catch (error) {
      console.log(error)
    }
   }

   const getHostel = async() =>{
    try {
      const response = await axios.get('http://localhost:5000/student/hostel')
      setHostel(response.data)
    } catch (error) {
      console.log(error)
    }
   }
   
   getUser()
   getHostel()
   
},[])



const studentHostel = hostel.filter(h => h.name === userInfo.hostelName)
  // console.log(studentHostel)
// setRoomNumbers()

// for(let i  = 0; i <= studentHostel[0]?.roomsPerFloor * studentHostel[0]?.numOfFloors ;i++ ){
//   setRoomNumbers(i)
// }

//console.log(roomNumbers)


//  console.log(Math.round((() % 2 )  ))


  return (
    <div>
      <h1>Pick Room</h1>
      <div>
        {
  
        }
      </div>

    </div>
  )
}

export default PickRoom