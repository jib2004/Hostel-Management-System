import DefaultersList from './DefaultersList'
import StudentsList from './StudentsList'


const StudentLD = () => {
  
  return (
    <div className='flex w-full  mt-2 gap-4   '>
        <StudentsList />
        <DefaultersList />
    </div>
  )
}

export default StudentLD