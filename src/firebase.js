// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importing the auth module
import { getFirestore } from 'firebase/firestore'; // Importing Firestore module

const firebaseConfig = {
    apiKey: "AIzaSyAKHgUqwc2DnDs1icw8efgWesKAP-MzeWA",
    authDomain: "bio-store-a2a89.firebaseapp.com",
    projectId: "bio-store-a2a89",
    storageBucket: "bio-store-a2a89.firebasestorage.app",
    messagingSenderId: "204204428028",
    appId: "1:204204428028:web:1a6de0cd4e63d3a9fda579"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const firestore = getFirestore(app);

export { auth, firestore };


