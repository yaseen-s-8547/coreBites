import bulb from "../assets/Vector (2).svg"
import Navbar from "../NavBar/Navbar"
import { useNavigate } from "react-router-dom"
import Button from "../Components/ui/Button"
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-26 w-full bg-cb-ink border-b border-white/20">

                                <Navbar />

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center w-full flex-1 bg-cb-atmosphere">

                                <div className=" md:col-span-12 xl:col-span-6 py-8 text-center  ml-1  text-white  overflow-x-hidden overflow-y-hidden ">
                                        <h1 className="font-display text-6xl sm:text-8xl text-center xl:text-center md:text-center font-bold ms-5 sm:me-0 md:me-8">BUILD. BREAK.<br />LEARN.</h1>
                                        <p className="text-3xl text-center md:text-left font-thin ml-0 md:ml-8    mt-6 ">Precision learning built to turn complex concepts into clear understanding.</p>
                                        <div className="md:flex md:flex-row md:justify-start  md:ml-8 flex flex-col  gap mt-8    gap-6 " >
                                                <Button variant="secondary" className="md:w-full xl:w-62 h-16 p-4 text-4xl font-semibold hover:bg-cb-surface-muted hover:translate-y-0.5" onClick={handleSignUp}>Sign Up</Button>
                                                <Button variant="secondary" className="md:w-full xl:w-62 h-16 p-4 text-4xl font-semibold hover:bg-cb-surface-muted hover:translate-y-0.5" onClick={handleComeIn}>Come in</Button>
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