import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getLanguage } from '../data/languages'
import { getCurriculum, getLesson } from '../data/curriculum'
import { markStepComplete } from '../lib/progressStore'
import LessonHeader from '../components/LessonHeader'
import VideoCard from '../components/VideoCard'
import QuizCard from '../components/QuizCard'
import ProgressBar from '../components/ProgressBar'

export default function Lesson() {
  const { langId, step } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const language = getLanguage(langId)
  const lessons = getCurriculum(langId)
  const lesson = getLesson(langId, step)
  const stepNumber = Number(step)
  const [ready, setReady] = useState(lesson?.type === 'video')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setReady(lesson?.type === 'video')
  }, [lesson])

  if (!language || !lesson) {
    return (
      <div className="min-h-svh flex items-center justify-center px-6 text-center text-slate-500">
        Lesson not found.
      </div>
    )
  }

  const percent = ((stepNumber - 1) / lessons.length) * 100
  const isLast = stepNumber >= lessons.length

  async function handleNext() {
    setSaving(true)
    await markStepComplete(user?.id, langId, stepNumber)
    setSaving(false)
    if (isLast) {
      navigate(`/learn/${langId}/complete`)
    } else {
      navigate(`/learn/${langId}/step/${stepNumber + 1}`)
    }
  }

  return (
    <div className="min-h-svh px-6 py-8 max-w-sm mx-auto w-full flex flex-col">
      <LessonHeader language={language} />

      {lesson.type === 'video' && (
        <h2 className="text-lg font-bold text-slate-900 mb-3">Day {lesson.day}: Video</h2>
      )}

      {lesson.type === 'video' ? (
        <VideoCard lesson={lesson} />
      ) : (
        <QuizCard lesson={lesson} onSubmit={() => setReady(true)} />
      )}

      <button
        onClick={handleNext}
        disabled={!ready || saving}
        className="mt-8 w-full bg-slate-900 text-white rounded-full py-3 font-medium disabled:opacity-40"
      >
        {saving ? 'Saving…' : 'Next'}
      </button>

      <ProgressBar percent={percent} />
    </div>
  )
}
