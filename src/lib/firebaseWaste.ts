import { onValue, ref, type DataSnapshot } from 'firebase/database'
import { FIREBASE_OUVERTURES_PATH, firebaseDatabase } from './firebase'
import { parseFirebaseOuvertures, type WasteRecord } from './wasteStats'

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
