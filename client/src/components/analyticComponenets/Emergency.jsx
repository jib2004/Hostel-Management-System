import { GrEmergency } from "react-icons/gr";
import Button from '@mui/material/Button';

const Emergency = () => {
  return (
    <div className="  text-white bg-[#111111] rounded-xl p-4">
        <GrEmergency className="text-red-500 text-[14rem] mx-auto" />
        <div>
            <p className="text-center text-2xl">
                Press only in Case of <br /> Emergency
            </p>

            <div className="w-fit mx-auto mt-3">

            <Button variant="contained" color="error" sx={{ fontSize:"1.2em"}}>Emergency</Button>
            </div>
        </div>
    </div>
  )
}

export default Emergency