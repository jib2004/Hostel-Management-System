import StudentLD from "./studentLD/StudentLD"
import StudentStats from "./StudentStats"


const Student = () => {
  return (
    <div className="flex basis[85%] w-full gap-4">
        <div className=" basis-[75%]">
            <StudentStats />
            <StudentLD />
        </div>
        
        <div className=" basis-[25%] flex flex-col justify-between gap-3 h-full"></div>
    </div>
  )
}

export default Student