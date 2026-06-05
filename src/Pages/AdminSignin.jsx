import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
export default function AdminSignin (){
       const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
        const navigate = useNavigate()
 const handleSignin = async () => {

  setError("")

  try {

    const response = await axios.post(
      `${apiBase}/adminsignin`,
      {
        email,
        password
      }
    )

    localStorage.setItem(
      "adminToken",
      response.data.token
    )

    navigate("/admin")

  }
  catch (err) {

    setError(
      err.response?.data?.message || "signin failed"
    )

  }

}


    return (
       <>
  <div className="grid grid-cols-12 w-full min-h-screen bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_right,#000000,#000000)]">

    <div className="col-span-12 md:col-span-6 md:col-start-4 h-full flex flex-col justify-start items-center pt-28 gap-6">

      <h1 className="text-center text-white text-4xl font-bold">
        Admin Sign in
      </h1>

      <div className="md:w-lg">

        <div className="h-27 w-full max-w-lg flex flex-col justify-start gap-2 px-4">
          <label className="text-white text-left">
            Email
          </label>

          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="w-full max-w-lg pl-3 h-10 bg-black text-white border border-white border-solid"
            placeholder="xyz@gmail.com"
          />
        </div>

        <div className="h-25 w-full max-w-lg flex flex-col justify-start gap-2 px-4">
          <label className="text-white text-left">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="pl-3 w-full max-w-lg h-10 bg-black text-white border border-white border-solid"
            placeholder="(eg:world is not enough)"
          />
        </div>

        {error && (
          <p className="text-red-400 px-4 text-sm">
            {error}
          </p>
        )}

        <button
          className="w-36 text-lg mt-5 h-12 bg-white font-thin hover:bg-black hover:text-white hover:translate-0.5 ml-4"
          onClick={handleSignin}
        >
          Sign in
        </button>

      </div>

    </div>

  </div>
</>
    )
}