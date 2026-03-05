// src/pages/ClassDetail.jsx — optimistic updates + Bold & Bright UI
import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { getStudentsPaginated, addStudent, updateStudent, deleteStudent,
         batchAddStudents, getSubjectsByClass, addSubject, deleteSubject } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Card, Input, Modal, ConfirmDialog, EmptyState, Spinner, Badge } from '../components/ui/index'
import { isValidWhatsApp } from '../utils/whatsappHelper'
import toast from 'react-hot-toast'

const PAGE_SIZE = 20

export default function ClassDetail() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [cls, setCls] = useState(null)
  const [students, setStudents] = useState([])
  const [lastDoc, setLastDoc] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState([])
  const [newSubject, setNewSubject] = useState('')
  const [addingSubject, setAddingSubject] = useState(false)
  const [modal, setModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('students')
  const [csvData, setCsvData] = useState([])
  const [importing, setImporting] = useState(false)
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ name: '', rollNumber: '', parentName: '', parentWhatsApp: '' })
  const [errors, setErrors] = useState({})

  const observerRef = useRef(null)
  const loadMoreRef = useCallback(node => {
    if (loadingMore) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMore()
    })
    if (node) observerRef.current.observe(node)
  }, [hasMore, loadingMore])

  useEffect(() => { load() }, [classId])

  const load = async () => {
    setLoading(true)
    const [snap, result, subs] = await Promise.all([
      getDoc(doc(db, 'classes', classId)),
      getStudentsPaginated(classId, PAGE_SIZE),
      getSubjectsByClass(classId)
    ])
    if (snap.exists()) setCls({ id: snap.id, ...snap.data() })
    setStudents(result.students)
    setLastDoc(result.lastDoc)
    setHasMore(result.hasMore)
    setSubjects(subs)
    setLoading(false)
  }

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    const result = await getStudentsPaginated(classId, PAGE_SIZE, lastDoc)
    setStudents(prev => [...prev, ...result.students])
    setLastDoc(result.lastDoc)
    setHasMore(result.hasMore)
    setLoadingMore(false)
  }

  const openAdd = () => {
    setEditData(null)
    setForm({ name: '', rollNumber: '', parentName: '', parentWhatsApp: '' })
    setErrors({})
    setModal(true)
  }

  const openEdit = (s) => {
    setEditData(s)
    setForm({ name: s.name, rollNumber: s.rollNumber, parentName: s.parentName, parentWhatsApp: s.parentWhatsApp })
    setErrors({})
    setModal(true)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name required'
    if (!form.rollNumber.toString().trim()) e.rollNumber = 'Roll number required'
    if (!form.parentName.trim()) e.parentName = 'Parent name required'
    if (!form.parentWhatsApp.trim()) e.parentWhatsApp = 'WhatsApp required'
    else if (!isValidWhatsApp(form.parentWhatsApp)) e.parentWhatsApp = 'Enter valid number (e.g. 923001234567)'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    if (editData) {
      setStudents(prev => prev.map(s => s.id === editData.id ? { ...s, ...form } : s))
      setModal(false)
      toast.success('Student updated!')
      try { await updateStudent(editData.id, form) }
      catch { toast.error('Failed to update'); load() }
    } else {
      const tempId = `temp_${Date.now()}`
      setStudents(prev => [{ id: tempId, ...form, classId }, ...prev])
      setModal(false)
      toast.success('Student added!')
      try {
        const ref = await addStudent({ ...form, classId })
        setStudents(prev => prev.map(s => s.id === tempId ? { ...s, id: ref.id } : s))
      } catch { toast.error('Failed to add'); load() }
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    const id = deleteId
    setDeleting(true)
    setStudents(prev => prev.filter(s => s.id !== id))
    setDeleteId(null)
    toast.success('Student removed')
    try { await deleteStudent(id) }
    catch { toast.error('Failed to delete'); load() }
    setDeleting(false)
  }

  const handleAddSubject = async () => {
    const name = newSubject.trim()
    if (!name) return
    if (subjects.find(s => s.name.toLowerCase() === name.toLowerCase())) {
      toast.error('Subject already exists'); return
    }
    setAddingSubject(true)
    const tempId = `temp_${Date.now()}`
    setSubjects(prev => [...prev, { id: tempId, name }])
    setNewSubject('')
    try {
      const ref = await addSubject(classId, cls?.teacherId || '', name)
      setSubjects(prev => prev.map(s => s.id === tempId ? { ...s, id: ref.id } : s))
      toast.success('Subject added!')
    } catch {
      toast.error('Failed to add')
      setSubjects(prev => prev.filter(s => s.id !== tempId))
    }
    setAddingSubject(false)
  }

  const handleDeleteSubject = async (id) => {
    setSubjects(prev => prev.filter(s => s.id !== id))
    toast.success('Subject removed')
    try { await deleteSubject(id) }
    catch { toast.error('Failed to remove'); getSubjectsByClass(classId).then(setSubjects) }
  }

  const handleCSVUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const lines = ev.target.result.split('\n').filter(l => l.trim())
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s/g, ''))
      const data = lines.slice(1).map(line => {
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''))
        const row = {}
        headers.forEach((h, i) => { row[h] = cols[i] || '' })
        return {
          name: row['name'] || '', rollNumber: row['rollnumber'] || '',
          parentName: row['parentname'] || '', parentWhatsApp: row['parentwhatsapp'] || '',
          classId, valid: !!(row['name'] && row['rollnumber'] && row['parentname'] && row['parentwhatsapp'])
        }
      }).filter(r => r.name)
      setCsvData(data)
    }
    reader.readAsText(file)
  }

  const handleBulkImport = async () => {
    const valid = csvData.filter(r => r.valid)
    if (!valid.length) { toast.error('No valid rows to import'); return }
    setImporting(true)
    try {
      await batchAddStudents(valid.map(({ valid: _, ...rest }) => rest))
      toast.success(`${valid.length} students imported!`)
      setCsvData([])
      load()
      setActiveTab('students')
    } catch { toast.error('Import failed') }
    finally { setImporting(false) }
  }

  const filtered = search
    ? students.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()) || s.rollNumber?.toString().includes(search))
    : students

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-sm text-surface-400 font-medium">Loading class data…</p>
        </div>
      </div>
    </Layout>
  )

  const TABS = [['students', '👥 Students'], ['subjects', '📚 Subjects'], ['import', '📥 Bulk Import']]

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <button onClick={() => navigate('/classes')} className="inline-flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold mb-4">
          ← Back to Classes
        </button>

        <PageHeader
          title={`${cls?.className} — ${cls?.section}`}
          subtitle={`${students.length} students · ${subjects.length} subjects`}
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => navigate(`/classes/${classId}/attendance`)}>📅 Attendance</Button>
              <Button onClick={openAdd}>+ Add Student</Button>
            </div>
          }
        />

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-100 dark:bg-surface-800 rounded-2xl p-1.5 mb-6 w-fit">
          {TABS.map(([t, l]) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === t
                  ? 'bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-50 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              }`}>{l}
            </button>
          ))}
        </div>

        {/* Students Tab */}
        {activeTab === 'students' && (
          <>
            <div className="mb-4 max-w-sm">
              <input
                placeholder="Search by name or roll number…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-base"
              />
            </div>
            {filtered.length === 0 ? (
              <EmptyState icon="👨‍🎓" title="No students found" description="Add students to this class to get started." action={<Button onClick={openAdd}>+ Add Student</Button>} />
            ) : (
              <>
                <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 shadow-card overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-100 dark:border-surface-800">
                        {['Roll No.', 'Student Name', 'Parent Name', 'WhatsApp', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-50 dark:divide-surface-800">
                      {filtered.map((s, i) => (
                        <tr key={s.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors animate-fadeUp" style={{ animationDelay: `${i * 20}ms` }}>
                          <td className="px-4 py-3"><Badge color="green">{s.rollNumber}</Badge></td>
                          <td className="px-4 py-3">
                            <button onClick={() => navigate(`/students/${s.id}`)}
                              className="text-sm font-semibold text-surface-900 dark:text-surface-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                              {s.name}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">{s.parentName}</td>
                          <td className="px-4 py-3 text-xs text-surface-500 dark:text-surface-500 font-mono">{s.parentWhatsApp}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button onClick={() => navigate(`/students/${s.id}`)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 text-surface-400 hover:text-blue-500 transition-colors">👁️</button>
                              <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">✏️</button>
                              <button onClick={() => setDeleteId(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 transition-colors">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {hasMore && !search && (
                  <div ref={loadMoreRef} className="flex justify-center py-6">
                    {loadingMore && <Spinner />}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="max-w-lg">
            <Card>
              <h3 className="font-display font-bold text-surface-900 dark:text-surface-50 mb-1">Subjects for this Class</h3>
              <p className="text-xs text-surface-400 mb-4">Enter any subject name — fully customisable.</p>
              <div className="flex gap-2 mb-4">
                <input value={newSubject} onChange={e => setNewSubject(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddSubject()}
                  placeholder="e.g. Advanced Mathematics…"
                  className="flex-1 input-base" />
                <Button onClick={handleAddSubject} loading={addingSubject}>Add</Button>
              </div>
              <div className="space-y-2">
                {subjects.length === 0
                  ? <p className="text-sm text-surface-400 text-center py-6">No subjects yet. Add your first one!</p>
                  : subjects.map(s => (
                    <div key={s.id} className="flex items-center justify-between px-4 py-3 bg-surface-50 dark:bg-surface-800 rounded-xl group animate-fadeUp">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center text-sm">📚</span>
                        <span className="text-sm font-semibold text-surface-800 dark:text-surface-200">{s.name}</span>
                      </div>
                      <button onClick={() => handleDeleteSubject(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-surface-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">🗑️</button>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        )}

        {/* Bulk Import Tab */}
        {activeTab === 'import' && (
          <div className="max-w-2xl">
            <Card>
              <h3 className="font-display font-bold text-surface-900 dark:text-surface-50 mb-1">Bulk Import via CSV</h3>
              <p className="text-xs text-surface-400 mb-2">Required: <code className="bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 rounded text-xs font-mono">name, rollNumber, parentName, parentWhatsApp</code></p>
              <button onClick={() => {
                const csv = 'name,rollNumber,parentName,parentWhatsApp\nAli Ahmed,01,Ahmed Khan,923001234567\nSara Malik,02,Malik Ahmed,923007654321'
                const a = document.createElement('a')
                a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
                a.download = 'students_template.csv'; a.click()
              }} className="text-xs text-primary-600 dark:text-primary-400 hover:underline mb-4 block font-semibold">⬇️ Download CSV Template</button>
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-2xl p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/30 dark:hover:bg-primary-950/10 transition-all">
                <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
                <p className="text-4xl mb-2">📥</p>
                <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">Click to upload CSV</p>
                <p className="text-xs text-surface-400 mt-1">.csv format only</p>
              </div>
              {csvData.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-surface-700 dark:text-surface-300">{csvData.length} rows · <span className="text-primary-600">{csvData.filter(r => r.valid).length} valid</span></p>
                    <div className="flex gap-2">
                      <button onClick={() => setCsvData([])} className="text-xs text-red-500 hover:underline font-semibold">Clear</button>
                      <Button size="sm" onClick={handleBulkImport} loading={importing}>⚡ Import {csvData.filter(r => r.valid).length}</Button>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto rounded-xl border border-surface-100 dark:border-surface-800">
                    <table className="w-full text-xs">
                      <thead className="bg-surface-50 dark:bg-surface-800 sticky top-0">
                        <tr>{['Name','Roll','Parent','WhatsApp','✓'].map(h => <th key={h} className="text-left px-3 py-2 text-surface-500 font-bold">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-surface-50 dark:divide-surface-800">
                        {csvData.map((r, i) => (
                          <tr key={i} className={r.valid ? '' : 'bg-red-50 dark:bg-red-950/20'}>
                            <td className="px-3 py-2">{r.name}</td>
                            <td className="px-3 py-2">{r.rollNumber}</td>
                            <td className="px-3 py-2">{r.parentName}</td>
                            <td className="px-3 py-2 font-mono">{r.parentWhatsApp}</td>
                            <td className="px-3 py-2">{r.valid ? <span className="text-primary-500 font-bold">✓</span> : <span className="text-red-500 font-bold">✗</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal open={modal} onClose={() => setModal(false)} title={editData ? 'Edit Student' : 'Add Student'}>
          <div className="space-y-4">
            <Input label="Full Name *" placeholder="Student full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
            <Input label="Roll Number *" placeholder="e.g. 01" value={form.rollNumber} onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))} error={errors.rollNumber} />
            <Input label="Parent Name *" placeholder="Parent/guardian name" value={form.parentName} onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))} error={errors.parentName} />
            <Input label="Parent WhatsApp *" placeholder="e.g. 923001234567" value={form.parentWhatsApp} onChange={e => setForm(f => ({ ...f, parentWhatsApp: e.target.value }))} error={errors.parentWhatsApp} />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSave} loading={saving}>{editData ? 'Update' : 'Add Student'}</Button>
            </div>
          </div>
        </Modal>

        <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
          title="Remove Student" message="Remove this student from the class?" loading={deleting} />
      </div>
    </Layout>
  )
}
