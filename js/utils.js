/**
 * Utility functions for FURA website
 * Common DOM operations and helper functions
 */

// DOM utility functions
window.utils = {
  // Get results table elements
  getResultsElements() {
    return {
      table: document.querySelector('.results-table tbody'),
      count: document.querySelector('.results-count')
    };
  },

  // Get search form elements
  getSearchElements() {
    return {
      fromCountry: document.querySelector('#fromCountry'),
      toCountry: document.querySelector('#toCountry'),
      fromCity: document.querySelector('#fromCity'),
      toCity: document.querySelector('#toCity'),
      dateTimePicker: document.getElementById('dateTimePicker'),
      activeTab: document.querySelector('.tab-btn.active'),
      advancedFilters: document.getElementById('advancedFilters'),
      vehicleTypeFilter: document.getElementById('vehicleTypeFilter'),
      vehicleSizeFilter: document.getElementById('vehicleSizeFilter'),
      refrigeratedCheckbox: document.getElementById('refrigerated')
    };
  },

  // Show loading state in results table
  showResultsLoading(message = null) {
    if (!message) {
      message = window.t ? window.t('searchingRides') : 'Iskanje prevozov...';
    }
    const elements = this.getResultsElements();
    if (elements.table) {
      elements.table.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 20px;">
            ${message}
          </td>
        </tr>
      `;
    }
  },

  // Show error message in results table
  showResultsError(message) {
    const elements = this.getResultsElements();
    if (elements.table) {
      elements.table.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 20px; color: red;">
            ${message}
          </td>
        </tr>
      `;
    }
  },

  // Show no results message
  showNoResults(message = 'Ni najdenih prevozov z izbranimi filtri.') {
    const elements = this.getResultsElements();
    if (elements.table) {
      elements.table.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 20px;">
            ${message}
          </td>
        </tr>
      `;
    }
    
    if (elements.count) {
      elements.count.textContent = 'Prikazujem 0 prevozov';
    }
  },

  // Update results count
  updateResultsCount(count) {
    const elements = this.getResultsElements();
    if (elements.count) {
      elements.count.textContent = `Prikazujem ${count} prevozov`;
    }
  },

  // Scroll to results section
  scrollToResults() {
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  },

  // Create loading overlay
  createLoadingOverlay(id, message) {
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
          #${id} {
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
  },

  // Hide loading overlay
  hideLoadingOverlay(id) {
    const loadingOverlay = document.getElementById(id);
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  },

  // Format price for display
  formatPrice(priceInfo) {
    if (!priceInfo) return 'Besplatno';
    
    switch(priceInfo.type) {
      case 'free':
        return 'Besplatno';
      case 'negotiable':
        return 'Po dogovoru';
      case 'fixed':
        if (priceInfo.amount && priceInfo.currency) {
          const amount = parseFloat(priceInfo.amount).toFixed(2);
          
          switch(priceInfo.currency) {
            case 'EUR':
              return `${amount} €`;
            case 'BAM':
              return `${amount} KM`;
            case 'RSD':
              return `${amount} RSD`;
            case 'HRK':
              return `${amount} HRK`;
            case 'MKD':
              return `${amount} MKD`;
            case 'ALL':
              return `${amount} ALL`;
            default:
              return `${amount} ${priceInfo.currency}`;
          }
        } else {
          return 'Fiksna cena';
        }
      default:
        return 'Besplatno';
    }
  },

  // Parse search date and time
  parseSearchDateTime(searchDateText) {
    if (!searchDateText) return null;
    
    let date, time;
    
    if (searchDateText.includes(' ob ')) {
      const parts = searchDateText.split(' ob ');
      const dateParts = parts[0].split('.');
      
      if (dateParts.length !== 3) return null;
      
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      
      date = `${year}-${month}-${day}`;
      time = parts[1];
    } else if (searchDateText.includes(' ')) {
      const parts = searchDateText.split(' ');
      const dateParts = parts[0].split('.');
      
      if (dateParts.length !== 3) {
        const slashParts = parts[0].split('/');
        if (slashParts.length === 3) {
          const day = slashParts[0].padStart(2, '0');
          const month = slashParts[1].padStart(2, '0');
          const year = slashParts[2];
          
          date = `${year}-${month}-${day}`;
          time = parts[1];
        } else {
          return null;
        }
      } else {
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        
        date = `${year}-${month}-${day}`;
        time = parts[1];
      }
    } else {
      let dateParts;
      
      if (searchDateText.includes('.')) {
        dateParts = searchDateText.split('.');
      } else if (searchDateText.includes('/')) {
        dateParts = searchDateText.split('/');
      } else {
        return null;
      }
      
      if (dateParts.length !== 3) return null;
      
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      
      date = `${year}-${month}-${day}`;
      time = null;
    }
    
    return { date, time };
  },

  // Convert time to minutes for comparison
  convertTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    
    const timeParts = timeStr.split(':');
    if (timeParts.length !== 2) return 0;
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    
    return hours * 60 + minutes;
  },

  // Debounce function for search input
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Rate limiting for password reset emails - 1 attempt per day
  async checkPasswordResetRateLimit(email) {
    if (!email || !firebase) {
      return { allowed: false, message: 'Invalid email address.' };
    }
    
    try {
      const emailLower = email.toLowerCase().trim();
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
      
      // Get all attempts for this email in the last 24 hours
      const attemptsRef = firebase.firestore().collection('passwordResetAttempts');
      const recentAttempts = await attemptsRef
        .where('email', '==', emailLower)
        .where('timestamp', '>', firebase.firestore.Timestamp.fromDate(oneDayAgo))
        .get();
      
      // Check if there's already an attempt today
      if (!recentAttempts.empty) {
        // Find the most recent attempt
        let lastAttemptTime = null;
        recentAttempts.docs.forEach(doc => {
          const timestamp = doc.data().timestamp.toDate();
          if (!lastAttemptTime || timestamp > lastAttemptTime) {
            lastAttemptTime = timestamp;
          }
        });
        
        const nextAllowedTime = new Date(lastAttemptTime.getTime() + 24 * 60 * 60 * 1000);
        const now = new Date();
        
        if (now < nextAllowedTime) {
          const hoursRemaining = Math.ceil((nextAllowedTime - now) / (60 * 60 * 1000));
          const minutesRemaining = Math.ceil((nextAllowedTime - now) / (60 * 1000));
          
          const baseMessage = window.t ? 
            window.t('passwordResetRateLimitExceeded') : 
            'Geslo lahko ponastavite le enkrat dnevno.';
          
          let timeMessage = '';
          if (hoursRemaining >= 24) {
            const daysRemaining = Math.floor(hoursRemaining / 24);
            timeMessage = `Poskusite znova čez ${daysRemaining} ${daysRemaining === 1 ? 'dan' : 'dni'}.`;
          } else if (hoursRemaining >= 1) {
            timeMessage = `Poskusite znova čez ${hoursRemaining} ${hoursRemaining === 1 ? 'uro' : 'ur'}.`;
          } else {
            timeMessage = `Poskusite znova čez ${minutesRemaining} ${minutesRemaining === 1 ? 'minuto' : 'minut'}.`;
          }
          
          return {
            allowed: false,
            message: `${baseMessage} ${timeMessage}`,
            hoursRemaining: hoursRemaining,
            minutesRemaining: minutesRemaining
          };
        }
      }
      
      // Record this attempt
      await attemptsRef.add({
        email: emailLower,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        ip: null // Could add IP tracking if needed
      });
      
      // Clean up old attempts (older than 7 days) - do this asynchronously
      this.cleanupOldPasswordResetAttempts();
      
      return { allowed: true };
    } catch (error) {
      console.error('Error checking password reset rate limit:', error);
      // On error, allow the request but log it
      return { allowed: true, error: true };
    }
  },
  
  // Clean up old password reset attempts (older than 7 days)
  async cleanupOldPasswordResetAttempts() {
    try {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const attemptsRef = firebase.firestore().collection('passwordResetAttempts');
      
      const oldAttempts = await attemptsRef
        .where('timestamp', '<', firebase.firestore.Timestamp.fromDate(sevenDaysAgo))
        .limit(100) // Process in batches
        .get();
      
      if (!oldAttempts.empty) {
        const batch = firebase.firestore().batch();
        oldAttempts.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    } catch (error) {
      console.error('Error cleaning up old password reset attempts:', error);
    }
  },
  
  // Send password reset email with rate limiting
  async sendPasswordResetEmailWithRateLimit(email) {
    // Check rate limit first
    const rateLimitCheck = await this.checkPasswordResetRateLimit(email);
    
    if (!rateLimitCheck.allowed) {
      throw new Error(rateLimitCheck.message);
    }
    
    // Send the email
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  },

  // Show notification message at bottom of screen
  showNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => {
      notif.classList.add('hide');
      setTimeout(() => notif.remove(), 400);
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 50);
    
    // Auto hide after duration
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.remove();
        }
      }, 400);
    }, duration);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.remove();
        }
      }, 400);
    });
    
    return notification;
  }
};
