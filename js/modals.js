/**
 * Modal window handling for FURA website
 */

// Show a modal by ID
window.showModal = function(modalId) {
  console.log('Opening modal with ID:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
    console.log('Modal opened successfully');
  } else {
    console.error('Modal not found with ID:', modalId);
  }
};

// Close a modal by ID - using reliable direct manipulation
window.closeModal = function(modalId) {
  console.log('Closing modal with ID:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    console.log('Modal element found, setting display to none');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  } else {
    console.error('Modal element not found with ID:', modalId);
  }
};

// Show login modal
window.showLoginModal = function() {
  // Close register modal if open
  window.closeModal('registerModal');
  window.showModal('loginModal');
};

// Show register modal
window.showRegisterModal = function() {
  // Close login modal if open
  window.closeModal('loginModal');
  window.showModal('registerModal');
};

// Show login required message
// Function to show login required message
function showLoginRequiredMessage() {
  // Create a toast message or notification
  const loginMessage = document.createElement('div');
  loginMessage.className = 'login-message';
  loginMessage.innerHTML = `
      <div class="login-message-content">
          Za ogled podrobnosti se morate prijaviti.
          <span class="close-message">✕</span>
      </div>
  `;
  
  document.body.appendChild(loginMessage);
  
  // Add style for message
  const style = document.createElement('style');
  style.textContent = `
      .login-message {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--primary-color);
          color: white;
          padding: 12px 20px;
          border-radius: var(--border-radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 1000;
          animation: slideUp 0.3s ease-out;
      }
      
      .login-message-content {
          display: flex;
          align-items: center;
          gap: 15px;
      }
      
      .close-message {
          cursor: pointer;
          font-weight: bold;
      }
      
      @keyframes slideUp {
          from {
              opacity: 0;
              transform: translate(-50%, 20px);
          }
          to {
              opacity: 1;
              transform: translate(-50%, 0);
          }
      }
      
      @keyframes fadeOut {
          from {
              opacity: 1;
          }
          to {
              opacity: 0;
          }
      }
  `;
  
  document.head.appendChild(style);
  
  // Add event listener to close button
  const closeBtn = loginMessage.querySelector('.close-message');
  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          removeLoginMessage(loginMessage);
      });
  }
  
  // Automatically remove after 5 seconds
  setTimeout(() => {
      removeLoginMessage(loginMessage);
  }, 5000);
  
  // Helper function to remove message with animation
  function removeLoginMessage(messageElement) {
      if (document.body.contains(messageElement)) {
          // Add fade out animation
          messageElement.style.animation = 'fadeOut 0.5s ease-out forwards';
          
          // Remove from DOM after animation completes
          setTimeout(() => {
              if (document.body.contains(messageElement)) {
                  document.body.removeChild(messageElement);
              }
          }, 500);
      }
  }
}

// Show ride details modal - updated to use Firebase auth directly

