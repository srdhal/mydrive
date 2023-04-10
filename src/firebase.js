import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
 

const app = firebase.initializeApp(firebaseConfig);

const firestore=app.firestore()
export const database={
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc=>{
      return {
        id: doc.id,
        ...doc.data()
      }
    },
    currTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage=app.firebase.storage()
export const auth = app.firebase.auth()
export default app