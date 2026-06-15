import { onValue, ref, set, type DataSnapshot } from 'firebase/database'
import {
  FIREBASE_OUVERTURES_PATH,
  FIREBASE_POUBELLES_PATH,
  firebaseDatabase,
} from './firebase'
import { parseFirebaseOuvertures, type WasteRecord } from './wasteStats'

export type BinResets = Record<string, string>

/**
 * Ecoute Firebase en temps reel (onValue).
 * Chaque snapshot remplace la liste complete : pas de double comptage.
 */
export function subscribeToWasteRecords(
  onData: (records: WasteRecord[]) => void,
  onError?: (error: Error) => void,
): () => void {
  const ouverturesRef = ref(firebaseDatabase, FIREBASE_OUVERTURES_PATH)

  const handleSnapshot = (snapshot: DataSnapshot) => {
    onData(parseFirebaseOuvertures(snapshot.val()))
  }

  return onValue(ouverturesRef, handleSnapshot, (error) => {
    onError?.(error)
  })
}

export function subscribeToBinResets(
  onData: (resets: BinResets) => void,
  onError?: (error: Error) => void,
): () => void {
  const poubellesRef = ref(firebaseDatabase, FIREBASE_POUBELLES_PATH)

  return onValue(
    poubellesRef,
    (snapshot) => {
      const data = snapshot.val() as Record<string, { lastResetAt?: string }> | null
      const resets: BinResets = {}

      if (data) {
        for (const [type, entry] of Object.entries(data)) {
          if (entry?.lastResetAt) resets[type] = entry.lastResetAt
        }
      }

      onData(resets)
    },
    (error) => {
      onError?.(error)
    },
  )
}

export async function resetBin(type: string): Promise<void> {
  const normalizedType = type.trim().toLowerCase()
  const binRef = ref(
    firebaseDatabase,
    `${FIREBASE_POUBELLES_PATH}/${normalizedType}/lastResetAt`,
  )
  await set(binRef, new Date().toISOString())
}
