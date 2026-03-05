// src/components/ui/index.jsx — Bold & Bright Design System
import { useState } from 'react'

/* ── Button ── */
export const Button = ({ children, variant = 'primary', size = 'md', className = '', loading, ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed select-none'
  const variants = {
    primary:   'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-glow',
    secondary: 'bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700 shadow-sm',
    danger:    'bg-red-500 hover:bg-red-600 text-white shadow-sm',
    ghost:     'text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-700 dark:hover:text-surface-200',
    orange:    'bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-glowOrange',
    success:   'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
  }
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />}
      {children}
    </button>
  )
}

/* ── Input ── */
export const Input = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">{label}</label>}
    <input
      className={`input-base ${error ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-950/20 focus:ring-red-400' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
  </div>
)

/* ── Select ── */
export const Select = ({ label, error, children, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">{label}</label>}
    <select
      className={`input-base ${error ? 'border-red-400' : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
  </div>
)

/* ── Textarea ── */
export const Textarea = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">{label}</label>}
    <textarea
      className={`input-base resize-none ${error ? 'border-red-400 bg-red-50' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
  </div>
)

/* ── Badge ── */
export const Badge = ({ children, color = 'blue', className = '' }) => {
  const colors = {
    blue:   'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300',
    green:  'bg-primary-100 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300',
    red:    'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300',
    gray:   'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400',
    orange: 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300',
    purple: 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300',
  }
  return (
    <span className={`badge-base ${colors[color] || colors.gray} ${className}`}>
      {children}
    </span>
  )
}

/* ── Card ── */
export const Card = ({ children, className = '', onClick }) => (
  <div
    className={`card ${onClick ? 'cursor-pointer hover:shadow-cardHover transition-shadow duration-200' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

/* ── Stat Card ── */
export const StatCard = ({ label, value, icon, color = 'green', sub }) => {
  const colors = {
    green:  { bg: 'from-primary-500 to-primary-600', light: 'bg-primary-50 dark:bg-primary-950/30', text: 'text-primary-600 dark:text-primary-400' },
    orange: { bg: 'from-orange-500 to-orange-600',   light: 'bg-orange-50 dark:bg-orange-950/30',   text: 'text-orange-600 dark:text-orange-400' },
    blue:   { bg: 'from-blue-500 to-blue-600',       light: 'bg-blue-50 dark:bg-blue-950/30',       text: 'text-blue-600 dark:text-blue-400' },
    purple: { bg: 'from-purple-500 to-purple-600',   light: 'bg-purple-50 dark:bg-purple-950/30',   text: 'text-purple-600 dark:text-purple-400' },
  }
  const c = colors[color] || colors.green
  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-5 flex items-center gap-4 shadow-card hover:shadow-cardHover transition-shadow duration-200">
      <div className={`w-12 h-12 bg-gradient-to-br ${c.bg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-display font-extrabold text-surface-900 dark:text-surface-50 leading-none">{value}</p>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

/* ── Modal ── */
export const Modal = ({ open, onClose, title, children, size = 'md' }) => {
  if (!open) return null
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white dark:bg-surface-900 rounded-2xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto animate-popIn border border-surface-100 dark:border-surface-800`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-surface-800">
          <h2 className="text-base font-display font-bold text-surface-900 dark:text-surface-50">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

/* ── Empty State ── */
export const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeUp">
    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-950/50 dark:to-primary-900/50 rounded-3xl flex items-center justify-center mb-5 shadow-sm">
      <span className="text-4xl">{icon}</span>
    </div>
    <h3 className="text-lg font-display font-bold text-surface-700 dark:text-surface-300 mb-2">{title}</h3>
    <p className="text-sm text-surface-400 dark:text-surface-500 max-w-xs mb-6">{description}</p>
    {action}
  </div>
)

/* ── Spinner ── */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={`${sizes[size]} border-2 border-surface-200 dark:border-surface-700 border-t-primary-500 rounded-full animate-spin ${className}`} />
  )
}

/* ── Skeleton ── */
export const Skeleton = ({ className = '' }) => (
  <div className={`skeleton rounded-xl ${className}`} />
)

/* ── Skeleton Card ── */
export const SkeletonCard = () => (
  <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-5 shadow-card space-y-3">
    <div className="flex items-center gap-3">
      <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="flex justify-between pt-1">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
)

/* ── Skeleton Stats ── */
export const SkeletonStats = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-5 shadow-card flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    ))}
  </div>
)

/* ── Skeleton Table ── */
export const SkeletonTable = ({ rows = 5 }) => (
  <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 shadow-card overflow-hidden">
    <div className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-100 dark:border-surface-800 px-4 py-3 flex gap-4">
      {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-3 w-20" />)}
    </div>
    <div className="divide-y divide-surface-50 dark:divide-surface-800">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="px-4 py-3.5 flex items-center gap-4">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-4 flex-1 max-w-[200px]" />
          <Skeleton className="h-4 flex-1 max-w-[150px]" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      ))}
    </div>
  </div>
)

/* ── Skeleton Cards Grid ── */
export const SkeletonCards = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(count)].map((_, i) => <SkeletonCard key={i} />)}
  </div>
)

/* ── Confirm Dialog ── */
export const ConfirmDialog = ({ open, onClose, onConfirm, title, message, confirmLabel = 'Delete', loading }) => (
  <Modal open={open} onClose={onClose} title={title} size="sm">
    <p className="text-sm text-surface-600 dark:text-surface-400 mb-6">{message}</p>
    <div className="flex gap-3 justify-end">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
    </div>
  </Modal>
)
