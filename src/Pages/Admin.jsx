import { useState, useEffect } from "react"
import axios from "axios"
import AdminNavBar from "../NavBar/AdminNavBar"

export default function Admin() {
    const [activeTabs, setActiveTabs] = useState("create")
    const [checkAdmin, setCheckAdmin] = useState(true)
    const [createStatus, setCreateStatus] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const [lesson, setLesson] = useState("")
    const [lessonCard, setLessonCard] = useState([])
    const [lessonFetchError, setLessonFetchError] = useState(null)

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
    const handleLessonCreate = () => {
        const token = localStorage.getItem("adminToken")
        let parsedData

        try {
            parsedData = JSON.parse(lesson)
        } catch (err) {
            console.log(err)
            setCreateStatus("Invalid JSON format")
            return
        }

        if (!parsedData.title || !parsedData.topic || !parsedData.synopsis || !parsedData.blocks) {
            setCreateStatus("Missing required fields")
            return
        }

        axios.post("http://localhost:5000/lessons", parsedData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setCreateStatus(res.data.message)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("adminToken")
                    setCheckAdmin(true)
                    setStatus("Session expired. Enter password again.")
                    return
                }
                setCreateStatus(err.response.data.message || "something went wrong ")
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (activeTabs === "read") {
            axios.get("http://localhost:5000/getlessondetails", { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setLessonCard(response.data)
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        setLessonFetchError("unauthorized-login again")
                    }
                    else if (err.response?.status === 404) {
                        setLessonFetchError("lesson not found")
                    }
                    else {
                        setLessonFetchError("failed to fetch lessons")
                    }

                })
        }
    }, [activeTabs])
    


    
    return (
        <>
            {checkAdmin ?
                (
                    <>
                        <div className=" h-screen w-full flex flex-col justify-center items-center">
                            <h1 className="text-white text-xl">Enter Admin Password</h1>
                            <div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white mt-5 w-full md:w-52 px-2 py-3 rounded-l border border-gray  hover:border-light" />
                                <button className="bg-gray-500 text-white w-full hover:bg-black  font-bold py-3 rounded-r md:w-23" onClick={handleAdminPass}>Enter</button>
                                <p className="text-white">{status}</p>
                            </div>


                        </div>

                    </>
                ) :
                (
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-12   min-h-26  w-full bg-black border-b border-white " >

                            <AdminNavBar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

                        </div>


                        <div className="w-full  flex flex-row justify-center overflow-y-auto  xl:mt-1">
                            {activeTabs === "create" && <><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl ">INPUT YOUR JSON HERE</h1>
                                <textarea value={lesson} onChange={(e) => setLesson(e.target.value)} className=" w-full min-h-96 px-2 mt-12 border text-white border-amber-50" placeholder="input block block types in json format" />
                                <button onClick={handleLessonCreate} className="mt-7 text-black bg-white hover:bg-black hover:text-white h-19 border cursor-pointer border-white w-45" >Create</button>
                                <p className="text-white">{createStatus}</p>



                            </div></>}



                            {activeTabs === "read" && (
                                lessonFetchError === null ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full px-7 py-6">
                                        {lessonCard.map((info) => (
                                            <div key={info._id} className="flex flex-col border border-gray-300 rounded-xl bg-white p-5 hover:bg-gray-100 cursor-pointer">
                                                <h1 className="text-2xl font-extrabold text-black border-b border-gray-200 pb-3">
                                                    {info.title}
                                                </h1>
                                                <p className="text-gray-600 mt-3 text-sm font-medium">
                                                    <span className="font-bold text-gray-800">Synopsis: </span>
                                                    {info.synopsis.tagline}
                                                </p>
                                                <button className="mt-6 bg-black text-white font-bold py-3 rounded-md hover:bg-white hover:text-black border border-black cursor-pointer" >
                                                    Preview
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h1 className="text-white text-xl font-bold">{lessonFetchError}</h1>
                                )
                            )}


                        </div>



                    </>
                )}

        </>
    )
}