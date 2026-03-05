// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signInWithPopup,
  signOut, updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { googleProvider } from '../firebase/firebase'
import { cache } from '../utils/cache'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined) // undefined = still loading
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncProfile = async (firebaseUser) => {
    // Check in-memory cache first
    const cached = cache.get(`teacher:${firebaseUser.uid}`)
    if (cached) { setProfile(cached); return }

    const ref = doc(db, 'teachers', firebaseUser.uid)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      const p = { id: snap.id, ...snap.data() }
      cache.set(`teacher:${firebaseUser.uid}`, p)
      setProfile(p)
    } else {
      const newProfile = {
        name: firebaseUser.displayName || '',
        email: firebaseUser.email,
        school: '',
        subjects: [],
        photoURL: firebaseUser.photoURL || '',
        createdAt: serverTimestamp()
      }
      await setDoc(ref, newProfile)
      cache.set(`teacher:${firebaseUser.uid}`, { id: firebaseUser.uid, ...newProfile })
      setProfile({ id: firebaseUser.uid, ...newProfile })
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        // Don't await profile — set loading=false immediately so UI shows
        setLoading(false)
        syncProfile(u) // background
      } else {
        setProfile(null)
        setLoading(false)
      }
    })
    return unsub
  }, [])

  const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const registerEmail = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    await syncProfile({ ...cred.user, displayName: name })
    return cred
  }

  const loginGoogle = () => signInWithPopup(auth, googleProvider)

  const logout = () => {
    cache.clear()
    return signOut(auth)
  }

  const updateProfileData = async (data) => {
    const ref = doc(db, 'teachers', user.uid)
    await setDoc(ref, data, { merge: true })
    const updated = { ...profile, ...data }
    cache.set(`teacher:${user.uid}`, updated)
    setProfile(updated)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginEmail, registerEmail, loginGoogle, logout, updateProfileData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