window.showRideDetails = async function(rideId) {
  console.log('Showing details for ride:', rideId);
  
  // Check directly with Firebase if user is logged in
  const currentUser = firebase.auth().currentUser;
  console.log('Current user when viewing ride details:', currentUser);
  
  if (!currentUser) {
      console.log('User not logged in, showing login modal');
      window.showLoginModal();
      window.showLoginRequiredMessage();
      return;
  }
  
  try {
      // Get ride details from Firestore
      const rideDoc = await firebase.firestore().collection('rides').doc(rideId).get();
      
      if (!rideDoc.exists) {
          console.error('Ride not found:', rideId);
          alert('Napaka pri nalaganju podatkov o prevozu.');
          return;
      }
      
      const ride = rideDoc.data();
      ride.id = rideId; // Add ID to the ride object
      
      console.log('Loading ride details:', ride);
      
      // Populate modal with ride details
      const modal = document.getElementById('rideDetailsModal');
      
      if (!modal) {
          console.error('Ride details modal not found');
          return;
      }
      
      // Get all detail rows
      const detailRows = modal.querySelectorAll('.detail-row');
      
      if (!detailRows || detailRows.length < 7) {
          console.error('Detail rows not found or insufficient:', detailRows?.length);
          alert('Napaka pri prikazu podrobnosti prevozu.');
          return;
      }
      
      // First row: Ride type
      const typeLabel = detailRows[0].querySelector('.detail-label');
      const typeValue = detailRows[0].querySelector('.detail-value');
      
      if (typeLabel && typeValue) {
          typeLabel.textContent = 'Vrsta prevoza:';
          typeValue.textContent = ride.type === 'offering' ? 'Nudim prevoz' : 'Iščem prevoz';
      }
      
      // Second row: Departure
      const departureLabel = detailRows[1].querySelector('.detail-label');
      const departureValue = detailRows[1].querySelector('.detail-value');
      
      if (departureLabel && departureValue) {
          departureLabel.textContent = 'Odhod:';
          departureValue.textContent = `${ride.fromCity || 'N/A'}, ${ride.fromCountry || 'N/A'}`;
      }
      
      // Third row: Destination
      const destinationLabel = detailRows[2].querySelector('.detail-label');
      const destinationValue = detailRows[2].querySelector('.detail-value');
      
      if (destinationLabel && destinationValue) {
          destinationLabel.textContent = 'Destinacija:';
          destinationValue.textContent = `${ride.toCity || 'N/A'}, ${ride.toCountry || 'N/A'}`;
      }
      
      // Fourth row: Date and time
      const dateLabel = detailRows[3].querySelector('.detail-label');
      const dateValue = detailRows[3].querySelector('.detail-value');
      
      if (dateLabel && dateValue) {
          dateLabel.textContent = 'Datum in ura:';
          
          let dateDisplay = ride.formattedDate || 'N/A';
          const timeDisplay = ride.formattedTime || ride.time || '';
          
          if (timeDisplay) {
              dateValue.textContent = `${dateDisplay} ob ${timeDisplay}`;
          } else {
              dateValue.textContent = dateDisplay;
          }
      }
      
      // Fifth row: Vehicle
      const vehicleLabel = detailRows[4].querySelector('.detail-label');
      const vehicleValue = detailRows[4].querySelector('.detail-value');
      
      if (vehicleLabel && vehicleValue) {
          vehicleLabel.textContent = 'Vozilo:';
          
          if (ride.vehicleDimensions) {
              const dimensions = ride.vehicleDimensions;
              vehicleValue.textContent = `${ride.vehicleTypeDisplay || ride.vehicleType || 'N/A'} (${dimensions.length}m × ${dimensions.width}m × ${dimensions.height}m)`;
          } else {
              vehicleValue.textContent = ride.vehicleTypeDisplay || ride.vehicleType || 'N/A';
          }
      }
      
      // Sixth row: Refrigerator
      const refrigeratorLabel = detailRows[5].querySelector('.detail-label');
      const refrigeratorValue = detailRows[5].querySelector('.detail-value');
      
      if (refrigeratorLabel && refrigeratorValue) {
          refrigeratorLabel.textContent = 'Hladilnik:';
          refrigeratorValue.textContent = ride.hasRefrigerator ? 'Da' : 'Ne';
      }
      
      // Seventh row: Description
      const descriptionLabel = detailRows[6].querySelector('.detail-label');
      const descriptionValue = detailRows[6].querySelector('.detail-value');
      
      if (descriptionLabel && descriptionValue) {
          descriptionLabel.textContent = 'Opis:';
          descriptionValue.textContent = ride.description || 'Ni opisa';
      }
      
      // Eighth row (if exists): Contact info
      if (detailRows.length >= 8) {
          const contactLabel = detailRows[7].querySelector('.detail-label');
          const contactValue = detailRows[7].querySelector('.detail-value');
          
          if (contactLabel && contactValue) {
              contactLabel.textContent = 'Kontakt:';
              
              if (ride.contact) {
                  contactValue.innerHTML = `
                      <p>${ride.contact.name || 'Ni na voljo'}</p>
                      <p>${ride.contact.email || ride.userEmail || 'Ni na voljo'}</p>
                      <p>${ride.contact.phone || 'Ni na voljo'}</p>
                  `;
              } else {
                  contactValue.innerHTML = `
                      <p>Ni na voljo</p>
                      <p>${ride.userEmail || 'Ni na voljo'}</p>
                      <p>Ni na voljo</p>
                  `;
              }
          }
      }
      
      // Show the modal
      if (typeof window.showModal === 'function') {
          window.showModal('rideDetailsModal');
      } else {
          // Fallback if showModal function is not available
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
      }
  } catch (error) {
      console.error('Error showing ride details:', error);
      alert('Napaka pri prikazu podrobnosti: ' + error.message);
  }
};

