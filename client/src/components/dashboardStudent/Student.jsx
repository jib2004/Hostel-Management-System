import StudentLD from "./studentLD/StudentLD"
import StudentStats from "./StudentStats"


const Student = () => {
  return (
    <div className="flex basis[85%]   gap-4 ml-[255px] ">
        <div className=" basis-[75%]  ">
            <StudentStats />
            <StudentLD />
        </div>
        
        
    </div>
  )
}

export default Student