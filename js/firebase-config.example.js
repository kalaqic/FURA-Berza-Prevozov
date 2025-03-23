/**
 * Firebase configuration for FURA website
 * EXAMPLE FILE - Replace with your own API keys
 */

// Firebase configuration object - Replace these with your Firebase project values
const firebaseConfig = {
    databaseURL: 'YOUR_DATABASE_URL',
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase - only if it hasn't been initialized yet
  if (!window.firebaseInitialized) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true });
    
    // Mark as initialized to prevent double initialization
    window.firebaseInitialized = true;
    console.log("Firebase initialized from firebase-config.js");
  }
  
  // Export common Firebase instances for reuse
  window.db = firebase.firestore();
  window.auth = firebase.auth();
  
  // Export collections
  window.usersCollection = window.db.collection('users');
  window.ridesCollection = window.db.collection('rides');