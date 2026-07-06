import { supabase } from './supabaseClient'

const SUPABASE_READY =
  typeof import.meta.env.VITE_SUPABASE_URL === 'string' &&
  import.meta.env.VITE_SUPABASE_URL.includes('.supabase.co')

const storageKey = (userId) => `lingoconnect:progress:${userId ?? 'guest'}`

function readLocal(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeLocal(userId, data) {
  localStorage.setItem(storageKey(userId), JSON.stringify(data))
}

// Shape: { [languageId]: number[] completedSteps } — "step" is the 1-based
// position of a lesson in that language's ordered curriculum array.

export async function getProgress(userId) {
  if (SUPABASE_READY && userId) {
    const { data, error } = await supabase
      .from('progress')
      .select('language, completed_days')
      .eq('user_id', userId)
    if (!error && data) {
      return Object.fromEntries(data.map((row) => [row.language, row.completed_days]))
    }
  }
  return readLocal(userId)
}

export async function markStepComplete(userId, languageId, step) {
  const all = await getProgress(userId)
  const completed = new Set(all[languageId] ?? [])
  completed.add(step)
  const completedSteps = Array.from(completed).sort((a, b) => a - b)
  const next = { ...all, [languageId]: completedSteps }

  if (SUPABASE_READY && userId) {
    await supabase
      .from('progress')
      .upsert(
        { user_id: userId, language: languageId, completed_days: completedSteps },
        { onConflict: 'user_id,language' }
      )
  } else {
    writeLocal(userId, next)
  }

  return next
}

export async function resetLanguage(userId, languageId) {
  const all = await getProgress(userId)
  const next = { ...all, [languageId]: [] }

  if (SUPABASE_READY && userId) {
    await supabase
      .from('progress')
      .upsert(
        { user_id: userId, language: languageId, completed_days: [] },
        { onConflict: 'user_id,language' }
      )
  } else {
    writeLocal(userId, next)
  }

  return next
}
