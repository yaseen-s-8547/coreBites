import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="161098712561-b8c3d8stu57ggqoqdvuc8njff8aguuhp.apps.googleusercontent.com">
       <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
