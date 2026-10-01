
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

  // Ensure the Firestore profile document exists for authenticated users.
  window.ensureUserProfileDocument = async function(user = null) {
    const authUser = user || window.auth.currentUser || firebase.auth().currentUser;
    if (!authUser) {
      throw new Error('Uporabnik ni prijavljen');
    }

    const userRef = window.usersCollection.doc(authUser.uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return userDoc;
    }

    const displayNameParts = (authUser.displayName || '').trim().split(/\s+/).filter(Boolean);
    const fallbackUsername = authUser.email ? authUser.email.split('@')[0] : authUser.uid;

    await userRef.set({
      uid: authUser.uid,
      email: authUser.email || '',
      firstName: displayNameParts[0] || '',
      lastName: displayNameParts.slice(1).join(' '),
      username: fallbackUsername,
      phone: authUser.phoneNumber || '',
      emailVerified: !!authUser.emailVerified,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return userRef.get();
  };
  
  