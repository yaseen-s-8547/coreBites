import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faHouse, faFloppyDisk, faPager, faBriefcase, faBookOpen, faPen ,faRupeeSign,faPhone } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
export default function SideBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const sideBarConfig = [{ label: "Home", icon: faHouse, path: "/app/home" }, { label: "Lesson", icon: faPager, path: "/app/lesson" }, { label: "Bag", icon: faBriefcase, path: "/app/bag" }, { label: "About", icon: faBookOpen, path: "/app/about" },{label:"Pricing",icon:faRupeeSign ,path:"/app/pricing"},{label:"Contact",icon:faPhone,path:"/app/contact"}]
    const [isEditName, setIsEditName] = useState(false)
    const [image, setImage] = useState(null)
    const [userName, setUserName] = useState("User")
    const fetchProfileImage = () => {
        const token = localStorage.getItem("token")
        axios.get("http://localhost:5000/getprofileImage", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setImage(res.data.profilePhoto || "")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    const handleUpload = (selectedFile) => {
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("file", selectedFile)
        axios.post("http://localhost:5000/profileImgUpload", formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                fetchProfileImage()
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })


    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get('http://localhost:5000/getprofileImage', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setImage(res.data.profilePhoto || "")
            })
    }, [])
    const handleEditName = () => {
        setIsEditName(true)
    }
    const readUserName =()=>{
        const token = localStorage.getItem("token")
        axios.get("http://localhost:5000/getUserName",{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setUserName(res.data.userName)
        })
    }
    useEffect(()=>{
        const token = localStorage.getItem("token")
      axios.get("http://localhost:5000/getUserName",{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setUserName(res.data.userName)
        })
    },[])
    const handleSaveUserName = () => {
        const token = localStorage.getItem("token")
        axios.patch("http://localhost:5000/saveusername", { userName }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                
                setIsEditName(false)
                readUserName()
            })
    }



    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <>

            <div className="flex flex-col h-full bg-white ">
                <div className="min-w-55 max-w-65  h-20  flex flex-row relative px-2  items-center bg-white gap-2
                   border-b-2">
                    {image ? (<><img alt='no image available' className='rounded-full border border-black w-15 h-15 object-cover cursor-pointer' src={image} /></>) : (<><label htmlFor='inputLabel' className='rounded-full border flex items-center border-black px-5 py-2 w-15 h-15 cursor-pointer bg-gray-950  '>
                        <FontAwesomeIcon icon={faCamera} className='text-white' />
                        <input className='hidden' onChange={(e) => { const selectedFile = e.target.files[0]; handleUpload(selectedFile); }} type="file" id='inputLabel' />
                    </label></>)}

                    {isEditName ? (<> <input className="border-0 text-center md:text-sm lg:text-md 2xl:text-xl bg-black w-32 h-12 rounded-xl text-white lg:text-xl zen-dots-regular mt-2" value={userName} onChange={(e) => setUserName(e.target.value)} onBlur={handleSaveUserName} /><FontAwesomeIcon onClick={handleSaveUserName} className=' absolute top-1 right-0 hover:text-blue-700 ' icon={faFloppyDisk} /></>) : (<><h1 className="text-center md:text-sm lg:text-md 2xl:text-xl lg:text-xl zen-dots-regular mt-2">{userName}</h1>
                        <FontAwesomeIcon icon={faPen} className=' absolute text-blue-900 text-md right-1 top-5 hover:text-black' onClick={handleEditName} /></>)}
                </div>




                <div className='bg-white text-white flex-1 flex flex-col cursor-pointer   py-4 '>
                    {sideBarConfig.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <div key={item.path} onClick={() => navigate(item.path)} className={`  text-3xl ${isActive ? "bg-black text-white" : "bg-white text-black"} hover:bg-gray-600 hover:text-white w-full h-14 px-3 py-1 font-bold  border-0 flex flex-row items-center`}><FontAwesomeIcon icon={item.icon} className='' /><h1>{item.label}</h1></div>
                        )

                    })}

                </div>

                <div className="border-t w-full size-20 ">
                    <button className="w-full hover:bg-white  cursor-pointer hover:text-black bg-black p-4 min-h-full text-white font-bolder" onClick={handleLogOut}>LOGOUT</button>
                </div>
            </div>
        </>
    )
}