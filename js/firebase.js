// firebase.js - Properly exports Firebase instances

// Get Firebase objects and add to window for global access
window.auth = firebase.auth();
window.db = firebase.firestore();

// Define collections
window.usersCollection = window.db.collection('users');
window.ridesCollection = window.db.collection('rides');

// Confirm firebase.js is loaded
console.log('firebase.js loaded - Firebase auth and db available globally');
console.log('Auth object available:', !!window.auth);
console.log('DB object available:', !!window.db);