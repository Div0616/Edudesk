// src/pages/Attendance.jsx — Bold & Bright UI
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, getDocFromCache } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { getStudentsByClass, getAttendanceByClass, saveAttendance } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Card, Spinner, Badge } from '../components/ui/index'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const STATUS = ['Present', 'Absent', 'Late']
const STATUS_STYLES = {
  Present: { active: 'bg-primary-500 text-white shadow-sm', inactive: 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-950/50 border border-primary-200 dark:border-primary-900' },
  Absent: { active: 'bg-red-500 text-white shadow-sm', inactive: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 border border-red-200 dark:border-red-900' },
  Late: { active: 'bg-orange-400 text-white shadow-sm', inactive: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 border border-orange-200 dark:border-orange-900' },
}

export default function Attendance() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [cls, setCls] = useState(null)
  const [students, setStudents] = useState([])
  const [records, setRecords] = useState({})
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [allAttendance, setAllAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState('mark')

  const load = useCallback(async () => {
    setLoading(true)
    const classRef = doc(db, 'classes', classId)
    let classSnap
    try { classSnap = await getDocFromCache(classRef) } catch { /* miss */ }
    if (!classSnap || !classSnap.exists()) classSnap = await getDoc(classRef)
    const [s, att] = await Promise.all([
      getStudentsByClass(classId),
      getAttendanceByClass(classId)
    ])
    if (classSnap.exists()) setCls({ id: classSnap.id, ...classSnap.data() })
    setStudents(s)
    setAllAttendance(att)
    setLoading(false)
  }, [classId])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    const existing = allAttendance.find(a => a.date === date)
    if (existing) {
      setRecords(existing.records || {})
    } else {
      const def = {}
      students.forEach(s => { def[s.id] = 'Present' })
      setRecords(def)
    }
  }, [date, allAttendance, students])

  const setStatus = useCallback((studentId, status) => setRecords(r => ({ ...r, [studentId]: status })), [])
  const markAll = useCallback((status) => {
    setRecords(prev => {
      const all = {}
      students.forEach(s => { all[s.id] = status })
      return all
    })
  }, [students])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      await saveAttendance(classId, date, records)
      toast.success('Attendance saved!')
      // Optimistic update — don't re-fetch from network
      setAllAttendance(prev => {
        const existing = prev.findIndex(a => a.date === date)
        const newRecord = { id: `${classId}_${date}`, classId, date, records }
        if (existing >= 0) {
          const updated = [...prev]
          updated[existing] = newRecord
          return updated
        }
        return [newRecord, ...prev]
      })
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }, [classId, date, records])

  const handleDateChange = useCallback(e => setDate(e.target.value), [])

  // Memoize computed attendance stats
  const { present, absent, late, total } = useMemo(() => {
    const vals = Object.values(records)
    return {
      present: vals.filter(s => s === 'Present').length,
      absent: vals.filter(s => s === 'Absent').length,
      late: vals.filter(s => s === 'Late').length,
      total: students.length
    }
  }, [records, students.length])

  if (loading) return (
    <Layout><div className="flex justify-center py-32"><Spinner size="lg" /></div></Layout>
  )

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <button onClick={() => navigate(`/classes/${classId}`)} className="inline-flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold mb-4">
          ← Back to {cls?.className}
        </button>
        <PageHeader title="Attendance" subtitle={`${cls?.className} — Section ${cls?.section}`} />

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-100 dark:bg-surface-800 rounded-2xl p-1.5 mb-6 w-fit">
          {[['mark', '📅 Mark Attendance'], ['history', '📋 History']].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${tab === t ? 'bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-50 shadow-sm' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}>{l}
            </button>
          ))}
        </div>

        {tab === 'mark' ? (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm">
              {[
                { label: 'Present', count: present, grad: 'from-primary-500 to-primary-600' },
                { label: 'Absent', count: absent, grad: 'from-red-500 to-red-600' },
                { label: 'Late', count: late, grad: 'from-orange-400 to-orange-500' },
              ].map(({ label, count, grad }) => (
                <div key={label} className={`bg-gradient-to-br ${grad} rounded-2xl p-4 text-white text-center shadow-sm`}>
                  <p className="text-2xl font-display font-extrabold leading-none">{count}</p>
                  <p className="text-xs font-semibold mt-1 opacity-90">{label}</p>
                </div>
              ))}
            </div>

            {/* Date + Quick actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div>
                <label className="block text-xs font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Date</label>
                <input type="date" value={date} onChange={handleDateChange}
                  max={format(new Date(), 'yyyy-MM-dd')}
                  className="input-base max-w-[180px]" />
              </div>
              <div className="flex items-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => markAll('Present')}>✅ All Present</Button>
                <Button variant="secondary" size="sm" onClick={() => markAll('Absent')}>❌ All Absent</Button>
              </div>
            </div>

            {/* Progress bar */}
            {total > 0 && (
              <div className="mb-5 max-w-2xl">
                <div className="flex justify-between text-xs text-surface-500 mb-1.5 font-semibold">
                  <span>Attendance rate</span>
                  <span>{Math.round((present / total) * 100)}%</span>
                </div>
                <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                    style={{ width: `${(present / total) * 100}%` }} />
                </div>
              </div>
            )}

            {/* Student list */}
            <div className="space-y-2 mb-6 max-w-2xl">
              {students.map((s, i) => (
                <div key={s.id}
                  className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card animate-fadeUp"
                  style={{ animationDelay: `${i * 15}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {s.rollNumber}
                    </div>
                    <span className="text-sm font-semibold text-surface-800 dark:text-surface-200">{s.name}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {STATUS.map(status => (
                      <button key={status} onClick={() => setStatus(s.id, status)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${records[s.id] === status ? STATUS_STYLES[status].active : STATUS_STYLES[status].inactive
                          }`}>
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleSave} loading={saving} size="lg">💾 Save Attendance</Button>
          </>
        ) : (
          <div className="space-y-3 max-w-2xl">
            {allAttendance.length === 0 ? (
              <div className="text-center py-20 text-surface-400">
                <p className="text-4xl mb-3">📋</p>
                <p className="font-semibold">No attendance records yet</p>
              </div>
            ) : allAttendance.map((att, i) => {
              const recs = att.records || {}
              const p = Object.values(recs).filter(s => s === 'Present').length
              const a = Object.values(recs).filter(s => s === 'Absent').length
              const l = Object.values(recs).filter(s => s === 'Late').length
              const rate = (p + a + l) > 0 ? Math.round((p / (p + a + l)) * 100) : 0
              return (
                <div key={att.id} className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card animate-fadeUp" style={{ animationDelay: `${i * 20}ms` }}>
                  <div>
                    <p className="font-display font-bold text-surface-900 dark:text-surface-50">{format(new Date(att.date), 'EEEE, dd MMMM yyyy')}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{rate}% attendance rate</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge color="green">{p} Present</Badge>
                    <Badge color="red">{a} Absent</Badge>
                    {l > 0 && <Badge color="orange">{l} Late</Badge>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
