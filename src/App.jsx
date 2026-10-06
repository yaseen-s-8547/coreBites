
import './App.css'
import { useEffect } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import DashBoardLayOut from './LayOut/DashBoardLayOut'
import Lesson from './Pages/Lesson'
import Bag from './Pages/Bag'
import Admin from './Pages/Admin'
import AdminPreview from './Pages/AdminPreview'
import Paywall from './Components/Paywall'
import UserLessonView from './Pages/UserLessonView'
import About from './Pages/About'
import AdminSignin from './Pages/AdminSignin'
import Pricing from './Pages/Pricing'
import Contact from './Pages/Contact'

function RequireLearnerAuth() {
  const location = useLocation()

  return localStorage.getItem('token') ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  )
}

function RequireAdminAuth() {
  const location = useLocation()

  return localStorage.getItem('adminToken') ? (
    <Outlet />
  ) : (
    <Navigate to="/adminSignin" replace state={{ from: location }} />
  )
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return home</Link>
    </main>
  )
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleLearnerSessionExpired = () => {
      if (location.pathname !== '/signin') {
        navigate('/signin', {
          replace: true,
          state: { sessionExpired: true },
        })
      }
    }

    window.addEventListener('learner-session-expired', handleLearnerSessionExpired)
    return () => {
      window.removeEventListener('learner-session-expired', handleLearnerSessionExpired)
    }
  }, [location.pathname, navigate])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/adminSignin" element={<AdminSignin />} />

      <Route element={<RequireLearnerAuth />}>
        <Route path="/app" element={<DashBoardLayOut />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="bag" element={<Bag />} />
          <Route path="about" element={<About />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/learn/:id" element={<UserLessonView />} />
        <Route path="/paywall/:id" element={<Paywall />} />
      </Route>

      <Route element={<RequireAdminAuth />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/preview/:id" element={<AdminPreview />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
