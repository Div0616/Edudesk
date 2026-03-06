// src/firebase/firestore.js — Optimized: cache-first reads, setDoc merge writes

import {
  collection, doc, addDoc, updateDoc, deleteDoc, setDoc,
  getDocs, getDoc, getDocsFromCache, getDocFromCache,
  query, where, orderBy, serverTimestamp,
  writeBatch, limit, startAfter
} from 'firebase/firestore'
import { db } from './firebase'
import { cache } from '../utils/cache'

const CACHE_TTL = 5 * 60_000 // 5 minutes

/**
 * Smart query: try IndexedDB cache first (instant), fall back to network.
 * This leverages Firestore's built-in persistentLocalCache.
 */
async function smartGetDocs(q) {
  try {
    const cached = await getDocsFromCache(q)
    if (!cached.empty) {
      // Got data from cache — also refresh from network in background
      getDocs(q).catch(() => { })
      return cached
    }
  } catch { /* cache miss — fall through to network */ }
  return await getDocs(q)
}

export async function cachedGetDoc(ref) {
  try {
    const cached = await getDocFromCache(ref)
    if (cached.exists()) {
      // Got data from cache — also refresh from network in background
      getDoc(ref).catch(() => { })
      return cached
    }
  } catch { /* cache miss — fall through to network */ }
  return await getDoc(ref)
}

/* ─────────────────────────────────────────────
   TEACHER PROFILE
───────────────────────────────────────────── */
export const getTeacherProfile = async (uid) => {
  const memCached = cache.get(`teacher:${uid}`)
  if (memCached) return memCached
  const snap = await cachedGetDoc(doc(db, 'teachers', uid))
  const result = snap.exists() ? { id: snap.id, ...snap.data() } : null
  if (result) cache.set(`teacher:${uid}`, result, CACHE_TTL)
  return result
}

