import { Outlet } from "react-router-dom"
import SideBar from "../Components/SideBar"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from "@fortawesome/free-solid-svg-icons"
export default function DashBoardLayOut() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="w-full min-h-screen bg-[radial-gradient(circle_at_7%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-4 text-2xl"
                >
                    <FontAwesomeIcon icon={faBurger} />
                </button>
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-black transform transition-transform duration-300 z-50 border border-r-amber-50
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
                >
                    <SideBar />
                </div>
                <div className=" grid grid-cols-1 sm:grid-cols-12   ">
                    <div className="hidden min-h-screen sm:block sm:col-span-4 md:col-span-4 lg:col-span-3 2xl:col-span-2   border-t-0     ">
                        <SideBar />
                    </div>
                    <div className="md:col-span-8 lg:col-span-9 sm-col-span-8 2xl:col-span-10 h-screen ">
                        <h1 className="text-white ">intro</h1>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}