import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDL557FOyosfo6fYsFVFYlzDQJA4G04w1Y",
  authDomain: "crwn-db-5990b.firebaseapp.com",
  databaseURL: "https://crwn-db-5990b.firebaseio.com",
  projectId: "crwn-db-5990b",
  storageBucket: "crwn-db-5990b.appspot.com",
  messagingSenderId: "338566075561",
  appId: "1:338566075561:web:ee466aaf98369d139685b8",
  measurementId: "G-QXYEDZF1VW"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase