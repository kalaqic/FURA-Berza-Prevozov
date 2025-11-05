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

// Register user function with email verification
window.registerUser = async function(email, password, firstName, lastName, username, phone = '') {
  console.log('Register function called with email:', email);
  try {
    // Create user in Firebase Authentication
    const result = await auth.createUserWithEmailAndPassword(email, password);
    const user = result.user;
    console.log('User created in Firebase Auth:', user.uid);
    
    // Generate and store verification code
    const verificationCode = generateVerificationCode();
    
    // Add additional data to Firestore (including verification status)
    await usersCollection.doc(user.uid).set({
      email,
      firstName,
      lastName,
      username,
      phone,
      emailVerified: false,
      verificationCode: verificationCode,
      verificationCodeExpiry: firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 15 * 60 * 1000)), // 15 minutes
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Send verification email with code
    await sendVerificationEmail(email, firstName, verificationCode);
    
    console.log('User data saved to Firestore and verification email sent');
    return user;
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    throw error;
  }
};

// Generate 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification email using EmailJS
async function sendVerificationEmail(email, firstName, verificationCode) {
  try {
    console.log('Sending verification email to:', email);
    console.log('EmailJS available:', typeof emailjs);
    console.log('EmailJS object:', emailjs);
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
      console.warn('EmailJS not loaded, falling back to development mode');
      return sendVerificationEmailFallback(email, firstName, verificationCode);
    }
    
    // EmailJS configuration
    emailjs.init('2w-9CkGzmwI1ziq-O'); // Your public API key
    
    // Email template parameters
    const templateParams = {
      email: email,
      to_name: firstName,
      verification_code: verificationCode,
      from_name: 'FURA Team',
      reply_to: 'noreply@fura.si'
    };
    
    // Send email using EmailJS
    const response = await emailjs.send(
      'service_q9cnopq', // Your service ID
      'template_2ijfw44', // Your template ID
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    
    // Show success notification
    if (window.utils && window.utils.showNotification) {
      window.utils.showNotification(
        `Potrditvena koda je bila poslana na ${email}`,
        'success',
        5000
      );
    }
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      status: error.status,
      text: error.text
    });
    
    // Fallback to development mode if EmailJS fails
    console.log('EmailJS failed, using fallback method');
    return sendVerificationEmailFallback(email, firstName, verificationCode);
  }
}

// Fallback method for development/testing
async function sendVerificationEmailFallback(email, firstName, verificationCode) {
  console.log('Using fallback email method for development');
  
  // Store the email data for the user to see
  const emailData = {
    to: email,
    subject: 'Potrditev registracije - FURA',
    verificationCode: verificationCode,
    firstName: firstName,
    timestamp: new Date().toISOString()
  };
  
  // Store in localStorage for development
  localStorage.setItem('lastVerificationEmail', JSON.stringify(emailData));
  console.log('Verification email data stored in localStorage for development');
  
  // Show the verification code to user for development
  if (window.utils && window.utils.showNotification) {
    window.utils.showNotification(
      `Razvojni način: Potrditvena koda je ${verificationCode}. V produkciji bi bila poslana na ${email}`,
      'info',
      10000
    );
  } else {
    // Fallback to alert if utils not available
    alert(`Razvojni način: Vaša potrditvena koda je ${verificationCode}`);
  }
}

// Verify email with confirmation code
window.verifyEmail = async function(email, verificationCode) {
  try {
    console.log('Verifying email with code:', verificationCode);
    
    // Get user from email
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Uporabnik ni prijavljen');
    }
    
    // Check verification code in Firestore
    const userDoc = await usersCollection.doc(user.uid).get();
    if (!userDoc.exists) {
      throw new Error('Uporabniški podatki niso najdeni');
    }
    
    const userData = userDoc.data();
    
    // Check if code matches
    if (userData.verificationCode !== verificationCode) {
      throw new Error('Napačna potrditvena koda');
    }
    
    // Check if code is expired
    const now = firebase.firestore.Timestamp.now();
    if (userData.verificationCodeExpiry.toMillis() < now.toMillis()) {
      throw new Error('Potrditvena koda je potekla. Zahtevajte novo.');
    }
    
    // Mark email as verified in Firestore
    await usersCollection.doc(user.uid).update({
      emailVerified: true,
      verificationCode: firebase.firestore.FieldValue.delete(),
      verificationCodeExpiry: firebase.firestore.FieldValue.delete(),
      emailVerifiedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('Email verified successfully');
    return true;
    
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
};

// Resend verification code
window.resendVerificationCode = async function() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Uporabnik ni prijavljen');
    }
    
    // Get user data
    const userDoc = await usersCollection.doc(user.uid).get();
    if (!userDoc.exists) {
      throw new Error('Uporabniški podatki niso najdeni');
    }
    
    const userData = userDoc.data();
    
    // Generate new verification code
    const verificationCode = generateVerificationCode();
    
    // Update verification code in Firestore
    await usersCollection.doc(user.uid).update({
      verificationCode: verificationCode,
      verificationCodeExpiry: firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 15 * 60 * 1000))
    });
    
    // Send new verification email
    await sendVerificationEmail(userData.email, userData.firstName, verificationCode);
    
    console.log('New verification code sent');
    return true;
    
  } catch (error) {
    console.error('Error resending verification code:', error);
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

// Modal-specific login handler with loading overlay
window.handleLoginSubmit = async function() {
  console.log('Login handler called');
  
  // Create and show loading overlay
  const loadingOverlay = createLoadingOverlay('loginLoadingOverlay', 'Prijava v teku...');
  loadingOverlay.style.display = 'flex';
  
  try {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!emailInput || !passwordInput) {
      console.error('Login form elements not found');
      loadingOverlay.style.display = 'none';
      alert('Error: Login form not available. Please refresh the page.');
      return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
      loadingOverlay.style.display = 'none';
      alert('Vnesite e-poštni naslov in geslo.');
      return;
    }
    
    console.log('Starting login with:', email);
    
    // Use Firebase auth directly
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('Firebase login successful:', user);
    
    // Clear form fields
    emailInput.value = '';
    passwordInput.value = '';
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Close the modal immediately
    window.closeModal('loginModal');
    
    // Show success message
    alert('Uspešna prijava!');
    
    // Update UI
    window.updateAuthUI();
    
  } catch (error) {
    console.error('Login error:', error);
    loadingOverlay.style.display = 'none';
    alert('Napaka pri prijavi: ' + error.message);
  }
};

// Modal-specific registration handler with loading overlay
window.handleRegisterSubmit = async function() {
  console.log('Register handler called');
  
  // Create and show loading overlay
  const loadingOverlay = createLoadingOverlay('registrationLoadingOverlay', 'Registracija v teku...');
  loadingOverlay.style.display = 'flex';
  
  try {
    // Get input elements by ID
    const firstNameInput = document.getElementById('registerFirstName');
    const lastNameInput = document.getElementById('registerLastName');
    const emailInput = document.getElementById('registerEmail');
    const usernameInput = document.getElementById('registerUsername');
    const phoneInput = document.getElementById('fullPhoneNumber');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    
    if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
      console.error('Register form elements not found');
      loadingOverlay.style.display = 'none';
      alert('Error: Registration form not available. Please refresh the page.');
      return;
    }
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput ? usernameInput.value.trim() : email;
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    console.log('Register data collected:', { email, firstName, lastName, username, phone });
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      loadingOverlay.style.display = 'none';
      alert('Izpolnite vsa obvezna polja.');
      return;
    }
    
    if (password !== confirmPassword) {
      loadingOverlay.style.display = 'none';
      alert('Gesli se ne ujemata.');
      return;
    }
    
    console.log('Starting Firebase registration...');
    
    // Create user using the registerUser function
    const user = await window.registerUser(email, password, firstName, lastName, username, phone);
    console.log('User created:', user.uid);
    
    // Clear form fields
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    if (usernameInput) usernameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Close register modal first
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
      registerModal.style.display = 'none';
    }
    
    // Show success message first
    console.log('Registration successful, showing verification modal...');
    console.log('Email for verification:', email);
    console.log('showEmailVerificationModal function available:', typeof window.showEmailVerificationModal);
    
    // Show email verification modal immediately
    try {
      window.showEmailVerificationModal(email);
      console.log('Verification modal should now be visible');
    } catch (error) {
      console.error('Error showing verification modal:', error);
      alert('Registracija uspešna, vendar se modal za potrditev ni prikazal. Poskusite znova.');
    }
    
    // Show success notification
    if (window.utils && window.utils.showNotification) {
      window.utils.showNotification(
        'Registracija uspešna! Preverite e-pošto za potrditveno kodo.',
        'success',
        5000
      );
    } else {
      alert('Registracija uspešna! Preverite e-pošto za potrditveno kodo.');
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    loadingOverlay.style.display = 'none';
    alert('Napaka pri registraciji: ' + error.message);
    
    // Debug info
    console.log('Registration failed. Error details:', {
      error: error.message,
      stack: error.stack,
      email: email
    });
  }
};

