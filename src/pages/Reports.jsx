// src/pages/Reports.jsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getClasses, getStudentsByClass, getMarksByStudent, getAttendanceByClass, getExamsByClass } from '../firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Select, Card, Spinner, Badge } from '../components/ui/index'
import { generateStudentReport } from '../utils/excelGenerator'
import { openWhatsApp } from '../utils/whatsappHelper'
import { calculateGrade, getPercentage } from '../utils/gradeCalculator'
import toast from 'react-hot-toast'

export default function Reports() {
  const { user, profile } = useAuth()
  const [searchParams] = useSearchParams()
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(searchParams.get('studentId') || '')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState({})
  const [sentCount, setSentCount] = useState(0)
  const [bulkMode, setBulkMode] = useState(false)
  const [previewData, setPreviewData] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  useEffect(() => { if (user) loadClasses() }, [user])
  useEffect(() => { if (selectedClass) loadStudents() }, [selectedClass])
  useEffect(() => { if (selectedStudent) loadPreview() }, [selectedStudent])

  const loadClasses = async () => {
    const cls = await getClasses(user.uid)
    setClasses(cls)
    if (cls.length > 0 && !selectedClass) setSelectedClass(cls[0].id)
    setLoading(false)
  }

  const loadStudents = async () => {
    const s = await getStudentsByClass(selectedClass)
    setStudents(s)
    if (s.length > 0 && !selectedStudent) setSelectedStudent(s[0].id)
    setSentCount(0)
  }

  const loadPreview = async () => {
    if (!selectedStudent) return
    setPreviewLoading(true)
    try {
      const sSnap = await getDoc(doc(db, 'students', selectedStudent))
      if (!sSnap.exists()) return
      const student = { id: sSnap.id, ...sSnap.data() }
      const cSnap = await getDoc(doc(db, 'classes', student.classId))
      const cls = cSnap.exists() ? { id: cSnap.id, ...cSnap.data() } : null

      const rawMarks = await getMarksByStudent(selectedStudent)
      const exams = cls ? await getExamsByClass(cls.id) : []
      const examMap = {}
      exams.forEach(e => { examMap[e.id] = e })
      const marks = rawMarks.map(m => ({ ...m, ...examMap[m.examId] })).filter(m => m.examName)

      const att = cls ? await getAttendanceByClass(cls.id) : []
      const attRecords = []
      att.forEach(a => {
        const status = (a.records || {})[selectedStudent]
        if (status) attRecords.push({ date: a.date, status })
      })

      setPreviewData({ student, cls, marks, attRecords })
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleGenerateAndDownload = async (studentId) => {
    setGenerating(g => ({ ...g, [studentId]: true }))
    try {
      const sSnap = await getDoc(doc(db, 'students', studentId))
      const student = { id: sSnap.id, ...sSnap.data() }
      const cSnap = await getDoc(doc(db, 'classes', student.classId))
      const cls = { id: cSnap.id, ...cSnap.data() }
      const rawMarks = await getMarksByStudent(studentId)
      const exams = await getExamsByClass(cls.id)
      const examMap = {}
      exams.forEach(e => { examMap[e.id] = e })
      const marks = rawMarks.map(m => ({ ...m, ...examMap[m.examId] })).filter(m => m.examName)
      const att = await getAttendanceByClass(cls.id)
      const attRecords = []
      att.forEach(a => {
        const status = (a.records || {})[studentId]
        if (status) attRecords.push({ date: a.date, status })
      })
      const filename = generateStudentReport(student, cls, attRecords, marks, profile)
      toast.success(`Report downloaded: ${filename}`)
      return { student, cls }
    } catch (err) {
      toast.error('Failed to generate report')
    } finally {
      setGenerating(g => ({ ...g, [studentId]: false }))
    }
  }

  const handleSendWhatsApp = async (studentId) => {
    const sSnap = await getDoc(doc(db, 'students', studentId))
    const student = { id: sSnap.id, ...sSnap.data() }
    openWhatsApp(student.parentWhatsApp, student.parentName, student.name, profile?.name || 'Teacher')
    setSentCount(c => c + 1)
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader title="Reports" subtitle="Generate Excel reports and share with parents via WhatsApp" />

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6 max-w-xs">
          {[['single', '📄 Single Student'], ['bulk', '📦 Bulk (Whole Class)']].map(([m, l]) => (
            <button key={m} onClick={() => setBulkMode(m === 'bulk')}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${(m === 'bulk') === bulkMode ? 'bg-white text-surface-900 dark:text-surface-50 shadow-sm' : 'text-gray-500'}`}>
              {l}
            </button>
          ))}
        </div>

        {loading
          ? <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          : !bulkMode
            ? (
              /* ── Single Student Mode ── */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-4">Select Student</h3>
                  <div className="space-y-4">
                    <Select label="Class" value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setSelectedStudent(''); setPreviewData(null) }}>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.className} - {c.section}</option>)}
                    </Select>
                    <Select label="Student" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                      {students.map(s => <option key={s.id} value={s.id}>{s.name} (Roll {s.rollNumber})</option>)}
                    </Select>
                    <div className="space-y-2 pt-2">
                      <Button className="w-full" onClick={() => handleGenerateAndDownload(selectedStudent)} loading={generating[selectedStudent]}>
                        📊 Download Excel Report
                      </Button>
                      <Button variant="success" className="w-full" onClick={() => handleSendWhatsApp(selectedStudent)}>
                        💬 Send via WhatsApp
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Preview */}
                <Card className="lg:col-span-2">
                  <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-4">Report Preview</h3>
                  {previewLoading
                    ? <div className="flex justify-center py-12"><Spinner /></div>
                    : previewData
                      ? <ReportPreview data={previewData} />
                      : <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Select a student to preview their report</div>
                  }
                </Card>
              </div>
            )
            : (
              /* ── Bulk Mode ── */
              <div>
                <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <Select label="Class" value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="max-w-xs">
                    {classes.map(c => <option key={c.id} value={c.id}>{c.className} - {c.section}</option>)}
                  </Select>
                  <div className="flex items-center gap-3">
                    {sentCount > 0 && (
                      <Badge color="green">Sent {sentCount} of {students.length} reports</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {students.map((s, i) => (
                    <div key={s.id} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400 w-6">{i + 1}.</span>
                        <div>
                          <p className="font-medium text-surface-900 dark:text-surface-50 text-sm">{s.name}</p>
                          <p className="text-xs text-gray-400">Roll {s.rollNumber} • {s.parentName} • {s.parentWhatsApp}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleGenerateAndDownload(s.id)} loading={generating[s.id]}>
                          📊 Download
                        </Button>
                        <Button size="sm" variant="success" onClick={() => handleSendWhatsApp(s.id)}>
                          💬 WhatsApp
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {students.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p className="text-4xl mb-3">📄</p>
                    <p>No students in this class</p>
                  </div>
                )}
              </div>
            )
        }
      </div>
    </Layout>
  )
}

/* ── Report Preview Component ── */
const ReportPreview = ({ data }) => {
  const { student, cls, marks, attRecords } = data
  const total = attRecords.length
  const present = attRecords.filter(r => r.status === 'Present').length
  const absent = attRecords.filter(r => r.status === 'Absent').length
  const attPct = total > 0 ? ((present / total) * 100).toFixed(1) : '0.0'

  return (
    <div className="space-y-4">
      {/* Student Info */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div><span className="text-gray-400">Student:</span> <span className="font-medium text-surface-900 dark:text-surface-50">{student.name}</span></div>
        <div><span className="text-gray-400">Roll No:</span> <span className="font-medium">{student.rollNumber}</span></div>
        <div><span className="text-gray-400">Class:</span> <span className="font-medium">{cls?.className} - {cls?.section}</span></div>
        <div><span className="text-gray-400">Parent:</span> <span className="font-medium">{student.parentName}</span></div>
      </div>

      {/* Attendance */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Attendance Summary</p>
        <div className="flex gap-4 text-sm">
          <span>Total: <strong>{total}</strong></span>
          <span className="text-emerald-600">Present: <strong>{present}</strong></span>
          <span className="text-red-500">Absent: <strong>{absent}</strong></span>
          <span className="text-primary-500">Rate: <strong>{attPct}%</strong></span>
        </div>
      </div>

      {/* Marks */}
      {marks.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Exam Results</p>
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Exam', 'Marks', '%', 'Grade'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {marks.map((m, i) => {
                  const { grade, color, bg } = calculateGrade(m.marksObtained, m.maxMarks)
                  return (
                    <tr key={i}>
                      <td className="px-3 py-2 font-medium text-gray-800">{m.examName}</td>
                      <td className="px-3 py-2 text-gray-600">{m.marksObtained}/{m.maxMarks}</td>
                      <td className="px-3 py-2 text-gray-600">{getPercentage(m.marksObtained, m.maxMarks)}%</td>
                      <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${bg} ${color}`}>{grade}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
