
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from "./Pages/Signin"
import DashBoardLayOut from './LayOut/DashBoardLayOut'
import Topic from './Pages/Topic'
import Bag from './Pages/Bag'
import Admin from './Pages/Admin'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>

     <Routes>
       <Route path="/app" element={<DashBoardLayOut />}>
        <Route path="home" element={<Home />}/>
        <Route path="topics" element={<Topic/>} />
        <Route path="bag" element={<Bag/>}/>
        <Route path="admin" element={<Admin/>}/>
      </Route>
     </Routes>
    </>

      )


}

      export default App
