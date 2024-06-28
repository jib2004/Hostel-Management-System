import { Link } from "react-router-dom"

const BlockedStudent = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center fixed top-0 left-0">
        <p className="text-center">You have been blocked go to the hall admin and sort it out</p>
        <Link className=" bg-[#707DA2] py-2 px-4"  to={"/"}> Go Home</Link>
    </div>
  )
}

export default BlockedStudent