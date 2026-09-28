import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../Components/ui/Button"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Bag() {

    const [bag, setBag] = useState([])
    const [bagErr, setBagErr] = useState("")
    const [isBag, setIsBag] = useState(true)
    const [isModalId ,setIsModalId]=useState(null)
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${apiBase}/getbag`,  { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log("BAG DATA:", res.data)
                setBag(res.data)
                setIsBag(true)
                
            })
            .catch((err) => {
                setBagErr(err.response.data.message || "unable to fetch bag")
                setIsBag(false)

            })
    }, [])
    const handleDeleteModalOpen=(id)=>{
        setIsModalId(id)

    }
    const handleDeleteModalClose=()=>{
        setIsModalId(null)
    }

   const handleDeleteBagItem=(id)=>{
         const token = localStorage.getItem("token")
         axios.delete(`${apiBase}/deletebagitem/${id}`,{headers:{Authorization:`Bearer ${token}`}})
         .then((res)=>{
            setBag(prev=>prev.filter((item)=>item.lessonId?._id!==res.data.id)  )
            setIsModalId(null)
         })
         .catch((err)=>{
            setBagErr(err.response.data.message)
         })
         
   }
   const navigate = useNavigate()
   const handlePurchase=(id)=>{
       navigate(`/paywall/${id}`)
        
   }





    return (
        <>

            <div className="grid grid-cols-12  ms-10 h-25 mt-2 ">
                <div className="lg:col-span-2 md:col-span-1"></div>
                <div className="col-span-12  lg:col-span-8 md:col-span-10 ">
                    <div className="flex flex-row justify-start md:justify-center  md:me-0  items-center w-full h-full">
                        <h1 className="  text-2xl md:text-5xl font-bold  text-white border-b-2 pb-3  border-white"><FontAwesomeIcon icon={faBriefcase} className='text-white' /> Your Bag</h1>
                    </div>
                </div>
                <div className="lg:col-span-2 md:col-span-1"></div>
            </div>

            {isBag === false ? (

                <>
                    <h1 className="ms-10 mt-10 font-bold   md:text-xl text-center text-white mx-auto ">{bagErr}</h1>
                </>

            )
                :
                (
                    <>
                        
                            <div className="grid grid-cols-1 lg:grid-cols-12 relative  p-5 sm:mt-4 sm:p-5 sm:me-5 gap-4 md:ms-10 md:p-5  min-h-[290px]    ">

                                {bag.map((bag) => (
                                <div key={bag.lessonId?._id} className="col-span-4 lg:col-span-6 xl:col-span-4 relative min-w-0 flex justify-center flex-col gap-4 p-8 overflow-hidden rounded-cb-md bg-cb-surface">
                                    <h1 className='font-heading text-2xl w-full font-bold text-cb-ink line-clamp-1 ps-2 pb-1 border-b border-cb-border'>{bag.lessonId?.title}</h1>
                                    <p className='text-md font-light text-cb-muted line-clamp-6 ps-2'><span className='text-cb-ink font-bold'>Synopsis</span> : {bag.lessonId?.synopsis?.tagline}</p>
                                    <h1 className='ps-2 text-lg font-bold text-cb-ink'>price:<span className='text-cb-ink'> ₹ {bag.lessonId.price}</span></h1>
                                    <Button size="lg" className="w-full h-15 rounded-xl" onClick={() => handlePurchase(bag.lessonId?._id)}>purchase</Button>
                                    <FontAwesomeIcon icon={faTrash} className="absolute top-5 right-5 sm:right-3 text-cb-muted hover:text-cb-ink" onClick={() => handleDeleteModalOpen(bag.lessonId._id)} />
                                     {isModalId===bag.lessonId._id &&(<><div className="w-60 h-30 bg-cb-ink text-white absolute right-5 top-12 rounded-xl shadow ">
                                        <h1 className='p-5'>Are you sure...</h1>
                                        <div className="flex flex-row items-center gap-5  ps-5 pe-5 justify-center">
                                            <button className='bg-cb-surface hover:bg-cb-surface-muted rounded-xl text-cb-ink p-3 font-bold w-1/2' onClick={()=>handleDeleteBagItem(bag.lessonId._id)}>yes</button>
                                            <button className='bg-cb-ink hover:bg-cb-surface hover:text-cb-ink text-white p-3 rounded-xl font-bold w-1/2' onClick={handleDeleteModalClose}>No</button>
                                        </div>
                                     </div></>
                                    
                                    )}
                                    

                                </div>
                               
                               ))}
                               

                            </div>
                       
                    </>
                )
            }




        </>
    )
}