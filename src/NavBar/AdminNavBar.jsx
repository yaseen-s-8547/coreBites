import logo from "../assets/coreBitesLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import Tooltip from "../Components/ui/Tooltip"
export default function AdminNavBar({ activeTabs, setActiveTabs }) {
      const navigate= useNavigate()
      const handleAdminLogOut=()=>{
        localStorage.removeItem("adminToken")
        navigate("/")
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
                        <h1 className="text-white text-3xl zen-dots-regular">CoreBites</h1>
                    </div>
                </div>
                <div className="col-span-8  flex flex-row justify-center gap-7 ml-7 md:justify-evenly items-center relative text-white  ">
                    <button type="button" aria-pressed={activeTabs === "create"} className={`text-3xl hover:text-white ${activeTabs === "create" ? "text-white" : "text-white/60"}`} onClick={() => setActiveTabs("create")}>Create</button>
                    <button type="button" aria-pressed={activeTabs === "read"} className={`text-3xl hover:text-white ${activeTabs === "read" ? "text-white" : "text-white/60"}`} onClick={() => setActiveTabs("read")}>Manage</button>
                    <Tooltip
                        label="End your admin session"
                        position="left"
                        className="absolute right-3 bottom-17 sm:bottom-5 md:top-3 md:bottom-auto"
                    >
                        <button
                            type="button"
                            aria-label="Log out of admin dashboard"
                            className="block h-10 w-10 rounded-cb-md bg-cb-surface text-cb-ink hover:bg-cb-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus md:h-7 md:w-7"
                            onClick={handleAdminLogOut}
                        >
                            <FontAwesomeIcon icon={faDoorOpen} className="text-lg text-center" aria-hidden="true" />
                        </button>
                    </Tooltip>
                </div>
            </>
        </>
    )
}