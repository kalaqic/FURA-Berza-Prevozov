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

// Close a modal by ID - with enhanced closing animation
window.closeModal = function(modalId) {
  console.log('Closing modal with ID:', modalId);
  
  // Prevent closing email verification modal unless verification is complete
  if (modalId === 'emailVerificationModal') {
    console.log('Attempted to close email verification modal - checking if verification is complete');
    const pendingEmail = localStorage.getItem('pendingVerificationEmail');
    if (pendingEmail) {
      console.log('Email verification still pending, preventing modal close');
      return; // Don't close the modal
    }
  }
  
  const modal = document.getElementById(modalId);
  if (modal) {
    console.log('Modal element found, starting closing animation');
    
    // Add closing class to trigger animations
    modal.classList.add('closing');
    
    // Wait for animations to complete before hiding modal
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('closing');
      document.body.style.overflow = 'auto'; // Re-enable scrolling
      console.log('Modal closed after animation');
    }, 400); // Match the backdrop fade-out duration
    
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
  utils.showNotification('Za ogled podrobnosti se morate prijaviti.', 'info');
}

// Show ride details modal - updated to use Firebase auth directly

// Update the showRideDetails function in modals.js

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
      utils.showNotification('Napaka pri nalaganju podatkov o prevozu.', 'error');
      return;
    }
    
    const ride = rideDoc.data();
    ride.id = rideId; // Add ID to the ride object
    
    console.log('Loading ride details:', ride);
    
    // Determine if this ride belongs to the current user
    const isMyRide = ride.createdBy === currentUser.uid;
    console.log('Is user\'s own ride:', isMyRide);
    
    // Populate modal with ride details
    const modal = document.getElementById('rideDetailsModal');
    
    if (!modal) {
      console.error('Ride details modal not found');
      return;
    }
    
    // Update modal title
    const modalTitle = modal.querySelector('.modal-title');
    if (modalTitle) {
      modalTitle.textContent = t('rideDetailsTitle');
    }
    
    // Get all detail rows
    const detailRows = modal.querySelectorAll('.detail-row');
    
    if (!detailRows || detailRows.length < 7) {
      console.error('Detail rows not found or insufficient:', detailRows?.length);
      utils.showNotification('Napaka pri prikazu podrobnosti prevozu.', 'error');
      return;
    }
    
    // Set ride details in all the rows...
    // First row: Ride type
    const typeLabel = detailRows[0].querySelector('.detail-label');
    const typeValue = detailRows[0].querySelector('.detail-value');
    
    if (typeLabel && typeValue) {
      typeLabel.textContent = t('rideTypeLabel') + ':';
      typeValue.textContent = translateRideType(ride.type);
    }
    
    // Second row: Departure
    const departureLabel = detailRows[1].querySelector('.detail-label');
    const departureValue = detailRows[1].querySelector('.detail-value');
    
    if (departureLabel && departureValue) {
      departureLabel.textContent = t('departure') + ':';
      departureValue.textContent = `${ride.fromCity || 'N/A'}, ${translateCountry(ride.fromCountry) || 'N/A'}`;
    }
    
    // Third row: Destination
    const destinationLabel = detailRows[2].querySelector('.detail-label');
    const destinationValue = detailRows[2].querySelector('.detail-value');
    
    if (destinationLabel && destinationValue) {
      destinationLabel.textContent = t('destination') + ':';
      destinationValue.textContent = `${ride.toCity || 'N/A'}, ${translateCountry(ride.toCountry) || 'N/A'}`;
    }
    
    // Fourth row: Date and time
    const dateLabel = detailRows[3].querySelector('.detail-label');
    const dateValue = detailRows[3].querySelector('.detail-value');
    
    if (dateLabel && dateValue) {
      dateLabel.textContent = t('dateAndTime') + ':';
      
      let dateDisplay = ride.formattedDate || 'N/A';
      const timeDisplay = ride.formattedTime || ride.time || '';
      
      if (timeDisplay) {
        dateValue.textContent = `${dateDisplay} ${t('at')} ${timeDisplay}`;
      } else {
        dateValue.textContent = `${dateDisplay} (${translateFlexibleTime()})`;
      }
    }
    
    // Fifth row: Vehicle
    const vehicleLabel = detailRows[4].querySelector('.detail-label');
    const vehicleValue = detailRows[4].querySelector('.detail-value');
    
    if (vehicleLabel && vehicleValue) {
      vehicleLabel.textContent = t('vehicleInfo') + ':';
      
      const translatedVehicleType = translateVehicleType(ride.vehicleTypeDisplay || ride.vehicleType || 'N/A');
      
      if (ride.vehicleDimensions) {
        const dimensions = ride.vehicleDimensions;
        vehicleValue.textContent = `${translatedVehicleType} (${dimensions.length}m × ${dimensions.width}m × ${dimensions.height}m)`;
      } else {
        vehicleValue.textContent = translatedVehicleType;
      }
    }
    
    // Sixth row: Refrigerator
    const refrigeratorLabel = detailRows[5].querySelector('.detail-label');
    const refrigeratorValue = detailRows[5].querySelector('.detail-value');
    
    if (refrigeratorLabel && refrigeratorValue) {
      refrigeratorLabel.textContent = t('refrigerator') + ':';
      refrigeratorValue.textContent = ride.hasRefrigerator ? t('yes') : t('no');
    }
    
    // Seventh row: Description
    const descriptionLabel = detailRows[6].querySelector('.detail-label');
    const descriptionValue = detailRows[6].querySelector('.detail-value');
    
    if (descriptionLabel && descriptionValue) {
      descriptionLabel.textContent = t('description') + ':';
      descriptionValue.textContent = ride.description || t('noDescription');
    }
    
    // Eighth row: Price (if exists)
    if (detailRows.length >= 8) {
      const priceLabel = detailRows[7].querySelector('.detail-label');
      const priceValue = detailRows[7].querySelector('.detail-value');
      
      if (priceLabel && priceValue) {
        priceLabel.textContent = t('price') + ':';
        
        if (typeof formatPrice === 'function') {
          priceValue.textContent = formatPrice(ride.price);
        } else {
          priceValue.textContent = ride.price?.type === 'free' ? t('free') : 
                                  ride.price?.type === 'negotiable' ? t('negotiable') : 
                                  ride.price?.amount ? `${ride.price.amount} ${ride.price.currency || '€'}` : t('noData');
        }
      }
    }
    
    // Ninth row: Contact info (if exists)
    if (detailRows.length >= 9) {
      const contactLabel = detailRows[8].querySelector('.detail-label');
      const contactValue = detailRows[8].querySelector('.detail-value');
      
      if (contactLabel && contactValue) {
        contactLabel.textContent = t('contact') + ':';
        
        if (ride.contact) {
          const email = ride.contact.email || ride.userEmail || t('notAvailable');
          const phone = ride.contact.phone || t('notAvailable');
          
          contactValue.innerHTML = `
            <p>${ride.contact.name || t('notAvailable')}</p>
            <p>${email !== t('notAvailable') ? `<a href="mailto:${email}" style="color: var(--primary-color); text-decoration: none;">${email}</a>` : email}</p>
            <p>${phone !== t('notAvailable') ? `<a href="tel:${phone}" style="color: var(--primary-color); text-decoration: none;">${phone}</a>` : phone}</p>
          `;
        } else {
          const email = ride.userEmail || t('notAvailable');
          
          contactValue.innerHTML = `
            <p>${t('notAvailable')}</p>
            <p>${email !== t('notAvailable') ? `<a href="mailto:${email}" style="color: var(--primary-color); text-decoration: none;">${email}</a>` : email}</p>
            <p>${t('notAvailable')}</p>
          `;
        }
      }
    }
    
    // Update the modal footer buttons based on ride ownership
    const modalFooter = modal.querySelector('.modal-footer');
    if (modalFooter) {
      // Clear existing buttons
      modalFooter.innerHTML = '';
      
      // Always add close button
      const closeButton = document.createElement('button');
      closeButton.className = 'btn btn-primary';
      closeButton.textContent = t('close');
      closeButton.onclick = function() {
        closeModal('rideDetailsModal');
      };
      modalFooter.appendChild(closeButton);
      
      if (isMyRide) {
        // Add edit button for user's own rides
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-outline';
        editButton.textContent = t('editRide');
        editButton.onclick = function() {
          window.location.href = `pages/edit-ride.html?id=${rideId}`;
        };
        modalFooter.appendChild(editButton);
        
        // Add delete button for user's own rides
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-accent';
        deleteButton.textContent = t('deleteRide');
        deleteButton.onclick = function() {
          if (confirm(t('confirmDeleteRide'))) {
            deleteRide(rideId);
          }
        };
        modalFooter.appendChild(deleteButton);
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
    utils.showNotification('Napaka pri prikazu podrobnosti: ' + error.message, 'error');
  }
};

