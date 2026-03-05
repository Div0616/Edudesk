// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Skeleton shown while Firebase resolves auth — matches the app layout
const AuthSkeleton = () => (
  <div className="flex h-screen bg-gray-50 overflow-hidden">
    <div className="hidden lg:flex w-64 bg-surface-900 flex-col p-4 gap-2 flex-shrink-0">
      <div className="flex items-center gap-3 px-2 py-4 mb-2">
        <div className="w-9 h-9 bg-primary-500 rounded-xl animate-pulse" />
        <div className="h-4 bg-surface-700 rounded-lg flex-1 animate-pulse" />
      </div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-10 bg-surface-800 rounded-xl animate-pulse" style={{ animationDelay: `${i * 40}ms` }} />
      ))}
    </div>
    <div className="flex-1 flex flex-col min-w-0">
      <div className="h-16 bg-white border-b border-gray-100 animate-pulse flex-shrink-0" />
      <div className="p-8 space-y-5">
        <div className="h-7 w-48 bg-gray-200 rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse" />
      </div>
    </div>
  </div>
)

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <AuthSkeleton />
  return user ? children : <Navigate to="/login" replace />
}
