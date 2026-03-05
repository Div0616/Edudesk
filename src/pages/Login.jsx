// src/pages/Login.jsx — Bold & Bright UI
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { loginEmail, registerEmail, loginGoogle } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (mode === 'register' && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      if (mode === 'login') {
        await loginEmail(form.email, form.password)
        toast.success('Welcome back!')
      } else {
        await registerEmail(form.email, form.password, form.name)
        toast.success('Account created!')
      }
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.code === 'auth/wrong-password' ? 'Incorrect password' :
        err.code === 'auth/user-not-found' ? 'No account with this email' :
        err.code === 'auth/email-already-in-use' ? 'Email already in use' :
        'Something went wrong')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await loginGoogle()
      navigate('/dashboard')
      toast.success('Signed in with Google!')
    } catch { toast.error('Google sign-in failed') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/40 dark:bg-orange-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fadeUp">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow shadow-lg">
            <span className="text-white font-display font-black text-3xl">E</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-surface-900 dark:text-surface-50">EduDesk</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1 text-sm">Teacher Management Portal</p>
        </div>

        <div className="bg-white dark:bg-surface-900 rounded-3xl shadow-xl border border-surface-100 dark:border-surface-800 p-8">
          {/* Tab toggle */}
          <div className="flex bg-surface-100 dark:bg-surface-800 rounded-2xl p-1.5 mb-6">
            {['login','register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}) }}
                className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all capitalize ${
                  mode === m ? 'bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-50 shadow-sm' : 'text-surface-500'
                }`}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Full Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name" className="input-base" />
                {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@school.com" className="input-base" />
              {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••" className="input-base"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>}
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-glow active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200 dark:border-surface-700" /></div>
              <div className="relative flex justify-center"><span className="bg-white dark:bg-surface-900 px-3 text-xs text-surface-400 font-medium">or</span></div>
            </div>

            <button onClick={handleGoogle} disabled={loading}
              className="w-full py-3 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 font-semibold rounded-xl border border-surface-200 dark:border-surface-700 transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
