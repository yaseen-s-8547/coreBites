import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faGetPocket } from '@fortawesome/free-brands-svg-icons';
export default function Home() {

    
    return (
        <>
            <div className="grid  grid-cols-1 md:grid-cols-10 lg:grid-cols-12 h-24 mt-5 ">
                <div className="lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-2
                 ">
                    <div className=" p-5 md:p-3 flex flex-row justify-center items-center h-full">
                        <input className="bg-white h-14 ps-3 text-black w-2xl rounded-lg border border-black" placeholder="live search" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 p-3 sm:me-3 md:ms-5 min-h-screen md:gap-5  ">
                <div className="xl:col-span-8 lg:col-span-6 h-87 sm:h-87  lg:h-98 xl:h-80 2xl:h-70 mt-5 md:ms-3 relative bg-white rounded-xl ">

                    <div className="mt-5 ms-5">
                        <h1 className=" text-black font-bold text-4xl border border-b-2 border-t-0 border-r-0 border-l-0 me-3 py-2">lesson title</h1>
                        <p className="text-gray-700 font-light mt-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, alias. Doloremque ducimus illo repellendus consequatur assumenda possimus cumque officia. Totam, aliquid! Sequi rerum perspiciatis molestias nihil. Voluptate laboriosam fugit similique.</p>
                        <p className="mt-3">price :<span className="text-green-700">50rs</span></p>
                    </div>

                    <div className="absolute top-1 right-2 md:right-5   justify-center items-center    flex flex-col gap-1">
                        <button className="bg-black text-white flex items-center    h-7 font-bold p-2 rounded-xl  hover:bg-gray-500 hover:text-white "><FontAwesomeIcon icon={faBriefcase} className='text-white' /></button>
                        <button className="bg-gray-500 p-2 rounded-xl h-7 flex items-center hover:bg-black hover:text-white text-white font-bold"><FontAwesomeIcon icon={faGetPocket} /></button>
                    </div>

                </div>
                <div className="xl:col-span-4 lg:col-span-6 cols-span-12 cols-span-12 md:ms-3 h-70 xl:h-80 2xl:h-70 lg:h-98 mt-5 relative bg-white rounded-xl text-black">
                    <div className="mt-5 ms-5">
                        <h1 className=" text-black font-bold text-4xl border border-b-2 border-t-0 border-r-0 border-l-0 me-3 py-2">lesson title</h1>
                        <p className="text-gray-700 font-light mt-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, alias. Doloremque ducimus illo repellendus consequatur assumenda possimus cumque officia. Totam, aliquid! Sequi rerum perspiciatis molestias nihil. Voluptate laboriosam fugit similique.</p>
                        <p className="mt-3">price :<span className="text-green-700">50rs</span></p>
                    </div>

                    <div className="absolute top-1 right-2 md:right-5   justify-center items-center    flex flex-col gap-1">
                        <button className="bg-black text-white h-7  py-3 font-bold p-2 rounded-xl flex  items-center justify-center  hover:bg-gray-500 hover:text-white "><FontAwesomeIcon icon={faBriefcase} className='text-white' /></button>
                        <button className="bg-gray-500  rounded-xl h-7 p-2 py-3 flex items-center hover:bg-black hover:text-white text-white font-bold"><FontAwesomeIcon icon={faGetPocket} /></button>
                    </div>

                </div>
            </div>
        </>
    )
}