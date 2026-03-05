// src/App.jsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { OnboardingWrapper } from './components/OnboardingWrapper'

// Lazy load all pages — each gets its own chunk (code splitting)
const Login          = lazy(() => import('./pages/Login'))
const Dashboard      = lazy(() => import('./pages/Dashboard'))
const Classes        = lazy(() => import('./pages/Classes'))
const ClassDetail    = lazy(() => import('./pages/ClassDetail'))
const Attendance     = lazy(() => import('./pages/Attendance'))
const StudentProfile = lazy(() => import('./pages/StudentProfile'))
const Exams          = lazy(() => import('./pages/Exams'))
const ExamDetail     = lazy(() => import('./pages/ExamDetail'))
const Reports        = lazy(() => import('./pages/Reports'))
const Homework       = lazy(() => import('./pages/Homework'))
const Timetable      = lazy(() => import('./pages/Timetable'))
const Analytics      = lazy(() => import('./pages/Analytics'))
const TeacherProfile = lazy(() => import('./pages/TeacherProfile'))

// Skeleton that looks like the actual app layout — no jarring blank screen
const PageLoader = () => (
  <div className="flex h-screen bg-gray-50 overflow-hidden">
    <div className="hidden lg:flex w-64 bg-surface-900 flex-col p-4 gap-2 flex-shrink-0">
      <div className="flex items-center gap-3 px-2 py-3 mb-4">
        <div className="w-9 h-9 bg-primary-500 rounded-xl" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-surface-700 rounded-lg w-20 animate-pulse" />
          <div className="h-2.5 bg-surface-800 rounded-lg w-14 animate-pulse" />
        </div>
      </div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-10 bg-surface-800 rounded-xl animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
      ))}
    </div>
    <div className="flex-1 flex flex-col min-w-0">
      <div className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
        <div className="flex-1 h-5 bg-gray-200 rounded-lg max-w-xs animate-pulse" />
        <div className="w-9 h-9 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      <div className="p-6 lg:p-8 space-y-6 overflow-hidden">
        <div className="h-8 bg-gray-200 rounded-xl w-52 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse shadow-card" style={{ animationDelay: `${i * 70}ms` }} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-64 bg-white rounded-2xl border border-gray-100 animate-pulse shadow-card" />
          <div className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse shadow-card" />
        </div>
      </div>
    </div>
  </div>
)

// Auth loading — shown while Firebase checks auth state
const AuthLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-surface-950 via-surface-900 to-surface-800 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg">E</div>
      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
    </div>
  </div>
)

const P = ({ children }) => (
  <ProtectedRoute>
    <OnboardingWrapper>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </OnboardingWrapper>
  </ProtectedRoute>
)

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Suspense fallback={<AuthLoader />}><Login /></Suspense>} />
          <Route path="/dashboard"                   element={<P><Dashboard /></P>} />
          <Route path="/classes"                     element={<P><Classes /></P>} />
          <Route path="/classes/:classId"            element={<P><ClassDetail /></P>} />
          <Route path="/classes/:classId/attendance" element={<P><Attendance /></P>} />
          <Route path="/students/:studentId"         element={<P><StudentProfile /></P>} />
          <Route path="/exams"                       element={<P><Exams /></P>} />
          <Route path="/exams/:examId"               element={<P><ExamDetail /></P>} />
          <Route path="/reports"                     element={<P><Reports /></P>} />
          <Route path="/homework"                    element={<P><Homework /></P>} />
          <Route path="/timetable"                   element={<P><Timetable /></P>} />
          <Route path="/analytics"                   element={<P><Analytics /></P>} />
          <Route path="/profile"                     element={<P><TeacherProfile /></P>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster position="top-right" toastOptions={{
          duration: 3000,
          style: { background: '#1E3A5F', color: '#fff', borderRadius: '12px', fontSize: '14px', fontFamily: 'Poppins, sans-serif' },
          success: { iconTheme: { primary: '#2F80ED', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }} />
      </BrowserRouter>
    </AuthProvider>
  )
}
