// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBt7N61CM97WwbVTWzB6prFW9Lr5uN6_ao',
  authDomain: 'hell-study-113f7.firebaseapp.com',
  projectId: 'hell-study-113f7',
  storageBucket: 'hell-study-113f7.appspot.com',
  messagingSenderId: '172183502444',
  appId: '1:172183502444:web:69ea222ad17bc0d474e249',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
