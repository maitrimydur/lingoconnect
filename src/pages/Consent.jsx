import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { acceptConsent } from '../lib/consentStore'

export default function Consent() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)

  function handleContinue() {
    acceptConsent(user?.id)
    navigate('/home', { replace: true })
  }

  return (
    <div className="min-h-svh flex flex-col justify-center px-6 py-12 max-w-sm mx-auto w-full">
      <div className="text-4xl mb-4 text-center">🕊️</div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-4 text-center">
        Before you get started
      </h1>

      <div className="flex flex-col gap-3 text-sm text-slate-600 mb-6">
        <p>
          LingoConnect helps you learn a new language through short daily videos and quizzes. Here's
          what you should know before using it:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Your email and lesson progress are stored securely and used only to run your account.</li>
          <li>Profile details (name, pronouns, photo, etc.) are stored on this device and are yours to edit or clear anytime in Settings.</li>
          <li>This is an independent learning app, not affiliated with any language institution.</li>
          <li>You can delete your progress at any time from Settings.</li>
        </ul>
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-700 mb-6">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4"
        />
        <span>I have read the above and agree to use LingoConnect on these terms.</span>
      </label>

      <button
        onClick={handleContinue}
        disabled={!agreed}
        className="w-full bg-sky-700 text-white rounded-full py-3 font-medium disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  )
}
