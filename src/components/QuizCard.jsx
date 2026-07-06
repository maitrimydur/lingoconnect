import { useState } from 'react'

export default function QuizCard({ lesson, onSubmit }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = lesson.questions.every((_, i) => answers[i] !== undefined)

  function selectAnswer(questionIndex, optionIndex) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }))
  }

  function handleSubmit() {
    setSubmitted(true)
    const score = lesson.questions.filter((q, i) => answers[i] === q.answerIndex).length
    onSubmit?.(score, lesson.questions.length)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4">{lesson.title}</h2>
      <div className="flex flex-col gap-6">
        {lesson.questions.map((q, qi) => (
          <div key={qi}>
            <p className="font-medium text-slate-800 mb-2">
              {qi + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((option, oi) => {
                const isSelected = answers[qi] === oi
                const isCorrect = q.answerIndex === oi
                let stateClasses = 'border-slate-200'
                if (submitted && isSelected && isCorrect) stateClasses = 'border-green-500 bg-green-50'
                else if (submitted && isSelected && !isCorrect) stateClasses = 'border-red-500 bg-red-50'
                else if (submitted && isCorrect) stateClasses = 'border-green-500'
                else if (isSelected) stateClasses = 'border-slate-900'

                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => selectAnswer(qi, oi)}
                    disabled={submitted}
                    className={`text-left border rounded-lg px-4 py-2.5 text-sm ${stateClasses}`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {submitted ? (
        <p className="mt-6 text-center font-medium text-slate-900">
          You got {lesson.questions.filter((q, i) => answers[i] === q.answerIndex).length} /{' '}
          {lesson.questions.length} correct
        </p>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="mt-6 w-full bg-slate-900 text-white rounded-full py-3 font-medium disabled:opacity-40"
        >
          Check Answers
        </button>
      )}
    </div>
  )
}
