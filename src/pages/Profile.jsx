import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LANGUAGES } from '../data/languages'
import { BackIcon } from '../components/icons'

function storageKey(userId) {
  return `lingoconnect:profile:${userId ?? 'guest'}`
}

const DEFAULT_PROFILE = {
  name: '',
  username: '',
  pronouns: '',
  gender: '',
  phone: '',
  nativeLanguages: [],
}

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(storageKey(user?.id))
    if (raw) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) })
  }, [user?.id])

  function update(field, value) {
    setSaved(false)
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  function toggleNativeLanguage(id) {
    setSaved(false)
    setProfile((prev) => ({
      ...prev,
      nativeLanguages: prev.nativeLanguages.includes(id)
        ? prev.nativeLanguages.filter((l) => l !== id)
        : [...prev.nativeLanguages, id],
    }))
  }

  function handleSave() {
    localStorage.setItem(storageKey(user?.id), JSON.stringify(profile))
    setSaved(true)
  }

  return (
    <div className="min-h-svh px-6 py-8 max-w-sm mx-auto w-full">
      <button
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-4"
      >
        <BackIcon className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-semibold">
          {(profile.name || user?.email || '?').charAt(0).toUpperCase()}
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-3">Edit Profile</h1>
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Name" value={profile.name} onChange={(v) => update('name', v)} />
        <Field label="Username" value={profile.username} onChange={(v) => update('username', v)} />
        <Field label="Pronouns" value={profile.pronouns} onChange={(v) => update('pronouns', v)} />
        <Field label="Gender" value={profile.gender} onChange={(v) => update('gender', v)} />

        <div className="mt-2">
          <p className="text-sm font-semibold text-slate-900 mb-2">Contact</p>
          <Field label="E-mail" value={user?.email ?? ''} disabled />
          <Field
            label="Phone Number"
            value={profile.phone}
            onChange={(v) => update('phone', v)}
            placeholder="+ (999) - 999 - 9999"
          />
        </div>

        <div className="mt-2">
          <p className="text-sm font-semibold text-slate-900 mb-2">Native Language(s)</p>
          <div className="flex flex-col gap-2">
            {LANGUAGES.map((lang) => (
              <label key={lang.id} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={profile.nativeLanguages.includes(lang.id)}
                  onChange={() => toggleNativeLanguage(lang.id)}
                  className="w-4 h-4"
                />
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-slate-900 text-white rounded-full py-3 font-medium"
        >
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, disabled, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-500">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-400"
      />
    </label>
  )
}
