import axios, { getAccessToken } from "../api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../Components/ui/Button"
import Card from "../Components/ui/Card"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Lesson() {
  const [yourLesson, setYourLesson] = useState([])
  const [lessonErr,setLessonErr]=useState("")
  useEffect(() => {
    const token = getAccessToken()

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
      {lessonErr ? (
        <h1 className="ms-10">{lessonErr}</h1>
      ) : (
        <div className="grid grid-cols-1 gap-cb-4 sm:grid-cols-2 xl:grid-cols-3">
          {yourLesson.map((lesson) => (
            <Card
              key={lesson._id}
              className="flex h-full flex-col gap-cb-4 text-cb-ink"
            >
              <h2 className="break-words border-b border-cb-border pb-cb-3 text-cb-xl font-cb-bold leading-cb-tight text-cb-ink">
                {lesson.title}
              </h2>
              <p className="text-cb-sm leading-cb-relaxed text-cb-muted">
                {lesson.synopsis?.tagline}
              </p>
              <div className="mt-auto border-t border-cb-border pt-cb-4">
                <Button
                  className="w-full"
                  onClick={() => handleLearn(lesson._id)}
                >
                  Learn
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
