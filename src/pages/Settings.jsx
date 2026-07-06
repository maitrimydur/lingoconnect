import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LANGUAGES } from '../data/languages'
import { getProgress, resetLanguage } from '../lib/progressStore'
import BottomNav from '../components/BottomNav'

export default function Settings() {
  const { user, signOut } = useAuth()
  const [progress, setProgress] = useState({})

  useEffect(() => {
    getProgress(user?.id).then(setProgress)
  }, [user?.id])

  const totalCompleted = Object.values(progress).reduce((sum, days) => sum + (days?.length ?? 0), 0)

  async function handleReset(languageId) {
    const next = await resetLanguage(user?.id, languageId)
    setProgress(next)
  }

  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Setting and Activity</h1>
        <p className="text-sm text-slate-500 mb-6">{user?.email}</p>

        <div className="flex flex-col gap-1 mb-6">
          <Link
            to="/profile"
            className="flex items-center justify-between py-3 border-b border-slate-100 text-slate-900 font-medium"
          >
            Account Center
            <span className="text-slate-300">›</span>
          </Link>

          <div className="py-3 border-b border-slate-100">
            <p className="text-slate-900 font-medium">Your Activity</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalCompleted} lesson{totalCompleted === 1 ? '' : 's'} completed
            </p>
          </div>

          {['Progress', 'History', 'Notifications', 'Time Management'].map((label) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-slate-100 text-slate-300"
            >
              {label}
              <span className="text-xs">coming soon</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-900 mb-2">Reset language progress</p>
          <div className="flex flex-col gap-2">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2"
              >
                <span className="text-sm text-slate-700">
                  {lang.flag} {lang.name}
                </span>
                <button
                  onClick={() => handleReset(lang.id)}
                  className="text-xs text-red-600 font-medium"
                >
                  Reset
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={signOut}
          className="w-full border border-slate-300 text-slate-900 rounded-full py-3 font-medium"
        >
          Sign Out
        </button>
      </div>
      <BottomNav />
    </div>
  )
}
