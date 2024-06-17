import DefaultersList from './DefaultersList'
import StudentsList from './StudentsList'


const StudentLD = () => {
  
  return (
    <div className='flex w-full border mt-5 gap-4 h-[77%] border-red-500'>
        <StudentsList />
        <DefaultersList />
    </div>
  )
}

export default StudentLD