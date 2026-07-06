import { useNavigate, Link } from 'react-router-dom'
import { BackIcon } from './icons'

export default function LessonHeader({ language }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
      >
        <BackIcon className="w-5 h-5" />
      </button>
      {language && (
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          {language.name} <span>{language.flag}</span>
        </h1>
      )}
      <Link
        to="/profile"
        className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium"
      >
        M
      </Link>
    </div>
  )
}
