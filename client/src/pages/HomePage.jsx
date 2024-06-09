import HeaderBottom from "../components/HeaderBottom"
import HeaderTop from "../components/HeaderTop"
import backgroundImage from "../assets/WhatsApp Image 2024-05-27 at 18.08.52.jpeg"

const HomePage = () => {
  return (
    <div className='h-screen'>
        <HeaderTop />
        <HeaderBottom />
         <div className={` w-full h-full bg-fixed bg-center bg-no-repeat bg-cover ` } style={{backgroundImage:`url(${backgroundImage})`}}>
          
         </div>

         HHDHdhhd
        </div>
  )
}

export default HomePage