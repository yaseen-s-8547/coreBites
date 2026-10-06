import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import Button from "../Components/ui/Button"
import api from "../api"
import useAuth from "../auth/useAuth"

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

export default function Signin() {
    const navigate = useNavigate()
    const location = useLocation()
    const { status, role, signIn } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [signinStatus, setSigninStatus] = useState(
        location.state?.sessionExpired
            ? "Your session expired. Please sign in again."
            : ""
    )
    const [isSuccess, setIsSuccess] = useState(false)
    const redirectAfterSignin = location.state?.from || "/app/home"

    useEffect(() => {
        if (status === "authenticated" && role === "user") {
            navigate(redirectAfterSignin, { replace: true })
        }
    }, [navigate, redirectAfterSignin, role, status])

    const handleSignin = async () => {
        setEmailErr("")
        setPassErr("")

        if (!email.endsWith("@gmail.com") || email.length < "@gmail.com".length) {
            setEmailErr("Provide a valid email")
            return
        }
        if (!password) {
            setPassErr("Provide your password")
            return
        }

        try {
            const { data } = await api.post(`${apiBase}/usersignin`, { email, password })
            signIn(data)
            setSigninStatus("Sign in successful")
            setIsSuccess(true)
        } catch (error) {
            setSigninStatus(error.response?.data?.message || "Sign in failed")
            setIsSuccess(false)
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { data } = await api.post(`${apiBase}/google-auth`, {
                token: credentialResponse.credential,
            })
            signIn(data)
            setSigninStatus("Sign in successful")
            setIsSuccess(true)
        } catch (error) {
            setSigninStatus(error.response?.data?.message || "Google sign in failed")
            setIsSuccess(false)
        }
    }

    return (
        <div className="grid min-h-screen w-full grid-cols-12 bg-cb-atmosphere">
            <div className="col-span-12 flex h-full flex-col items-center justify-start gap-6 pt-28 md:col-span-6 md:col-start-4">
                <h1 className="font-heading text-white">Sign in to CoreBites</h1>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setSigninStatus("Google sign in failed")}
                />
                <p className="text-white">or</p>
                <div className="w-full max-w-lg px-4">
                    <div className="mb-5 flex flex-col gap-2">
                        <label htmlFor="signin-email" className="text-white">Email</label>
                        <input
                            id="signin-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="h-10 w-full border border-cb-border bg-cb-ink pl-3 text-white"
                            placeholder="xyz@gmail.com"
                        />
                        {emailErr && <p className="text-sm text-white/80">{emailErr}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="signin-password" className="text-white">Password</label>
                        <input
                            id="signin-password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="h-10 w-full border border-cb-border bg-cb-ink pl-3 text-white"
                            placeholder="Enter your password"
                        />
                        {passErr && <p className="text-sm text-white/80">{passErr}</p>}
                    </div>

                    <Button
                        variant="secondary"
                        className="ml-0 mt-5 h-12 w-36 text-lg font-normal"
                        onClick={handleSignin}
                    >
                        Sign in
                    </Button>
                    {signinStatus && (
                        <p className={`ml-0 mt-2 text-sm ${isSuccess ? "text-green-200" : "text-white/80"}`} role="status">
                            {signinStatus}
                        </p>
                    )}
                    <p className="mt-3 text-white">
                        Need an account?{" "}
                        <Link to="/signup" className="underline underline-offset-4 hover:text-white/70">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
