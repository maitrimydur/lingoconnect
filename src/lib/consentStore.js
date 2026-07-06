const storageKey = (userId) => `lingoconnect:consent:${userId ?? 'guest'}`

export function hasAcceptedConsent(userId) {
  return localStorage.getItem(storageKey(userId)) === 'true'
}

export function acceptConsent(userId) {
  localStorage.setItem(storageKey(userId), 'true')
}
