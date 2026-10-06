import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios, { getAccessToken } from "../api"
import { useNavigate } from "react-router-dom"
import Button from "./ui/Button"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Paywall() {
    const { id } = useParams()
    const [lesson, setLesson] = useState([])
    const [buyStatus, setBuyStatus] = useState(null)
    const[isBuying,setIsBuying]=useState(false)
    useEffect(() => {
        const token = getAccessToken()
        axios.get(`${apiBase}/buyinglessondetails/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLesson(res.data)
            })
    }, [id])

    const navigate = useNavigate()
    const handleBuyLesson = (id) => {
        setIsBuying(true)
        const token = getAccessToken()
        axios.post(`${apiBase}/buyalesson/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setIsBuying(true)
                 setTimeout(() => {
                 setBuyStatus(res.data.message) 

                 navigate("/app/lesson")   
                },2000);
                
                
                
            })
            .catch((err) => {
                setIsBuying(false)
                setTimeout(()=>{
                    setBuyStatus(err.response.data.message)
                })
                
            })
    }

    return (
        <>

            <div className="w-full flex justify-center p-5 sm:px-5 min-h-screen bg-cb-atmosphere-subtle">

                <div className="flex flex-col gap-4 max-w-3xl md:mt-27 self-start bg-cb-surface rounded-xl shadow-cb-sm">
                    <div className="p-7 ps-3 pb-6 border-b-2 border-cb-ink line-clamp-1 text-2xl font-bolder">
                        <h1 className="font-heading text-left text-sm font-bold md:text-lg">Title: {lesson?.title}</h1>
                    </div>
                    <div className="ps-5 pe-5 pt-3 ">
                        <p className="font-bold text-md line-clamp-2 md:line-clamp-6"><span className="text-xl font-bold">Synopsis:  </span>{lesson?.synopsis?.tagline}</p>

                    </div>

                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md line-clamp-5 md:line-clamp-6"><span className="text-xl font-bold">What you Will Learn:  </span>{lesson?.synopsis?.whatYouWillLearn}</p>
                    </div>
                    <div className="ps-5 pe-5 pt-3  mt-3 ">
                        <p className="font-bold text-md"><span className="text-xl font-bold">Estimated Time: </span>{lesson?.synopsis?.estimatedTime}</p>

                    </div>
                    <div className="ps-5 pe-5  md:pt-3 ">
                        <p>Price:<span className="text-cb-ink"> {lesson?.price}</span> </p>
                    </div>
                    <Button size="lg" className="w-full max-w-3xl rounded-t-none rounded-b-cb-md" onClick={() => handleBuyLesson(lesson._id)}>{isBuying?<p>loading....</p>:buyStatus || <p>Buy Now</p>}</Button>

                </div>



            </div>
        </>
    )
}