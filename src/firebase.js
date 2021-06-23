import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCAdEcqJisGmCL2TjwHzo4l4xSHDC1j2Xk",
  authDomain: "cloudfile-8af57.firebaseapp.com",
  projectId: "cloudfile-8af57",
  storageBucket: "cloudfile-8af57.appspot.com",
  messagingSenderId: "82082900355",
  appId: "1:82082900355:web:6c984b634e941acce4aeb6",
  measurementId: "G-R4N152R56D"
})

const firestore = app.firestore();
export const database = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc => {
        return{
            id: doc.id,
            ...doc.data()
        }
    },
    getCurrentsTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = app.storage()
export const auth = firebase.auth();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();

export default app;
