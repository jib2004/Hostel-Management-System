
import {useSelector} from 'react-redux'

const Student = () => {
   const {currentUser} = useSelector(state=>state.user)
  return (
    <div  className='w-screen '>
      <div className={`${currentUser.defaulter ? 'block bg-red-500 py-2 px-4': "hidden"}`}>{currentUser.name} You are a defaulter please sort whatever issue you have before you get blocked</div>
    </div>
  )
}

export default Student
