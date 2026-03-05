// src/pages/TeacherProfile.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Input, Card } from '../components/ui/index'
import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useOnboarding } from '../components/Onboarding'
import { OnboardingTutorial } from '../components/Onboarding'
import toast from 'react-hot-toast'

export default function TeacherProfile() {
  const { user, profile, updateProfileData } = useAuth()
  const { show: showTour, reset: resetTour, complete: completeTour } = useOnboarding()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: profile?.name || '',
    school: profile?.school || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    subjects: profile?.subjects?.join(', ') || '',
  })
  const [subjectInput, setSubjectInput] = useState('')
  const [subjectList, setSubjectList] = useState(profile?.subjects || [])
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [pwErrors, setPwErrors] = useState({})
  const [pwSaving, setPwSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      await updateProfileData({ name: form.name, school: form.school, phone: form.phone, bio: form.bio, subjects: subjectList })
      await updateProfile(auth.currentUser, { displayName: form.name })
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const addSubject = () => {
    const trimmed = subjectInput.trim()
    if (trimmed && !subjectList.includes(trimmed)) {
      setSubjectList(prev => [...prev, trimmed])
    }
    setSubjectInput('')
  }

  const removeSubject = (s) => setSubjectList(prev => prev.filter(x => x !== s))

  const stats = [
    { label: 'Email', value: user?.email, icon: '📧' },
    { label: 'Provider', value: user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email/Password', icon: '🔐' },
    { label: 'Member Since', value: user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—', icon: '📅' },
    { label: 'Last Sign In', value: user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : '—', icon: '🕐' },
  ]

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader title="My Profile" subtitle="Manage your account and preferences" />

        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-surface-800 to-surface-900 rounded-3xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {profile?.name?.charAt(0)?.toUpperCase() || 'T'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white" title="Online" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">{profile?.name || 'Teacher'}</h2>
            <p className="text-surface-300 mt-0.5">{profile?.school || 'Add your school name'}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              {subjectList.slice(0, 4).map(s => (
                <span key={s} className="px-2.5 py-0.5 bg-white/10 text-white text-xs rounded-full">{s}</span>
              ))}
              {subjectList.length > 4 && <span className="px-2.5 py-0.5 bg-white/10 text-white text-xs rounded-full">+{subjectList.length - 4} more</span>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-sm">
          {[['profile', '👤 Profile'], ['account', '🔐 Account']].map(([t, l]) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === t ? 'bg-white text-surface-900 dark:text-surface-50 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {l}
            </button>
          ))}
        </div>

        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
                  <Input label="School / Institution" value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} placeholder="Your school name" />
                  <Input label="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+92 300 1234567" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / Note</label>
                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                      placeholder="A short note about yourself..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none" />
                  </div>
                  <Button onClick={handleSave} loading={saving} className="w-full sm:w-auto">💾 Save Changes</Button>
                </div>
              </Card>

              {/* Subjects */}
              <Card>
                <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-1">Subjects I Teach</h3>
                <p className="text-xs text-gray-400 mb-4">These appear on your profile. Each class can have its own subjects.</p>
                <div className="flex gap-2 mb-3">
                  <input value={subjectInput} onChange={e => setSubjectInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSubject()}
                    placeholder="Type a subject and press Enter..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
                  <Button onClick={addSubject} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjectList.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium">
                      {s}
                      <button onClick={() => removeSubject(s)} className="text-blue-400 hover:text-blue-700 text-xs leading-none">✕</button>
                    </span>
                  ))}
                  {subjectList.length === 0 && <p className="text-sm text-gray-400">No subjects added yet</p>}
                </div>
              </Card>
            </div>

            {/* Account Info */}
            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-4">Account Details</h3>
                <div className="space-y-3">
                  {stats.map(s => (
                    <div key={s.label} className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">{s.icon}</span>
                      <div>
                        <p className="text-xs text-gray-400">{s.label}</p>
                        <p className="text-sm font-medium text-gray-800 break-all">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Account / Security Tab */
          <div className="max-w-lg space-y-4">
            {/* Restart Tour */}
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-1">App Tour</h3>
              <p className="text-xs text-gray-400 mb-4">Restart the onboarding walkthrough to get a guided tour of all EduDesk features.</p>
              <Button variant="secondary" onClick={resetTour}>🗺️ Restart Onboarding Tour</Button>
            </Card>

            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-1">Change Password</h3>
              <p className="text-xs text-gray-400 mb-5">Only available for Email/Password accounts. Google sign-in users manage passwords through Google.</p>
              {user?.providerData?.[0]?.providerId === 'google.com' ? (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                  You signed in with Google. To change your password, go to your Google account settings.
                </div>
              ) : (
                <div className="space-y-4">
                  <Input label="Current Password" type="password" value={pwForm.current}
                    onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                    placeholder="••••••••" error={pwErrors.current} />
                  <Input label="New Password" type="password" value={pwForm.newPw}
                    onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))}
                    placeholder="Min 6 characters" error={pwErrors.newPw} />
                  <Input label="Confirm New Password" type="password" value={pwForm.confirm}
                    onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                    placeholder="Repeat new password" error={pwErrors.confirm} />
                  <Button loading={pwSaving} onClick={async () => {
                    const e = {}
                    if (!pwForm.current) e.current = 'Required'
                    if (!pwForm.newPw || pwForm.newPw.length < 6) e.newPw = 'Min 6 characters'
                    if (pwForm.newPw !== pwForm.confirm) e.confirm = 'Passwords do not match'
                    setPwErrors(e)
                    if (Object.keys(e).length) return
                    setPwSaving(true)
                    try {
                      const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } = await import('firebase/auth')
                      const cred = EmailAuthProvider.credential(user.email, pwForm.current)
                      await reauthenticateWithCredential(auth.currentUser, cred)
                      await updatePassword(auth.currentUser, pwForm.newPw)
                      toast.success('Password updated!')
                      setPwForm({ current: '', newPw: '', confirm: '' })
                    } catch (err) {
                      if (err.code === 'auth/wrong-password') setPwErrors({ current: 'Incorrect current password' })
                      else toast.error(err.message)
                    } finally { setPwSaving(false) }
                  }}>🔐 Update Password</Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}
