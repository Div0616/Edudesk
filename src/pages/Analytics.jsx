// src/pages/Analytics.jsx
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { getClasses, getStudentsByClass, getAttendanceByClass, getExamsByClass, getMarksByStudent } from '../firebase/firestore'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Layout, PageHeader } from '../components/layout/Layout'
import { Card, Select, Spinner, Badge } from '../components/ui/index'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts'
import { format, parseISO, subDays, startOfWeek, endOfWeek } from 'date-fns'

const LOW_ATTENDANCE_THRESHOLD = 75

export default function Analytics() {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedStudent, setSelectedStudent] = useState('')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const [progressData, setProgressData] = useState([])       // student progress line chart
  const [attendanceTrend, setAttendanceTrend] = useState([]) // weekly attendance area chart
  const [lowAttendance, setLowAttendance] = useState([])     // alerts
  const [subjectPerf, setSubjectPerf] = useState([])         // subject-wise bar chart

  const loadClasses = useCallback(async () => {
    if (!user) return
    const cls = await getClasses(user.uid)
    setClasses(cls)
    if (cls.length > 0) setSelectedClass(cls[0].id)
    setLoading(false)
  }, [user])

  const loadClassData = useCallback(async () => {
    if (!selectedClass) return
    setLoading(true)
    const [sts, att, exams] = await Promise.all([
      getStudentsByClass(selectedClass),
      getAttendanceByClass(selectedClass),
      getExamsByClass(selectedClass)
    ])
    setStudents(sts)
    if (sts.length > 0) setSelectedStudent(sts[0].id)

    // ── Weekly Attendance Trend ──
    const last8Weeks = []
    for (let i = 7; i >= 0; i--) {
      const weekStart = startOfWeek(subDays(new Date(), i * 7))
      const weekEnd = endOfWeek(weekStart)
      const weekLabel = format(weekStart, 'MMM dd')
      const weekRecords = att.filter(a => {
        const d = parseISO(a.date)
        return d >= weekStart && d <= weekEnd
      })
      let p = 0, ab = 0, late = 0, total = 0
      weekRecords.forEach(r => {
        Object.values(r.records || {}).forEach(s => {
          total++
          if (s === 'Present') p++
          else if (s === 'Absent') ab++
          else if (s === 'Late') late++
        })
      })
      last8Weeks.push({
        week: weekLabel,
        'Present %': total > 0 ? +((p / total) * 100).toFixed(1) : null,
        'Absent %': total > 0 ? +((ab / total) * 100).toFixed(1) : null,
        records: total
      })
    }
    setAttendanceTrend(last8Weeks)

    // ── Low Attendance Alerts ──
    const alerts = []
    for (const st of sts) {
      let total = 0, present = 0
      att.forEach(a => {
        const status = (a.records || {})[st.id]
        if (status) {
          total++
          if (status === 'Present') present++
        }
      })
      const pct = total > 0 ? (present / total) * 100 : null
      if (pct !== null && pct < LOW_ATTENDANCE_THRESHOLD) {
        alerts.push({ student: st, pct: pct.toFixed(1), total, present, absent: total - present })
      }
    }
    alerts.sort((a, b) => a.pct - b.pct)
    setLowAttendance(alerts)

    // ── Subject-wise performance — fetch ALL marks in parallel ──
    const markSnapResults = await Promise.all(
      exams.map(exam => getDocs(query(collection(db, 'marks'), where('examId', '==', exam.id))))
    )
    const subjectMap = {}
    exams.forEach((exam, idx) => {
      const marks = markSnapResults[idx].docs.map(d => d.data())
      if (marks.length > 0) {
        const avg = marks.reduce((a, m) => a + (m.marksObtained / exam.maxMarks) * 100, 0) / marks.length
        if (!subjectMap[exam.subject]) subjectMap[exam.subject] = { scores: [], count: 0 }
        subjectMap[exam.subject].scores.push(avg)
        subjectMap[exam.subject].count++
      }
    })
    const subjectArr = Object.entries(subjectMap).map(([subject, data]) => ({
      subject: subject.length > 12 ? subject.substring(0, 12) + '…' : subject,
      avg: +(data.scores.reduce((a, b) => a + b, 0) / data.scores.length).toFixed(1)
    }))
    setSubjectPerf(subjectArr)

    setLoading(false)
  }, [selectedClass])

  const loadStudentProgress = useCallback(async () => {
    if (!selectedStudent || !selectedClass) return
    const exams = await getExamsByClass(selectedClass)
    const examMap = {}
    exams.forEach(e => { examMap[e.id] = e })

    const rawMarks = await getMarksByStudent(selectedStudent)
    const enriched = rawMarks
      .map(m => ({ ...m, exam: examMap[m.examId] }))
      .filter(m => m.exam)
      .sort((a, b) => new Date(a.exam.date) - new Date(b.exam.date))
      .map(m => ({
        name: m.exam.examName,
        date: format(parseISO(m.exam.date), 'dd MMM'),
        score: +((m.marksObtained / m.exam.maxMarks) * 100).toFixed(1),
        subject: m.exam.subject
      }))
    setProgressData(enriched)
  }, [selectedStudent, selectedClass])

  useEffect(() => { loadClasses() }, [loadClasses])
  useEffect(() => { loadClassData() }, [loadClassData])
  useEffect(() => { loadStudentProgress() }, [loadStudentProgress])

  const currentStudent = useMemo(() => students.find(s => s.id === selectedStudent), [students, selectedStudent])

  const handleClassChange = useCallback(e => setSelectedClass(e.target.value), [])
  const handleStudentChange = useCallback(e => setSelectedStudent(e.target.value), [])

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <PageHeader title="Analytics" subtitle="Deep insights into class performance and attendance" />

        {/* Class Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Select value={selectedClass} onChange={handleClassChange} className="max-w-xs">
            {classes.map(c => <option key={c.id} value={c.id}>{c.className} — {c.section}</option>)}
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : (
          <div className="space-y-6">

            {/* ── Low Attendance Alerts ── */}
            {lowAttendance.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚠️</span>
                  <h3 className="font-semibold text-red-800">Low Attendance Alerts</h3>
                  <span className="ml-auto text-xs text-red-500">Below {LOW_ATTENDANCE_THRESHOLD}% threshold</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lowAttendance.map(a => (
                    <div key={a.student.id} className="bg-white rounded-xl border border-red-100 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{a.student.name}</p>
                        <p className="text-xs text-gray-400">{a.absent} absences / {a.total} days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">{a.pct}%</p>
                        <div className="w-16 h-1.5 bg-red-100 rounded-full mt-1">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${a.pct}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Attendance Trend ── */}
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-1">Weekly Attendance Trend</h3>
              <p className="text-xs text-gray-400 mb-4">Last 8 weeks — class-wide present vs absent percentage</p>
              {attendanceTrend.some(w => w['Present %'] !== null) ? (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={attendanceTrend} margin={{ left: -20, right: 0 }}>
                    <defs>
                      <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#2F80ED" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gAbsent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} domain={[0, 100]} unit="%" />
                    <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                    <Legend />
                    <Area type="monotone" dataKey="Present %" stroke="#2F80ED" strokeWidth={2} fill="url(#gPresent)" connectNulls />
                    <Area type="monotone" dataKey="Absent %" stroke="#ef4444" strokeWidth={2} fill="url(#gAbsent)" connectNulls />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-40 text-gray-400 text-sm">No attendance data yet</div>
              )}
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ── Student Progress Over Time ── */}
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-surface-50">Student Progress Over Time</h3>
                    <p className="text-xs text-gray-400">Score trend across exams</p>
                  </div>
                  <Select value={selectedStudent} onChange={handleStudentChange} className="sm:ml-auto max-w-[180px] text-xs">
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </Select>
                </div>
                {progressData.length > 1 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={progressData} margin={{ left: -20, right: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} domain={[0, 100]} unit="%" />
                      <Tooltip formatter={(v) => [`${v}%`, 'Score']} labelFormatter={(l, p) => p?.[0]?.payload?.name || l} />
                      <Line type="monotone" dataKey="score" stroke="#2F80ED" strokeWidth={2.5} dot={{ r: 5, fill: '#2F80ED' }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
                    {progressData.length === 0 ? 'No exam data for this student' : 'Need at least 2 exams to show trend'}
                  </div>
                )}
              </Card>

              {/* ── Subject-Wise Performance ── */}
              <Card>
                <h3 className="font-semibold text-surface-900 dark:text-surface-50 mb-1">Subject-wise Class Average</h3>
                <p className="text-xs text-gray-400 mb-4">Average score per subject across all exams</p>
                {subjectPerf.length > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={subjectPerf} layout="vertical" margin={{ left: 0, right: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} domain={[0, 100]} unit="%" />
                      <YAxis type="category" dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} width={80} />
                      <Tooltip formatter={(v) => [`${v}%`, 'Avg Score']} />
                      <Bar dataKey="avg" fill="#2F80ED" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-40 text-gray-400 text-sm">No exam data yet</div>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
