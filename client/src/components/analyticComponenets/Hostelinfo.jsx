import { useState,useEffect } from "react";
import {
    CircularProgressbar,
    buildStyles,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import { SlShareAlt } from "react-icons/sl";
  import axios from "axios";

const Hostelinfo = () => {
  const [hostel, setHostel] = useState([]);
  useEffect(()=>{
    const getHostel = async() =>{
      const response = await axios.get('http://localhost:5000/admin/hostel')
      localStorage.clear()
      setHostel(response.data)
    }

    getHostel()
  },[])
  

  return (
    <div className="bg-[#202020] w-full p-2 rounded-xl">
      <h3 className=" font-semibold text-white text-xl flex items-center gap-2">Occupancy <SlShareAlt className="inline-block" /></h3>
      <div className="flex p-2 gap-2 flex-wrap">
      {
        hostel.map((h)=>(
        
          <div className="bg-black p-4 rounded-xl " key={h._id}>
          <h3 className=" text-white font-semibold text-xl flex items-center gap-2">{h.name} <SlShareAlt className="inline-block" /></h3>
          <div className=" size-56 mx-auto">
            
          <CircularProgressbar
          value={Math.round(h.selectedSpace / (h.capacity * h.numOfFloors * h.roomsPerFloor) *100)}
          text={`${Math.round(h.selectedSpace / (h.capacity * h.numOfFloors * h.roomsPerFloor) *100)}%`}
          styles={buildStyles({
          textColor: "white",
          pathColor: "#00FFF5",
          trailColor: "#292929",
          rotation: 0.5 + (1 - 50/ 100) / 2,
          
          })}
          
          />
          </div>
          </div>
        ))
      }
      </div>


            </div>
  )
}

export default Hostelinfo