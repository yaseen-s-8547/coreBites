
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from "./Pages/Signin"
function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>    
      <Route path="/home" element={<Home/>}/>
      
    </Routes>
    </>
      
  )


}

export default App
