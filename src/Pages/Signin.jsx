

import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import Button from "../Components/ui/Button"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function Signin() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [signinStatus, setsigninStatus] = useState(
        location.state?.sessionExpired
            ? "Your session expired. Please sign in again."
            : ""
    )
    const [isSuccess, setIsSuccess] = useState(false)
    const redirectAfterSignin = location.state?.from || "/app/home"
    
    const handleSignin = () => {
        if (!email.endsWith("@gmail.com") || email.length < "@gmail.com".length) {
            setEmailErr("provide Valid email")
        }
        else if (password.length === 0) {
            setPassErr("provide password")
        }
        else {
            axios.post(`${apiBase}/usersignin`, { email: email, password: password })
                .then((response) => {
                    const token = response.data.token
                    localStorage.setItem("token", token)
                    
                    setTimeout(() => {
                        navigate(redirectAfterSignin, { replace: true })
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
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return

        let ignoreResult = false

        axios.get(`${apiBase}/getUserName`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                if (!ignoreResult) {
                    navigate(redirectAfterSignin, { replace: true })
                }
            })
            .catch((error) => {
                if (ignoreResult) return

                if (error.response?.status === 401) {
                    localStorage.removeItem("token")
                    setsigninStatus("Your session expired. Please sign in again.")
                } else {
                    setsigninStatus("Unable to verify your saved session. Please sign in again.")
                }
            })

        return () => {
            ignoreResult = true
        }
    }, [navigate, redirectAfterSignin])


    return (
        <>
            <>
                <div className="grid grid-cols-12 w-full min-h-screen bg-cb-atmosphere">
                    <div className="col-span-12 md:col-span-6   md:col-start-4 h-full flex flex-col justify-start items-center pt-28  gap-6 ">
                        <h5 className="font-heading text-white">Create an Account</h5>
                        <GoogleLogin className="object-contain cursor-pointer ml-3 hover:translate-y-2 hover:skew-1 "
                            onSuccess={(credentialResponse) => {

                                const token = credentialResponse.credential
                                axios.post(`${apiBase}/google-auth`, { token })
                                    .then((response) => {
                                        localStorage.setItem("token", response.data.token)
                                      
                                        setsigninStatus("sign in success")
                                        navigate(redirectAfterSignin, { replace: true })
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
                                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-full max-w-lg pl-3 h-10 bg-cb-ink text-white border border-cb-border" placeholder="xyz@gmail.com" />
                                {emailErr && <p className="text-white/80 text-sm">{emailErr}</p>}
                            </div>
                            <div className="h-25 w-full max-w-lg flex flex-col justify-start gap-2 px-4">
                                <label className="text-white text-left ">Password</label>
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="pl-3 w-full max-w-lg h-10 bg-cb-ink text-white border border-cb-border" placeholder="(eg:world is not enough) " />
                                {passErr && <p className="text-white/80 text-sm">{passErr}</p>}
                            </div>

                            <Button variant="secondary" className="w-36 h-12 ml-4 mt-5 text-lg font-normal" onClick={handleSignin}>Sign in</Button>
                            {signinStatus && isSuccess !== null && <p className="text-white/80 ml-4 text-sm">{signinStatus}</p>}
                            <p className="text-left ml-4 text-white mt-3">need an account  <Link to="/signup" className="text-white underline underline-offset-4 hover:text-white/70">Sign up</Link></p>
                            <p className="text-left ml-4 text-white mt-3">forget password  <a className="text-white underline underline-offset-4 hover:text-white/70">reset it</a></p>

                        </div>

                    </div>
                </div>
            </>
        </>
    )
}