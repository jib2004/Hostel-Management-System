import HeaderBottom from "../components/HeaderBottom"
import HeaderTop from "../components/HeaderTop"
import backgroundImage from "../assets/a background im e6e7b605-e213-4c1b-83ae-ca6e9cf63cd8.png"

const HomePage = () => {
  return (
    <div className='h-screen'>
        <HeaderTop />
        <HeaderBottom />
         <div className={` w-full h-full  bg-center bg-no-repeat bg-cover ` } style={{backgroundImage:`url(${backgroundImage})`}}>
          
         </div>

         HHDHdhhd
        </div>
  )
}

export default HomePage