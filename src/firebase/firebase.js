// src/firebase/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "edudesk-e8d0e.firebaseapp.com",
  projectId: "edudesk-e8d0e",
  storageBucket: "edudesk-e8d0e.firebasestorage.app",
  messagingSenderId: "247254732144",
  appId: "1:247254732144:web:fba0e2a931c64d40ba13b5",
  measurementId: "G-KBHQQHF2G4"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

// Persistent local cache: after first load, ALL data comes from IndexedDB instantly
// No more waiting for network on repeat visits
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
})

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export default app