// Function to delete a ride
async function deleteRide(rideId) {
  try {
    // Delete the ride document from Firestore
    await firebase.firestore().collection('rides').doc(rideId).delete();
    
    // Close the modal
    window.closeModal('rideDetailsModal');
    
    // Show success message
    utils.showNotification(t('rideDeleted'), 'success');
    
    // Reload rides if we're on the profile page
    if (window.location.pathname.includes('profile.html') && typeof loadUserRides === 'function') {
      loadUserRides(firebase.auth().currentUser.uid);
    } else {
      // Reload rides if we're on the home page
      if (typeof loadInitialResults === 'function') {
        loadInitialResults();
      }
    }
  } catch (error) {
    console.error('Error deleting ride:', error);
    utils.showNotification(t('errorDeletingRide') + ': ' + error.message, 'error');
  }
}

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
    utils.showNotification('Stran ni na voljo. Prosimo, osvežite stran.', 'error');
    return;
  }
  
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (!email || !password) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    utils.showNotification('Vnesite e-poštni naslov in geslo.', 'warning');
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
    utils.showNotification('Uspešna prijava!', 'success');
    
    // Update UI
    updateUIAfterLogin(user);
    
  } catch (error) {
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    console.error('Login error:', error);
    utils.showNotification('Napaka pri prijavi: ' + error.message, 'error');
  }
};

