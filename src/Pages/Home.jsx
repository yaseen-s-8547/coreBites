import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [lessons, setLessons] = useState([])
    const [error, setError] = useState("")
    const [lessonFetchError, setLessonFetchError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios.get("http://localhost:5000/gethomelessons", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLessons(res.data)
            })
            .catch((err) => {
                setLessonFetchError(true)
                setError(err.response?.data?.message || "Unable to fetch lessons")
                if (err.response?.data?.message === "no token found") {
                     navigate("/signin")
                }

            })
    }, [])
    const handleAddToBag = (lessonId) => {
        const token = localStorage.getItem("token")
        axios.post(`http://localhost:5000/addtobag/${lessonId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data.message)
            })
            .catch((err) => {
                console.log(err.response.data.message)
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
                                <input className="bg-white h-14 ps-3 text-black w-2xl rounded-lg border border-black" placeholder="live search" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 p-3 sm:me-3 md:ms-5 min-h-screen md:gap-2 ">

                        {lessons.map((lesson, index) => {
                            const isLarge = index % 4 === 0 || index % 4 === 3

                            return (
                                <div key={lesson._id} className={`${isLarge ? "xl:col-span-8 lg:col-span-6 col-span-12" : "xl:col-span-4 lg:col-span-6 col-span-12"} min-h-[320px] mt-5 md:ms-3 relative bg-white rounded-xl p-5 flex flex-col justify-between gap-6`}>
                                    <div className="pr-14">
                                        <h1 className="line-clamp-2 text-black font-bold text-3xl sm:text-4xl leading-tight border-b-2 border-black pb-3">
                                            {lesson.title}
                                        </h1>
                                        <p className="line-clamp-3 text-gray-700 font-light mt-4 leading-relaxed">
                                            {lesson.synopsis?.tagline}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between gap-4 pr-14">
                                        <p className="text-black">
                                            price : <span className="text-green-700 font-semibold">{lesson.isDemo ? "Demo" : lesson.isFree ? "Free" : `Rs. ${lesson.price}`}</span>
                                        </p>
                                    </div>

                                    <div className="absolute top-3 right-3 md:right-5 justify-center items-center flex flex-col gap-2">
                                        <button className="bg-black text-white flex items-center justify-center h-8 w-8 font-bold rounded-xl hover:bg-gray-500 hover:text-white" ><FontAwesomeIcon onClick={() => handleAddToBag(lesson._id)} icon={faBriefcase} className='text-white' /></button>
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