// Login handler function - Completely revised to be more reliable
// Direct login handler
window.handleLoginSubmit = async function() {
  console.log('Login handler called');
  
  // Show loading overlay
  let loadingOverlay = document.getElementById('loadingOverlay');
  if (!loadingOverlay) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Prijava v teku...</div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Add styles for the loading overlay if not already added
    if (!document.getElementById('loadingOverlayStyles')) {
      const style = document.createElement('style');
      style.id = 'loadingOverlayStyles';
      style.textContent = `
        #loadingOverlay {
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
  
  // Show loading overlay
  loadingOverlay.style.display = 'flex';
  
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  
  if (!emailInput || !passwordInput) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    console.error('Login form elements not found');
    alert('Error: Login form not available. Please refresh the page.');
    return;
  }
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (!email || !password) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    alert('Vnesite e-poštni naslov in geslo.');
    return;
  }
  
  try {
    console.log('Starting login with:', email);
    
    // Use Firebase auth directly
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('Firebase login successful:', user);
    
    // Clear form fields
    emailInput.value = '';
    passwordInput.value = '';
    
    // Close the modal immediately
    window.closeModal('loginModal');
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Show success message
    alert('Uspešna prijava!');
    
    // Update UI
    updateUIAfterLogin(user);
    
  } catch (error) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    console.error('Login error:', error);
    alert('Napaka pri prijavi: ' + error.message);
  }
};

// Register handler function - Completely revised to be more reliable
// Replace just the handleRegisterSubmit function in your modals.js file with this version:

// Direct registration handler
window.handleRegisterSubmit = async function() {
  console.log('Register handler called');
  
  // Create loading overlay if it doesn't exist
  let loadingOverlay = document.getElementById('loadingOverlay');
  if (!loadingOverlay) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Registracija v teku...</div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Add styles for the loading overlay
    const style = document.createElement('style');
    style.textContent = `
      #loadingOverlay {
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
  
  // Show loading overlay
  loadingOverlay.style.display = 'flex';
  
  // Get input elements by ID
  const firstNameInput = document.getElementById('registerFirstName');
  const lastNameInput = document.getElementById('registerLastName');
  const emailInput = document.getElementById('registerEmail');
  const usernameInput = document.getElementById('registerUsername');
  const passwordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('registerConfirmPassword');
  
  if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    console.error('Register form elements not found');
    alert('Error: Registration form not available. Please refresh the page.');
    return;
  }
  
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const username = usernameInput ? usernameInput.value.trim() : email;
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  
  console.log('Register data collected:', { email, firstName, lastName, username });
  
  // Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    alert('Izpolnite vsa obvezna polja.');
    return;
  }
  
  if (password !== confirmPassword) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    alert('Gesli se ne ujemata.');
    return;
  }
  
  try {
    console.log('Starting Firebase registration...');
    
    // Create user directly with Firebase Auth
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User created in Firebase Auth:', user.uid);
    
    // Save additional user data to Firestore
    await firebase.firestore().collection('users').doc(user.uid).set({
      email,
      firstName,
      lastName,
      username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('User data saved to Firestore');
    
    // Clear form fields
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    if (usernameInput) usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    
    // Close register modal
    window.closeModal('registerModal');
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Update UI
    updateUIAfterLogin(user);
    
    // Show success message
    alert('Uspešna registracija!');
    
  } catch (error) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    console.error('Registration error:', error);
    alert('Napaka pri registraciji: ' + error.message);
  }
};

// Common function to update UI after login/registration
function updateUIAfterLogin(user) {
  // Get the auth buttons container
  const authButtons = document.querySelector('.auth-buttons');
  
  if (!authButtons) {
    console.error('Auth buttons container not found');
    return;
  }
  
  console.log('Updating UI for logged in user:', user.email);
  
  // Update with logged-in UI
  authButtons.innerHTML = `
    <a href="pages/create-ride.html" class="btn btn-outline">Vpisi svojo furo</a>
    <a href="pages/profile.html" class="btn btn-outline">Moj profil (${user.email})</a>
    <a href="#" class="btn btn-primary" id="logoutButton">Odjavi se</a>
  `;
  
  // Add logout handler
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      handleLogout();
    });
  }
  
  // Fetch additional user data if needed
  firebase.firestore().collection('users').doc(user.uid).get()
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
}

// Handle logout
window.handleLogout = function() {
  firebase.auth().signOut()
    .then(() => {
      console.log('User signed out');
      
      // Reset UI to logged-out state
      const authButtons = document.querySelector('.auth-buttons');
      if (authButtons) {
        authButtons.innerHTML = `
          <a href="#" class="btn btn-outline" onclick="showLoginModal()">Prijavi se</a>
          <a href="#" class="btn btn-primary" onclick="showRegisterModal()">Registracija</a>
        `;
      }
      
      alert('Uspešno ste se odjavili.');
    })
    .catch(error => {
      console.error('Logout error:', error);
      alert('Napaka pri odjavi: ' + error.message);
    });
};

// Fallback for getRideById if not defined
if (!window.getRideById) {
  window.getRideById = function(id) {
    if (typeof getAllRides === 'function') {
      const allRides = getAllRides();
      return allRides.find(ride => ride.id === parseInt(id));
    }
    return null;
  };
}

// CRUCIAL: Set up ONE and ONLY ONE event listener set for the DOM content loaded event
document.addEventListener('DOMContentLoaded', function() {
  console.log('Modals.js: DOM content loaded event');
  
  // Clear any existing event listeners to prevent duplicates
  // For login button
  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    console.log('Login button found');
    const newLoginButton = loginButton.cloneNode(true);
    loginButton.parentNode.replaceChild(newLoginButton, loginButton);
    newLoginButton.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('Login button clicked');
      window.handleLoginSubmit();
    });
  }
  
  // For register button
  const registerButton = document.getElementById('registerButton');
  if (registerButton) {
    console.log('Register button found');
    const newRegisterButton = registerButton.cloneNode(true);
    registerButton.parentNode.replaceChild(newRegisterButton, registerButton);
    newRegisterButton.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('Register button clicked');
      window.handleRegisterSubmit();
    });
  }
  
  // Enable Enter key submission for login and register forms
  const loginInputs = document.querySelectorAll('#loginModal input');
  loginInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.handleLoginSubmit();
      }
    });
  });
  
  const registerInputs = document.querySelectorAll('#registerModal input');
  registerInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.handleRegisterSubmit();
      }
    });
  });
  
  // Check for logged in user on page load
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is already signed in:', user.email);
        updateUIAfterLogin(user);
      }
    });
  } else {
    console.error('Firebase not available when checking auth state');
  }
});