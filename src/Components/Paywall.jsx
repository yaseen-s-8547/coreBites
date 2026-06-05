import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Paywall() {
    const { id } = useParams()
    const [lesson, setLesson] = useState([])
    const [buyStatus, setBuyStatus] = useState(null)
    const[isBuying,setIsBuying]=useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${apiBase}/buyinglessondetails/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLesson(res.data)
            })
    }, [id])

    const navigate = useNavigate()
    const handleBuyLesson = (id) => {
        setIsBuying(true)
        const token = localStorage.getItem("token")
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

            <div className="w-full flex justify-center  px-12 sm:px-5   min-h-screen bg-[radial-gradient(circle_at_7%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)]">

                <div className="w-full  flex flex-col gap-5 max-w-3xl mt-27 min-h-96   max-h-112.5 bg-white rounded-xl shadow "  >
                    <div className=" mt-3 p-9 ps-3 border-b-2  border-black line-clamp-1 text-2xl font-bolder">
                        <h1 className="text-left">Title: {lesson?.title}</h1>
                    </div>
                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md"><span className="text-xl font-bold">Synopsis:  </span>{lesson?.synopsis?.tagline}</p>

                    </div>

                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md"><span className="text-xl font-bold">What you Will Learn:  </span>{lesson?.synopsis?.whatYouWillLearn}</p>
                    </div>
                    <div className="ps-5 pe-5 pt-3">
                        <p className="font-bold text-md"><span className="text-xl font-bold">Estimated Time: </span>{lesson?.synopsis?.estimatedTime}</p>

                    </div>
                    <div className="ps-5 pe-5 pt-3">
                        <p>Price:<span className="text-green-700">{lesson?.price}</span> </p>
                    </div>
                    <button className="bg-green-700 hover:bg-red-700 text-white hover:text-white rounded-t-none w-full max-w-3xl rounded-xl shadow p-5 " onClick={() => handleBuyLesson(lesson._id)}>{isBuying?<p>loading....</p>:buyStatus || <p>Buy Now</p>}</button>

                </div>



            </div>
        </>
    )
}