// src/utils/cache.js
// In-memory cache — prevents redundant Firestore reads within a session
// Data persists for TTL ms (default 60 seconds)

const store = new Map()
const DEFAULT_TTL = 60_000 // 60 seconds

export const cache = {
  get(key) {
    const entry = store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      store.delete(key)
      return null
    }
    return entry.value
  },

  set(key, value, ttl = DEFAULT_TTL) {
    store.set(key, { value, expiresAt: Date.now() + ttl })
  },

  invalidate(prefix) {
    for (const key of store.keys()) {
      if (key.startsWith(prefix)) store.delete(key)
    }
  },

  clear() {
    store.clear()
  }
}
