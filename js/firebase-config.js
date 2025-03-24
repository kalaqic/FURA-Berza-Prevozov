
/**
 * Firebase configuration for FURA website
 * THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
 */

// Firebase configuration object
const firebaseConfig = {
    databaseURL: "https://fura-b3228.firebaseio.com",
    apiKey: "AIzaSyDUK5wf_R6ExGJvvKNDRVi_IfSVHQ7WqEQ",
    authDomain: "fura-b3228.firebaseapp.com",
    projectId: "fura-b3228",
    storageBucket: "fura-b3228.firebasestorage.app", 
    messagingSenderId: "618183512204",
    appId: "1:618183512204:web:5741ce45780deb02edaba9"
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
  
  