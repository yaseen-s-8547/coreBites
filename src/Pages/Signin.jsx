

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useEffect } from "react"
export default function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [signinStatus, setsigninStatus] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const handleSignin = () => {
        if (!email.endsWith("@gmail.com") || email.length < "@gmail.com".length) {
            setEmailErr("provide Valid email")
        }
        else if (password.length === 0) {
            setPassErr("provide password")
        }
        else {
            axios.post("http://localhost:5000/usersignin", { email: email, password: password })
                .then((response) => {
                    const token = response.data.token
                    localStorage.setItem("token", token)

                    setTimeout(() => {
                        navigate("/app")
                    }, 2000);
                    setsigninStatus("sign in successfull")
                    setIsSuccess(true)
                })
                .catch((err) => {
                    {
                        console.log(err)
                        setsigninStatus("sign in failed")
                        setIsSuccess(false)
                    }
                })
        }

    }
     useEffect(()=>{
     const token =localStorage.getItem("token")
     if(token){
        navigate("/app")
     }
     },[])


    return (
        <>
            <>
                <div className="grid grid-cols-12 w-full min-h-screen  bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)] ">
                    <div className="col-span-12 md:col-span-6   md:col-start-4 h-full flex flex-col justify-start items-center pt-28  gap-6 ">
                        <h5 className=" text-white">Create an Account</h5>
                        <GoogleLogin className="object-contain cursor-pointer ml-3 hover:translate-y-2 hover:skew-1 "
                            onSuccess={(credentialResponse) => {
                                console.log("FULL RESPONSE:", credentialResponse)
                                console.log("TOKEN:", credentialResponse?.credential)
                                const token = credentialResponse.credential
                                axios.post("http://localhost:5000/google-auth", { token })
                                    .then((response) => {
                                        localStorage.setItem("token", response.data.token)
                                        setsigninStatus("sign in success")
                                        navigate("/app")
                                    })
                                    .catch(() => {
                                        setsigninStatus("failed")
                                    })
                            }}
                            onError={() => {
                                console.log("sign in failed")
                            }}

                        />
                        <p className=" mr-1 text-white">or</p>
                        <div className=" md:w-lg">
                            <div className="h-27  w-full max-w-lg   flex flex-col justify-start gap-2 px-4 ">
                                <label className="text-white text-left ">Email</label>
                                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-full max-w-lg  pl-3 h-10 bg-black  text-white border border-white border-solid" placeholder="xyz@gmail.com" />
                                {emailErr && <p className="text-red-500 text-sm ">{emailErr}</p>}
                            </div>
                            <div className="h-25 w-full max-w-lg flex flex-col justify-start gap-2 px-4">
                                <label className="text-white text-left ">Password</label>
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className=" pl-3 w-full max-w-lg  h-10 bg-black  text-white border border-white border-solid" placeholder="(eg:world is not enough) " />
                                {passErr && <p className="text-red-500 text-sm ">{passErr}</p>}
                            </div>

                            <button className="w-36  text-lg mt-5 h-12 bg-white  font-thin hover:bg-black hover:text-white hover:translate-0.5 ml-4" onClick={handleSignin}>Sign in</button>
                            {signinStatus && isSuccess !== null && <p className={`${isSuccess ? "text-green-500" : "text-red-500"} ml-4 text-sm`}>{signinStatus}</p>}
                            <p className="text-left ml-4 text-white mt-3">need an account  <a href="/signup" className="text-blue-900 hover:text-blue-400">Sign up</a></p>
                            <p className="text-left ml-4 text-white mt-3">forget password  <a className="text-blue-900 hover:text-blue-400">reset it</a></p>

                        </div>

                    </div>
                </div>
            </>
        </>
    )
}