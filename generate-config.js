// generate-config.js
const fs = require('fs');
require('dotenv').config();

// Check if .env file exists, if not create with default values
if (!fs.existsSync('.env')) {
  console.log('Creating default .env file...');
  const defaultEnv = `
FIREBASE_DATABASE_URL=https://fura-b3228.firebaseio.com
FIREBASE_API_KEY=AIzaSyDUK5wf_R6ExGJvvKNDRVi_IfSVHQ7WqEQ
FIREBASE_AUTH_DOMAIN=fura-b3228.firebaseapp.com
FIREBASE_PROJECT_ID=fura-b3228
FIREBASE_STORAGE_BUCKET=fura-b3228.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=618183512204
FIREBASE_APP_ID=1:618183512204:web:5741ce45780deb02edaba9
`;
  fs.writeFileSync('.env', defaultEnv.trim());
  console.log('.env file created with default values');
}

// Now read the .env file
require('dotenv').config(); // Reload to ensure values are available

// Generate the config file
const configFileContent = `/**
 * Firebase configuration for FURA website
 * THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
 */

// Firebase configuration object
const firebaseConfig = {
  databaseURL: "${process.env.FIREBASE_DATABASE_URL}",
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}", 
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}"
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
`;

fs.writeFileSync('js/firebase-config.js', configFileContent);
console.log('Firebase config file generated successfully');