// src/pages/Homework.jsx — optimistic updates + Bold & Bright UI
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { getClasses, getHomeworkByClass, addHomework, updateHomework, deleteHomework, getSubjectsByClass } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Card, Input, Select, Modal, ConfirmDialog, EmptyState, Spinner, Badge } from '../components/ui/index'
import { format, isPast, isToday, parseISO } from 'date-fns'
import toast from 'react-hot-toast'

const PRIORITY = ['Low', 'Medium', 'High']
const PRIORITY_COLORS = { Low: 'green', Medium: 'yellow', High: 'red' }

export default function Homework() {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [subjects, setSubjects] = useState([])
  const [homework, setHomework] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ title: '', subject: '', description: '', dueDate: format(new Date(), 'yyyy-MM-dd'), priority: 'Medium', status: 'Pending' })
  const [errors, setErrors] = useState({})

  const loadClassesCb = useCallback(async () => {
    if (!user) return
    const cls = await getClasses(user.uid)
    setClasses(cls)
    if (cls.length > 0) setSelectedClass(cls[0].id)
    setLoading(false)
  }, [user])

  const loadHomeworkCb = useCallback(async () => {
    if (!selectedClass) return
    setLoading(true)
    const [hw, subs] = await Promise.all([getHomeworkByClass(selectedClass), getSubjectsByClass(selectedClass)])
    setHomework(hw)
    setSubjects(subs)
    setLoading(false)
  }, [selectedClass])

  useEffect(() => { loadClassesCb() }, [loadClassesCb])
  useEffect(() => { loadHomeworkCb() }, [loadHomeworkCb])

  // loadClasses and loadHomework are defined above as loadClassesCb and loadHomeworkCb

  const openAdd = () => {
    setEditData(null)
    setForm({ title: '', subject: subjects[0]?.name || '', description: '', dueDate: format(new Date(), 'yyyy-MM-dd'), priority: 'Medium', status: 'Pending' })
    setErrors({})
    setModal(true)
  }

  const openEdit = (hw) => {
    setEditData(hw)
    setForm({ title: hw.title, subject: hw.subject, description: hw.description || '', dueDate: hw.dueDate, priority: hw.priority || 'Medium', status: hw.status || 'Pending' })
    setErrors({})
    setModal(true)
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.dueDate) e.dueDate = 'Due date is required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    const hwData = { ...form, classId: selectedClass, teacherId: user?.uid }
    if (editData) {
      setHomework(prev => prev.map(h => h.id === editData.id ? { ...h, ...form } : h))
      setModal(false)
      toast.success('Homework updated!')
      try { await updateHomework(editData.id, hwData) }
      catch { toast.error('Failed to update'); loadHomeworkCb() }
    } else {
      const tempId = `temp_${Date.now()}`
      setHomework(prev => [{ id: tempId, ...hwData }, ...prev])
      setModal(false)
      toast.success('Homework assigned!')
      try {
        const ref = await addHomework(hwData)
        setHomework(prev => prev.map(h => h.id === tempId ? { ...h, id: ref.id } : h))
      } catch { toast.error('Failed to assign'); loadHomeworkCb() }
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    const id = deleteId
    setDeleting(true)
    setHomework(prev => prev.filter(h => h.id !== id))
    setDeleteId(null)
    toast.success('Homework deleted')
    try { await deleteHomework(id) }
    catch { toast.error('Failed to delete'); loadHomeworkCb() }
    setDeleting(false)
  }

  const toggleStatus = async (hw) => {
    const newStatus = hw.status === 'Done' ? 'Pending' : 'Done'
    setHomework(prev => prev.map(h => h.id === hw.id ? { ...h, status: newStatus } : h))
    try { await updateHomework(hw.id, { status: newStatus }) }
    catch { setHomework(prev => prev.map(h => h.id === hw.id ? { ...h, status: hw.status } : h)) }
  }

  const getStatus = useCallback((hw) => {
    if (hw.status === 'Done') return { label: 'Done', color: 'green' }
    if (isPast(parseISO(hw.dueDate)) && !isToday(parseISO(hw.dueDate))) return { label: 'Overdue', color: 'red' }
    if (isToday(parseISO(hw.dueDate))) return { label: 'Due Today', color: 'yellow' }
    return { label: 'Pending', color: 'blue' }
  }, [])

  const filtered = useMemo(() => homework.filter(hw => {
    const s = getStatus(hw)
    if (filter === 'all') return true
    if (filter === 'pending') return s.label === 'Pending' || s.label === 'Due Today'
    if (filter === 'overdue') return s.label === 'Overdue'
    if (filter === 'done') return s.label === 'Done'
    return true
  }), [homework, filter, getStatus])

  const counts = useMemo(() => ({
    all: homework.length,
    pending: homework.filter(h => { const s = getStatus(h); return s.label === 'Pending' || s.label === 'Due Today' }).length,
    overdue: homework.filter(h => getStatus(h).label === 'Overdue').length,
    done: homework.filter(h => getStatus(h).label === 'Done').length,
  }), [homework, getStatus])

  const FILTER_STYLES = {
    all: { active: 'bg-surface-900 dark:bg-white text-white dark:text-surface-900', dot: '' },
    pending: { active: 'bg-blue-500 text-white', dot: 'bg-blue-400' },
    overdue: { active: 'bg-red-500 text-white', dot: 'bg-red-400' },
    done: { active: 'bg-emerald-500 text-white', dot: 'bg-emerald-400' },
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader title="Homework" subtitle="Assign and track homework"
          action={<Button onClick={openAdd}>+ Assign Homework</Button>} />

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="max-w-xs">
            {classes.map(c => <option key={c.id} value={c.id}>{c.className} — {c.section}</option>)}
          </Select>
          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(counts).map(([k, v]) => (
              <button key={k} onClick={() => setFilter(k)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize flex items-center gap-1.5 ${filter === k ? FILTER_STYLES[k].active : 'bg-white dark:bg-surface-900 text-surface-500 border border-surface-200 dark:border-surface-700 hover:bg-surface-50'
                  }`}>
                {k} <span className={`${filter === k ? 'bg-white/25' : 'bg-surface-200 dark:bg-surface-700'} text-xs rounded-full px-1.5 py-0.5 font-bold leading-none`}>{v}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="📚" title="No homework found" description="Assign homework to keep students on track."
            action={<Button onClick={openAdd}>+ Assign Homework</Button>} />
        ) : (
          <div className="space-y-3">
            {filtered.map(hw => {
              const status = getStatus(hw)
              return (
                <div key={hw.id} className={`bg-white dark:bg-surface-900 rounded-2xl border shadow-card px-5 py-4 flex flex-col sm:flex-row gap-4 transition-all ${hw.status === 'Done' ? 'opacity-55' : ''
                  } ${status.label === 'Overdue' ? 'border-red-200 dark:border-red-900/50' : 'border-surface-200 dark:border-surface-800'}`}>
                  {/* Checkbox */}
                  <button onClick={() => toggleStatus(hw)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${hw.status === 'Done' ? 'bg-emerald-500 border-emerald-500' : 'border-surface-300 dark:border-surface-600 hover:border-primary-500'
                      }`}>
                    {hw.status === 'Done' && <span className="text-white text-xs font-bold">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`font-display font-bold text-surface-900 dark:text-surface-50 ${hw.status === 'Done' ? 'line-through' : ''}`}>{hw.title}</h3>
                      <Badge color={status.color}>{status.label}</Badge>
                      <Badge color={PRIORITY_COLORS[hw.priority] || 'gray'}>{hw.priority}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-surface-500">
                      <span>📚 {hw.subject}</span>
                      <span>📅 Due: {format(parseISO(hw.dueDate), 'dd MMM yyyy')}</span>
                    </div>
                    {hw.description && <p className="text-sm text-surface-500 mt-2 line-clamp-2">{hw.description}</p>}
                  </div>
                  <div className="flex gap-1 items-start">
                    <button onClick={() => openEdit(hw)}
                      className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-600 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => setDeleteId(hw.id)}
                      className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <Modal open={modal} onClose={() => setModal(false)} title={editData ? 'Edit Homework' : 'Assign Homework'}>
          <div className="space-y-4">
            <Input label="Title *" placeholder="e.g. Chapter 5 Exercise" value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))} error={errors.title} />
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Subject *</label>
              <input list="hw-subjects" value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="Type or select subject…"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.subject ? 'border-red-400 bg-red-50' : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'} focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-surface-900 dark:text-surface-100`} />
              <datalist id="hw-subjects">{subjects.map(s => <option key={s.id} value={s.name} />)}</datalist>
              {errors.subject && <p className="mt-1 text-xs text-red-500 font-medium">{errors.subject}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3} placeholder="Detailed instructions…"
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-surface-900 dark:text-surface-100 resize-none placeholder:text-surface-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Due Date *" type="date" value={form.dueDate}
                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} error={errors.dueDate} />
              <Select label="Priority" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                {PRIORITY.map(p => <option key={p}>{p}</option>)}
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSave} loading={saving}>{editData ? 'Update' : 'Assign'}</Button>
            </div>
          </div>
        </Modal>
        <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
          title="Delete Homework" message="Remove this homework assignment?" loading={deleting} />
      </div>
    </Layout>
  )
}
