import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const FIREBASE_DATABASE_URL =
  'https://poubelle-connectee-f2f70-default-rtdb.europe-west1.firebasedatabase.app'

// Connexion Realtime Database (lecture des detections en temps reel).
const firebaseApp = initializeApp({
  databaseURL: FIREBASE_DATABASE_URL,
})

export const firebaseDatabase = getDatabase(firebaseApp)
export const FIREBASE_OUVERTURES_PATH = 'ouvertures'
