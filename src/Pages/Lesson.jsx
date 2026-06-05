import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Lesson() {
  const [yourLesson, setYourLesson] = useState([])
  const [lessonErr,setLessonErr]=useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")

    axios.get(`${apiBase}/getyourlessons`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
       
        setYourLesson(res.data)

  if (res.data.length === 0) {
    setLessonErr("Purchase a lesson first")
  }
      })
      .catch((err)=>{
       
          if(err.response.status===404){
             setLessonErr("no user found")

        }
        if(err.response.status===500){
          setLessonErr("server error")
        }

      })

  }, [])
  const navigate = useNavigate()
  const handleLearn = (id) => {
    navigate(`/learn/${id}`)
  }

  return (
    <>


      {lessonErr?(<>
      
      <h1 className="ms-10">{lessonErr}</h1>
      </>
      ):(
        
        <>
      <div className=" grid grid-cols-12 gap-5 p-5 md:p-0 md:ms-15 ms-0 sm:ms-10 mt-5 ">
        {yourLesson.map((lesson) => (
          <div key={lesson._id} className="col-span-12 min-h-65 gap-y-5 p-5 sm:col-span-6 rounded-xl md:col-span-6  bg-white lg:col-span-4 ">
            <div className="w-full ">
              <h1 className="border-o  text-bold  text-xl border-b-2 p-1 line-clamp-1">{lesson.title} </h1>
            </div>
            <div className="w-full h-25 pt-3 mt-3">
              <p className="text-gray-700 font-light text-md line-clamp-4"> {lesson.synopsis?.tagline} </p>
            </div>
            <button className="bg-black w-full mt-10 text-white h-15"  onClick={()=>{handleLearn(lesson._id)}}>Learn</button>
           </div>
        ))}
      </div>

      
      
      
      </>
    )}


    </>
  )
}
