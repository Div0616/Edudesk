// src/pages/ExamDetail.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { getStudentsByClass, getMarksByExam, saveMark } from '../firebase/firestore'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Button, Spinner, Badge } from '../components/ui/index'
import { calculateGrade, getPercentage } from '../utils/gradeCalculator'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function ExamDetail() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const [exam, setExam] = useState(null)
  const [students, setStudents] = useState([])
  const [marksMap, setMarksMap] = useState({}) // { studentId: { marksObtained, remarks } }
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [examId])

  const load = async () => {
    setLoading(true)
    const snap = await getDoc(doc(db, 'exams', examId))
    if (!snap.exists()) { navigate('/exams'); return }
    const examData = { id: snap.id, ...snap.data() }
    setExam(examData)

    const s = await getStudentsByClass(examData.classId)
    setStudents(s)

    const marks = await getMarksByExam(examId)
    const map = {}
    marks.forEach(m => { map[m.studentId] = { marksObtained: m.marksObtained, remarks: m.remarks || '' } })
    setMarksMap(map)
    setLoading(false)
  }

  const updateMark = (studentId, field, value) => {
    setMarksMap(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value }
    }))
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      await Promise.all(
        students.map(s => {
          const m = marksMap[s.id]
          if (m && m.marksObtained !== '' && m.marksObtained !== undefined) {
            const obtained = +m.marksObtained
            const { grade } = calculateGrade(obtained, exam.maxMarks)
            return saveMark(examId, s.id, {
              marksObtained: obtained,
              grade,
              remarks: m.remarks || '',
              studentId: s.id,
            })
          }
          return Promise.resolve()
        })
      )
      toast.success('All marks saved!')
    } catch {
      toast.error('Failed to save some marks')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Layout><div className="flex justify-center py-20"><Spinner size="lg" /></div></Layout>

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <button onClick={() => navigate('/exams')} className="text-sm text-primary-500 hover:underline mb-4 flex items-center gap-1">
          ← Back to Exams
        </button>

        <PageHeader
          title={exam.examName}
          subtitle={`${exam.subject} • ${format(new Date(exam.date), 'dd MMM yyyy')} • Max: ${exam.maxMarks} marks`}
          action={<Button onClick={handleSaveAll} loading={saving}>💾 Save All Marks</Button>}
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Roll No.</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Marks Obtained</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Percentage</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map(s => {
                  const m = marksMap[s.id] || {}
                  const obtained = m.marksObtained !== undefined && m.marksObtained !== '' ? +m.marksObtained : null
                  const pct = obtained !== null ? getPercentage(obtained, exam.maxMarks) : '-'
                  const gradeInfo = obtained !== null ? calculateGrade(obtained, exam.maxMarks) : null
                  const isPassing = obtained !== null ? obtained >= exam.passingMarks : null

                  return (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <Badge color="blue">{s.rollNumber}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-surface-900 dark:text-surface-50">{s.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max={exam.maxMarks}
                            placeholder="0"
                            value={m.marksObtained ?? ''}
                            onChange={e => updateMark(s.id, 'marksObtained', e.target.value)}
                            className="w-20 px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-center"
                          />
                          <span className="text-xs text-gray-400">/ {exam.maxMarks}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{pct}{pct !== '-' ? '%' : ''}</span>
                      </td>
                      <td className="px-4 py-3">
                        {gradeInfo ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeInfo.bg} ${gradeInfo.color}`}>
                            {gradeInfo.grade}
                          </span>
                        ) : <span className="text-gray-300 text-sm">-</span>}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Optional remark..."
                          value={m.remarks || ''}
                          onChange={e => updateMark(s.id, 'remarks', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSaveAll} loading={saving} size="lg">💾 Save All Marks</Button>
        </div>
      </div>
    </Layout>
  )
}
