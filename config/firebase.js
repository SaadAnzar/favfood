import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAryjIoTT0xeI5Vzf7G6ule8NHhNuNzPcw',
  authDomain: 'polymath-34bbf.firebaseapp.com',
  projectId: 'polymath-34bbf',
  storageBucket: 'polymath-34bbf.appspot.com',
  messagingSenderId: '218508866473',
  appId: '1:218508866473:web:0645271c49eba2c6718ab8',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
