import { LANGUAGES } from '../data/languages'
import { getCurriculum } from '../data/curriculum'
import BottomNav from '../components/BottomNav'
import { Link } from 'react-router-dom'

export default function Videos() {
  const items = LANGUAGES.map((lang) => {
    const step = getCurriculum(lang.id).findIndex((lesson) => lesson.type === 'video')
    return { lang, video: step === -1 ? null : getCurriculum(lang.id)[step], step: step + 1 }
  }).filter((item) => item.video)

  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Useful Videos</h1>
        <div className="flex flex-col gap-6">
          {items.map(({ lang, video, step }, i) => (
            <Link key={lang.id} to={`/learn/${lang.id}/step/${step}`} className="block">
              <p className="text-sm text-slate-500 mb-1">
                {i + 1}. {lang.name} Course - Beginner 1 |{' '}
                <span className="text-slate-900 font-medium">{video.channel}</span>
              </p>
              {video.videoId ? (
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.videoTitle}
                  className="w-full aspect-video object-cover rounded-lg bg-slate-100"
                />
              ) : (
                <div className="w-full aspect-video rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                  {lang.flag} {video.videoTitle}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
