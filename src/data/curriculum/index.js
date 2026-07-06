import english from './english'
import spanish from './spanish'
import french from './french'
import mandarin from './mandarin'
import german from './german'

export const CURRICULUM = { english, spanish, french, mandarin, german }

export function getCurriculum(languageId) {
  return CURRICULUM[languageId] ?? []
}

// Lessons are looked up by their 1-based position in the ordered array, not by
// "day", since quiz checkpoints in the design don't carry their own day number
// (only video lessons are labeled "Day N: Video").
export function getLesson(languageId, step) {
  const lessons = getCurriculum(languageId)
  return lessons[Number(step) - 1]
}
