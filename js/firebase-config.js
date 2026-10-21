
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
      throw new Error((window.t ? window.t('userNotLoggedIn') : 'Uporabnik ni prijavljen'));
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
  
  
  // Is the user's email confirmed?
  //  - true when Firebase says so (user clicked the confirmation link); this is
  //    then also saved in Firestore,
  //  - true for older accounts already marked emailVerified in Firestore
  //    (confirmed earlier with the 6-digit code) or created before verification existed,
  //  - false only when the Firestore profile says emailVerified: false.
  window.isEmailVerified = async function(user = null) {
    let authUser = user || window.auth.currentUser || firebase.auth().currentUser;
    if (!authUser) return false;

    if (!authUser.emailVerified) {
      try {
        await authUser.reload();
        authUser = firebase.auth().currentUser || authUser;
      } catch (e) {
        console.warn('Could not refresh user:', e);
      }
    }

    const userRef = window.usersCollection.doc(authUser.uid);

    if (authUser.emailVerified) {
      try {
        const doc = await userRef.get();
        const data = doc.exists ? doc.data() : {};
        if (data.emailVerified !== true || (authUser.email && data.email !== authUser.email)) {
          await userRef.set({
            emailVerified: true,
            email: authUser.email,
            emailVerifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
            verificationCode: firebase.firestore.FieldValue.delete(),
            verificationCodeExpiry: firebase.firestore.FieldValue.delete(),
            lastResendTimestamp: firebase.firestore.FieldValue.delete()
          }, { merge: true });
        }
      } catch (e) {
        console.warn('Could not save verification status:', e);
      }
      return true;
    }

    try {
      const doc = await userRef.get();
      if (!doc.exists) return true;
      return doc.data().emailVerified !== false;
    } catch (e) {
      console.warn('Could not read verification status:', e);
      return true;
    }
  };

  // ---------------------------------------------------------------------------
  // Shared email-confirmation helpers (used by auth.js and the profile page)
  // ---------------------------------------------------------------------------
  window.FURA_VERIFY_COOLDOWN_MS = 60 * 1000;

  // Milliseconds left before another confirmation link may be requested
  window.verificationResendRemaining = function() {
    let last = 0;
    try { last = parseInt(localStorage.getItem('furaVerificationLastSent') || '0', 10) || 0; } catch (e) {}
    return Math.max(0, window.FURA_VERIFY_COOLDOWN_MS - (Date.now() - last));
  };

  // Send Firebase's confirmation link. Exactly ONE request: Firebase allows only
  // about one verification email per user per minute, and no return link is
  // passed, so it does not depend on Firebase's authorized domains.
  window.sendEmailVerificationLink = async function(user = null) {
    const authUser = user || firebase.auth().currentUser;
    if (!authUser) {
      throw new Error(window.t ? window.t('userNotLoggedIn') : 'Uporabnik ni prijavljen.');
    }
    const map = { sl: 'sl', en: 'en', it: 'it', de: 'de', hr: 'hr', sr: 'sr', bs: 'hr', me: 'hr' };
    const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'sl';
    firebase.auth().languageCode = map[lang] || 'sl';
    try {
      await authUser.sendEmailVerification();
    } catch (error) {
      console.error('sendEmailVerification failed:', error.code, error.message);
      throw error;
    }
    try { localStorage.setItem('furaVerificationLastSent', String(Date.now())); } catch (e) {}
  };

  // Readable message for a failed send
  window.verificationSendErrorMessage = function(error) {
    const tr = (k, fb) => (window.t ? window.t(k) : fb);
    if (error && error.code === 'auth/too-many-requests') {
      return tr('tooManyRequests', 'Preveč poskusov. Počakajte nekaj minut in poskusite znova.');
    }
    if (error && !error.code) return error.message;
    return tr('errorSendingVerification', 'Potrditvene e-pošte ni bilo mogoče poslati') + ': ' + ((error && error.message) || error);
  };

  // "Vpiši svojo furo" links: only users with a confirmed email may open the
  // create-ride page. Works for every link to create-ride.html on every page,
  // including buttons that are added later.
  document.addEventListener('click', async function(event) {
    const link = event.target.closest ? event.target.closest('a[href*="create-ride.html"]') : null;
    if (!link) return;
    const user = firebase.auth().currentUser;
    if (!user) return; // not logged in: create-ride page sends them to log in
    if (window.__furaVerifiedUid === user.uid) return; // already checked this session

    event.preventDefault();
    const href = link.href;
    let verified = true;
    try { verified = await window.isEmailVerified(user); } catch (e) { verified = true; }
    if (verified) {
      window.__furaVerifiedUid = user.uid;
      window.location.href = href;
      return;
    }

    const msg = window.t ? window.t('verifyEmailToPost') : 'Za objavo prevoza morate najprej potrditi svoj e-poštni naslov.';
    if (window.utils && window.utils.showNotification) window.utils.showNotification(msg, 'warning', 6000);

    if (typeof window.showEmailVerificationModal === 'function') {
      // Home / login / register page: open the confirmation window
      try { sessionStorage.removeItem('furaVerifyDismissed'); } catch (e) {}
      window.showEmailVerificationModal(user.email);
    } else if (document.getElementById('emailVerifyBanner')) {
      // Profile page: point to the confirmation box
      const banner = document.getElementById('emailVerifyBanner');
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      banner.classList.remove('evb-pulse'); void banner.offsetWidth; banner.classList.add('evb-pulse');
    } else {
      const home = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
      setTimeout(function() { window.location.href = home + '?verify=1'; }, 1500);
    }
  }, true);
