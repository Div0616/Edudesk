// src/utils/gradeCalculator.js
export const calculateGrade = (obtained, maxMarks) => {
  const pct = (obtained / maxMarks) * 100
  if (pct >= 90) return { grade: 'A+', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  if (pct >= 80) return { grade: 'A',  color: 'text-green-600',   bg: 'bg-green-50' }
  if (pct >= 70) return { grade: 'B',  color: 'text-blue-600',    bg: 'bg-blue-50' }
  if (pct >= 60) return { grade: 'C',  color: 'text-yellow-600',  bg: 'bg-yellow-50' }
  if (pct >= 50) return { grade: 'D',  color: 'text-orange-600',  bg: 'bg-orange-50' }
  return             { grade: 'F',  color: 'text-red-600',     bg: 'bg-red-50' }
}

export const getPercentage = (obtained, maxMarks) =>
  maxMarks > 0 ? ((obtained / maxMarks) * 100).toFixed(1) : '0.0'
