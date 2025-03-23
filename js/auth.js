// auth.js - Completely revised for more reliable authentication

// Get Firebase objects - using direct references for better reliability
const auth = firebase.auth();
const db = firebase.firestore();
const usersCollection = db.collection('users');

// Keep track of authentication state internally to avoid race conditions
let isUserAuthenticated = false;

// Immediately set up auth state listener
auth.onAuthStateChanged(function(user) {
  console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
  isUserAuthenticated = !!user;
  
  if (user) {
    console.log('User authenticated:', user.email);
  } else {
    console.log('No authenticated user');
  }
  
  // Update UI on every auth state change
  window.updateAuthUI();
});

// Login user function - now using direct Firebase auth
window.loginUser = async function(email, password) {
  try {
    console.log('Login attempt with:', email);
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log('Login successful:', result.user);
    return result.user;
  } catch (error) {
    console.error('Greška pri prijavi:', error);
    throw error;
  }
};

// Register user function
window.registerUser = async function(email, password, firstName, lastName, username) {
  console.log('Register function called with email:', email);
  try {
    // Create user in Firebase Authentication
    const result = await auth.createUserWithEmailAndPassword(email, password);
    console.log('User created in Firebase Auth:', result.user.uid);
    
    // Add additional data to Firestore
    await usersCollection.doc(result.user.uid).set({
      email,
      firstName,
      lastName,
      username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('User data saved to Firestore');
    return result.user;
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    throw error;
  }
};

// Logout user function
window.logoutUser = function() {
  console.log('Logout attempt starting');
  
  return auth.signOut()
    .then(() => {
      console.log('Logout successful');
      window.updateAuthUI();
      alert('Uspešno ste se odjavili.');
    })
    .catch(error => {
      console.error('Logout error:', error);
      alert('Napaka pri odjavi: ' + error.message);
    });
};

// Improved check for login status with fallback to local variable
window.isUserLoggedIn = function() {
  const currentUser = auth.currentUser;
  console.log('Checking login status. Firebase says:', !!currentUser, 'Local state says:', isUserAuthenticated);
  
  // First try Firebase's current user
  if (currentUser) {
    return true;
  }
  
  // Fall back to our internally tracked state
  return isUserAuthenticated;
};

// Function to update UI based on auth state
window.updateAuthUI = function() {
  console.log('Updating UI based on auth state');
  const isLoggedIn = window.isUserLoggedIn();
  console.log('Is user logged in?', isLoggedIn);
  
  const authButtons = document.querySelector('.auth-buttons');
  
  if (!authButtons) {
    console.error('Auth buttons container not found');
    return;
  }
  
  if (isLoggedIn) {
    const user = auth.currentUser;
    
    if (!user) {
      console.error('updateAuthUI: isLoggedIn is true but auth.currentUser is null!');
      // Handle this inconsistent state gracefully
      return;
    }
    
    // First update UI immediately with basic info
    authButtons.innerHTML = `
      <a href="pages/create-ride.html" class="btn btn-outline">Vpisi svojo furo</a>
      <a href="pages/profile.html" class="btn btn-outline">Moj profil (${user.email})</a>
      <a href="#" class="btn btn-primary" onclick="window.logoutUser()">Odjavi se</a>
    `;
    
    // Then try to fetch additional user info
    usersCollection.doc(user.uid).get()
      .then(doc => {
        if (doc.exists && doc.data().firstName && doc.data().lastName) {
          const displayName = `${doc.data().firstName} ${doc.data().lastName}`;
          const profileButton = authButtons.querySelector('a[href="pages/profile.html"]');
          if (profileButton) {
            profileButton.textContent = `Moj profil (${displayName})`;
          }
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  } else {
    console.log('Showing logged-out UI');
    authButtons.innerHTML = `
      <a href="#" class="btn btn-outline" onclick="showLoginModal()">Prijavi se</a>
      <a href="#" class="btn btn-primary" onclick="showRegisterModal()">Registracija</a>
    `;
  }
};

// Add a debugging function to check auth state
window.checkAuthState = function() {
  console.log('Current user from Firebase:', auth.currentUser);
  console.log('Internal auth state:', isUserAuthenticated);
  console.log('isUserLoggedIn() returns:', window.isUserLoggedIn());
};

// Call the checkAuthState function periodically for debugging
setInterval(window.checkAuthState, 5000);

// Debugging helper
window.checkAuthFunctions = function() {
  console.log('loginUser exists:', typeof window.loginUser === 'function');
  console.log('registerUser exists:', typeof window.registerUser === 'function');
  console.log('logoutUser exists:', typeof window.logoutUser === 'function');
  console.log('isUserLoggedIn exists:', typeof window.isUserLoggedIn === 'function');
  console.log('updateAuthUI exists:', typeof window.updateAuthUI === 'function');
};

// Call debug function immediately
window.checkAuthFunctions();

// Additionally check on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Auth.js loaded and DOM is ready');
  window.checkAuthFunctions();
  window.checkAuthState();
  
  // Force UI update when page loads
  window.updateAuthUI();
});