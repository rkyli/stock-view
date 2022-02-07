// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDMlMp0MvmrPLPo99u58XE1VGxE2XM4Xqo',
  authDomain: 'stockview-d5a62.firebaseapp.com',
  projectId: 'stockview-d5a62',
  storageBucket: 'stockview-d5a62.appspot.com',
  messagingSenderId: '503682277865',
  appId: '1:503682277865:web:7513d327136c3adf2e6b78',
  measurementId: 'G-362VWX4B7G',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//connectAuthEmulator(auth, 'http://localhost:9099');
