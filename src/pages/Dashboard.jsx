// src/pages/Dashboard.jsx — Bold & Bright UI
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { getClasses } from '../firebase/firestore'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Layout, PageHeader } from '../components/layout/Layout'
import { StatCard, Card, SkeletonStats, Skeleton } from '../components/ui/index'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#10b981', '#f97316', '#ef4444']

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ classes: 0, students: 0, exams: 0, avgScore: 0 })
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [topStudents, setTopStudents] = useState([])
  const [needsAttention, setNeedsAttention] = useState([])

  const loadDashboard = useCallback(async () => {
    if (!user) return
    try {
      const classes = await getClasses(user.uid)
      const classIds = classes.map(c => c.id)
      const [studentSnaps, examSnaps] = await Promise.all([
        Promise.all(classIds.map(id => getDocs(query(collection(db, 'students'), where('classId', '==', id))))),
        Promise.all(classIds.map(id => getDocs(query(collection(db, 'exams'), where('classId', '==', id)))))
      ])
      const allStudents = []
      studentSnaps.forEach((snap, i) => snap.docs.forEach(d => allStudents.push({ id: d.id, className: classes[i].className, ...d.data() })))
      const allExams = []
      examSnaps.forEach((snap, i) => snap.docs.forEach(d => allExams.push({ id: d.id, className: classes[i].className, classId: classIds[i], ...d.data() })))
      const markSnaps = await Promise.all(allExams.map(e => getDocs(query(collection(db, 'marks'), where('examId', '==', e.id)))))
      const allMarks = []
      markSnaps.forEach((snap, i) => snap.docs.forEach(d => allMarks.push({ ...d.data(), examName: allExams[i].examName, maxMarks: allExams[i].maxMarks, className: allExams[i].className })))
      const scores = allMarks.map(m => (m.marksObtained / m.maxMarks) * 100)
      const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0
      const classAvg = classes.map(cls => {
        const cm = allMarks.filter(m => m.className === cls.className)
        const avg = cm.length ? (cm.reduce((a, m) => a + (m.marksObtained / m.maxMarks) * 100, 0) / cm.length).toFixed(1) : 0
        return { name: cls.className, avg: parseFloat(avg) }
      })
      const attSnaps = await Promise.all(classIds.map(id => getDocs(query(collection(db, 'attendance'), where('classId', '==', id)))))
      let present = 0, absent = 0, late = 0
      attSnaps.forEach(snap => snap.docs.forEach(d => {
        Object.values(d.data().records || {}).forEach(s => {
          if (s === 'Present') present++
          else if (s === 'Absent') absent++
          else if (s === 'Late') late++
        })
      }))
      const studentScores = allStudents.map(s => {
        const sm = allMarks.filter(m => m.studentId === s.id)
        const avg = sm.length ? sm.reduce((a, m) => a + (m.marksObtained / m.maxMarks) * 100, 0) / sm.length : null
        return { ...s, avg }
      }).filter(s => s.avg !== null).sort((a, b) => b.avg - a.avg)
      setStats({ classes: classes.length, students: allStudents.length, exams: allExams.length, avgScore })
      setBarData(classAvg)
      setPieData([
        { name: 'Present', value: present },
        { name: 'Absent', value: absent },
        { name: 'Late', value: late },
      ].filter(d => d.value > 0))
      setTopStudents(studentScores.slice(0, 5))
      setNeedsAttention(studentScores.slice(-3).reverse())
    } finally { setLoading(false) }
  }, [user])

  useEffect(() => { loadDashboard() }, [loadDashboard])

  const firstName = profile?.name?.split(' ')[0] || 'Teacher'

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        {/* Greeting */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
            <span>✨</span> Good {getGreeting()}
          </div>
          <h1 className="text-3xl font-display font-extrabold text-surface-900 dark:text-surface-50">
            Welcome back, {firstName}!
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Here's what's happening in your school today.</p>
        </div>

        {/* Stats */}
        {loading ? (
          <SkeletonStats />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeUp">
            <StatCard label="Total Classes" value={stats.classes} icon="🏫" color="green" />
            <StatCard label="Total Students" value={stats.students} icon="👥" color="orange" />
            <StatCard label="Total Exams" value={stats.exams} icon="📝" color="blue" />
            <StatCard label="Avg Score" value={`${stats.avgScore}%`} icon="⭐" color="purple" />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar chart */}
          <div className="lg:col-span-2 bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-6 shadow-card">
            <h2 className="font-display font-bold text-surface-900 dark:text-surface-50 mb-1">Class Performance</h2>
            <p className="text-xs text-surface-400 mb-5">Average score per class</p>
            {loading ? <Skeleton className="h-48" /> : barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Plus Jakarta Sans' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', fontFamily: 'Plus Jakarta Sans' }}
                    formatter={(v) => [`${v}%`, 'Avg Score']}
                  />
                  <Bar dataKey="avg" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-surface-400 text-sm">No exam data yet</div>
            )}
          </div>

          {/* Pie chart */}
          <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-6 shadow-card">
            <h2 className="font-display font-bold text-surface-900 dark:text-surface-50 mb-1">Attendance</h2>
            <p className="text-xs text-surface-400 mb-5">Overall distribution</p>
            {loading ? <Skeleton className="h-48" /> : pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-surface-400 text-sm">No attendance data yet</div>
            )}
          </div>
        </div>

        {/* Top Students + Needs Attention */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-6 shadow-card">
            <h2 className="font-display font-bold text-surface-900 dark:text-surface-50 mb-4">🏆 Top Performers</h2>
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
            ) : topStudents.length === 0 ? (
              <p className="text-sm text-surface-400 text-center py-8">No exam data yet</p>
            ) : (
              <div className="space-y-2">
                {topStudents.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl animate-fadeUp" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">{s.name}</p>
                      <p className="text-xs text-surface-400">{s.className}</p>
                    </div>
                    <span className="text-sm font-display font-extrabold text-primary-600 dark:text-primary-400">{s.avg?.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-100 dark:border-surface-800 p-6 shadow-card">
            <h2 className="font-display font-bold text-surface-900 dark:text-surface-50 mb-4">⚠️ Needs Attention</h2>
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10" />)}</div>
            ) : needsAttention.length === 0 ? (
              <p className="text-sm text-surface-400 text-center py-8">No data yet</p>
            ) : (
              <div className="space-y-2">
                {needsAttention.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30 animate-fadeUp" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="w-7 h-7 bg-red-100 dark:bg-red-900/50 text-red-500 rounded-lg flex items-center justify-center text-sm flex-shrink-0">⚠️</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">{s.name}</p>
                      <p className="text-xs text-surface-400">{s.className}</p>
                    </div>
                    <span className="text-sm font-display font-extrabold text-red-500">{s.avg?.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
