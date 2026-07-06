export const LANGUAGES = [
  { id: 'english', name: 'English', flag: '🇺🇸', speakers: '1.46 billion speakers' },
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸', speakers: '538 million speakers' },
  { id: 'french', name: 'French', flag: '🇫🇷', speakers: '321 million speakers' },
  { id: 'mandarin', name: 'Mandarin', flag: '🇨🇳', speakers: '1.138 billion speakers' },
  { id: 'german', name: 'German', flag: '🇩🇪', speakers: '97.36 million speakers' },
]

export function getLanguage(id) {
  return LANGUAGES.find((lang) => lang.id === id)
}
