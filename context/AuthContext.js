import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '@/config/firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((result) => {
      const { uid, displayName, email, photoURL } = result.user

      const userRef = doc(db, 'users', `${uid}`)

      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          return
        } else {
          setDoc(userRef, {
            uid,
            displayName,
            email,
            photoURL,
            favouriteFoods: [],
          })
        }
      })
    })
  }

  const googleSignOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, displayName, email, photoURL } = currentUser
        setUser({
          uid,
          displayName,
          email,
          photoURL,
        })
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ googleSignIn, googleSignOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
