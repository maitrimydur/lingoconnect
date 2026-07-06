import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="min-h-svh flex flex-col justify-between bg-gradient-to-b from-sky-600 to-sky-800 text-white px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <div className="text-5xl">🕊️</div>
        <h1 className="text-3xl font-semibold">Welcome to LingoConnect</h1>
        <p className="text-sky-100 max-w-xs">
          Create your fifteen-word-a-day habit and start learning.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          to="/signup"
          className="w-full text-center bg-white text-sky-700 font-medium rounded-full py-3"
        >
          Get Started
        </Link>
        <Link to="/login" className="w-full text-center text-white/90 py-2">
          Have an account? Login
        </Link>
      </div>
    </div>
  )
}
