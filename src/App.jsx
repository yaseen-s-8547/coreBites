
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from "./Pages/Signin"
import DashBoardLayOut from './LayOut/DashBoardLayOut'
import Lesson from './Pages/Lesson'
import Bag from './Pages/Bag'
import Admin from './Pages/Admin'
import AdminPreview from './Pages/AdminPreview'
import Paywall from './Components/Paywall'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>

      <Routes>
        <Route path="/app" element={<DashBoardLayOut />}>
          <Route path="home" element={<Home />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="bag" element={<Bag />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/preview/:id" element={<AdminPreview />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/paywall/:id" element={<Paywall/>} />
      </Routes>

    </>

  )


}

export default App
