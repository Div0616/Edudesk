// src/components/layout/Layout.jsx — Bold & Bright, icon-only sidebar with hover expand + dark mode
import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard',  emoji: '📊' },
  { to: '/classes',   icon: '🏫', label: 'Classes',    emoji: '🏫' },
  { to: '/exams',     icon: '📝', label: 'Exams',      emoji: '📝' },
  { to: '/homework',  icon: '📚', label: 'Homework',   emoji: '📚' },
  { to: '/timetable', icon: '🗓️',  label: 'Timetable',  emoji: '🗓️'  },
  { to: '/reports',   icon: '📄', label: 'Reports',    emoji: '📄' },
  { to: '/analytics', icon: '📈', label: 'Analytics',  emoji: '📈' },
  { to: '/profile',   icon: '👤', label: 'My Profile', emoji: '👤' },
]

/* ── Dark Mode Hook ── */
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('edudesk-dark')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('edudesk-dark', dark)
  }, [dark])
  return [dark, setDark]
}

export const Layout = ({ children }) => {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [dark, setDark] = useDarkMode()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const initial = profile?.name?.charAt(0)?.toUpperCase() || 'T'

  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-950 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          flex flex-col
          bg-white dark:bg-surface-900
          border-r border-surface-100 dark:border-surface-800
          shadow-card
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${expanded ? 'lg:w-64' : 'lg:w-[72px]'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-surface-100 dark:border-surface-800 overflow-hidden">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow shadow-sm">
            <span className="text-white font-display font-black text-lg">E</span>
          </div>
          <div className={`transition-all duration-200 overflow-hidden ${expanded || mobileOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'}`}>
            <p className="text-surface-900 dark:text-surface-50 font-display font-black text-lg leading-none whitespace-nowrap">EduDesk</p>
            <p className="text-surface-400 dark:text-surface-500 text-xs mt-0.5 whitespace-nowrap">Teacher Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-800 dark:hover:text-surface-200'
                }`
              }
            >
              <span className="text-xl flex-shrink-0 w-6 text-center">{item.emoji}</span>
              <span className={`transition-all duration-200 whitespace-nowrap ${expanded || mobileOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Dark Mode Toggle + Profile */}
        <div className="px-3 py-4 border-t border-surface-100 dark:border-surface-800 space-y-2 overflow-hidden">
          {/* Dark toggle */}
          <button
            onClick={() => setDark(d => !d)}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-semibold text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-800 dark:hover:text-surface-200 transition-all duration-200 overflow-hidden"
          >
            <span className="text-xl flex-shrink-0 w-6 text-center">{dark ? '☀️' : '🌙'}</span>
            <span className={`transition-all duration-200 whitespace-nowrap ${expanded || mobileOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'}`}>
              {dark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Profile row */}
          <div className="flex items-center gap-3 px-2.5 py-2 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initial}
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-200 ${expanded || mobileOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'}`}>
              <p className="text-surface-900 dark:text-surface-50 text-xs font-semibold truncate whitespace-nowrap">{profile?.name || 'Teacher'}</p>
              <p className="text-surface-400 text-xs truncate whitespace-nowrap">{profile?.school || 'Your School'}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-semibold text-surface-500 dark:text-surface-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 overflow-hidden"
          >
            <span className="text-xl flex-shrink-0 w-6 text-center">🚪</span>
            <span className={`transition-all duration-200 whitespace-nowrap ${expanded || mobileOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile) */}
        <header className="bg-white dark:bg-surface-900 border-b border-surface-100 dark:border-surface-800 px-5 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-black text-sm">E</span>
            </div>
            <span className="font-display font-black text-surface-900 dark:text-surface-50">EduDesk</span>
          </div>
          <button onClick={() => setDark(d => !d)} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors">
            {dark ? '☀️' : '🌙'}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

/* ── Page Header ── */
export const PageHeader = ({ title, subtitle, action, gradient }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className={`text-2xl font-display font-extrabold leading-tight ${gradient ? 'gradient-text' : 'text-surface-900 dark:text-surface-50'}`}>{title}</h1>
      {subtitle && <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
)
