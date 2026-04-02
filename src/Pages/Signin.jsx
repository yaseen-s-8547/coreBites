
import google from "../assets/Google-logo.png"
export default function Signin (){
    return (
        <>
         <>
                    <div className="grid grid-cols-12 w-full min-h-screen  bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)] ">
                        <div className="col-span-12 md:col-span-6   md:col-start-4 h-full flex flex-col justify-start items-center pt-28  gap-6 ">
                            <h5 className=" text-white">Create an Account</h5>
                            <img src={google} alt="" className="object-contain cursor-pointer ml-3 hover:translate-y-2 hover:skew-1 " />
                            <p className=" mr-1 text-white">or</p>
                            <div className=" md:w-lg">
                                <div className="h-20  w-full max-w-lg   flex flex-col justify-start gap-2 px-4 ">
                                    <label className="text-white text-left ">Email</label>
                                    <input type="text" className="w-full max-w-lg  pl-3 h-10 bg-black  text-white border border-white border-solid" placeholder="xyz@gmail.com" />
                                </div>
                                <div className="h-20 w-full max-w-lg flex flex-col justify-start gap-2 px-4">
                                    <label className="text-white text-left ">Password</label>
                                    <input type="password" className=" pl-3 w-full max-w-lg  h-10 bg-black  text-white border border-white border-solid" placeholder="(eg:world is not enough) "/>
                                </div>
                                
                                <button className="w-36  text-lg mt-5 h-12 bg-white  font-thin hover:bg-black hover:text-white hover:translate-0.5 ml-4">Sign in</button>
                                <p className="text-left ml-4 text-white mt-3">need an account  <a  href="/signup" className="text-blue-900 hover:text-blue-400">Sign up</a></p>
                                <p className="text-left ml-4 text-white mt-3">forget password  <a className="text-blue-900 hover:text-blue-400">reset it</a></p>
                                
                            </div>
        
                        </div>
                    </div>
                </>
        </>
    )
}