// Register handler function - Completely revised to be more reliable
// Replace just the handleRegisterSubmit function in your modals.js file with this version:

// Registration handler is now handled in auth.js
// Removed duplicate function to prevent conflicts

// Common function to update UI after login/registration
function updateUIAfterLogin(user) {
  // Get the auth buttons container
  const authButtons = document.querySelector('.auth-buttons');
  
  if (!authButtons) {
    console.error('Auth buttons container not found');
    return;
  }
  
  console.log('Updating UI for logged in user:', user.email);
  
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
  buttonsHTML += `<a href="#" class="btn btn-primary" id="logoutButton" data-translate="logout">Odjavi se</a>`;
  
  // Update with logged-in UI
  authButtons.innerHTML = buttonsHTML;
  
  // Retranslate the newly created buttons
  if (typeof updateUI === 'function') {
    updateUI();
  }
  
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
      
      utils.showNotification('Uspešno ste se odjavili.', 'success');
    })
    .catch(error => {
      console.error('Logout error:', error);
      utils.showNotification('Napaka pri odjavi: ' + error.message, 'error');
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
      // Call the registration handler from auth.js
      if (typeof window.handleRegisterSubmit === 'function') {
        window.handleRegisterSubmit();
      } else {
        console.error('Registration handler not found in auth.js');
        utils.showNotification('Stran ni na voljo. Prosimo, osvežite stran.', 'error');
      }
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
        // Call the registration handler from auth.js
        if (typeof window.handleRegisterSubmit === 'function') {
          window.handleRegisterSubmit();
        } else {
          console.error('Registration handler not found in auth.js');
          utils.showNotification('Stran ni na voljo. Prosimo, osvežite stran.', 'error');
        }
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