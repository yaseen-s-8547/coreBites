import { useState, useEffect } from "react"
import axios from "axios"
import AdminNavBar from "../NavBar/AdminNavBar"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
export default function Admin() {
    const navigate = useNavigate()
    const [activeTabs, setActiveTabs] = useState("create")
    const [checkAdmin, setCheckAdmin] = useState(true)
    const [createStatus, setCreateStatus] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const [lesson, setLesson] = useState("")
    const [lessonCard, setLessonCard] = useState([])
    const [lessonFetchError, setLessonFetchError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectEditId, setSelectEditId] = useState(null)
    const [currJson, setCurrJson] = useState("")
    const handleAdminPass = () => {
        axios.post("http://localhost:5000/admincheck", { password: password })
            .then((res) => {
                
                if (res.data && res.data.token) {
                    localStorage.setItem("adminToken", res.data.token)
                    setCheckAdmin(false)
                    setStatus("welcome admin")
                    setPassword("")
                } else {
                    setCheckAdmin(true)
                    setStatus("Invalid response from server")
                }
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    if (err.response.data.message === "invalid token") {
                        setCheckAdmin(true)
                        setStatus("you are not Admin....Who are you??")
                    } else {
                        setStatus(err.response.data.message || "Authentication failed")
                    }
                } else {
                    setCheckAdmin(true)
                    setStatus("Connection error. Please try again.")
                }
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("adminToken")

        if (token) {
            setCheckAdmin(false)
            setStatus("welcome back admin")
        }
       
    }, [])
    const handleLessonCreate = () => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            setCreateStatus("Session expired. Enter password again.")
            setCheckAdmin(true)
            return
        }
        let parsedData

        try {
            parsedData = JSON.parse(lesson)
        } catch (err) {
            console.log(err)
            setCreateStatus("Invalid JSON format")
            return
        }

        if (!parsedData.title || !parsedData.topic || !parsedData.synopsis || !parsedData.sections) {
            setCreateStatus("Missing required fields")
            return
        }

        axios.post("http://localhost:5000/lessons", parsedData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setCreateStatus(res.data.message)
                setLesson("")
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("adminToken")
                    setCheckAdmin(true)
                    setStatus("Session expired. Enter password again.")
                    return
                }
                setCreateStatus(err.response?.data?.message || "something went wrong ")
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (activeTabs === "read") {
            
            if (!token) {
                setLessonFetchError("unauthorized-login again")
                setCheckAdmin(true)
                return
            }
            axios.get("http://localhost:5000/getlesson", { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setLessonCard(response.data)
                    setLessonFetchError(null)
                })
                .catch((err) => {
                    if (err.response?.status === 401) {
                        localStorage.removeItem("adminToken")
                        setLessonFetchError("unauthorized-login again")
                        setCheckAdmin(true)
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

    const handleDeleteModal = (id) => {
        setModalOpen(true)
        setSelectedId(id)
    }
    const handleDeleteLesson = () => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            setStatus("Session expired. Enter password again.")
            setCheckAdmin(true)
            return
        }
        axios.delete(`http://localhost:5000/deletelesson/${selectedId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data.message)

                setLessonCard(prev => prev.filter((item) => item._id !== selectedId))
                setModalOpen(false)
                setSelectedId(null)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("adminToken")
                    setCheckAdmin(true)
                    setStatus("Session expired. Enter password again.")
                } else {
                    console.log(err.response?.data.message)
                }
            })

    }
    const handleEditModal = (id) => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            setStatus("Session expired. Enter password again.")
            setCheckAdmin(true)
            return
        }
        setSelectEditId(id)
        setEditModalOpen(true)
        axios.get(`http://localhost:5000/getcurrentjson/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setCurrJson(JSON.stringify(res.data, null, 2))
                console.log(res.data)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("adminToken")
                    setCheckAdmin(true)
                    setStatus("Session expired. Enter password again.")
                } else {
                    console.log(err)
                    setStatus("Failed to load lesson")
                }
            })
    }
    const handleEditCancel = () => {
        setEditModalOpen(false)
    }
    const handleEditSave = () => {
        let parsed

        try {
            parsed = JSON.parse(currJson)
        } catch (err) {
            console.log(err)
            setStatus("Invalid JSON")
            return
        }

        if (!parsed.title || !parsed.topic || !parsed.synopsis || !parsed.sections) {
            setStatus("Missing required fields")
            return
        }

        const token = localStorage.getItem("adminToken")
        if (!token) {
            setStatus("Session expired. Enter password again.")
            setCheckAdmin(true)
            return
        }

        axios.put(
            `http://localhost:5000/updatelesson/${selectEditId}`,
            parsed,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
            console.log(res.data.message)

            setEditModalOpen(false)
            setSelectEditId(null)
           

            
            setLessonCard(prev =>
                prev.map(item =>
                    item._id === selectEditId ? { ...item, ...parsed } : item
                )
            )
            setStatus("Lesson updated successfully")
        })
        .catch((err) => {
            if (err.response?.status === 401) {
                localStorage.removeItem("adminToken")
                setCheckAdmin(true)
                setStatus("Session expired. Enter password again.")
            } else {
                console.log(err)
                setStatus("Update failed")
            }
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
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white mt-5 w-full md:w-52 px-2 py-3 rounded-l border border-gray  hover:border-light" />
                                <button className="bg-gray-500 text-white w-full hover:bg-black  font-bold py-3 rounded-r md:w-23" onClick={handleAdminPass}>Enter</button>
                                <p className="text-white">{status}</p>
                            </div>


                        </div>

                    </>
                ) :
                (
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-12 md:ms-4  lg:ms-0   min-h-26  w-full bg-black border-b border-white " >

                            <AdminNavBar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

                        </div>


                        <div className="w-full  bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)]  flex flex-row justify-center overflow-y-auto min-h-screen">
                            {activeTabs === "create" && <><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl ">INPUT YOUR JSON HERE</h1>
                                <textarea value={lesson} onChange={(e) => setLesson(e.target.value)} className=" w-full min-h-96 px-2 mt-12 border text-white border-amber-50" placeholder="input block block types in json format" />
                                <button onClick={handleLessonCreate} className="mt-7 text-black bg-white hover:bg-black hover:text-white h-19 border cursor-pointer border-white w-45" >Create</button>
                                <p className="text-white">{createStatus}</p>



                            </div></>}



                            {activeTabs === "read" && (
                                lessonFetchError === null ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:ms-4 xl:grid-cols-3 gap-6 w-full px-7 py-6">
                                        {lessonCard.map((info) => (
                                            <div key={info._id} className="min-h-[290px] flex flex-col justify-between gap-5 border border-gray-300 rounded-xl bg-white p-5 hover:bg-gray-100 cursor-pointer relative">
                                                <div>
                                                <div className="border-b border-gray-200 pb-3 pr-10">
                                                    <h1 className="line-clamp-2 text-2xl font-extrabold text-black leading-tight">
                                                    {info.title}
                                                    </h1>
                                                    <span className="text-green-700 text-sm "> price:{info.isDemo?"Demo":info.isFree?"Free":`₹${info.price}`}</span>
                                                </div>
                                                
                                                <FontAwesomeIcon icon={faTrash} className="absolute top-5 right-5 sm:right-1 hover:text-red-700" onClick={() => handleDeleteModal(info._id)} />
                                                <FontAwesomeIcon icon={faPenToSquare} className="absolute top-10 right-5 sm:right-1 hover:text-blue-900" onClick={() => handleEditModal(info._id)} />
                                                <p className="line-clamp-3 text-gray-600 mt-3 text-sm font-medium leading-relaxed">
                                                    <span className="font-bold text-gray-800">Synopsis: </span>
                                                    {info.synopsis?.tagline}
                                                </p>
                                                </div>
                                                <button className="mt-6 bg-black text-white font-bold py-3 rounded-md hover:bg-white hover:text-black border border-black cursor-pointer" onClick={() => navigate(`preview/${info._id}`)}>
                                                    Preview
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h1 className="text-white text-xl font-bold">{lessonFetchError}</h1>
                                )
                            )}

                            {modalOpen && (<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                                <div className="bg-white p-6 rounded-lg w-80 shadow-lg">

                                    <h2 className="text-lg font-bold mb-4">
                                        Are you sure you want to delete?
                                    </h2>

                                    <div className="flex justify-end gap-3">

                                        <button className="hover:bg-black hover:text-white p-4 "
                                            onClick={() => setModalOpen(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="hover:bg-red-700 hover:text-white p-4 hover:font-bold "
                                            onClick={() => handleDeleteLesson(selectedId)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>


                            </div>)}
                            {editModalOpen && (
                                <>
                                    <div className="fixed inset-0 flex justify-center items-center lg:ms-10 md:ms-20 sm:ms-55 ">
                                        <div className="bg-white md:w-md  sm:w-sm  lg:w-lg xl:w-2xl h-9/10 p-4 md:p-4 rounded-lg shadow-lg flex flex-col justify-center gap-4 items-center">
                                            <h1 className="font-bold text-4xl text-black border border-b-2 border-t-0 border-l-0 border-r-0 border-gray-500">Edit</h1>
                                            <textarea className="bg-black border text-white border-amber-50 h-full w-full placeholder-amber-100" placeholder="edit json" value={currJson} onChange={(e) => setCurrJson(e.target.value)} />
                                            <div className="flex flex-row justify-center items-center gap-5">
                                                <button className="w-25 h-20 bg-black text-white rounded shadow-lg hover:text-black hover:bg-gray-500 hover:text-xl" onClick={handleEditSave} >Save</button>
                                                <button className="w-25 h-20 bg-black text-white rounded shadow-lg  hover:text-black hover:bg-gray-500 hover:text-xl" onClick={handleEditCancel} >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}


                        </div>



                    </>
                )}

        </>
    )
}
