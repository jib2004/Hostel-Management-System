import HeaderBottom from "../components/HeaderBottom"
import HeaderTop from "../components/HeaderTop"
import backgroundImage from "../assets/a background im e6e7b605-e213-4c1b-83ae-ca6e9cf63cd8.png"

const HomePage = () => {
  return (
    <div className='h-screen w-screen overflow-x-hidden'>
        <HeaderTop />
        
         <div className={` w-full h-full  md:bg-center bg-no-repeat bg-contain md:bg-cover ` } style={{backgroundImage:`url(${backgroundImage})`}}>
         </div>



        </div>
  )
}

export default HomePage