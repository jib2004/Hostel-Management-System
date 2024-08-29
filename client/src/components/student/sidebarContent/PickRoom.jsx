import { useState,useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"


const PickRoom = () => {
  const {currentUser} = useSelector(state=>state.user)
  const [userInfo,setUserInfo] = useState({}) 
  const [hostel,setHostel] = useState([])

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


const studentHostel = hostel.filter(h => h.name === currentUser.hostelName)
console.log(studentHostel)

 console.log(Math.round(((studentHostel[0]?.roomsPerFloor * studentHostel[0]?.numOfFloors) % 2 )  ))


  return (
    <div>

    </div>
  )
}

export default PickRoom