import { useState, useEffect, useCallback } from "react"
import axios, { getAccessToken } from "../api"
import AdminNavBar from "../NavBar/AdminNavBar"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import Tooltip from "../Components/ui/Tooltip"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Admin() {
    const navigate = useNavigate()
    const [activeTabs, setActiveTabs] = useState("create")
    // The route guard restores and validates the admin session before this page mounts.
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [createStatus, setCreateStatus] = useState("")
    const [lesson, setLesson] = useState("")
    const [lessonCard, setLessonCard] = useState([])
    const [lessonFetchError, setLessonFetchError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectEditId, setSelectEditId] = useState(null)
    const [currJson, setCurrJson] = useState("")

    // The shared API client handles expired access tokens; this is a final UI fallback.
    const handleUnauthorized = useCallback(() => {
        setIsAuthenticated(false)
        navigate("/adminSignin")
    }, [navigate])

    useEffect(() => {
        // Protected API requests carry the in-memory access token through the shared client.
        const token = getAccessToken()

        if (!token) {
            navigate("/adminSignin")
            return
        }

        // This state transition happens only after the mount-time token check succeeds.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAuthenticated(true)
    }, [navigate])

    const handleLessonCreate = () => {
        const token = getAccessToken()
        if (!token) {
            handleUnauthorized()
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

        axios.post(`${apiBase}/lessons`, parsedData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setCreateStatus(res.data.message)
                setLesson("")
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    // A rejected token is handled the same way for every protected admin request.
                    handleUnauthorized()
                    return
                }
                setCreateStatus(err.response?.data?.message || "something went wrong ")
            })
    }

    useEffect(() => {
        const token = getAccessToken()
        if (activeTabs === "read") {
            
            if (!token) {
                // There is no token to clear; redirect before attempting the protected request.
                navigate("/adminSignin")
                return
            }
            axios.get(`${apiBase}/getlesson`, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setLessonCard(response.data)
                    setLessonFetchError(null)
                })
                .catch((err) => {
                    if (err.response?.status === 401) {
                        handleUnauthorized()
                    }
                    else if (err.response?.status === 404) {
                        setLessonFetchError("lesson not found")
                    }
                    else {
                        setLessonFetchError("failed to fetch lessons")
                    }

                })
        }
    }, [activeTabs, handleUnauthorized, navigate])

    const handleDeleteModal = (id) => {
        setModalOpen(true)
        setSelectedId(id)
    }
    const handleDeleteLesson = () => {
        const token = getAccessToken()
        if (!token) {
            handleUnauthorized()
            return
        }
        axios.delete(`${apiBase}/deletelesson/${selectedId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data.message)

                setLessonCard(prev => prev.filter((item) => item._id !== selectedId))
                setModalOpen(false)
                setSelectedId(null)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    handleUnauthorized()
                } else {
                    console.log(err.response?.data.message)
                }
            })

    }
    const handleEditModal = (id) => {
        const token = getAccessToken()
        if (!token) {
            handleUnauthorized()
            return
        }
        setSelectEditId(id)
        setEditModalOpen(true)
        axios.get(`${apiBase}/getcurrentjson/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setCurrJson(JSON.stringify(res.data, null, 2))
                console.log(res.data)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    handleUnauthorized()
                } else {
                    console.log(err)
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
            return
        }

        if (!parsed.title || !parsed.topic || !parsed.synopsis || !parsed.sections) {
            return
        }

        const token = getAccessToken()
        if (!token) {
            handleUnauthorized()
            return
        }

        axios.put(
            `${apiBase}/updatelesson/${selectEditId}`,
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
        })
        .catch((err) => {
            if (err.response?.status === 401) {
                handleUnauthorized()
            } else {
                console.log(err)
            }
        })
    }

    
    if (!isAuthenticated) {
        return null
    }

    return (
        <>
                        <div className="grid grid-cols-1 md:grid-cols-12 md:ms-4 lg:ms-0 min-h-26 w-full bg-cb-ink border-b border-white/20">

                            <AdminNavBar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

                        </div>


                        <div className="w-full bg-cb-atmosphere flex flex-row justify-center overflow-y-auto min-h-screen">
                            {activeTabs === "create" && <><div className="flex flex-col w-68 sm:w-72 md:w-2/4 min-h-96 mt-7 justify-center items-center">

                                <h1 className="text-white text-3xl ">INPUT YOUR JSON HERE</h1>
                                <textarea value={lesson} onChange={(e) => setLesson(e.target.value)} className="w-full min-h-96 px-2 mt-12 border text-white border-cb-border" placeholder="input block block types in json format" />
                                <button onClick={handleLessonCreate} className="mt-7 text-cb-ink bg-cb-surface hover:bg-cb-surface-muted h-19 border cursor-pointer border-cb-border w-45">Create</button>
                                <p className="text-white">{createStatus}</p>



                            </div></>}



                            {activeTabs === "read" && (
                                lessonFetchError === null ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:ms-4 xl:grid-cols-3 gap-6 w-full px-7 py-6">
                                        {lessonCard.map((info) => (
                                            <div key={info._id} className="relative flex min-h-72.5 flex-col justify-between gap-5 rounded-cb-md border border-cb-border bg-cb-surface p-4 transition-colors hover:bg-cb-surface-muted sm:p-5">
                                                <div className="min-w-0">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Tooltip label="Edit this lesson" position="bottom">
                                                            <button
                                                                type="button"
                                                                aria-label={`Edit ${info.title}`}
                                                                className="flex size-10 items-center justify-center rounded-cb-sm text-cb-muted transition-colors hover:bg-cb-border hover:text-cb-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus"
                                                                onClick={() => handleEditModal(info._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faPenToSquare} aria-hidden="true" />
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip label="Delete this lesson" position="bottom">
                                                            <button
                                                                type="button"
                                                                aria-label={`Delete ${info.title}`}
                                                                className="flex size-10 items-center justify-center rounded-cb-sm text-cb-muted transition-colors hover:bg-red-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus"
                                                                onClick={() => handleDeleteModal(info._id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="mt-2 min-w-0 border-b border-cb-border pb-3">
                                                        <h2 className="wrap-break-word font-heading text-xl font-extrabold leading-tight text-cb-ink sm:text-2xl">
                                                            {info.title}
                                                        </h2>
                                                        <span className="mt-1 inline-block text-sm text-cb-ink">
                                                            Price: {info.isDemo ? "Demo" : info.isFree ? "Free" : `₹${info.price}`}
                                                        </span>
                                                    </div>
                                                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-cb-muted">
                                                        <span className="font-bold text-cb-ink">Synopsis: </span>
                                                        {info.synopsis?.tagline}
                                                    </p>
                                                </div>
                                                <button className="mt-6 bg-cb-primary text-cb-primary-contrast font-bold py-3 rounded-cb-sm hover:bg-cb-surface hover:text-cb-ink border border-cb-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-focus" onClick={() => navigate(`/admin/preview/${info._id}`)}>
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

                                <div className="bg-cb-surface p-6 rounded-cb-md w-80 shadow-cb-sm">

                                    <h2 className="text-lg font-bold mb-4">
                                        Are you sure you want to delete?
                                    </h2>

                                    <div className="flex justify-end gap-3">

                                        <button className="hover:bg-cb-ink hover:text-white p-4"
                                            onClick={() => setModalOpen(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="hover:bg-cb-ink hover:text-white p-4 hover:font-bold"
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
                                        <div className="bg-cb-surface md:w-md sm:w-sm lg:w-lg xl:w-2xl h-9/10 p-4 md:p-4 rounded-cb-md shadow-cb-sm flex flex-col justify-center gap-4 items-center">
                                            <h1 className="font-heading font-bold text-4xl text-cb-ink border border-b-2 border-t-0 border-l-0 border-r-0 border-cb-border">Edit</h1>
                                            <textarea className="bg-cb-ink border text-white border-cb-border h-full w-full placeholder-white/60" placeholder="edit json" value={currJson} onChange={(e) => setCurrJson(e.target.value)} />
                                            <div className="flex flex-row justify-center items-center gap-5">
                                                <button className="w-25 h-20 bg-cb-primary text-cb-primary-contrast rounded-cb-sm shadow-cb-sm hover:text-cb-ink hover:bg-cb-surface-muted hover:text-xl" onClick={handleEditSave}>Save</button>
                                                <button className="w-25 h-20 bg-cb-primary text-cb-primary-contrast rounded-cb-sm shadow-cb-sm hover:text-cb-ink hover:bg-cb-surface-muted hover:text-xl" onClick={handleEditCancel}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}


                        </div>



        </>
    )
}
