import logo from "../assets/coreBitesLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
export default function AdminNavBar({ activeTabs, setActiveTabs }) {
      const navigate= useNavigate()
      const handleAdminLogOut=()=>{
        localStorage.removeItem("adminToken")
        navigate("/app/home")
      }
    return (

        <>
            <>
                <div className="col-span-4  ms-3  ">
                    <div className="md:flex md:flex-col md:justify-start md:items-start  lg:ms-0 flex flex-col justify-center  items-center  mt-7  md:ml-7  md:mt-5 ">
                        <img
                            src={logo}
                            className="rounded-top w-8 h-6 md:ml-24"
                            alt="noLogo"
                        />
                        <h1 className="text-white text-3xl zen-dots-regular ">CoreBites</h1>
                    </div>
                </div>
                <div className="col-span-8  flex flex-row justify-center gap-7 ml-7 md:justify-evenly items-center relative text-white  ">
                    <span className={`text-3xl cursor-pointer hover:text-gray-600 ${activeTabs === "create" ? "text-gray-600" : "text-white"}`} onClick={() => setActiveTabs("create")}>Create</span>
                    <span className={`text-3xl cursor-pointer hover:text-gray-600 ${activeTabs === "read" ? "text-gray-600" : "text-white"}`} onClick={() => setActiveTabs("read")}>Manage</span>
                    <button className="w-10 h-10 block bg-white right-3 text-black rounded-lg absolute md:right-3 md:w-7 md:h-7 md:top-3 sm:bottom-5 bottom-17    hover:bg-red-800 hover:text-white  " onClick={handleAdminLogOut}><FontAwesomeIcon icon={faDoorOpen} className="text-lg  text-center" /></button>
                </div>
            </>
        </>
    )
}