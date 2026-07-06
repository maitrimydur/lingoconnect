import { Link, useParams } from 'react-router-dom'
import { getLanguage } from '../data/languages'
import { StarIcon } from '../components/icons'
import ProgressBar from '../components/ProgressBar'

export default function LanguageComplete() {
  const { langId } = useParams()
  const language = getLanguage(langId)

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center gap-3 max-w-sm mx-auto w-full">
      <StarIcon className="w-16 h-16 text-amber-400" />
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-wide">CONGRATULATIONS!</h1>
      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mt-1">
        Course Completed
      </p>
      <p className="text-lg font-semibold text-slate-900">{language?.name ?? 'Course'}</p>
      <Link
        to="/home"
        className="mt-6 w-full bg-slate-900 text-white rounded-full px-8 py-3 font-medium"
      >
        Complete
      </Link>
      <div className="w-full">
        <ProgressBar percent={100} />
      </div>
    </div>
  )
}
