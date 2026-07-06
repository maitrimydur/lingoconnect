import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LANGUAGES } from '../data/languages'
import { getCurriculum } from '../data/curriculum'
import { getProgress } from '../lib/progressStore'
import { getProfile } from '../lib/profileStore'
import BottomNav from '../components/BottomNav'

function nextStepFor(languageId, progress) {
  const lessons = getCurriculum(languageId)
  const completed = new Set(progress[languageId] ?? [])
  const nextIndex = lessons.findIndex((_, i) => !completed.has(i + 1))
  return { next: nextIndex === -1 ? null : nextIndex + 1, total: lessons.length, done: completed.size }
}

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [progress, setProgress] = useState({})
  const [profile, setProfile] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getProgress(user?.id).then(setProgress)
    setProfile(getProfile(user?.id))
  }, [user?.id])

  function openLanguage(languageId) {
    const { next, total } = nextStepFor(languageId, progress)
    if (next === null && total > 0) {
      navigate(`/learn/${languageId}/complete`)
    } else {
      navigate(`/learn/${languageId}/step/${next ?? 1}`)
    }
  }

  const displayName = profile?.name || user?.email?.split('@')[0] || 'friend'
  const filtered = LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex-1 px-6 py-10 max-w-sm mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>
            <h1 className="text-xl font-semibold text-slate-900 capitalize">{displayName}</h1>
          </div>
          <Link
            to="/profile"
            className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium overflow-hidden"
          >
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              displayName.charAt(0).toUpperCase()
            )}
          </Link>
        </div>

        <input
          type="search"
          placeholder="Search language"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-200 rounded-full px-4 py-2.5 mb-6 text-sm"
        />

        <h2 className="text-lg font-medium text-slate-900 mb-4">All Languages</h2>
        <div className="flex flex-col gap-3">
          {filtered.map((lang) => {
            const { total, done } = nextStepFor(lang.id, progress)
            const percent = total ? Math.round((done / total) * 100) : 0
            return (
              <button
                key={lang.id}
                onClick={() => openLanguage(lang.id)}
                className="border border-slate-200 rounded-xl px-4 py-3 text-left hover:border-slate-400"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{lang.name}</p>
                    <p className="text-xs text-slate-400">{lang.speakers}</p>
                  </div>
                  <span className="text-xs text-slate-500">{percent}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
