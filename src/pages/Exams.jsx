// src/pages/Exams.jsx — optimistic updates + Bold & Bright UI
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getClasses, getExamsByClass, addExam, deleteExam, getSubjectsByClass } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Input, Select, Modal, ConfirmDialog, EmptyState, Badge, SkeletonTable } from '../components/ui/index'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function Exams() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [exams, setExams] = useState([])
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [filterClass, setFilterClass] = useState('all')
  const [form, setForm] = useState({ classId: '', examName: '', subject: '', maxMarks: '', passingMarks: '', date: format(new Date(), 'yyyy-MM-dd') })
  const [errors, setErrors] = useState({})

  useEffect(() => { if (user) load() }, [user])
  useEffect(() => {
    if (form.classId) getSubjectsByClass(form.classId).then(setSubjects)
  }, [form.classId])

  const load = async () => {
    setLoading(true)
    const cls = await getClasses(user.uid)
    setClasses(cls)
    if (cls.length > 0) setForm(f => ({ ...f, classId: cls[0].id }))
    // Parallel fetch all exams
    const results = await Promise.all(cls.map(c => getExamsByClass(c.id).then(exs => exs.map(e => ({ ...e, className: `${c.className} - ${c.section}` })))))
    const allExams = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date))
    setExams(allExams)
    setLoading(false)
  }

  const validate = () => {
    const e = {}
    if (!form.classId) e.classId = 'Select a class'
    if (!form.examName.trim()) e.examName = 'Exam name required'
    if (!form.subject.trim()) e.subject = 'Subject required'
    if (!form.maxMarks || isNaN(form.maxMarks) || +form.maxMarks <= 0) e.maxMarks = 'Valid max marks required'
    if (!form.passingMarks || isNaN(form.passingMarks) || +form.passingMarks < 0) e.passingMarks = 'Valid passing marks required'
    if (!form.date) e.date = 'Date required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    const cls = classes.find(c => c.id === form.classId)
    const examData = { ...form, maxMarks: +form.maxMarks, passingMarks: +form.passingMarks }
    const tempId = `temp_${Date.now()}`
    const tempExam = { id: tempId, ...examData, className: cls ? `${cls.className} - ${cls.section}` : '' }
    // ── Optimistic ──
    setExams(prev => [tempExam, ...prev])
    setModal(false)
    toast.success('Exam created!')
    try {
      const ref = await addExam(examData)
      setExams(prev => prev.map(e => e.id === tempId ? { ...e, id: ref.id } : e))
    } catch { toast.error('Failed to create'); load() }
    setSaving(false)
  }

  const handleDelete = async () => {
    const id = deleteId
    setDeleting(true)
    setExams(prev => prev.filter(e => e.id !== id))
    setDeleteId(null)
    toast.success('Exam deleted')
    try { await deleteExam(id) }
    catch { toast.error('Failed to delete'); load() }
    setDeleting(false)
  }

  const filtered = filterClass === 'all' ? exams : exams.filter(e => e.classId === filterClass)

  const EXAM_COLORS = ['from-blue-500 to-indigo-600', 'from-purple-500 to-violet-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-amber-600']

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader title="Exams" subtitle={`${exams.length} exam${exams.length !== 1 ? 's' : ''} across all classes`}
          action={<Button onClick={() => { setErrors({}); setModal(true) }}>+ New Exam</Button>}
        />

        {/* Filter chips */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button onClick={() => setFilterClass('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterClass === 'all' ? 'bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 shadow-sm' : 'bg-white dark:bg-surface-900 text-surface-500 border border-surface-200 dark:border-surface-700 hover:bg-surface-50'}`}>
            All Classes
          </button>
          {classes.map(c => (
            <button key={c.id} onClick={() => setFilterClass(c.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterClass === c.id ? 'bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 shadow-sm' : 'bg-white dark:bg-surface-900 text-surface-500 border border-surface-200 dark:border-surface-700 hover:bg-surface-50'}`}>
              {c.className} - {c.section}
            </button>
          ))}
        </div>

        {loading ? <SkeletonTable rows={5} />
          : filtered.length === 0
            ? <EmptyState icon="📝" title="No exams yet" description="Create an exam to start entering student marks."
                action={<Button onClick={() => setModal(true)}>+ New Exam</Button>} />
            : (
              <div className="space-y-3">
                {filtered.map((exam, idx) => (
                  <div key={exam.id}
                    className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-card px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-cardHover transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 bg-gradient-to-br ${EXAM_COLORS[idx % EXAM_COLORS.length]} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className="text-white text-lg">📝</span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-surface-900 dark:text-surface-50">{exam.examName}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs text-surface-400">{exam.className}</span>
                          <span className="text-surface-300 dark:text-surface-700">·</span>
                          <Badge color="blue">{exam.subject}</Badge>
                          <span className="text-surface-300 dark:text-surface-700">·</span>
                          <span className="text-xs text-surface-400">{format(new Date(exam.date), 'dd MMM yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold text-surface-900 dark:text-surface-50">{exam.maxMarks} marks</p>
                        <p className="text-xs text-surface-400">Pass: {exam.passingMarks}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <Button size="sm" onClick={() => navigate(`/exams/${exam.id}`)}>Enter Marks</Button>
                        <button onClick={() => setDeleteId(exam.id)}
                          className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
        }

        <Modal open={modal} onClose={() => setModal(false)} title="Create New Exam">
          <div className="space-y-4">
            <Select label="Class" value={form.classId} onChange={e => setForm(f => ({ ...f, classId: e.target.value, subject: '' }))} error={errors.classId}>
              {classes.map(c => <option key={c.id} value={c.id}>{c.className} - {c.section}</option>)}
            </Select>
            <Input label="Exam Name" placeholder="e.g. Unit Test 1, Mid-Term" value={form.examName}
              onChange={e => setForm(f => ({ ...f, examName: e.target.value }))} error={errors.examName} />
            <div>
              <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1.5">Subject *</label>
              <input list="exam-subjects" value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="Type or select subject…"
                className={`w-full px-4 py-2.5 rounded-xl border ${errors.subject ? 'border-red-400 bg-red-50' : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'} focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-surface-900 dark:text-surface-100`} />
              <datalist id="exam-subjects">{subjects.map(s => <option key={s.id} value={s.name} />)}</datalist>
              {errors.subject && <p className="mt-1 text-xs text-red-500 font-medium">{errors.subject}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Max Marks" type="number" placeholder="100" value={form.maxMarks}
                onChange={e => setForm(f => ({ ...f, maxMarks: e.target.value }))} error={errors.maxMarks} />
              <Input label="Passing Marks" type="number" placeholder="40" value={form.passingMarks}
                onChange={e => setForm(f => ({ ...f, passingMarks: e.target.value }))} error={errors.passingMarks} />
            </div>
            <Input label="Exam Date" type="date" value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))} error={errors.date} />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSave} loading={saving}>Create Exam</Button>
            </div>
          </div>
        </Modal>
        <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
          title="Delete Exam" message="Delete this exam and all its marks? This cannot be undone." loading={deleting} />
      </div>
    </Layout>
  )
}
