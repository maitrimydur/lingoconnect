import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Videos from './pages/Videos'
import About from './pages/About'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Lesson from './pages/Lesson'
import LanguageComplete from './pages/LanguageComplete'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <Videos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:langId/step/:step"
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:langId/complete"
          element={
            <ProtectedRoute>
              <LanguageComplete />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
