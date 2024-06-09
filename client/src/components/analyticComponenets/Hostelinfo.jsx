import {
    CircularProgressbar,
    buildStyles,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import { SlShareAlt } from "react-icons/sl";

const Hostelinfo = () => {
    let percentage_1 = 50
    let percentage_2 = 70
    let percentage_3 = 95

  return (
    <div className="bg-[#202020] w-full p-2 rounded-xl">
                <h3 className=" font-semibold text-white text-xl flex items-center gap-2">Occupancy <SlShareAlt className="inline-block" /></h3>

                <div className="flex p-5 gap-2 ">
                    <div className="bg-black p-4 rounded-xl basis-[33.333%]">
                    <h3 className=" text-white font-semibold text-xl flex items-center gap-2">Hostel 1 <SlShareAlt className="inline-block" /></h3>
                    <div className=" size-56 mx-auto">
                    <CircularProgressbar
                    value={percentage_1}
                    text={`${percentage_1}%`}
                    styles={buildStyles({
                    textColor: "white",
                    pathColor: "#00FFF5",
                    trailColor: "#292929",
                    rotation: 0.5 + (1 - percentage_1 / 100) / 2,
                    
                    })}
                    
                    />
                    </div>
                    </div>

                    <div className="bg-black p-4 rounded-xl basis-[33.333%]">
                    <h3 className=" text-white font-semibold text-xl flex items-center gap-2">Hostel 2 <SlShareAlt className="inline-block" /></h3>
                    <div className="size-56 mx-auto">
                    <CircularProgressbar
                    value={percentage_2}
                    text={`${percentage_2}%`}
                    styles={buildStyles({
                    textColor: "white",
                    pathColor: "#FFE605",
                    trailColor: "#292929",
                    rotation: 0.5 + (1 - percentage_2 / 100) / 2,
                    })}
                    />
                    </div>
                    </div>


                    <div className="bg-black p-4 rounded-xl basis-[33.333%]">
                    <h3 className=" text-white font-semibold text-xl flex items-center gap-2">Hostel 3 <SlShareAlt className="inline-block" /></h3>
                    <div className="size-56 mx-auto">
                    <CircularProgressbar
                    value={percentage_3}
                    text={`${percentage_3}%`}
                    styles={buildStyles({
                    textColor: "white",
                    pathColor: "#FF05C8",
                    trailColor: "#292929",
                    rotation: 0.5 + (1 - percentage_3 / 100) / 2,
                    })}
                    />
                    </div>
                    </div>
                </div>

            </div>
  )
}

export default Hostelinfo