// Helper function to create loading overlay
function createLoadingOverlay(id, message) {
  let loadingOverlay = document.getElementById(id);
  if (!loadingOverlay) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = id;
    loadingOverlay.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">${message}</div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Add styles for the loading overlay if not already added
    if (!document.getElementById('loadingOverlayStyles')) {
      const style = document.createElement('style');
      style.id = 'loadingOverlayStyles';
      style.textContent = `
        #${id}, #loginLoadingOverlay, #registrationLoadingOverlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }
        
        .loading-text {
          color: white;
          margin-top: 20px;
          font-size: 18px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  return loadingOverlay;
}

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
    
    // Detect current page to conditionally show buttons
    const currentPath = window.location.pathname;
    const isOnProfilePage = currentPath.includes('profile.html');
    const isOnCreateRidePage = currentPath.includes('create-ride.html');
    
    // Build buttons HTML based on current page
    let buttonsHTML = '';
    
    // Show "Back to Search" button if on profile or create-ride pages
    if (isOnProfilePage || isOnCreateRidePage) {
      const backToSearchHref = currentPath.includes('/pages/') ? '../index.html' : 'index.html';
      buttonsHTML += `<a href="${backToSearchHref}" class="btn btn-outline" data-translate="backToSearch">Nazaj na iskanje</a>`;
    }
    
    // Show create ride button only if not on create ride page
    if (!isOnCreateRidePage) {
      const createRideHref = currentPath.includes('/pages/') ? 'create-ride.html' : 'pages/create-ride.html';
      buttonsHTML += `<a href="${createRideHref}" class="btn btn-outline" data-translate="createRide">Vpisi svojo furo</a>`;
    }
    
    // Show profile button only if not on profile page
    if (!isOnProfilePage) {
      const profileHref = currentPath.includes('/pages/') ? 'profile.html' : 'pages/profile.html';
      buttonsHTML += `<a href="${profileHref}" class="btn btn-outline" data-translate="profile" data-user-email="${user.email}">Moj profil (${user.email})</a>`;
    }
    
    // Always show logout button
    buttonsHTML += `<a href="#" class="btn btn-primary" onclick="window.logoutUser()" data-translate="logout">Odjavi se</a>`;
    
    authButtons.innerHTML = buttonsHTML;
    
    // Retranslate the newly created buttons
    if (typeof updateUI === 'function') {
      updateUI();
    }
    
    // Then try to fetch additional user info
    usersCollection.doc(user.uid).get()
      .then(doc => {
        if (doc.exists && doc.data().firstName && doc.data().lastName) {
          const displayName = `${doc.data().firstName} ${doc.data().lastName}`;
          // Find profile button regardless of href (could be profile.html or pages/profile.html)
          const profileButton = authButtons.querySelector('a[data-translate="profile"]');
          if (profileButton) {
            // Get the current translated text and append the display name
            const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'sl';
            const profileText = window.t ? window.t('profile') : 'Moj profil';
            profileButton.textContent = `${profileText} (${displayName})`;
            // Store the display name for future language changes
            profileButton.setAttribute('data-user-name', displayName);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  } else {
    console.log('Showing logged-out UI');
    authButtons.innerHTML = `
      <a href="#" class="btn btn-outline" onclick="showLoginModal()" data-translate="login">Prijavi se</a>
      <a href="#" class="btn btn-primary" onclick="showRegisterModal()" data-translate="register">Registracija</a>
    `;
  }
  
  // Update translations after changing the HTML
  if (typeof window.updateUI === 'function') {
    window.updateUI();
  }
};

// Show email verification modal
function showEmailVerificationModal(email) {
  // Store email for persistence
  localStorage.setItem('pendingVerificationEmail', email);
  
  // Create modal HTML if it doesn't exist
  let modal = document.getElementById('emailVerificationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'emailVerificationModal';
    modal.className = 'modal non-dismissible';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 data-translate="emailVerificationTitle">Potrditev e-poštnega naslova</h2>
        </div>
        <div class="modal-body">
          <div class="verification-info">
            <p><span data-translate="verificationCodeSent">Poslali smo vam potrditveno kodo na</span> <strong id="verification-email">${email}</strong></p>
            <p data-translate="enterVerificationCode">Vnesite 6-mestno kodo spodaj za dokončanje registracije.</p>
          </div>
          
          <form id="verificationForm" onsubmit="handleVerificationSubmit(event)">
            <div class="form-group">
              <label for="verificationCode" data-translate="verificationCode">Potrditvena koda:</label>
              <input 
                type="text" 
                id="verificationCode" 
                name="verificationCode" 
                placeholder="123456" 
                maxlength="6" 
                pattern="[0-9]{6}"
                required
                class="verification-code-input"
              >
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary" id="verifyBtn" data-translate="verifyEmail">
                Potrdi e-pošto
              </button>
              <button type="button" class="btn btn-outline" onclick="handleResendVerificationCode()" data-translate="resendCode">
                Pošlji novo kodo
              </button>
            </div>
            
            <div class="email-change-section">
              <button type="button" class="btn btn-link" onclick="showChangeEmailForm()" data-translate="wrongEmail">
                Napačen e-poštni naslov?
              </button>
            </div>
          </form>
          
          <div class="verification-help">
            <p><small>
              <span data-translate="codeValid15Min">Koda je veljavna 15 minut.</span><br>
              <span data-translate="checkSpamFolder">Če niste prejeli e-pošte, preverite mapo "Nezaželena pošta" ali zahtevajte novo kodo.</span>
            </small></p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Prevent modal from closing when clicking outside
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        // Prevent closing - do nothing
        event.stopPropagation();
      }
    });
    
    // Add styles for the verification modal
    if (!document.getElementById('verificationModalStyles')) {
      const style = document.createElement('style');
      style.id = 'verificationModalStyles';
      style.textContent = `
        /* Non-dismissible modal styles */
        .modal.non-dismissible {
          pointer-events: auto;
        }
        
        .modal.non-dismissible .modal-content {
          position: relative;
          margin: 20px;
        }
        
        .modal.non-dismissible .modal-header {
          padding: 25px 30px 20px 30px;
        }
        
        .modal.non-dismissible .modal-body {
          padding: 0 30px 30px 30px;
        }
        
        .modal.non-dismissible .modal-header h2 {
          margin: 0;
          color: var(--primary-color);
          text-align: center;
        }
        
        .verification-code-input {
          font-size: 24px;
          text-align: center;
          letter-spacing: 8px;
          font-weight: bold;
          border: 2px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          width: 200px;
          margin: 0 auto;
          display: block;
        }
        
        .verification-code-input:focus {
          border-color: var(--primary-color);
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .verification-info {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        
        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 30px 0;
        }
        
        .email-change-section {
          text-align: center;
          margin: 20px 0;
        }
        
        .btn-link {
          background: none;
          border: none;
          color: var(--primary-color);
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          padding: 5px;
        }
        
        .btn-link:hover {
          color: var(--secondary-color);
        }
        
        .verification-help {
          text-align: center;
          margin-top: 20px;
          color: #666;
        }
        
        .verification-help small {
          line-height: 1.5;
        }
        
        .change-email-form {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        
        .change-email-form input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin: 10px 0;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Update email in modal
  const emailElement = modal.querySelector('strong');
  if (emailElement) {
    emailElement.textContent = email;
  }
  
  // Clear verification code input
  const codeInput = modal.querySelector('#verificationCode');
  if (codeInput) {
    codeInput.value = '';
    codeInput.focus();
  }
  
  // Show modal
  modal.style.display = 'flex';
  
  // Update translations for the modal content
  if (typeof window.updateUI === 'function') {
    window.updateUI();
  }
};

// Close email verification modal (only when verification is complete)
function closeEmailVerificationModal() {
  const modal = document.getElementById('emailVerificationModal');
  if (modal) {
    modal.style.display = 'none';
    // Clear the pending verification email
    localStorage.removeItem('pendingVerificationEmail');
  }
};

// Handle verification form submission
async function handleVerificationSubmit(event) {
  event.preventDefault();
  
  const codeInput = document.getElementById('verificationCode');
  const verifyBtn = document.getElementById('verifyBtn');
  const verificationCode = codeInput.value.trim();
  
  if (!verificationCode || verificationCode.length !== 6) {
    window.utils.showNotification('Vnesite 6-mestno potrditveno kodo.', 'error');
    return;
  }
  
  // Show loading state
  verifyBtn.disabled = true;
  verifyBtn.textContent = 'Preverjam...';
  
  try {
    // Verify the email
    await window.verifyEmail(null, verificationCode);
    
    // Hide modal
    window.closeEmailVerificationModal();
    
    // Update UI to show user is logged in
    window.updateAuthUI();
    
    // Show success message
    window.utils.showNotification(
      t('emailVerified'),
      'success',
      5000
    );
    
  } catch (error) {
    console.error('Verification error:', error);
    window.utils.showNotification(error.message, 'error');
  } finally {
    // Reset button state
    verifyBtn.disabled = false;
    verifyBtn.textContent = 'Potrdi e-pošto';
  }
};

// Handle resend verification code
async function handleResendVerificationCode() {
  try {
    await window.resendVerificationCode();
    if (window.utils && window.utils.showNotification) {
      window.utils.showNotification(
        'Nova potrditvena koda je bila poslana na vaš e-poštni naslov.',
        'success'
      );
    } else {
      alert('Nova potrditvena koda je bila poslana na vaš e-poštni naslov.');
    }
  } catch (error) {
    console.error('Resend error:', error);
    if (window.utils && window.utils.showNotification) {
      window.utils.showNotification(error.message, 'error');
    } else {
      alert('Napaka: ' + error.message);
    }
  }
};

// Show change email form
function showChangeEmailForm() {
  const modal = document.getElementById('emailVerificationModal');
  if (!modal) return;
  
  const modalBody = modal.querySelector('.modal-body');
  if (!modalBody) return;
  
  // Create change email form
  const changeEmailForm = document.createElement('div');
  changeEmailForm.className = 'change-email-form';
  changeEmailForm.innerHTML = `
    <h4 data-translate="changeEmailTitle">Sprememba e-poštnega naslova</h4>
    <p data-translate="enterNewEmail">Vnesite nov e-poštni naslov za prejemanje potrditvene kode:</p>
    <input type="email" id="newEmail" placeholder="nov@email.com" required>
    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
      <button type="button" class="btn btn-primary" onclick="updateEmailAddress()" data-translate="confirmChange">Potrdi spremembo</button>
      <button type="button" class="btn btn-outline" onclick="hideChangeEmailForm()" data-translate="cancel">Prekliči</button>
    </div>
  `;
  
  // Hide the verification form and show change email form
  const verificationForm = modal.querySelector('#verificationForm');
  if (verificationForm) {
    verificationForm.style.display = 'none';
  }
  
  modalBody.appendChild(changeEmailForm);
  
  // Update translations for the change email form
  if (typeof window.updateUI === 'function') {
    window.updateUI();
  }
}

// Hide change email form
function hideChangeEmailForm() {
  const modal = document.getElementById('emailVerificationModal');
  if (!modal) return;
  
  const changeEmailForm = modal.querySelector('.change-email-form');
  if (changeEmailForm) {
    changeEmailForm.remove();
  }
  
  const verificationForm = modal.querySelector('#verificationForm');
  if (verificationForm) {
    verificationForm.style.display = 'block';
  }
}

// Update email address
async function updateEmailAddress() {
  const newEmailInput = document.getElementById('newEmail');
  if (!newEmailInput) return;
  
  const newEmail = newEmailInput.value.trim();
  if (!newEmail) {
    alert('Vnesite veljaven e-poštni naslov.');
    return;
  }
  
  try {
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error('Uporabnik ni prijavljen');
    }
    
    // Update email in Firebase Auth
    await user.updateEmail(newEmail);
    
    // Update email in Firestore
    await firebase.firestore().collection('users').doc(user.uid).update({
      email: newEmail
    });
    
    // Generate new verification code
    const verificationCode = generateVerificationCode();
    
    // Update verification code in Firestore
    await firebase.firestore().collection('users').doc(user.uid).update({
      verificationCode: verificationCode,
      verificationCodeExpiry: firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 15 * 60 * 1000)),
      emailVerified: false
    });
    
    // Send verification email to new address
    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    await sendVerificationEmail(newEmail, userData.firstName, verificationCode);
    
    // Update modal with new email
    const emailDisplay = document.getElementById('verification-email');
    if (emailDisplay) {
      emailDisplay.textContent = newEmail;
    }
    
    // Update localStorage
    localStorage.setItem('pendingVerificationEmail', newEmail);
    
    // Hide change email form
    hideChangeEmailForm();
    
    alert('E-poštni naslov je bil uspešno posodobljen. Nova potrditvena koda je bila poslana.');
    
  } catch (error) {
    console.error('Error updating email:', error);
    alert('Napaka pri posodabljanju e-poštnega naslova: ' + error.message);
  }
}

