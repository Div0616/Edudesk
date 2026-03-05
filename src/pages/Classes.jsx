// src/pages/Classes.jsx — optimistic updates + Bold & Bright UI + student count badges
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getClasses, addClass, updateClass, deleteClass, getStudentsByClass } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Input, Modal, ConfirmDialog, EmptyState, Badge, SkeletonCards } from '../components/ui/index'
import toast from 'react-hot-toast'

const CLASS_GRADS = ['class-grad-1','class-grad-2','class-grad-3','class-grad-4','class-grad-5','class-grad-6']
const CLASS_EMOJIS = ['🏫','📐','🔬','📖','🎨','🧮','🌍','⚗️']

export default function Classes() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [studentCounts, setStudentCounts] = useState({})
  const [form, setForm] = useState({ className: '', section: '', subject: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => { if (user) load() }, [user])

  const load = async () => {
    setLoading(true)
    const cls = await getClasses(user.uid)
    setClasses(cls)
    setLoading(false)
    // Student counts in background (non-blocking)
    const counts = {}
    await Promise.all(cls.map(async c => {
      const students = await getStudentsByClass(c.id)
      counts[c.id] = students.length
    }))
    setStudentCounts(counts)
  }

  const openAdd = () => {
    setEditData(null)
    setForm({ className: '', section: '', subject: '' })
    setErrors({})
    setModal(true)
  }

  const openEdit = (cls, e) => {
    e.stopPropagation()
    setEditData(cls)
    setForm({ className: cls.className, section: cls.section, subject: cls.subject || '' })
    setErrors({})
    setModal(true)
  }

  const validate = () => {
    const e = {}
    if (!form.className.trim()) e.className = 'Class name is required'
    if (!form.section.trim()) e.section = 'Section is required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    if (editData) {
      // Optimistic update
      setClasses(prev => prev.map(c => c.id === editData.id ? { ...c, ...form } : c))
      setModal(false)
      toast.success('Class updated!')
      try { await updateClass(editData.id, form, user.uid) }
      catch { toast.error('Failed to update'); load() }
    } else {
      const tempId = `temp_${Date.now()}`
      setClasses(prev => [{ id: tempId, ...form, teacherId: user.uid, studentIds: [] }, ...prev])
      setModal(false)
      toast.success('Class created!')
      try {
        const ref = await addClass(user.uid, form)
        setClasses(prev => prev.map(c => c.id === tempId ? { ...c, id: ref.id } : c))
      } catch { toast.error('Failed to create'); load() }
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    const id = deleteId
    setDeleting(true)
    setClasses(prev => prev.filter(c => c.id !== id))
    setDeleteId(null)
    toast.success('Class deleted')
    try { await deleteClass(id, user.uid) }
    catch { toast.error('Failed to delete'); load() }
    setDeleting(false)
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader
          title="My Classes"
          subtitle={`${classes.length} class${classes.length !== 1 ? 'es' : ''} total`}
          action={<Button onClick={openAdd}>+ New Class</Button>}
          gradient
        />

        {loading ? (
          <SkeletonCards count={6} />
        ) : classes.length === 0 ? (
          <EmptyState icon="🏫" title="No classes yet" description="Create your first class to get started managing students." action={<Button onClick={openAdd}>+ New Class</Button>} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls, idx) => (
              <div
                key={cls.id}
                onClick={() => navigate(`/classes/${cls.id}`)}
                className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 shadow-card cursor-pointer hover:shadow-cardHover transition-all duration-200 group overflow-hidden animate-fadeUp"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {/* Gradient top strip */}
                <div className={`h-2 w-full ${CLASS_GRADS[idx % CLASS_GRADS.length]}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${CLASS_GRADS[idx % CLASS_GRADS.length]} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                      {CLASS_EMOJIS[idx % CLASS_EMOJIS.length]}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => openEdit(cls, e)}
                        className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors"
                      >✏️</button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteId(cls.id) }}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors"
                      >🗑️</button>
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-surface-900 dark:text-surface-50 text-lg leading-tight">{cls.className}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">Section {cls.section}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      {cls.subject && <Badge color="green">{cls.subject}</Badge>}
                    </div>
                    {/* Student count badge */}
                    <div className="flex items-center gap-1.5 bg-surface-100 dark:bg-surface-800 px-2.5 py-1 rounded-full">
                      <span className="text-xs">👥</span>
                      <span className="text-xs font-bold text-surface-600 dark:text-surface-300">
                        {studentCounts[cls.id] !== undefined ? studentCounts[cls.id] : '…'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal open={modal} onClose={() => setModal(false)} title={editData ? 'Edit Class' : 'New Class'}>
          <div className="space-y-4">
            <Input label="Class Name *" placeholder="e.g. Grade 10, Class 8A" value={form.className}
              onChange={e => setForm(f => ({ ...f, className: e.target.value }))} error={errors.className} />
            <Input label="Section *" placeholder="e.g. A, B, Rose, Blue" value={form.section}
              onChange={e => setForm(f => ({ ...f, section: e.target.value }))} error={errors.section} />
            <Input label="Main Subject (optional)" placeholder="e.g. Mathematics, Science" value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSave} loading={saving}>{editData ? 'Update Class' : 'Create Class'}</Button>
            </div>
          </div>
        </Modal>

        <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
          title="Delete Class" message="Delete this class? All student data will remain but the class will be removed." loading={deleting} />
      </div>
    </Layout>
  )
}
