import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmSent, setConfirmSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data, error } = await signUp(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    if (data.session) {
      navigate('/home')
      return
    }
    setConfirmSent(true)
  }

  if (confirmSent) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">Check your email</h1>
        <p className="text-slate-500 max-w-xs">
          We sent a confirmation link to {email}. Confirm your address, then log in.
        </p>
        <Link to="/login" className="text-sky-700 font-medium mt-4">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-svh flex flex-col justify-center px-6 py-12 max-w-sm mx-auto w-full">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-3"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-3"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-700 text-white rounded-full py-3 font-medium disabled:opacity-60"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-6">
        Have an account? <Link to="/login" className="text-sky-700 font-medium">Login</Link>
      </p>
    </div>
  )
}