// Check for pending verification on page load
function checkPendingVerification() {
  const pendingEmail = localStorage.getItem('pendingVerificationEmail');
  const currentUser = firebase.auth().currentUser;
  
  if (pendingEmail && currentUser) {
    // Check if user still needs verification
    firebase.firestore().collection('users').doc(currentUser.uid).get()
      .then(doc => {
        if (doc.exists && !doc.data().emailVerified) {
          console.log('User needs email verification, showing modal');
          showEmailVerificationModal(pendingEmail);
        }
      })
      .catch(error => {
        console.error('Error checking verification status:', error);
      });
  }
}

// Make functions globally available
window.showChangeEmailForm = showChangeEmailForm;
window.hideChangeEmailForm = hideChangeEmailForm;
window.updateEmailAddress = updateEmailAddress;

// Debug function to test email verification
window.testEmailVerification = function() {
  console.log('Testing email verification...');
  
  // Create a test user data
  const testEmail = 'test@example.com';
  const testFirstName = 'Test';
  
  // Show verification modal
  window.showEmailVerificationModal(testEmail);
  
  console.log('Verification modal should be visible now');
};

// Debug function to check if functions are available
window.debugAuthFunctions = function() {
  console.log('Auth functions debug:');
  console.log('- registerUser:', typeof window.registerUser);
  console.log('- showEmailVerificationModal:', typeof window.showEmailVerificationModal);
  console.log('- verifyEmail:', typeof window.verifyEmail);
  console.log('- resendVerificationCode:', typeof window.resendVerificationCode);
  console.log('- utils:', typeof window.utils);
  console.log('- utils.showNotification:', window.utils ? typeof window.utils.showNotification : 'utils not available');
  
  // Check localStorage for last verification email
  const lastEmail = localStorage.getItem('lastVerificationEmail');
  if (lastEmail) {
    console.log('Last verification email data:', JSON.parse(lastEmail));
  } else {
    console.log('No verification email data in localStorage');
  }
};

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Auth.js loaded and DOM is ready');
  
  // Force UI update when page loads
  window.updateAuthUI();
  
  // Check for pending email verification after auth state is determined
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Small delay to ensure everything is loaded
      setTimeout(() => {
        checkPendingVerification();
      }, 1000);
    }
  });
  
  // Add debug functions to window for easy testing
  window.debugAuthFunctions();
});

// Make functions globally available
window.showEmailVerificationModal = showEmailVerificationModal;
window.closeEmailVerificationModal = closeEmailVerificationModal;
window.handleVerificationSubmit = handleVerificationSubmit;
window.handleResendVerificationCode = handleResendVerificationCode;

// Test function to verify everything is working
window.testEmailVerificationSetup = function() {
  console.log('Testing email verification setup...');
  console.log('Functions available:');
  console.log('- showEmailVerificationModal:', typeof window.showEmailVerificationModal);
  console.log('- closeEmailVerificationModal:', typeof window.closeEmailVerificationModal);
  console.log('- handleVerificationSubmit:', typeof window.handleVerificationSubmit);
  console.log('- handleResendVerificationCode:', typeof window.handleResendVerificationCode);
  console.log('- verifyEmail:', typeof window.verifyEmail);
  console.log('- resendVerificationCode:', typeof window.resendVerificationCode);
  
  // Test showing modal
  try {
    window.showEmailVerificationModal('test@example.com');
    console.log('✅ Email verification modal test successful!');
  } catch (error) {
    console.error('❌ Email verification modal test failed:', error);
  }
};