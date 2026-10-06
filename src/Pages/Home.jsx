import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddToBagButton from "../Components/ui/AddToBagButton"

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

export default function Home() {

    const [lessons, setLessons] = useState([])
    const [error, setError] = useState("")
    const [lessonFetchError, setLessonFetchError] = useState(false)
    const [search,setSearch]=useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios.get(`${apiBase}/gethomelessons`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLessons(res.data)
            })
            .catch((err) => {
                setLessonFetchError(true)
                setError(err.response?.data?.message || "Unable to fetch lessons")
                if (err.response?.data?.message === "no token found") {
                     localStorage.removeItem("token")
                     navigate("/signin")
                }

            })
    }, [navigate])
    const handleAddToBag = (lessonId) => {
        const token = localStorage.getItem("token")
        return axios.post(`${apiBase}/addtobag/${lessonId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
    }
    const handleSearch=(value)=>{
        const token= localStorage.getItem("token")
        axios.get(`${apiBase}/gethomelessons?search=${value}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then((res)=>{
            setLessons(res.data)
        })
        .catch((err) => {
                setLessonFetchError(true)
                setError(err.response?.data?.message || "Unable to fetch lessons")
                if (err.response?.data?.message === "no token found") {
                     localStorage.removeItem("token")
                     navigate("/signin")
                }

            })
    }
    const handleClear=()=>{
        const token =localStorage.getItem("token")
           axios.get(`${apiBase}/gethomelessons`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLessons(res.data)
            })
            .catch((err) => {
                setLessonFetchError(true)
                setError(err.response?.data?.message || "Unable to fetch lessons")
                if (err.response?.data?.message === "no token found") {
                     localStorage.removeItem("token")
                     navigate("/signin")
                }

            })

    }

    return (
        <>

            {lessonFetchError ?
                (<><h1 className='ms-10 text-white font-bold mt-10'>{error}</h1></>)



                :



                (<>
                    <div className="grid  grid-cols-1 md:grid-cols-10 lg:grid-cols-12 h-24 mt-5 ">
                        <div className="lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-2
                 ">
                            <div className=" p-5 md:p-3 flex flex-row justify-center items-center h-full">
                                <input className="bg-cb-surface h-14 ps-3 text-cb-ink w-2xl rounded-cb-md border border-cb-border" placeholder="live search" value={search} onChange={(e)=>{
                                    const value =e.target.value
                                    setSearch(value)
                                    
                                    if(value===""){
                                       handleClear()
                                    }
                                    else{
                                        handleSearch(value)
                                    }

                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12  p-3 sm:me-3 md:ms-5 min-h-screen md:gap-2 ">

                        {lessons.map((lesson, index) => {
                            const isLarge = index % 4 === 0 || index % 4 === 3

                            return (
                                <div key={lesson._id} className={`${isLarge ? "xl:col-span-8 lg:col-span-6 col-span-12" : "xl:col-span-4 lg:col-span-6 col-span-12"} min-h-60 max-h-70.5 mt-5 md:ms-3 relative bg-cb-surface rounded-cb-md p-5 flex flex-col justify-between gap-6`}>
                                    <div className="pr-14">
                                        <h1 className="font-heading line-clamp-2 text-cb-ink font-bold text-3xl sm:text-4xl leading-tight border-b-2 border-cb-ink pb-">
                                            {lesson.title}
                                        </h1>
                                        <p className="line-clamp-3 text-cb-muted font-light mt-4 leading-relaxed">
                                            {lesson.synopsis?.tagline}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between gap-4 pr-14">
                                        <p className="text-cb-ink">
                                            price : <span className="text-cb-ink font-semibold">{lesson.isDemo ? "Demo" : lesson.isFree ? "Free" : `Rs. ${lesson.price}`}</span>
                                        </p>
                                    </div>

                                    <div className="absolute top-3 right-3 md:right-5 justify-center items-center flex flex-col gap-2">
                                        <AddToBagButton
                                            itemName={lesson.title}
                                            onAdd={() => handleAddToBag(lesson._id)}
                                            onAdded={() => navigate("/app/bag", {
                                                state: {
                                                    addNotice: {
                                                        title: lesson.title,
                                                        addedAt: Date.now(),
                                                    },
                                                },
                                            })}
                                        />
                                    </div>
                                </div>

                            )

                        })}



                    </div>
                </>
                )



            }
        </>


    )
}
