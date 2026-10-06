import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import axios from "axios"

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const token = localStorage.getItem("token")
    const authorization = error.config?.headers?.get?.("Authorization")
      || error.config?.headers?.Authorization
      || error.config?.headers?.authorization
    const requestToken = typeof authorization === "string"
      ? authorization.replace(/^Bearer\s+/i, "")
      : ""

    if (status === 401 && token && requestToken === token) {
      localStorage.removeItem("token")
      window.dispatchEvent(new Event("learner-session-expired"))
    }

    return Promise.reject(error)
  }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="161098712561-b8c3d8stu57ggqoqdvuc8njff8aguuhp.apps.googleusercontent.com">
       <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
