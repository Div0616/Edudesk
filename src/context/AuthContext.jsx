// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
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

  const syncProfile = useCallback(async (firebaseUser) => {
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
  }, [])

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
  }, [syncProfile])

  const loginEmail = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), [])

  const registerEmail = useCallback(async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    await syncProfile({ ...cred.user, displayName: name })
    return cred
  }, [syncProfile])

  const loginGoogle = useCallback(() => signInWithPopup(auth, googleProvider), [])

  const logout = useCallback(() => {
    cache.clear()
    return signOut(auth)
  }, [])

  const updateProfileData = useCallback(async (data) => {
    if (!user) return
    const ref = doc(db, 'teachers', user.uid)
    await setDoc(ref, data, { merge: true })
    setProfile(prev => {
      const updated = { ...prev, ...data }
      cache.set(`teacher:${user.uid}`, updated)
      return updated
    })
  }, [user])

  // Memoize the context value so consumers don't re-render unless actual values change
  const value = useMemo(() => ({
    user, profile, loading, loginEmail, registerEmail, loginGoogle, logout, updateProfileData
  }), [user, profile, loading, loginEmail, registerEmail, loginGoogle, logout, updateProfileData])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
