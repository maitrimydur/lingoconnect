import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProfile } from '../lib/profileStore'
import { BackIcon, HomeIcon } from './icons'

export default function LessonHeader({ language }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setProfile(getProfile(user?.id))
  }, [user?.id])

  const initial = (profile?.name || user?.email || '?').charAt(0).toUpperCase()

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <BackIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('/home')}
          aria-label="Go to home"
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <HomeIcon className="w-5 h-5" />
        </button>
      </div>
      {language && (
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          {language.name} <span>{language.flag}</span>
        </h1>
      )}
      <Link
        to="/profile"
        className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium overflow-hidden"
      >
        {profile?.avatarUrl ? (
          <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </Link>
    </div>
  )
}
