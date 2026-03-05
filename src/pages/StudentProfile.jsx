// src/pages/StudentProfile.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { getMarksByStudent, getAttendanceByClass, getExamsByClass } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Card, Badge, Spinner } from '../components/ui/index'
import { calculateGrade, getPercentage } from '../utils/gradeCalculator'
import { format } from 'date-fns'

export default function StudentProfile() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [cls, setCls] = useState(null)
  const [marks, setMarks] = useState([]) // with exam info
  const [attStats, setAttStats] = useState({ total: 0, present: 0, absent: 0, late: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [studentId])

  const load = async () => {
    setLoading(true)
    // Student
    const sSnap = await getDoc(doc(db, 'students', studentId))
    if (!sSnap.exists()) { navigate('/classes'); return }
    const s = { id: sSnap.id, ...sSnap.data() }
    setStudent(s)

    // Class
    const cSnap = await getDoc(doc(db, 'classes', s.classId))
    const c = cSnap.exists() ? { id: cSnap.id, ...cSnap.data() } : null
    setCls(c)

    // Marks with exam info
    const rawMarks = await getMarksByStudent(studentId)
    const exams = c ? await getExamsByClass(c.id) : []
    const examMap = {}
    exams.forEach(e => { examMap[e.id] = e })
    const enriched = rawMarks.map(m => ({ ...m, exam: examMap[m.examId] })).filter(m => m.exam)
    enriched.sort((a, b) => new Date(b.exam.date) - new Date(a.exam.date))
    setMarks(enriched)

    // Attendance
    if (c) {
      const att = await getAttendanceByClass(c.id)
      let total = 0, present = 0, absent = 0, late = 0
      att.forEach(a => {
        const status = (a.records || {})[studentId]
        if (status) {
          total++
          if (status === 'Present') present++
          else if (status === 'Absent') absent++
          else if (status === 'Late') late++
        }
      })
      setAttStats({ total, present, absent, late })
    }

    setLoading(false)
  }

  if (loading) return <Layout><div className="flex justify-center py-20"><Spinner size="lg" /></div></Layout>

  const avgPct = marks.length > 0
    ? (marks.reduce((a, m) => a + (m.marksObtained / m.exam.maxMarks) * 100, 0) / marks.length).toFixed(1)
    : null
  const attPct = attStats.total > 0 ? ((attStats.present / attStats.total) * 100).toFixed(1) : null

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <button onClick={() => navigate(`/classes/${student?.classId}`)} className="text-sm text-primary-500 hover:underline mb-4 flex items-center gap-1">
          ← Back to Class
        </button>

        {/* Student Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 bg-surface-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">{student.name}</h1>
            <div className="flex flex-wrap gap-3 mt-1">
              <span className="text-sm text-gray-500">Roll No. {student.rollNumber}</span>
              {cls && <span className="text-sm text-gray-500">• {cls.className} - {cls.section}</span>}
              <span className="text-sm text-gray-500">• Parent: {student.parentName}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate(`/reports?studentId=${studentId}`)}>
              📄 Generate Report
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Avg Score', value: avgPct ? `${avgPct}%` : 'N/A', icon: '📈', color: 'blue' },
            { label: 'Attendance', value: attPct ? `${attPct}%` : 'N/A', icon: '📅', color: 'green' },
            { label: 'Exams Taken', value: marks.length, icon: '📝', color: 'yellow' },
            { label: 'Days Present', value: attStats.present, icon: '✅', color: 'purple' },
          ].map(s => (
            <div key={s.label} className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-card`}>
              <p className="text-2xl font-bold text-surface-900 dark:text-surface-50">{s.value}</p>
              <p className="text-sm text-gray-500">{s.icon} {s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Marks Table */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-base font-semibold text-surface-900 dark:text-surface-50 mb-4">📝 Exam Results</h3>
              {marks.length === 0
                ? <p className="text-sm text-gray-400 text-center py-8">No exam results yet</p>
                : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Exam</th>
                          <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Marks</th>
                          <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">%</th>
                          <th className="text-left pb-3 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {marks.map(m => {
                          const { grade, color, bg } = calculateGrade(m.marksObtained, m.exam.maxMarks)
                          return (
                            <tr key={m.id}>
                              <td className="py-3">
                                <p className="text-sm font-medium text-gray-800">{m.exam.examName}</p>
                                <p className="text-xs text-gray-400">{m.exam.subject}</p>
                              </td>
                              <td className="py-3 text-sm text-gray-600">{m.marksObtained}/{m.exam.maxMarks}</td>
                              <td className="py-3 text-sm text-gray-600">{getPercentage(m.marksObtained, m.exam.maxMarks)}%</td>
                              <td className="py-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${bg} ${color}`}>{grade}</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </Card>
          </div>

          {/* Attendance Summary */}
          <Card>
            <h3 className="text-base font-semibold text-surface-900 dark:text-surface-50 mb-4">📅 Attendance</h3>
            <div className="space-y-3">
              {[
                { label: 'Total Days', value: attStats.total, color: 'bg-gray-100 text-gray-700' },
                { label: 'Present', value: attStats.present, color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Absent', value: attStats.absent, color: 'bg-red-50 text-red-700' },
                { label: 'Late', value: attStats.late, color: 'bg-yellow-50 text-yellow-700' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{r.label}</span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${r.color}`}>{r.value}</span>
                </div>
              ))}
              {attPct && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
                    <span className="text-sm font-bold text-surface-900 dark:text-surface-50">{attPct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${attPct}%` }} />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
