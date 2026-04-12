
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {GoogleLogin} from "@react-oauth/google"
export default function Signup() {
    const navigate = useNavigate()
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [confPass, setConfPass] = useState("")
    const [passMissMatch, setPassMissMath] = useState("")
    const [signupStatus, setSignupStatus] = useState("")
    const [isSignup,setIsSignup]=useState(null)
    const handleCreateAccount = () => {
        if(!mail.endsWith("@gmail.com") || mail.length<"@gmail.com".length){
        setErr("provide valid email")
       }
       else if(pass.length===0  ){
        setPassErr("set Password")
       }
       else if(confPass!==pass){
        setPassMissMath("mismatch")
       }
       else{
          axios.post("http://localhost:5000/usersignup", { email: mail, password: pass })
                .then((res) => {
                    setSignupStatus(res.data.message)
                    setTimeout(() => {
                        navigate("/signin")
                    }, 2000)
                    setIsSignup(true)
                    
                })
                .catch((err) => {
                    if(err.response.status===409){
                        setErr("email already exist")
                    }
                    else if(err.response.status===500){
                        setSignupStatus(err.response.data.message)
                    setIsSignup(false)
                    }
                    
                })
       }
       
       
       
    }

    return (
        <>
            <div className="grid grid-cols-12 w-full min-h-screen   bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)] ">
                <div className="col-span-12 md:col-span-6   md:col-start-4 h-full flex flex-col justify-start items-center pt-8  gap-6 ">
                    <h5 className=" text-white">Create an Account</h5>
                    <GoogleLogin className="object-contain cursor-pointer ml-3 hover:translate-y-2 hover:skew-1  border-none" 
                    onSuccess={(credentialResponse)=>{
                      const token = credentialResponse.credential
                      axios.post("http://localhost:5000/google-auth",{token})
                      .then((response)=>{
                        setSignupStatus(response.data.message)
                        localStorage.setItem("token",response.data.token)
                        navigate("/app")

                      })
                      .catch((err)=>{
                        setSignupStatus(err.response.data.message)
                      })

                    }}
                    onError={()=>{
                        console.log("error")
                    }}/>
                    <p className=" mr-1 text-white">or</p>
                    <div className=" md:w-lg  ">
                        <div className="h-27  w-full max-w-lg   flex flex-col justify-start gap-2 px-4 ">
                            <label className="text-white text-left ">Email</label>
                            <input type="text" className=" pl-3 py-2 w-full max-w-lg   h-10 bg-black  text-white border border-white border-solid" placeholder="xyz@gmail.com" value={mail} onChange={(e) => { setMail(e.target.value) }} />
                            {err && <p className="text-red-500 text-sm  ">{err}</p>}
                        </div>
                        <div className="h-50 w-full max-w-lg flex flex-col justify-start gap-2 px-4  ">
                            <label className="text-white text-left ">Set Password</label>
                            <input type="password" className=" pl-3  w-full max-w-lg  h-10 bg-black  text-white border border-white border-solid" placeholder="(eg:world is not enough) " value={pass} onChange={(e) => { setPass(e.target.value) }} />
                            {passErr && <p className="text-red-500 text-sm ">{passErr}</p>}
                            <label className="text-white text-left  ">Confirm Password</label>
                            <input type="password" className=" pl-3  w-full max-w-lg  h-10 bg-black  text-white border border-white border-solid" placeholder="(eg:world is not enough) " value={confPass} onChange={(e) => { setConfPass(e.target.value) }} />
                            {passMissMatch && <p className="text-red-500 text-sm ">{passMissMatch}</p>}

                        </div>
                        <p className="text-left  text-white  px-4">
                            By signing up you agree to our terms of<br /> service and <a href="www.google.com" className="text-blue-900 hover:text-blue-400">privacy policy</a>.
                        </p>

                        <button className="w-36  text-lg mt-5 h-12 bg-white  font-thin hover:bg-black hover:text-white hover:translate-0.5 ml-4" onClick={handleCreateAccount}>Create Account</button>
                        {isSignup !== null && <p className={`${isSignup?("text-green-500"):("text-red-500")} text-sm  mt-2 ml-4`}>{signupStatus}</p>}
                        <p className="text-left ml-4 text-white mt-1">already a user <a href="/signin" className="text-blue-900 hover:text-blue-400">Sign in</a></p>
                    </div>

                </div>
            </div>
        </>
    )
}