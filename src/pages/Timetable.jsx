// src/pages/Timetable.jsx — optimistic updates + Bold & Bright UI
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { getClasses, getTimetable, saveTimetableSlot, deleteTimetableSlot, getSubjectsByClass } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Select, Spinner, Modal } from '../components/ui/index'
import toast from 'react-hot-toast'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const PERIODS = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7', 'Period 8']

const SLOT_COLORS = [
  'bg-primary-50 dark:bg-primary-950/40 border-primary-200 dark:border-primary-900 text-primary-800 dark:text-primary-300',
  'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900 text-orange-800 dark:text-orange-300',
  'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900 text-purple-800 dark:text-purple-300',
  'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300',
  'bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-900 text-pink-800 dark:text-pink-300',
  'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900 text-yellow-800 dark:text-yellow-300',
  'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900 text-teal-800 dark:text-teal-300',
  'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300',
]

export default function Timetable() {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [subjects, setSubjects] = useState([])
  const [slots, setSlots] = useState({})
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editSlot, setEditSlot] = useState(null)
  const [slotForm, setSlotForm] = useState({ subject: '', teacher: '', room: '', startTime: '', endTime: '' })
  const [saving, setSaving] = useState(false)

  const loadClasses = useCallback(async () => {
    if (!user) return
    const cls = await getClasses(user.uid)
    setClasses(cls)
    if (cls.length > 0) setSelectedClass(cls[0].id)
    setLoading(false)
  }, [user])

  const loadTimetable = useCallback(async () => {
    if (!selectedClass) return
    setLoading(true)
    const [rawSlots, subs] = await Promise.all([getTimetable(selectedClass), getSubjectsByClass(selectedClass)])
    setSubjects(subs)
    const map = {}
    rawSlots.forEach(s => { map[`${s.day}_${s.period}`] = { ...s } })
    setSlots(map)
    setLoading(false)
  }, [selectedClass])

  useEffect(() => { loadClasses() }, [loadClasses])
  useEffect(() => { loadTimetable() }, [loadTimetable])

  const openSlot = useCallback((day, period) => {
    setEditSlot({ day, period })
    const existing = slots[`${day}_${period}`]
    setSlotForm(existing
      ? { subject: existing.subject || '', teacher: existing.teacher || '', room: existing.room || '', startTime: existing.startTime || '', endTime: existing.endTime || '' }
      : { subject: '', teacher: '', room: '', startTime: '', endTime: '' })
    setModal(true)
  }, [slots])

  const handleSave = async () => {
    if (!slotForm.subject.trim()) { toast.error('Subject is required'); return }
    setSaving(true)
    const key = `${editSlot.day}_${editSlot.period}`
    // Optimistic update
    setSlots(prev => ({ ...prev, [key]: { ...slotForm, day: editSlot.day, period: editSlot.period } }))
    setModal(false)
    toast.success('Slot saved!')
    try { await saveTimetableSlot(selectedClass, user.uid, editSlot.day, editSlot.period, slotForm) }
    catch { toast.error('Failed to save'); loadTimetable() }
    setSaving(false)
  }

  const handleClear = async () => {
    const key = `${editSlot.day}_${editSlot.period}`
    const existing = slots[key]
    setSlots(prev => { const n = { ...prev }; delete n[key]; return n })
    setModal(false)
    toast.success('Slot cleared')
    if (existing?.id) {
      try { await deleteTimetableSlot(existing.id) }
      catch { toast.error('Failed to clear'); loadTimetable() }
    }
  }

  const currentClass = useMemo(() => classes.find(c => c.id === selectedClass), [classes, selectedClass])

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader title="Timetable" subtitle="Weekly class schedule" gradient />

        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
          <Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="max-w-xs">
            {classes.map(c => <option key={c.id} value={c.id}>{c.className} — {c.section}</option>)}
          </Select>
          {currentClass && (
            <span className="text-sm text-surface-500 dark:text-surface-400 font-medium">
              📚 {subjects.length} subject{subjects.length !== 1 ? 's' : ''} configured
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-card">
            <div className="min-w-[720px] p-4">
              {/* Day headers */}
              <div className="grid gap-1.5 mb-2" style={{ gridTemplateColumns: `120px repeat(${DAYS.length}, 1fr)` }}>
                <div />
                {DAYS.map(d => (
                  <div key={d} className="text-center py-2 text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">{d.slice(0, 3)}</div>
                ))}
              </div>
              {/* Rows */}
              {PERIODS.map((period, pi) => (
                <div key={period} className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: `120px repeat(${DAYS.length}, 1fr)` }}>
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 px-2.5 py-1.5 rounded-lg whitespace-nowrap">{period}</span>
                  </div>
                  {DAYS.map(day => {
                    const key = `${day}_${period}`
                    const slot = slots[key]
                    return (
                      <button key={day} onClick={() => openSlot(day, period)}
                        className={`min-h-[68px] rounded-xl border text-left p-2.5 transition-all duration-200 hover:shadow-md group ${slot ? `${SLOT_COLORS[pi]} border` : 'bg-surface-50 dark:bg-surface-800 border-surface-100 dark:border-surface-700 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:border-primary-200'
                          }`}>
                        {slot ? (
                          <div>
                            <p className="text-xs font-bold leading-tight truncate">{slot.subject}</p>
                            {slot.teacher && <p className="text-xs opacity-70 truncate mt-0.5">{slot.teacher}</p>}
                            {slot.room && <p className="text-xs opacity-60 truncate">🚪 {slot.room}</p>}
                            {slot.startTime && <p className="text-xs opacity-60">{slot.startTime}–{slot.endTime}</p>}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-primary-400 text-xl font-bold">+</span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        <Modal open={modal} onClose={() => setModal(false)} title={`${editSlot?.day} — ${editSlot?.period}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Subject *</label>
              <input list="subject-list" value={slotForm.subject}
                onChange={e => setSlotForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="Type or select a subject…"
                className="input-base" />
              <datalist id="subject-list">{subjects.map(s => <option key={s.id} value={s.name} />)}</datalist>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Start Time</label>
                <input type="time" value={slotForm.startTime} onChange={e => setSlotForm(f => ({ ...f, startTime: e.target.value }))} className="input-base" />
              </div>
              <div>
                <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">End Time</label>
                <input type="time" value={slotForm.endTime} onChange={e => setSlotForm(f => ({ ...f, endTime: e.target.value }))} className="input-base" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Room</label>
              <input value={slotForm.room} onChange={e => setSlotForm(f => ({ ...f, room: e.target.value }))}
                placeholder="e.g. Room 101" className="input-base" />
            </div>
            <div className="flex gap-2 pt-2">
              {slots[`${editSlot?.day}_${editSlot?.period}`] && (
                <Button variant="danger" size="sm" onClick={handleClear}>Clear Slot</Button>
              )}
              <div className="flex-1" />
              <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button onClick={handleSave} loading={saving}>Save Slot</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}
