import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faHouse,faPager,faBriefcase,faEye} from '@fortawesome/free-solid-svg-icons'; 
import { useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
export default function SideBar() {
    const navigate=useNavigate()
    const location =useLocation()
 const sideBarConfig =[{label:"Home",icon:faHouse, path:"/app/home"},{label:"Topics",icon:faPager,path:"/app/topics"},{label:"Bag",icon:faBriefcase,path:"/app/bag"},{label:"Admin",icon:faEye,path:"/app/admin"}]
    const fileInputRef = useRef(null);
    return (
        <>

            <div className="flex flex-col h-full bg-white ">
                <div className="w-full h-20  flex flex-row  items-center bg-white gap-2
                  px-3 border-b-2">
                    <label htmlFor='inputLabel' className='rounded-full border flex items-center border-black px-5 py-2 w-15 h-15 cursor-pointer bg-gray-950  '>
                        <FontAwesomeIcon icon={faCamera} className='text-white' />
                        <input className='hidden' ref={fileInputRef} type="file" id='inputLabel' />
                    </label>
                    <h1 className="text-center md:text-lg lg:text-md 2xl:text-xl lg:text-xl zen-dots-regular mt-2">UserName</h1>
                </div>

                

            
            <div className= 'bg-white text-white flex flex-col cursor-pointer   py-4 '>
              {sideBarConfig.map((item)=>{
                const isActive = location.pathname===item.path
                return(
                <div key={item.path} onClick={()=>navigate(item.path)}    className={`  text-3xl ${isActive?"bg-black text-white":"bg-white text-black"} hover:bg-gray-600 hover:text-white w-full h-14 px-3 py-1 font-bold text-black border-0 flex flex-row items-center`}><FontAwesomeIcon icon={item.icon}  className=''/><h1>{item.label}</h1></div>
                )

            })}
              
            </div>
           </div>
        </>
    )
}