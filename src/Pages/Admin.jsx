import { useState } from "react"
import axios from "axios"
import AdminNavBar from "../NavBar/AdminNavBar"

export default function Admin() {
    const [activeTabs,setActiveTabs]=useState("create")
    const [checkAdmin, setCheckAdmin] = useState(() => {
        const token = localStorage.getItem("adminToken")
        return token ? false : true
    })
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const handleAdminPass = () => {
        axios.post("http://localhost:5000/admincheck", { password: password })
            .then((res) => {

                localStorage.setItem("adminToken", res.data.token)
                setCheckAdmin(false)
                setStatus("welcome admin")

            })
            .catch((err) => {
                if (err.response && err.response.data.message === "invalid token") {
                    setCheckAdmin(true)
                    setStatus("you are not Admin....Who are you??")
                }
                if (err.response.data.message === "you are not admin...are you?")
                    setStatus(err.response.data.message)
            })
    }

    return (
        <>
            {checkAdmin ?
                (
                    <>
                        <div className=" h-screen w-full flex flex-col justify-center items-center">
                            <h1 className="text-white text-xl">Enter Admin Password</h1>
                            <div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white mt-5 w-70 px-2 py-3 rounded-l border border-gray  hover:border-light" />
                                <button className="bg-gray-500 text-white hover:bg-black  font-bold py-3 rounded-r w-23" onClick={handleAdminPass}>Enter</button>
                                <p className="text-white">{status}</p>
                            </div>


                        </div>

                    </>
                ) :
                (
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-12   min-h-26  w-full bg-black border-b border-white " >

                            <AdminNavBar activeTabs={activeTabs} setActiveTabs={setActiveTabs}/>

                        </div>


                        <div className="w-full  flex flex-row justify-center overflow-y-auto  xl:mt-2">
                            {activeTabs==="create"&&<><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl">INPUT YOUR JSON HERE</h1>
                                <textarea className=" w-full min-h-96 px-2 mt-12 border text-white border-amber-50" placeholder="input block block types in json format" />
                                <button className="mt-7 text-black bg-white hover:bg-black hover:text-white h-19 border cursor-pointer border-white w-45" >Create</button>



                            </div></>}
                              {activeTabs==="read"&&<><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl">READ YOUR JSON HERE</h1>
                                <textarea className=" w-full min-h-96 px-2 mt-12 border text-white border-amber-50" placeholder="input block block types in json format" />
                                <button className="mt-7 text-black bg-white hover:bg-black hover:text-white h-19 border cursor-pointer border-white w-45" >Create</button>



                            </div></>}
                              {activeTabs==="update"&&<><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl">UPDATE YOUR JSON HERE</h1>
                                <textarea className=" w-full min-h-96 px-2 mt-12 border text-white border-amber-50" placeholder="input block block types in json format" />
                                <button className="mt-7 text-black bg-white hover:bg-black hover:text-white h-19 border cursor-pointer border-white w-45" >Create</button>



                            </div></>}
                              {activeTabs==="delete"&&<><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl">DELETE YOUR JSON HERE</h1>
                                <textarea className=" w-full min-h-96 px-2 mt-12 border text-white border-amber-50" placeholder="input block block types in json format" />
                                <button className="mt-7 text-black bg-white hover:bg-black hover:text-white h-19 border cursor-pointer border-white w-45" >Create</button>



                            </div></>}
                            
                        </div>



                    </>
                )}

        </>
    )
}