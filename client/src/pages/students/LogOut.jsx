import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { isSignInSuccess } from "../../redux/userSlice/userSlice"
import { GiExitDoor } from "react-icons/gi";
import { Toaster,toast } from "sonner";

const LogOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut = async() => {
        try {
            const response = await axios.get('http://localhost:5000/student/logout')
            if(response.status === 200){
                toast.success('Logged Out Successfully')
                dispatch(isSignInSuccess({}))
                navigate('/login')
                
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div>
    <button onClick={logOut} className="mb-4 flex items-center gap-3 bg-[#D945FD] px-4 py-2 text-white ml-4  md:w-auto hover:bg-[#a334be] active:bg-[#D945FD] duration-300">LogOut <GiExitDoor/></button>
    <Toaster />
    </div>
  )
}

export default LogOut