import logo from "../assets/coreBitesLogo.png"
export default function AdminNavBar({activeTabs,setActiveTabs}){
    return(

        <>
         <>
              <div className="col-span-4    ">
                <div className="md:flex md:flex-col md:justify-start md:items-start  flex flex-col justify-center  items-center  mt-7  md:ml-7  md:mt-5 ">
                    <img
                    src={logo}
                    className="rounded-top w-8 h-6 md:ml-24"
                    alt="noLogo"
                />
                <h1 className="text-white text-3xl zen-dots-regular ">CoreBites</h1>
                </div>
              </div>
            <div className="col-span-8  flex flex-row justify-center gap-7 ml-7 md:justify-evenly items-center relative text-white  ">
             
                <span className={`text-3xl cursor-pointer hover:text-gray-600 ${activeTabs==="create"?"text-gray-600":"text-white"}`}onClick={()=>setActiveTabs("create")}>Create</span>
                <span className={`text-3xl cursor-pointer hover:text-gray-600 ${activeTabs==="read"?"text-gray-600":"text-white"}`} onClick={()=>setActiveTabs("read")}>Read</span>
                <span className={`text-3xl cursor-pointer hover:text-gray-600 ${activeTabs==="update"?"text-gray-600":"text-white"}`}onClick={()=>setActiveTabs("update")} >Update</span>
                <span className={`text-3xl cursor-pointer hover:text-gray-600 ${activeTabs==="delete"?"text-gray-600":"text-white"}`} onClick={()=>setActiveTabs("delete")}>Delete</span>
              
            </div>
            </>
        </>
    )
}