export const saveTeacherProfile = async (uid, data) => {
  cache.invalidate(`teacher:${uid}`)
  await setDoc(doc(db, 'teachers', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

/* ─────────────────────────────────────────────
   CLASSES
───────────────────────────────────────────── */
export const getClasses = async (teacherId) => {
  const memCached = cache.get(`classes:${teacherId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'classes'), where('teacherId', '==', teacherId), orderBy('createdAt', 'desc'))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`classes:${teacherId}`, result, CACHE_TTL)
  return result
}

export const addClass = async (teacherId, data) => {
  cache.invalidate(`classes:${teacherId}`)
  return await addDoc(collection(db, 'classes'), {
    ...data, teacherId, studentIds: [], createdAt: serverTimestamp()
  })
}

export const updateClass = async (classId, data, teacherId) => {
  if (teacherId) cache.invalidate(`classes:${teacherId}`)
  await updateDoc(doc(db, 'classes', classId), { ...data, updatedAt: serverTimestamp() })
}

export const deleteClass = async (classId, teacherId) => {
  if (teacherId) cache.invalidate(`classes:${teacherId}`)
  await deleteDoc(doc(db, 'classes', classId))
}

/* ─────────────────────────────────────────────
   STUDENTS
───────────────────────────────────────────── */
export const getStudentsByClass = async (classId) => {
  const memCached = cache.get(`students:${classId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'students'), where('classId', '==', classId), orderBy('rollNumber'))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`students:${classId}`, result, CACHE_TTL)
  return result
}

export const getStudentsPaginated = async (classId, pageSize = 20, lastDoc = null) => {
  let q = query(
    collection(db, 'students'),
    where('classId', '==', classId),
    orderBy('rollNumber'),
    limit(pageSize)
  )
  if (lastDoc) q = query(q, startAfter(lastDoc))
  const snap = await getDocs(q)
  return {
    students: snap.docs.map(d => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
    hasMore: snap.docs.length === pageSize
  }
}

export const getStudent = async (studentId) => {
  const memCached = cache.get(`student:${studentId}`)
  if (memCached) return memCached
  const snap = await cachedGetDoc(doc(db, 'students', studentId))
  const result = snap.exists() ? { id: snap.id, ...snap.data() } : null
  if (result) cache.set(`student:${studentId}`, result, CACHE_TTL)
  return result
}

export const addStudent = async (data) => {
  cache.invalidate(`students:${data.classId}`)
  return await addDoc(collection(db, 'students'), { ...data, createdAt: serverTimestamp() })
}

export const updateStudent = async (studentId, data) => {
  cache.invalidate(`student:${studentId}`)
  if (data.classId) cache.invalidate(`students:${data.classId}`)
  await updateDoc(doc(db, 'students', studentId), { ...data, updatedAt: serverTimestamp() })
}

export const deleteStudent = async (studentId, classId) => {
  cache.invalidate(`student:${studentId}`)
  if (classId) cache.invalidate(`students:${classId}`)
  await deleteDoc(doc(db, 'students', studentId))
}

export const batchAddStudents = async (studentsArray) => {
  const chunks = []
  for (let i = 0; i < studentsArray.length; i += 490) {
    chunks.push(studentsArray.slice(i, i + 490))
  }
  for (const chunk of chunks) {
    const batch = writeBatch(db)
    chunk.forEach(student => {
      const ref = doc(collection(db, 'students'))
      batch.set(ref, { ...student, createdAt: serverTimestamp() })
    })
    await batch.commit()
  }
  if (studentsArray[0]?.classId) cache.invalidate(`students:${studentsArray[0].classId}`)
}

/* ─────────────────────────────────────────────
   SUBJECTS
───────────────────────────────────────────── */
export const getSubjectsByClass = async (classId) => {
  const memCached = cache.get(`subjects:${classId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'subjects'), where('classId', '==', classId), orderBy('name'))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`subjects:${classId}`, result, CACHE_TTL)
  return result
}

export const addSubject = async (classId, teacherId, name) => {
  cache.invalidate(`subjects:${classId}`)
  return await addDoc(collection(db, 'subjects'), {
    classId, teacherId, name: name.trim(), createdAt: serverTimestamp()
  })
}

export const deleteSubject = async (subjectId, classId) => {
  if (classId) cache.invalidate(`subjects:${classId}`)
  await deleteDoc(doc(db, 'subjects', subjectId))
}

/* ─────────────────────────────────────────────
   ATTENDANCE
───────────────────────────────────────────── */
export const getAttendanceByClass = async (classId) => {
  const memCached = cache.get(`att:${classId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'attendance'), where('classId', '==', classId), orderBy('date', 'desc'))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`att:${classId}`, result, CACHE_TTL)
  return result
}

export const saveAttendance = async (classId, date, records) => {
  cache.invalidate(`att:${classId}`)
  const docId = `${classId}_${date}`
  await setDoc(doc(db, 'attendance', docId), {
    classId, date, records, updatedAt: serverTimestamp()
  }, { merge: true })
}

/* ─────────────────────────────────────────────
   EXAMS
───────────────────────────────────────────── */
export const getExamsByClass = async (classId) => {
  const memCached = cache.get(`exams:${classId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'exams'), where('classId', '==', classId), orderBy('date', 'desc'))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`exams:${classId}`, result, CACHE_TTL)
  return result
}

export const addExam = async (data) => {
  cache.invalidate(`exams:${data.classId}`)
  return await addDoc(collection(db, 'exams'), { ...data, createdAt: serverTimestamp() })
}

export const updateExam = async (examId, data) => {
  if (data.classId) cache.invalidate(`exams:${data.classId}`)
  await updateDoc(doc(db, 'exams', examId), { ...data, updatedAt: serverTimestamp() })
}

export const deleteExam = async (examId, classId) => {
  if (classId) cache.invalidate(`exams:${classId}`)
  await deleteDoc(doc(db, 'exams', examId))
}

/* ─────────────────────────────────────────────
   MARKS
───────────────────────────────────────────── */
export const getMarksByExam = async (examId) => {
  const memCached = cache.get(`marks:exam:${examId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'marks'), where('examId', '==', examId))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`marks:exam:${examId}`, result, CACHE_TTL)
  return result
}

export const getMarksByStudent = async (studentId) => {
  const memCached = cache.get(`marks:student:${studentId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'marks'), where('studentId', '==', studentId))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`marks:student:${studentId}`, result, CACHE_TTL)
  return result
}

export const saveMark = async (examId, studentId, data) => {
  cache.invalidate(`marks:exam:${examId}`)
  cache.invalidate(`marks:student:${studentId}`)
  const docId = `${examId}_${studentId}`
  await setDoc(doc(db, 'marks', docId), {
    examId, studentId, ...data, updatedAt: serverTimestamp()
  }, { merge: true })
}

/* ─────────────────────────────────────────────
   TIMETABLE
───────────────────────────────────────────── */
export const getTimetable = async (classId) => {
  const memCached = cache.get(`timetable:${classId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'timetable'), where('classId', '==', classId))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`timetable:${classId}`, result, CACHE_TTL)
  return result
}

export const saveTimetableSlot = async (classId, teacherId, day, period, data) => {
  cache.invalidate(`timetable:${classId}`)
  const docId = `${classId}_${day}_${period}`
  await setDoc(doc(db, 'timetable', docId), {
    classId, teacherId, day, period, ...data, updatedAt: serverTimestamp()
  }, { merge: true })
}

export const deleteTimetableSlot = async (slotId, classId) => {
  if (classId) cache.invalidate(`timetable:${classId}`)
  await deleteDoc(doc(db, 'timetable', slotId))
}

/* ─────────────────────────────────────────────
   HOMEWORK
───────────────────────────────────────────── */
export const getHomeworkByClass = async (classId) => {
  const memCached = cache.get(`hw:${classId}`)
  if (memCached) return memCached
  const q = query(collection(db, 'homework'), where('classId', '==', classId), orderBy('dueDate', 'desc'))
  const snap = await smartGetDocs(q)
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  cache.set(`hw:${classId}`, result, CACHE_TTL)
  return result
}

export const addHomework = async (data) => {
  cache.invalidate(`hw:${data.classId}`)
  return await addDoc(collection(db, 'homework'), { ...data, createdAt: serverTimestamp() })
}

export const updateHomework = async (hwId, data) => {
  if (data.classId) cache.invalidate(`hw:${data.classId}`)
  await updateDoc(doc(db, 'homework', hwId), { ...data, updatedAt: serverTimestamp() })
}

export const deleteHomework = async (hwId, classId) => {
  if (classId) cache.invalidate(`hw:${classId}`)
  await deleteDoc(doc(db, 'homework', hwId))
}
