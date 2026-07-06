import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LANGUAGES } from '../data/languages'
import { DEFAULT_PROFILE, getProfile, saveProfile } from '../lib/profileStore'
import { BackIcon } from '../components/icons'

const PRONOUN_OPTIONS = ['She/Her', 'He/Him', 'They/Them', 'Prefer not to say', 'Other']
const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say', 'Other']

const MAX_AVATAR_SIZE = 200

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, MAX_AVATAR_SIZE / Math.max(img.width, img.height))
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProfile(getProfile(user?.id))
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

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await resizeImageFile(file)
    update('avatarUrl', dataUrl)
  }

  function handleSave() {
    saveProfile(user?.id, profile)
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
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-900 text-white flex items-center justify-center text-2xl font-semibold"
          aria-label="Change profile photo"
        >
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            (profile.name || user?.email || '?').charAt(0).toUpperCase()
          )}
          <span className="absolute inset-x-0 bottom-0 bg-black/50 text-[10px] py-0.5">Edit</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        <h1 className="text-xl font-bold text-slate-900 mt-3">Edit Profile</h1>
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Name" value={profile.name} onChange={(v) => update('name', v)} />
        <Field label="Username" value={profile.username} onChange={(v) => update('username', v)} />
        <SelectField
          label="Pronouns"
          value={profile.pronouns}
          options={PRONOUN_OPTIONS}
          onChange={(v) => update('pronouns', v)}
        />
        <SelectField
          label="Gender"
          value={profile.gender}
          options={GENDER_OPTIONS}
          onChange={(v) => update('gender', v)}
        />

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

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}
