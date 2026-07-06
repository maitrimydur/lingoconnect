const storageKey = (userId) => `lingoconnect:profile:${userId ?? 'guest'}`

export const DEFAULT_PROFILE = {
  name: '',
  username: '',
  pronouns: '',
  gender: '',
  phone: '',
  nativeLanguages: [],
  avatarUrl: '',
}

export function getProfile(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : { ...DEFAULT_PROFILE }
  } catch {
    return { ...DEFAULT_PROFILE }
  }
}

export function saveProfile(userId, profile) {
  localStorage.setItem(storageKey(userId), JSON.stringify(profile))
}
