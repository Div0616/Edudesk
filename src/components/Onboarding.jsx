// src/components/Onboarding.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  {
    title: "Welcome to EduDesk! 🎓",
    description: "Your all-in-one teacher management portal. Let's take a quick tour so you can get started in under 2 minutes.",
    icon: "🏫",
    action: null,
  },
  {
    title: "Create Your First Class",
    description: "Start by creating a class (e.g. 'Grade 10 - Section A'). Then add students with their parent's WhatsApp number.",
    icon: "🏫",
    action: { label: "Go to Classes →", path: "/classes" },
    highlight: "classes"
  },
  {
    title: "Add Subjects",
    description: "Inside each class, go to the 'Subjects' tab and add any subjects you teach — fully custom, no predefined list!",
    icon: "📚",
    action: { label: "Open Classes →", path: "/classes" },
    highlight: "classes"
  },
  {
    title: "Mark Attendance",
    description: "Open a class and click 'Attendance' to mark students Present, Absent, or Late. EduDesk auto-calculates percentages.",
    icon: "📅",
    action: { label: "Go to Classes →", path: "/classes" },
    highlight: "classes"
  },
  {
    title: "Create Exams & Enter Marks",
    description: "Go to Exams to create a test, then enter marks for each student. Grades are auto-calculated (A+, A, B, C, D, F).",
    icon: "📝",
    action: { label: "Go to Exams →", path: "/exams" },
    highlight: "exams"
  },
  {
    title: "Assign Homework",
    description: "Use the Homework section to assign tasks per subject, set due dates, and track completion status.",
    icon: "📚",
    action: { label: "Go to Homework →", path: "/homework" },
    highlight: "homework"
  },
  {
    title: "Generate & Share Reports",
    description: "Go to Reports to generate Excel report cards and send them directly to parents via WhatsApp with one click!",
    icon: "📄",
    action: { label: "Go to Reports →", path: "/reports" },
    highlight: "reports"
  },
  {
    title: "You're All Set! 🚀",
    description: "EduDesk is ready to use. Check Analytics for insights, manage your Timetable, and keep your Profile updated.",
    icon: "🎉",
    action: { label: "Go to Dashboard →", path: "/dashboard" },
    highlight: "dashboard"
  },
]

const ONBOARDING_KEY = 'edudesk_onboarding_done'

export const useOnboarding = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY)
    if (!done) {
      setTimeout(() => setShow(true), 800) // slight delay for page load
    }
  }, [])

  const complete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setShow(false)
  }

  const reset = () => {
    localStorage.removeItem(ONBOARDING_KEY)
    setShow(true)
  }

  return { show, complete, reset }
}

export const OnboardingTutorial = ({ onClose }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const handleNext = () => {
    if (isLast) {
      onClose()
      navigate('/dashboard')
    } else {
      setStep(s => s + 1)
    }
  }

  const handleAction = () => {
    if (current.action?.path) {
      navigate(current.action.path)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-950/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'bg-primary-500 w-6' : i < step ? 'bg-accent-300 w-3' : 'bg-gray-200 w-3'}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{current.icon}</div>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-3">{current.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{current.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {current.action && (
              <button onClick={handleAction}
                className="w-full py-3 bg-surface-900 text-white rounded-xl text-sm font-medium hover:bg-surface-800 transition-colors">
                {current.action.label}
              </button>
            )}
            <button onClick={handleNext}
              className="w-full py-3 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">
              {isLast ? '🚀 Get Started!' : 'Next →'}
            </button>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← Back</button>
            )}
          </div>
        </div>

        {/* Skip */}
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100">
          Skip tour
        </button>
      </div>
    </div>
  )
}
