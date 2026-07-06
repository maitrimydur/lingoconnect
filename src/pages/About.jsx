import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../components/icons'
import BottomNav from '../components/BottomNav'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex-1 px-6 py-8 max-w-sm mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-4"
        >
          <BackIcon className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">LingoConnect</h1>
          <div className="text-4xl mt-2">🕊️</div>
        </div>

        <div className="flex flex-col gap-5 text-sm text-slate-600 leading-relaxed">
          <p>
            Welcome to Lingo Connect, where language learning meets convenience and inspiration!
          </p>

          <div>
            <p className="font-semibold text-slate-900 mb-1">Our Mission:</p>
            <p>
              At LingoConnect, our goal is to empower individuals around the world to bridge
              communication gaps and unlock new opportunities through language. We believe that
              learning a new language should be accessible, enjoyable, and thoroughly rewarding.
            </p>
          </div>

          <p>
            With LingoConnect, we&rsquo;ve crafted a unique educational experience that caters to
            learners of all levels. Whether you&rsquo;re a beginner looking to pick up basic
            phrases for travel or an advanced learner aiming to refine your fluency, our app
            provides tailored content that grows with you.
          </p>

          <div>
            <p className="font-semibold text-slate-900 mb-1">Innovative Learning Approach:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>
                <span className="font-medium text-slate-800">Engaging Video Lessons:</span> Dive
                into our comprehensive video lessons that cover grammar, vocabulary,
                pronunciation, and cultural nuances.
              </li>
              <li>
                <span className="font-medium text-slate-800">Interactive Quizzes:</span> Test your
                knowledge as you go, with quizzes designed to reinforce learning and help you
                track your progress.
              </li>
              <li>
                <span className="font-medium text-slate-800">Daily Goals and Rewards:</span> Stay
                motivated with daily learning objectives and rewards that celebrate your
                achievements.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-900 mb-1">Community and Support:</p>
            <p>
              Join a vibrant community of fellow language enthusiasts! Share experiences, practice
              with peers, and enjoy continuous support from our dedicated team, ensuring you never
              feel alone on your language learning journey.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900 mb-1">Designed for You:</p>
            <p>
              LingoConnect is more than just an app — it&rsquo;s your personal language coach and
              a passport to a global community. Our adaptive learning platform customizes lessons
              based on your performance and preferences, making each learning session effective.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-900 mb-1">Our Promise:</p>
            <p>
              We&rsquo;re committed to making your language learning journey as engaging and
              effective as possible. With LingoConnect, unlock the power of languages and expand
              your horizons.
            </p>
            <p className="mt-2">
              Start your journey with LingoConnect today — because the world is vast and full of
              voices waiting to be understood.
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
