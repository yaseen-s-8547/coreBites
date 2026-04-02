import bulb from "../assets/Vector (2).svg"
import Navbar from "../NavBar/Navbar"
import { useNavigate } from "react-router-dom"
export default function Landing() {
        const navigate = useNavigate()
        const handleSignUp = () => {
                navigate("/signup")
        }
        const handleComeIn = () => {
                navigate("/signin")
        }
        return (
                <>
                <div className="min-h-screen flex flex-col  overflow-y-hidden">
                        
                        <div className="grid grid-cols-1 md:grid-cols-12   min-h-26  w-full bg-black border-b border-white " >

                                <Navbar />

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center w-full flex-1 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)]">

                                <div className=" md:col-span-12 xl:col-span-6 py-8 text-center  ml-8  text-white  overflow-x-hidden overflow-y-hidden ">
                                        <h1 className="text-8xl text-center xl:text-center md:text-center font-semibold mr-8 ">BUILD. BREAK.<br />LEARN.</h1>
                                        <p className="text-3xl text-center md:text-left font-thin md:ml-2  ml-2   mt-6 ">Precision learning built to turn complex concepts into clear understanding.</p>
                                        <div className="md:flex md:flex-row md:justify-start md:mr-12 flex flex-col  gap mt-8 mr-5   gap-6 " >
                                                <button className="bg-white text-black  md:w-full xl:w-62 hover:bg-black hover:text-white hover:translate-y-0.5 h-16   flex flex-row justify-center items-center font-semibold rounded-2xl p-4 text-4xl" onClick={handleSignUp}>Sign Up</button>
                                                <button className="bg-white text-black  md:w-full xl:w-62 hover:bg-black hover:text-white hover:translate-y-0.5 h-16  flex flex-row justify-center items-center font-semibold rounded-2xl p-4 text-4xl" onClick={handleComeIn}>Come in</button>
                                        </div>
                                </div>
                                <div className="xl:col-span-6  md:col-span-12 xl:pl-2    ">
                                        <img src={bulb} alt="" className=" w-full  object-contain " />

                                </div>



                        </div>
                </div>
                </>
        )
}