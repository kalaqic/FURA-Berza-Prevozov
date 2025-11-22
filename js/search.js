/**
 * Search-related functions for FURA website
 * Updated to work with Firestore
 */

// Main search function
async function performSearch() {
  try {
    console.log('Performing search');
    
    // Show loading state
    showSearchLoadingState();
    
    // Get search parameters
    const searchParams = getSearchParameters();
    console.log('Search parameters:', searchParams);
    
    // Get filtered rides from Firestore (with basic optimization)
    const allRides = await getOptimizedRidesFromFirebase(searchParams);
    console.log(`Retrieved ${allRides.length} rides from database`);
    
    // Debug: Show some details about retrieved rides
    if (allRides.length > 0) {
      console.log('First few rides:', allRides.slice(0, 3).map(ride => ({
        id: ride.id,
        from: `${ride.fromCity}, ${ride.fromCountry}`,
        to: `${ride.toCity}, ${ride.toCountry}`,
        type: ride.type
      })));
    } else {
      console.log('No rides retrieved from database at all');
    }
    
    // Process exact matches first
    const exactMatches = await processExactMatches(allRides, searchParams);
    
    console.log(`Found ${exactMatches.length} exact matches`);
    
    // Debug: Show which rides were filtered out
    if (allRides.length > 0 && exactMatches.length === 0) {
      console.log('DEBUG: No exact matches found. Checking why...');
      allRides.slice(0, 3).forEach((ride, index) => {
        console.log(`Ride ${index + 1}:`, {
          from: `${ride.fromCity}, ${ride.fromCountry}`,
          to: `${ride.toCity}, ${ride.toCountry}`,
          type: ride.type,
          searchingFor: `${searchParams.fromCity}, ${searchParams.fromCountry} → ${searchParams.toCity}, ${searchParams.toCountry}`,
          rideTypeFilter: searchParams.rideType
        });
      });
    }
    
    // If we have fewer than 4 results AND specific search criteria, search for nearby cities
    let nearbyMatches = [];
    const hasSearchCriteria = searchParams.fromCity && searchParams.toCity && 
                              searchParams.fromCountry && searchParams.toCountry;
    
    if (exactMatches.length < 4 && hasSearchCriteria) {
      nearbyMatches = await findNearbyMatches(allRides, searchParams, exactMatches);
      console.log(`Found ${nearbyMatches.length} nearby matches`);
    }
    
    // Sort results
    const sortOption = getSortOption();
    const sortedExactMatches = sortResults(exactMatches, sortOption);
    const sortedNearbyMatches = sortResults(nearbyMatches, sortOption);
    
    // Update UI with results - use appropriate function based on whether we have search criteria
    if (hasSearchCriteria || nearbyMatches.length > 0) {
      updateSearchResultsWithNearby(sortedExactMatches, sortedNearbyMatches, searchParams);
    } else {
      // No specific search criteria, use standard results display
      updateSearchResults(sortedExactMatches);
    }
    
    // Scroll to results
    scrollToResults();
    
  } catch (error) {
    console.error('Error during search:', error);
    showErrorMessage(error.message);
  }
}

// Helper function to show loading state
function showSearchLoadingState() {
    const resultsTable = document.querySelector('.results-table tbody');
    if (resultsTable) {
      resultsTable.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 20px;">
            Iskanje prevozov...
          </td>
        </tr>
      `;
  }
    }
    
// Helper function to get search parameters
function getSearchParameters() {
    const activeTab = document.querySelector('.tab-btn.active');
    const rideType = activeTab ? activeTab.getAttribute('data-tab') : 'all';
    
    const fromCountryEl = document.querySelector('#fromCountry');
    const toCountryEl = document.querySelector('#toCountry');
    const fromCityEl = document.querySelector('#fromCity');
    const toCityEl = document.querySelector('#toCity');
    
    const fromCountry = fromCountryEl ? fromCountryEl.value : '';
    const toCountry = toCountryEl ? toCountryEl.value : '';
    const fromCity = fromCityEl ? fromCityEl.value : '';
    const toCity = toCityEl ? toCityEl.value : '';
    
  // Get date and time from the date picker button text
  let dateTime = null;
  const dateTimePickerButton = document.getElementById('dateTimePicker');
  if (dateTimePickerButton) {
    const textElement = dateTimePickerButton.querySelector('.date-text');
    const buttonText = textElement ? textElement.textContent.trim() : '';
    if (buttonText !== 'Datum in ura' && buttonText !== 'Datum') {
      dateTime = buttonText;
    }
  }
  
  // Get advanced search parameters (whether panel is visible or not)
  let vehicleType = '';
  let vehicleSize = '';
  let refrigerated = false;
  let maxDistance = 100;
  let timeTolerance = 2;
  
  const vehicleTypeSelect = document.getElementById('vehicleTypeFilter');
  if (vehicleTypeSelect) {
    vehicleType = vehicleTypeSelect.value;
    console.log('Vehicle type filter:', vehicleType);
  }
  
  const vehicleSizeSelect = document.getElementById('vehicleSizeFilter');
  if (vehicleSizeSelect) {
    vehicleSize = vehicleSizeSelect.value;
    console.log('Vehicle size filter:', vehicleSize);
  }
  
  const refrigeratedCheckbox = document.getElementById('refrigerated');
  if (refrigeratedCheckbox) {
    refrigerated = refrigeratedCheckbox.checked;
    console.log('Refrigerated filter:', refrigerated);
  }
  
  const maxDistanceSelect = document.getElementById('maxDistanceFilter');
  if (maxDistanceSelect) {
    maxDistance = parseInt(maxDistanceSelect.value) || 100;
    console.log('Max distance filter:', maxDistance);
  }
  
  const timeToleranceSelect = document.getElementById('timeToleranceFilter');
  if (timeToleranceSelect) {
    timeTolerance = parseInt(timeToleranceSelect.value) || 2;
    console.log('Time tolerance filter:', timeTolerance);
  }
  
  return {
    rideType,
    fromCountry,
    toCountry,
    fromCity,
    toCity,
    dateTime,
    vehicleType,
    vehicleSize,
    refrigerated,
    maxDistance,
    timeTolerance
  };
}

// Process exact matches
function processExactMatches(allRides, searchParams) {
      let exactResults = [...allRides];
      
      console.log('Starting with', exactResults.length, 'rides');
      console.log('Search params:', searchParams);
      
      // Debug: Show some example rides before filtering
      if (exactResults.length > 0) {
        console.log('Example rides before filtering:', exactResults.slice(0, 2).map(ride => ({
          from: `${ride.fromCity}, ${ride.fromCountry}`,
          to: `${ride.toCity}, ${ride.toCountry}`,
          type: ride.type
        })));
      }
      
      // Filter by ride type if not "all"
      if (searchParams.rideType !== 'all') {
        exactResults = exactResults.filter(ride => ride.type === searchParams.rideType);
        console.log('After ride type filter:', exactResults.length, 'rides');
      }
      
      // Filter by countries
      if (searchParams.fromCountry) {
        console.log('Filtering by from country:', searchParams.fromCountry);
        const beforeCount = exactResults.length;
        exactResults = exactResults.filter(ride => {
          const match = ride.fromCountry && ride.fromCountry.toLowerCase() === searchParams.fromCountry.toLowerCase();
          if (!match && beforeCount > 0) {
            console.log('Country mismatch - Ride from country:', ride.fromCountry, 'vs search:', searchParams.fromCountry);
          }
          return match;
        });
        console.log('After from country filter:', exactResults.length, 'rides');
      }
      
      if (searchParams.toCountry) {
        console.log('Filtering by to country:', searchParams.toCountry);
        const beforeCount = exactResults.length;
        exactResults = exactResults.filter(ride => {
          const match = ride.toCountry && ride.toCountry.toLowerCase() === searchParams.toCountry.toLowerCase();
          if (!match && beforeCount > 0) {
            console.log('Country mismatch - Ride to country:', ride.toCountry, 'vs search:', searchParams.toCountry);
          }
          return match;
        });
        console.log('After to country filter:', exactResults.length, 'rides');
      }
      
      // Filter by cities (exact match)
      if (searchParams.fromCity) {
        console.log('Filtering by from city:', searchParams.fromCity);
        const beforeCount = exactResults.length;
        exactResults = exactResults.filter(ride => {
          const match = ride.fromCity && ride.fromCity.toLowerCase() === searchParams.fromCity.toLowerCase();
          if (!match && beforeCount > 0) {
            console.log('City mismatch - Ride from city:', ride.fromCity, 'vs search:', searchParams.fromCity);
          }
          return match;
        });
        console.log('After from city filter:', exactResults.length, 'rides');
      }
      
      if (searchParams.toCity) {
        console.log('Filtering by to city:', searchParams.toCity);
        const beforeCount = exactResults.length;
        exactResults = exactResults.filter(ride => {
          const match = ride.toCity && ride.toCity.toLowerCase() === searchParams.toCity.toLowerCase();
          if (!match && beforeCount > 0) {
            console.log('City mismatch - Ride to city:', ride.toCity, 'vs search:', searchParams.toCity);
          }
          return match;
        });
        console.log('After to city filter:', exactResults.length, 'rides');
      }
  
  // Date filter
  if (searchParams.dateTime) {
    const dateInfo = parseSearchDateTime(searchParams.dateTime);
    if (dateInfo && dateInfo.date) {
      exactResults = exactResults.filter(ride => ride.date === dateInfo.date);
      console.log('After date filter:', exactResults.length, 'rides');
    }
  }
  
  // Vehicle type filter - improved to handle different vehicle type formats
  if (searchParams.vehicleType) {
    console.log('Filtering by vehicle type:', searchParams.vehicleType);
    exactResults = exactResults.filter(ride => {
      console.log('Ride vehicle type:', ride.vehicleType, 'vehicleTypeDisplay:', ride.vehicleTypeDisplay);
      return ride.vehicleType === searchParams.vehicleType || 
             (ride.vehicleTypeDisplay && ride.vehicleTypeDisplay.toLowerCase().includes(searchParams.vehicleType.toLowerCase()));
    });
    console.log('After vehicle type filter:', exactResults.length, 'rides');
  }
  
  // Vehicle size filter - need to check if rides have this field
  if (searchParams.vehicleSize) {
    console.log('Filtering by vehicle size:', searchParams.vehicleSize);
    exactResults = exactResults.filter(ride => {
      console.log('Ride vehicle size data:', ride.vehicleSize, ride.vehicleDimensions);
      // Check if ride has vehicleSize field, or derive from dimensions
      if (ride.vehicleSize) {
        return ride.vehicleSize === searchParams.vehicleSize;
      }
      // If no explicit size, try to derive from dimensions
      if (ride.vehicleDimensions) {
        const length = parseFloat(ride.vehicleDimensions.length) || 0;
        if (searchParams.vehicleSize === 'small' && length <= 3) return true;
        if (searchParams.vehicleSize === 'medium' && length > 3 && length <= 6) return true;
        if (searchParams.vehicleSize === 'large' && length > 6) return true;
      }
      return false;
    });
    console.log('After vehicle size filter:', exactResults.length, 'rides');
  }
  
  // Refrigerator filter
  if (searchParams.refrigerated) {
    console.log('Filtering by refrigerator: true');
    exactResults = exactResults.filter(ride => {
      console.log('Ride refrigerator:', ride.hasRefrigerator);
      return ride.hasRefrigerator === true;
    });
    console.log('After refrigerator filter:', exactResults.length, 'rides');
  }
  
  console.log('Final exact results:', exactResults.length, 'rides');
  return exactResults;
}

// Removed approximate matching functionality

// Removed duplicate matching functionality
    
// Get sort option
function getSortOption() {
    const sortSelect = document.querySelector('.results-sort select');
  return sortSelect ? sortSelect.value : 'date-asc';
}

// Update search results UI with both exact and nearby matches
function updateSearchResultsWithNearby(exactMatches, nearbyMatches, searchParams) {
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (!resultsTable || !resultsCount) {
    console.error('Results table or count element not found');
    return;
  }
  
  // Clear existing results
  resultsTable.innerHTML = '';
  
  const totalResults = exactMatches.length + nearbyMatches.length;
  
  // Update results count using existing formatResultsCount function
  if (exactMatches.length > 0 && nearbyMatches.length > 0) {
    resultsCount.textContent = window.formatResultsCount 
      ? window.formatResultsCount(totalResults, exactMatches.length, nearbyMatches.length)
      : `Prikazujem ${totalResults} prevozov (${exactMatches.length} točnih, ${nearbyMatches.length} bližnjih)`;
  } else if (totalResults > 0) {
    resultsCount.textContent = window.formatResultsCount 
      ? window.formatResultsCount(totalResults)
      : `Prikazujem ${totalResults} prevozov`;
  } else {
    resultsCount.textContent = window.formatResultsCount 
      ? window.formatResultsCount(0)
      : 'Prikazujem 0 prevozov';
  }
  
  // Show exact matches first
  if (exactMatches.length > 0) {
    exactMatches.forEach(ride => {
      addRideToTable(ride, resultsTable, false);
    });
  }
  
  // Show nearby matches if any
  if (nearbyMatches.length > 0) {
    // Add header for nearby results
    const headerRow = document.createElement('tr');
    headerRow.className = 'nearby-header-row';
    const nearbyHeaderText = window.translateText 
      ? window.translateText('nearbyResultsHeader', { 
          fromCity: searchParams.fromCity, 
          toCity: searchParams.toCity,
          count: nearbyMatches.length 
        })
      : `Prevoze v bližini (${nearbyMatches.length}) - od/do mest blizu ${searchParams.fromCity} ali ${searchParams.toCity}:`;
    
    headerRow.innerHTML = `
      <td colspan="6" style="text-align: center; padding: 15px; background-color: #f8f9fa; color: #495057; font-weight: bold; border-top: 2px solid #dee2e6;">
        ${nearbyHeaderText}
      </td>
    `;
    resultsTable.appendChild(headerRow);
    
    // Add nearby rides
    nearbyMatches.forEach(ride => {
      addRideToTable(ride, resultsTable, true);
    });
  }
  
  // If no results at all, show no results message
  if (totalResults === 0) {
    const noResultsText = window.translateText ? window.translateText('noResults') : 'Ni najdenih prevozov za to smer.';
    const suggestionText = window.translateText ? window.translateText('noResultsSuggestion') : 'Poskusite z drugačnimi filtri ali preverite kasneje.';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="6" style="text-align: center; padding: 30px;">
        <div style="color: #666; font-size: 16px;">
          <strong>${noResultsText}</strong><br>
          <span style="font-size: 14px; margin-top: 10px; display: block;">
            ${suggestionText}
          </span>
        </div>
      </td>
    `;
    resultsTable.appendChild(row);
  }
}

// Removed combined results functionality

// Add a ride to the results table (handles both exact and nearby rides)
function addRideToTable(ride, resultsTable, isNearby = false) {
  const tableRow = document.createElement('tr');
  
  // Add class based on ride type
  if (ride.type === 'offering') {
    tableRow.classList.add('offering-ride');
  } else {
    tableRow.classList.add('looking-ride');
  }
  
  // Add nearby class if applicable
  if (isNearby || ride.isNearby) {
    tableRow.classList.add('nearby-ride');
  }
  
  // Add click handler to show details
  tableRow.addEventListener('click', function() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      window.showRideDetails(ride.id);
    } else {
      window.showLoginModal();
      window.showLoginRequiredMessage();
    }
  });
  
  tableRow.style.cursor = 'pointer';
  
  // Set ride type text and class
  const typeText = translateRideType(ride.type);
  const typeClass = ride.type === 'offering' ? 'offering' : 'looking';
  
  // Format time with "Prilagodljivo" for rides without time
  const timeDisplay = ride.formattedTime || ride.displayTime || translateFlexibleTime();
  
  // Ensure we have all required fields
  const fromCity = ride.fromCity || 'N/A';
  const fromCountry = (ride.originalFromCountry || ride.fromCountry) ? translateCountry(ride.originalFromCountry || ride.fromCountry) : '';
  const toCity = ride.toCity || 'N/A';
  const toCountry = (ride.originalToCountry || ride.toCountry) ? translateCountry(ride.originalToCountry || ride.toCountry) : '';
  
  // Extract only date part for the date column
  let dateOnly = 'Ni datuma';
  if (ride.date) {
    dateOnly = formatDisplayDate(ride.date);
  } else if (ride.formattedDate) {
    dateOnly = ride.formattedDate.split(' ')[0] || ride.formattedDate;
  } else if (ride.displayDate) {
    dateOnly = ride.displayDate.split(' ')[0] || ride.displayDate;
  }
  
  const vehicleTypeDisplay = translateVehicleType(ride.originalVehicleTypeDisplay || ride.originalVehicleType || ride.vehicleTypeDisplay || ride.vehicleType) || 'N/A';
  
  // Prepare location text with distance badges for nearby rides
  let fromLocationText = `${fromCity}${fromCountry ? ', ' + fromCountry : ''}`;
  let toLocationText = `${toCity}${toCountry ? ', ' + toCountry : ''}`;
  
  if (isNearby || ride.isNearby) {
    const maxDistance = 200; // Same as in findNearbyMatches
    
    // Determine which distances to show based on match type
    let showFromDistance = false;
    let showToDistance = false;
    
    if (ride.nearbyType) {
      switch (ride.nearbyType) {
        case 'same_from':
          // Same from city, show distance to destination if within limit
          showToDistance = ride.toDistance !== undefined && ride.toDistance > 0 && ride.toDistance <= maxDistance;
          break;
        case 'same_to':
          // Same to city, show distance from origin if within limit
          showFromDistance = ride.fromDistance !== undefined && ride.fromDistance > 0 && ride.fromDistance <= maxDistance;
          break;
        case 'same_from_near_to':
          // Same from, nearby to - show to distance
          showToDistance = ride.toDistance !== undefined && ride.toDistance > 0;
          break;
        case 'near_from_same_to':
          // Nearby from, same to - show from distance
          showFromDistance = ride.fromDistance !== undefined && ride.fromDistance > 0;
          break;
        case 'both_nearby':
          // Both cities nearby - show both distances
          showFromDistance = ride.fromDistance !== undefined && ride.fromDistance > 0;
          showToDistance = ride.toDistance !== undefined && ride.toDistance > 0;
          break;
        case 'from_nearby':
          // Only from is nearby
          showFromDistance = ride.fromDistance !== undefined && ride.fromDistance > 0;
          break;
        case 'to_nearby':
          // Only to is nearby
          showToDistance = ride.toDistance !== undefined && ride.toDistance > 0;
          break;
        default:
          // Default behavior - show distances if within radius and not exact
          showFromDistance = ride.fromDistance !== undefined && ride.fromDistance <= maxDistance && ride.fromDistance > 0;
          showToDistance = ride.toDistance !== undefined && ride.toDistance <= maxDistance && ride.toDistance > 0;
      }
    } else {
      // Fallback for rides without nearbyType
      showFromDistance = ride.fromDistance !== undefined && ride.fromDistance <= maxDistance && ride.fromDistance > 0;
      showToDistance = ride.toDistance !== undefined && ride.toDistance <= maxDistance && ride.toDistance > 0;
    }
    
    // Debug logging
    console.log(`🎯 Displaying ride: ${ride.fromCity} → ${ride.toCity}, nearbyType: ${ride.nearbyType}`);
    console.log(`  fromDistance: ${ride.fromDistance}km, toDistance: ${ride.toDistance}km`);
    console.log(`  maxDistance limit: ${maxDistance}km`);
    console.log(`  showFromDistance: ${showFromDistance}, showToDistance: ${showToDistance}`);
    
    // Show from distance badge if applicable
    if (showFromDistance) {
      const fromTooltip = window.translateText 
        ? window.translateText('distanceTooltip', { 
            distance: Math.round(ride.fromDistance), 
            searchCity: ride.searchFromCity 
          })
        : `${Math.round(ride.fromDistance)}km od iskane lokacije ${ride.searchFromCity}`;
      
      fromLocationText += ` <span class="distance-badge" title="${fromTooltip}">${Math.round(ride.fromDistance)}km</span>`;
      console.log(`  Added FROM distance badge: ${Math.round(ride.fromDistance)}km`);
    }
    
    // Show to distance badge if applicable
    if (showToDistance) {
      const toTooltip = window.translateText 
        ? window.translateText('distanceTooltip', { 
            distance: Math.round(ride.toDistance), 
            searchCity: ride.searchToCity 
          })
        : `${Math.round(ride.toDistance)}km od iskane lokacije ${ride.searchToCity}`;
      
      toLocationText += ` <span class="distance-badge" title="${toTooltip}">${Math.round(ride.toDistance)}km</span>`;
      console.log(`  Added TO distance badge: ${Math.round(ride.toDistance)}km`);
    }
  }
  
  // Populate the row
  tableRow.innerHTML = `
    <td>${fromLocationText}</td>
    <td>${toLocationText}</td>
    <td>${dateOnly}</td>
    <td>${timeDisplay}</td>
    <td>${vehicleTypeDisplay}</td>
    <td><div class="ride-type-badge ${typeClass}">${typeText}</div></td>
  `;
  
  resultsTable.appendChild(tableRow);
  return tableRow;
}


// Helper function to get all rides from Firestore
async function getAllRidesFromFirestore() {
  try {
      const snapshot = await firebase.firestore().collection('rides').get();
      const rides = [];
      snapshot.forEach(doc => {
          rides.push({
              id: doc.id,
              ...doc.data()
          });
      });
      return rides;
  } catch (error) {
      console.error('Error getting all rides:', error);
      return [];
  }
}

// Helper function to search rides with specific criteria
async function searchRidesWithCriteria(fromCountry, fromCity, toCountry, toCity) {
  try {
      // Create a query for Firestore
      let query = firebase.firestore().collection('rides');
      
      // Apply filters
      if (fromCountry) {
          query = query.where('fromCountry', '==', fromCountry);
      }
      
      if (fromCity) {
          query = query.where('fromCity', '==', fromCity);
      }
      
      if (toCountry) {
          query = query.where('toCountry', '==', toCountry);
      }
      
      if (toCity) {
          query = query.where('toCity', '==', toCity);
      }
      
      // Execute query and get results
      const snapshot = await query.get();
      if (snapshot.empty) {
          return [];
      }
      
      // Convert to array of rides
      const rides = [];
      snapshot.forEach(doc => {
          rides.push({
              id: doc.id,
              ...doc.data()
          });
      });
      
      return rides;
  } catch (error) {
      console.error('Error searching rides with criteria:', error);
      return [];
  }
}

/**
* Funkcija za sortiranje rezultata pretrage prema odabranom kriterijumu
*/
function sortResults(results, sortOption) {
  // Clone the array to avoid modifying the original
  const sortedResults = [...results];
  
  console.log("Sorting by option:", sortOption);
  
  if (sortOption === 'date-desc') {
      // Oldest first (ascending order)
      console.log("Sorting from oldest to newest");
      sortedResults.sort((a, b) => {
          // First try to use createdAt timestamp if available
          if (a.createdAt && b.createdAt) {
              const timeA = a.createdAt.seconds ? a.createdAt.seconds * 1000 : 0;
              const timeB = b.createdAt.seconds ? b.createdAt.seconds * 1000 : 0;
              return timeA - timeB;
          }
          
          // Fall back to ride date
          const dateA = new Date(a.date + 'T' + (a.time || '00:00'));
          const dateB = new Date(b.date + 'T' + (b.time || '00:00'));
          return dateA - dateB;
      });
  } else {
      // Newest first (descending order) - this is 'date-asc' which is oddly named
      console.log("Sorting from newest to oldest");
      sortedResults.sort((a, b) => {
          // First try to use createdAt timestamp if available
          if (a.createdAt && b.createdAt) {
              const timeA = a.createdAt.seconds ? a.createdAt.seconds * 1000 : 0;
              const timeB = b.createdAt.seconds ? b.createdAt.seconds * 1000 : 0;
              return timeB - timeA;
          }
          
          // Fall back to ride date
          const dateA = new Date(a.date + 'T' + (a.time || '00:00'));
          const dateB = new Date(b.date + 'T' + (b.time || '00:00'));
          return dateB - dateA;
      });
  }
  
  return sortedResults;
}

// Inicijalizacija event listenera za sortiranje
function initSortingListeners() {
  // Dodajemo event listener za select za sortiranje
  const sortSelect = document.querySelector('.results-sort select');
  if (sortSelect) {
      console.log("Pronađen sort select element");
      
      // Ukloni postojeći event listener da izbegnemo duplikate
      const newSortSelect = sortSelect.cloneNode(true);
      sortSelect.parentNode.replaceChild(newSortSelect, sortSelect);
      
      newSortSelect.addEventListener('change', function() {
          console.log("Promenjena opcija sortiranja na:", this.value);
          // Ponovo izvrši pretragu sa novom opcijom sortiranja
          performSearch();
      });
  } else {
      console.log("Nije pronađen sort select element");
  }
}

// Initialize the search functionality when page loads
// Initialize the search functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing search functionality');
  initAdvancedSearch();
  
  // Add event listener to search button with validation
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
      searchBtn.addEventListener('click', function(event) {
        if (validateSearchCriteria()) {
          performSearch();
        } else {
          event.preventDefault();
          showSearchValidationMessage();
        }
      });
  }
  
  // Add validation listeners to form fields
  setupValidationListeners();
  
  // Make validation function globally available
  window.updateSearchButtonState = updateSearchButtonState;
  
  // Add event listeners to tabs for quick filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabType = this.getAttribute('data-tab');
          filterByType(tabType);
      });
  });
  
  // Add event listener to reset button
  const resetBtn = document.getElementById('resetFiltersBtn');
  if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
  }
  
  // Initialize sort listeners
  initSortingListeners();
  
  // Load all rides initially
  loadInitialResults();
  
  // Set up real-time updates
  setupRealTimeUpdates();
});

function scrollToResults() {
  const resultsSection = document.querySelector('.results-section');
  if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Load initial results when page loads
// Load initial results when page loads
async function loadInitialResults() {
  try {
      console.log('Loading initial rides from Firestore');
      
      // Set initial loading state
      const resultsTable = document.querySelector('.results-table tbody');
      if (resultsTable) {
          resultsTable.innerHTML = `
              <tr>
                  <td colspan="6" style="text-align: center; padding: 20px;">
                      Nalaganje prevozov...
                  </td>
              </tr>
          `;
      }
      
      // Get all rides from Firestore
      const ridesRef = firebase.firestore().collection('rides');
      const snapshot = await ridesRef.get();
      
      if (snapshot.empty) {
          console.log('No rides found in Firestore');
          if (resultsTable) {
              resultsTable.innerHTML = `
                  <tr>
                      <td colspan="6" style="text-align: center; padding: 20px;">
                          Ni najdenih prevozov.
                      </td>
                  </tr>
              `;
          }
          
          const resultsCount = document.querySelector('.results-count');
          if (resultsCount) {
              resultsCount.textContent = window.formatResultsCount ? window.formatResultsCount(0) : 'Prikazujem 0 prevozov';
          }
          return;
      }
      
      // Convert to array of rides
      const rides = [];
      snapshot.forEach(doc => {
          const data = doc.data();
          rides.push({
              id: doc.id,
              ...data
          });
      });
      
      console.log(`Found ${rides.length} rides in Firestore`);
      
      // Always sort rides by newest first on initial load (date-asc is actually newest first)
      const sortedRides = sortResults(rides, 'date-asc');
      
      // Update UI with rides
      updateSearchResults(sortedRides);
      
      // Update the sort select to match the actual sort order
      const sortSelect = document.querySelector('.results-sort select');
      if (sortSelect && sortSelect.value !== 'date-asc') {
          sortSelect.value = 'date-asc';
      }
  } catch (error) {
      console.error('Error loading initial rides:', error);
      const resultsTable = document.querySelector('.results-table tbody');
      if (resultsTable) {
          resultsTable.innerHTML = `
              <tr>
                  <td colspan="6" style="text-align: center; padding: 20px; color: red;">
                      Napaka pri nalaganju prevozov. ${error.message}
                  </td>
              </tr>
          `;
      }
  }
}

// Toggle advanced search visibility
function initAdvancedSearch() {
  const advancedSearchBtn = document.getElementById('advancedSearchBtn');
  const advancedFilters = document.getElementById('advancedFilters');
  
  if (advancedSearchBtn && advancedFilters) {
      advancedSearchBtn.addEventListener('click', function() {
          if (advancedFilters.style.display === 'block') {
              advancedFilters.style.display = 'none';
              advancedSearchBtn.classList.remove('open');
          } else {
              advancedFilters.style.display = 'block';
              advancedSearchBtn.classList.add('open');
          }
      });
  }
}

// Filter rides by type (all, looking, offering)
async function filterByType(type) {
  try {
      console.log(`Filtering rides by type: ${type}`);
      
      let ridesRef = firebase.firestore().collection('rides');
      
      // Apply filter based on type
      if (type !== 'all') {
          ridesRef = ridesRef.where('type', '==', type);
      }
      
      // Get filtered rides
      const snapshot = await ridesRef.get();
      
      // Convert to array
      const rides = [];
      snapshot.forEach(doc => {
          rides.push({
              id: doc.id,
              ...doc.data()
          });
      });
      
      console.log(`Found ${rides.length} rides matching type: ${type}`);
      
      // Sort by current option
      const sortSelect = document.querySelector('.results-sort select');
      const sortOption = sortSelect ? sortSelect.value : 'date-asc';
      const sortedRides = sortResults(rides, sortOption);
      
      // Update UI
      updateSearchResults(sortedRides);
  } catch (error) {
      console.error(`Error filtering rides by type ${type}:`, error);
      utils.showNotification(`Napaka pri filtriranju prevozov: ${error.message}`, 'error');
  }
}


// Removed approximate results functionality

// Reset all filters and show all rides
async function resetFilters() {
  try {
      console.log('Resetting all filters');
      
      // Set the "All" tab as active
      const allTab = document.querySelector('.tab-btn[data-tab="all"]');
      if (allTab) {
          document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
          allTab.classList.add('active');
      }
      
      // Reset country dropdowns to default
      const fromCountry = document.getElementById('fromCountry');
      const toCountry = document.getElementById('toCountry');
      if (fromCountry) fromCountry.value = '';
      if (toCountry) toCountry.value = '';
      
      // Reset city dropdowns to default and disable them
      const fromCity = document.getElementById('fromCity');
      const toCity = document.getElementById('toCity');
      if (fromCity) {
          fromCity.value = '';
          fromCity.disabled = true;
      }
      if (toCity) {
          toCity.value = '';
          toCity.disabled = true;
      }
      
      // Reset date time picker button text
      const dateTimePickerButton = document.getElementById('dateTimePicker');
      if (dateTimePickerButton) {
          dateTimePickerButton.innerHTML = `
              <span class="calendar-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
              </span>
              Datum in ura
          `;
          
          // Reset the date-only checkbox if it exists
          const dateOnlyCheckbox = document.getElementById('dateOnlyCheckbox');
          if (dateOnlyCheckbox && dateOnlyCheckbox.checked) {
              dateOnlyCheckbox.checked = false;
              
              // Trigger the change event to update the flatpickr instance
              const event = new Event('change');
              dateOnlyCheckbox.dispatchEvent(event);
          }
          
          // Reset the flatpickr instance if it exists
          if (dateTimePickerButton._flatpickr) {
              dateTimePickerButton._flatpickr.clear();
          }
      }
      
      // Reset advanced filters
      const advancedFilters = document.getElementById('advancedFilters');
      if (advancedFilters) {
          // Hide advanced filters panel
          advancedFilters.style.display = 'none';
          
          // Reset dropdown values
          const selects = advancedFilters.querySelectorAll('select');
          selects.forEach(select => select.selectedIndex = 0);
          
          // Uncheck refrigerated checkbox
          const refrigeratedCheckbox = document.getElementById('refrigerated');
          if (refrigeratedCheckbox) {
              refrigeratedCheckbox.checked = false;
          }
          
          // Reset advanced search button state
          const advancedSearchBtn = document.getElementById('advancedSearchBtn');
          if (advancedSearchBtn) {
              advancedSearchBtn.classList.remove('open');
          }
      }
      
      // Reset sort option to default (najnoviji)
      const sortSelect = document.querySelector('.results-sort select');
      if (sortSelect) {
          sortSelect.value = 'date-asc';
      }
      
      // Load all rides from Firestore
      const ridesRef = firebase.firestore().collection('rides');
      const snapshot = await ridesRef.get();
      
      const rides = [];
      snapshot.forEach(doc => {
          rides.push({
              id: doc.id,
              ...doc.data()
          });
      });
      
      console.log(`Reset filters: found ${rides.length} rides total`);
      
      // Sort by default option
      const sortedRides = sortResults(rides, 'date-asc');
      
      // Update UI
      updateSearchResults(sortedRides);
  } catch (error) {
      console.error('Error resetting filters:', error);
      utils.showNotification('Napaka pri ponastavljanju filtrov: ' + error.message, 'error');
  }
}

// Helper function to parse search date and time
function parseSearchDateTime(searchDateText) {
  if (!searchDateText) return null;
  
  let date, time;
  
  // Handle different formats
  if (searchDateText.includes(' ob ')) {
      // Format with "ob": "DD.MM.YYYY ob HH:MM"
      const parts = searchDateText.split(' ob ');
      const dateParts = parts[0].split('.');
      
      if (dateParts.length !== 3) return null;
      
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      
      date = `${year}-${month}-${day}`;
      time = parts[1];
  } else if (searchDateText.includes(' ')) {
      // Format with space: "DD.MM.YYYY HH:MM"
      const parts = searchDateText.split(' ');
      const dateParts = parts[0].split('.');
      
      if (dateParts.length !== 3) return null;
      
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      
      date = `${year}-${month}-${day}`;
      time = parts[1];
  } else {
      // Format without time: "DD.MM.YYYY"
      const dateParts = searchDateText.split('.');
      
      if (dateParts.length !== 3) return null;
      
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      
      date = `${year}-${month}-${day}`;
      time = null;
  }
  
  return { date, time };
}

// Helper function to convert HH:MM time to minutes for comparison
function convertTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  
  const timeParts = timeStr.split(':');
  if (timeParts.length !== 2) return 0;
  
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  
  return hours * 60 + minutes;
}

// Function to update search results in the UI

// 1
function updateSearchResults(results, shouldStore = true) {
  console.log('Updating UI with results:', results);
  
  // Store results for re-translation when language changes (unless explicitly disabled)
  if (shouldStore && typeof storeSearchResults === 'function') {
    storeSearchResults(results);
  }
  
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (!resultsTable || !resultsCount) {
    console.error('Results table or count element not found');
    return;
  }
  
  // Clear existing results
  resultsTable.innerHTML = '';
  
  // Update results count
  resultsCount.textContent = window.formatResultsCount ? window.formatResultsCount(results.length) : `Prikazujem ${results.length} prevozov`;
  
  // If no results, show message
  if (results.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="6" style="text-align: center; padding: 30px;">
        <div style="color: #666; font-size: 16px;">
          <strong>Ni najdenih prevozov za to smer.</strong><br>
          <span style="font-size: 14px; margin-top: 10px; display: block;">
            Poskusite z drugačnimi filtri ali preverite kasneje.
          </span>
        </div>
      </td>
    `;
    resultsTable.appendChild(row);
    return;
  }
  
  // Add new results
  results.forEach(ride => {
    // Skip rides with missing critical data
    if (!ride.fromCity || !ride.toCity) {
      console.warn('Skipping ride with missing data:', ride);
      return;
    }
    
    const row = document.createElement('tr');
    
    // Check if user is logged in directly using Firebase
    row.onclick = () => {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        window.showRideDetails(ride.id);
      } else {
        window.showLoginModal();
        window.showLoginRequiredMessage();
      }
    };
    
    row.style.cursor = 'pointer'; // Add pointer cursor to show it's clickable
    
    // Add a class based on ride type for styling
    if (ride.type === 'offering') {
      row.classList.add('offering-ride');
    } else {
      row.classList.add('looking-ride');
    }
    
    // Choose icon based on vehicle type
    let vehicleIcon = '';
    
    if (ride.vehicleType === 'car') {
      vehicleIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M5 9l2 3h8l2 -6M2 5h4.5l2 5M2 8h12M9 17h6M13 4l1.5 5h.5"></path>
      </svg>
      `;
    } else if (ride.vehicleType === 'van') {
      vehicleIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="8" width="20" height="12" rx="2"></rect>
        <path d="M6 11h12m-9 4h6M7 5h10"></path>
      </svg>
      `;
    } else if (ride.vehicleType === 'truck') {
      vehicleIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="8" width="22" height="12" rx="2"></rect>
        <path d="M3 8V5h18v3M5 12h14M8 16h8"></path>
      </svg>
      `;
    } else {
      vehicleIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
      </svg>
      `;
    }
    
    // Create a badge for ride type
    const rideTypeBadge = ride.type === 'offering' 
      ? `<span class="ride-type-badge offering">${translateRideType('offering')}</span>`
      : `<span class="ride-type-badge looking">${translateRideType('looking')}</span>`;
    
    // Format date and time for display
    let displayDate = '';
    let displayTime = translateFlexibleTime(); // Default to "Adjustable"
    
    // Extract only date part (no time) for the date column
    if (ride.date) {
      displayDate = formatDisplayDate(ride.date);
    } else if (ride.displayDate) {
      // If displayDate contains time, extract just the date part
      displayDate = ride.displayDate.split(' ')[0] || ride.displayDate;
    } else if (ride.formattedDate) {
      // If formattedDate contains time, extract just the date part
      displayDate = ride.formattedDate.split(' ')[0] || ride.formattedDate;
    }
    
    // If ride has time data, override the default "Adjustable" text
    if (ride.displayTime && ride.displayTime.trim()) {
      displayTime = ride.displayTime;
    } else if (ride.formattedTime && ride.formattedTime.trim()) {
      displayTime = ride.formattedTime;
    } else if (ride.time && ride.time.trim()) {
      displayTime = ride.time;
    }
    
    // Create combined location fields (city, country)
    const fromLocation = `${ride.fromCity}${ride.fromCountry ? ', ' + ride.fromCountry : ''}`;
    const toLocation = `${ride.toCity}${ride.toCountry ? ', ' + ride.toCountry : ''}`;
    
    // Translate vehicle type
    const vehicleTypeDisplay = translateVehicleType(ride.originalVehicleTypeDisplay || ride.originalVehicleType || ride.vehicleTypeDisplay || ride.vehicleType) || 'N/A';
    
    row.innerHTML = `
      <td>${fromLocation}</td>
      <td>${toLocation}</td>
      <td>${displayDate}</td>
      <td>${displayTime}</td>
      <td>
        <div class="vehicle-icon-content">
          ${vehicleIcon}
          ${vehicleTypeDisplay}
        </div>
      </td>
      <td>
        ${rideTypeBadge}
      </td>
    `;
    
    resultsTable.appendChild(row);
  });
}

// Helper function to format date for displays
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  
  try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr; // Return original if invalid
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
  } catch (e) {
      console.error('Error formatting date:', e);
      return dateStr; // Return original on error
  }
}

// Function to show login required message
function showLoginRequiredMessage() {
  utils.showNotification('Za ogled podrobnosti se morate prijaviti.', 'info');
}

// Set up optimized real-time updates for rides
function setupRealTimeUpdates() {
  console.log('Setting up real-time updates for rides');
  
  const unsubscribe = firebase.firestore().collection('rides')
      .onSnapshot((snapshot) => {
          console.log('Real-time update received');
          
          if (snapshot.docChanges().length > 0) {
              console.log(`${snapshot.docChanges().length} changes detected`);
              
              // Handle individual changes instead of reloading everything
              snapshot.docChanges().forEach(change => {
                  const rideData = { id: change.doc.id, ...change.doc.data() };
                  
                  switch (change.type) {
                      case 'added':
                          console.log('New ride added:', rideData.id);
                          handleRideAdded(rideData);
                          break;
                      case 'modified':
                          console.log('Ride modified:', rideData.id);
                          handleRideModified(rideData);
                          break;
                      case 'removed':
                          console.log('Ride removed:', change.doc.id);
                          handleRideRemoved(change.doc.id);
                          break;
                  }
              });
          }
      }, (error) => {
          console.error('Error listening to real-time updates:', error);
      });
  
  // Store the unsubscribe function in window for cleanup if needed
  window.rideUpdatesUnsubscribe = unsubscribe;
}

// Handle when a new ride is added
function handleRideAdded(rideData) {
  const resultsTable = document.querySelector('.results-table tbody');
  if (!resultsTable) return;
  
  // Check if the new ride matches current search criteria
  const searchParams = getSearchParameters();
  const exactMatches = processExactMatches([rideData], searchParams);
  
  if (exactMatches.length > 0) {
    // Add the new ride to the results table
    const sortOption = getSortOption();
    const sortedRide = sortResults([rideData], sortOption)[0];
    
    // Find the correct position to insert the ride
    insertRideInCorrectPosition(sortedRide, resultsTable);
    
    // Update results count
    updateResultsCount();
  }
}

// Handle when a ride is modified
function handleRideModified(rideData) {
  const resultsTable = document.querySelector('.results-table tbody');
  if (!resultsTable) return;
  
  // Find the existing row for this ride
  const existingRow = resultsTable.querySelector(`tr[data-ride-id="${rideData.id}"]`);
  
  if (existingRow) {
    // Check if the modified ride still matches current search criteria
    const searchParams = getSearchParameters();
    const exactMatches = processExactMatches([rideData], searchParams);
    
    if (exactMatches.length > 0) {
      // Update the existing row
      updateRideRow(existingRow, rideData);
    } else {
      // Remove the row if it no longer matches
      existingRow.remove();
      updateResultsCount();
    }
  }
}

// Handle when a ride is removed
function handleRideRemoved(rideId) {
  const resultsTable = document.querySelector('.results-table tbody');
  if (!resultsTable) return;
  
  const existingRow = resultsTable.querySelector(`tr[data-ride-id="${rideId}"]`);
  if (existingRow) {
    existingRow.remove();
    updateResultsCount();
  }
}

// Insert ride in correct position based on sort order
function insertRideInCorrectPosition(ride, resultsTable) {
  const allRows = Array.from(resultsTable.querySelectorAll('tr[data-ride-id]'));
  const newRow = createRideRow(ride);
  
  if (allRows.length === 0) {
    resultsTable.appendChild(newRow);
  } else {
    // Find the correct position based on sort order
    const sortOption = getSortOption();
    let inserted = false;
    
    for (let i = 0; i < allRows.length; i++) {
      const existingRideId = allRows[i].getAttribute('data-ride-id');
      // This is a simplified comparison - in a real implementation, 
      // you'd compare the actual ride data
      if (shouldInsertBefore(ride, existingRideId, sortOption)) {
        resultsTable.insertBefore(newRow, allRows[i]);
        inserted = true;
        break;
      }
    }
    
    if (!inserted) {
      resultsTable.appendChild(newRow);
    }
  }
}

// Create a new ride row
function createRideRow(ride) {
  const row = document.createElement('tr');
  row.setAttribute('data-ride-id', ride.id);
  
  // Add class based on ride type
  if (ride.type === 'offering') {
    row.classList.add('offering-ride');
  } else {
    row.classList.add('looking-ride');
  }
  
  // Add click handler
  row.addEventListener('click', function() {
    showRideDetails(ride.id);
  });
  
  // Set ride type text and class
  const typeText = translateRideType(ride.type);
  const typeClass = ride.type === 'offering' ? 'offering' : 'looking';
  
  // Format time with "Prilagodljivo" for rides without time
  const timeDisplay = ride.formattedTime || ride.displayTime || translateFlexibleTime();
  
  // Ensure we have all required fields
  const fromCity = ride.fromCity || 'N/A';
  const fromCountry = (ride.originalFromCountry || ride.fromCountry) ? translateCountry(ride.originalFromCountry || ride.fromCountry) : '';
  const toCity = ride.toCity || 'N/A';
  const toCountry = (ride.originalToCountry || ride.toCountry) ? translateCountry(ride.originalToCountry || ride.toCountry) : '';
  // Extract only date part (no time) for the date column
  let dateOnly = 'Ni datuma';
  if (ride.date) {
    dateOnly = formatDisplayDate(ride.date);
  } else if (ride.formattedDate) {
    // If formattedDate contains time, extract just the date part
    dateOnly = ride.formattedDate.split(' ')[0] || ride.formattedDate;
  } else if (ride.displayDate) {
    // If displayDate contains time, extract just the date part  
    dateOnly = ride.displayDate.split(' ')[0] || ride.displayDate;
  }
  const vehicleTypeDisplay = translateVehicleType(ride.originalVehicleTypeDisplay || ride.originalVehicleType || ride.vehicleTypeDisplay || ride.vehicleType) || 'N/A';
  
  // Populate the row
  row.innerHTML = `
    <td>${fromCity}${fromCountry ? ', ' + fromCountry : ''}</td>
    <td>${toCity}${toCountry ? ', ' + toCountry : ''}</td>
    <td>${dateOnly}</td>
    <td>${timeDisplay}</td>
    <td>${vehicleTypeDisplay}</td>
    <td><div class="ride-type-badge ${typeClass}">${typeText}</div></td>
  `;
  
  return row;
}

// Update an existing ride row
function updateRideRow(existingRow, rideData) {
  const newRow = createRideRow(rideData);
  existingRow.parentNode.replaceChild(newRow, existingRow);
}

// Simple comparison for insertion order
function shouldInsertBefore(newRide, existingRideId, sortOption) {
  // This is a simplified implementation
  // In a real scenario, you'd compare the actual ride data
  return false;
}

// Update results count
function updateResultsCount() {
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (resultsTable && resultsCount) {
    const rideRows = resultsTable.querySelectorAll('tr[data-ride-id]');
    resultsCount.textContent = window.formatResultsCount ? window.formatResultsCount(rideRows.length) : `Prikazujem ${rideRows.length} prevozov`;
  }
}
// Dodajte ovo u search.js

// Globalna varijabla za debugiranje
window.debugSearchResults = {
  exact: [],
  approximate: []
};


// Simple function to show "no results" message
function showNoResultsMessage() {
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (resultsTable) {
    resultsTable.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 20px;">
          Ni najdenih prevozov z izbranimi filtri.
        </td>
      </tr>
    `;
  }
  
  if (resultsCount) {
    resultsCount.textContent = window.formatResultsCount ? window.formatResultsCount(0) : 'Prikazujem 0 prevozov';
  }
}

// Simple function to show error message
function showErrorMessage(message) {
  const resultsTable = document.querySelector('.results-table tbody');
  
  if (resultsTable) {
    resultsTable.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 20px; color: red;">
          Napaka pri iskanju prevozov. ${message}
        </td>
      </tr>
    `;
  }
}

// Simple function to get all rides from Firebase
// Optimized function to get rides with basic filtering at database level
async function getOptimizedRidesFromFirebase(searchParams) {
  try {
    let query = firebase.firestore().collection('rides');
    
    // Add basic filtering at database level for performance
    if (searchParams.rideType && searchParams.rideType !== 'all') {
      query = query.where('type', '==', searchParams.rideType);
      console.log('Applied database filter for ride type:', searchParams.rideType);
    }
    
    // TEMPORARILY DISABLED: Date filtering - only get rides for today and future dates
    // This helps reduce the dataset significantly
    const today = new Date();
    const todayString = today.getFullYear() + '-' + 
                       String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(today.getDate()).padStart(2, '0');
    
    // query = query.where('date', '>=', todayString);
    console.log('TEMP DISABLED: database filter for dates >= today:', todayString);
    
    // If searching for specific date, add upper bound for performance
    if (searchParams.dateTime) {
      const searchDateInfo = parseSearchDateTime(searchParams.dateTime);
      if (searchDateInfo && searchDateInfo.date) {
        // Add a range query for dates within 7 days of search date for approximate matching
        const searchDate = new Date(searchDateInfo.date);
        const endDate = new Date(searchDate);
        endDate.setDate(searchDate.getDate() + 7);
        const endDateString = endDate.getFullYear() + '-' + 
                             String(endDate.getMonth() + 1).padStart(2, '0') + '-' + 
                             String(endDate.getDate()).padStart(2, '0');
        
        // query = query.where('date', '<=', endDateString);
        console.log('TEMP DISABLED: database filter for dates <= search date + 7 days:', endDateString);
      }
    } else {
      // If no specific date, limit to next 30 days for performance
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateString = futureDate.getFullYear() + '-' + 
                              String(futureDate.getMonth() + 1).padStart(2, '0') + '-' + 
                              String(futureDate.getDate()).padStart(2, '0');
      
      // query = query.where('date', '<=', futureDateString);
      console.log('TEMP DISABLED: database filter for dates <= next 30 days:', futureDateString);
    }
    
    // Execute the query
    const snapshot = await query.get();
    const rides = [];
    
    snapshot.forEach(doc => {
      rides.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`Database optimization reduced dataset from all rides to ${rides.length} rides`);
    return rides;
    
  } catch (error) {
    console.error('Error getting optimized rides:', error);
    // Fallback to getting all rides if optimized query fails
    console.log('Falling back to getting all rides...');
    return await getAllRidesFromFirebase();
  }
}

// Fallback function to get all rides
async function getAllRidesFromFirebase() {
  try {
    const snapshot = await firebase.firestore().collection('rides').get();
    const rides = [];
    snapshot.forEach(doc => {
      rides.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return rides;
  } catch (error) {
    console.error('Error getting all rides from Firebase:', error);
    throw error;
  }
}

// Removed approximate ride matching functionality

// Find nearby city matches when there are fewer than 4 exact matches
async function findNearbyMatches(allRides, searchParams, exactMatches) {
  try {
    if (!window.locationData?.cityCoordinates) {
      console.log('No coordinate data available for nearby search');
      return [];
    }

    const searchFromCoords = getCoordinatesForCity(searchParams.fromCountry, searchParams.fromCity);
    const searchToCoords = getCoordinatesForCity(searchParams.toCountry, searchParams.toCity);
    
    if (!searchFromCoords || !searchToCoords) {
      console.log('Could not get coordinates for search cities');
      return [];
    }

    const nearbyMatches = [];
    const exactIds = new Set(exactMatches.map(ride => ride.id));
    const maxDistance = 200; // Max distance in km for nearby cities
    const maxDistanceForSameCityMatches = 200; // Max distance for the other city in same-city matches

    for (const ride of allRides) {
      // Skip exact matches and rides without required data
      if (exactIds.has(ride.id) || !ride.fromCity || !ride.toCity || !ride.fromCountry || !ride.toCountry) {
        continue;
      }

      // Skip if ride type doesn't match filter
      if (searchParams.rideType !== 'all' && ride.type !== searchParams.rideType) {
        continue;
      }

      const rideFromCoords = getCoordinatesForCity(ride.fromCountry, ride.fromCity);
      const rideToCoords = getCoordinatesForCity(ride.toCountry, ride.toCity);

      if (!rideFromCoords || !rideToCoords) {
        continue;
      }

      // Calculate distances
      const fromDistance = calculateDistanceKm(searchFromCoords, rideFromCoords);
      const toDistance = calculateDistanceKm(searchToCoords, rideToCoords);
      
      // Debug high-distance rides that might be problematic
      if (toDistance > 500 || fromDistance > 500) {
        console.log(`🔍 Checking long-distance ride: ${ride.fromCity} → ${ride.toCity}`);
        console.log(`  Search cities: ${searchParams.fromCity} → ${searchParams.toCity}`);
        console.log(`  FROM distance: ${Math.round(fromDistance)}km, TO distance: ${Math.round(toDistance)}km`);
        console.log(`  isExactFromMatch: ${fromDistance === 0}, isExactToMatch: ${toDistance === 0}`);
      }

      // Check for different types of matches:
      // 1. Exact city matches (0km distance)
      // 2. Nearby city matches (within maxDistance)
      let matchType = null;
      let relevantDistance = null;

      const isExactFromMatch = fromDistance === 0; // Same from city
      const isExactToMatch = toDistance === 0;     // Same to city
      const isNearFromMatch = fromDistance <= maxDistance;
      const isNearToMatch = toDistance <= maxDistance;

      if (isExactFromMatch && isExactToMatch) {
        // This would be an exact match, skip it (already processed)
        continue;
      } else if (isExactFromMatch && isNearToMatch) {
        // Same FROM city, nearby TO city (e.g., Ljubljana → nearby Hamburg)
        matchType = 'same_from_near_to';
        relevantDistance = toDistance;
      } else if (isNearFromMatch && isExactToMatch) {
        // Nearby FROM city, same TO city (e.g., nearby Ljubljana → Hamburg)
        matchType = 'near_from_same_to';
        relevantDistance = fromDistance;
      } else if (isExactFromMatch && toDistance <= maxDistanceForSameCityMatches) {
        // Same FROM city, TO city within reasonable distance (e.g., Ljubljana → nearby destination)
        matchType = 'same_from';
        relevantDistance = toDistance;
        console.log(`✓ same_from match: ${ride.fromCity} → ${ride.toCity} (TO distance: ${Math.round(toDistance)}km ≤ ${maxDistanceForSameCityMatches}km)`);
      } else if (isExactToMatch && fromDistance <= maxDistanceForSameCityMatches) {
        // FROM city within reasonable distance, same TO city (e.g., nearby origin → Hamburg)
        matchType = 'same_to';
        relevantDistance = fromDistance;
        console.log(`✓ same_to match: ${ride.fromCity} → ${ride.toCity} (FROM distance: ${Math.round(fromDistance)}km ≤ ${maxDistanceForSameCityMatches}km)`);
      } else if (isNearFromMatch && isNearToMatch) {
        // Both cities are nearby
        matchType = 'both_nearby';
        relevantDistance = Math.max(fromDistance, toDistance);
      } else if (isNearFromMatch && toDistance <= maxDistanceForSameCityMatches) {
        // From city is nearby AND to city is within reasonable distance
        matchType = 'from_nearby';
        relevantDistance = fromDistance;
        console.log(`✓ from_nearby match: ${ride.fromCity} → ${ride.toCity} (FROM: ${Math.round(fromDistance)}km, TO: ${Math.round(toDistance)}km ≤ ${maxDistanceForSameCityMatches}km)`);
      } else if (isNearToMatch && fromDistance <= maxDistanceForSameCityMatches) {
        // To city is nearby AND from city is within reasonable distance
        matchType = 'to_nearby';
        relevantDistance = toDistance;
        console.log(`✓ to_nearby match: ${ride.fromCity} → ${ride.toCity} (FROM: ${Math.round(fromDistance)}km ≤ ${maxDistanceForSameCityMatches}km, TO: ${Math.round(toDistance)}km)`);
      }

      if (matchType) {
        console.log(`✓ Adding nearby match: ${ride.fromCity} → ${ride.toCity}`);
        console.log(`  Search: ${searchParams.fromCity} → ${searchParams.toCity}`);
        console.log(`  From distance: ${Math.round(fromDistance)}km, To distance: ${Math.round(toDistance)}km`);
        console.log(`  Match type: ${matchType}`);
        
        nearbyMatches.push({
          ...ride,
          isNearby: true,
          nearbyType: matchType,
          fromDistance: fromDistance,
          toDistance: toDistance,
          relevantDistance: relevantDistance,
          searchFromCity: searchParams.fromCity,
          searchToCity: searchParams.toCity
        });
      } else {
        // Log why this ride was rejected in more detail
        const reasons = [];
        if (isExactFromMatch && toDistance > maxDistanceForSameCityMatches) {
          reasons.push(`same_from rejected: TO distance ${Math.round(toDistance)}km > ${maxDistanceForSameCityMatches}km`);
        }
        if (isExactToMatch && fromDistance > maxDistanceForSameCityMatches) {
          reasons.push(`same_to rejected: FROM distance ${Math.round(fromDistance)}km > ${maxDistanceForSameCityMatches}km`);
        }
        if (isNearFromMatch && toDistance > maxDistanceForSameCityMatches) {
          reasons.push(`from_nearby rejected: TO distance ${Math.round(toDistance)}km > ${maxDistanceForSameCityMatches}km`);
        }
        if (isNearToMatch && fromDistance > maxDistanceForSameCityMatches) {
          reasons.push(`to_nearby rejected: FROM distance ${Math.round(fromDistance)}km > ${maxDistanceForSameCityMatches}km`);
        }
        if (!isNearFromMatch && !isExactFromMatch) {
          reasons.push(`FROM distance: ${Math.round(fromDistance)}km > ${maxDistance}km`);
        }
        if (!isNearToMatch && !isExactToMatch) {
          reasons.push(`TO distance: ${Math.round(toDistance)}km > ${maxDistance}km`);
        }
        
        if (reasons.length > 0) {
          console.log(`✗ Rejected: ${ride.fromCity} → ${ride.toCity} (${reasons.join(', ')})`);
        } else {
          console.log(`✗ Rejected: ${ride.fromCity} → ${ride.toCity} (no matching criteria)`);
        }
      }
    }

    // Sort by relevance (prioritize exact city matches, then by distance)
    nearbyMatches.sort((a, b) => {
      // Priority order:
      // 1. Same from city (e.g., Ljubljana → anywhere)
      // 2. Same to city (e.g., anywhere → Hamburg)  
      // 3. Same from + near to
      // 4. Near from + same to
      // 5. Both nearby
      // 6. Single nearby (from or to)
      
      const priority = {
        'same_from': 1,
        'same_to': 2,
        'same_from_near_to': 3,
        'near_from_same_to': 4,
        'both_nearby': 5,
        'from_nearby': 6,
        'to_nearby': 6
      };
      
      const aPriority = priority[a.nearbyType] || 10;
      const bPriority = priority[b.nearbyType] || 10;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // Same priority, sort by distance
      return a.relevantDistance - b.relevantDistance;
    });

    // Limit to reasonable number
    return nearbyMatches.slice(0, 10);

  } catch (error) {
    console.error('Error finding nearby matches:', error);
    return [];
  }
}

// Helper function to get coordinates for a city
function getCoordinatesForCity(country, city) {
  try {
    return window.locationData.cityCoordinates[country]?.[city] || null;
  } catch (error) {
    return null;
  }
}

// Helper function to calculate distance between two coordinate points
function calculateDistanceKm(coords1, coords2) {
  if (!coords1 || !coords2) return Infinity;
  return window.locationData.calculateDistance(coords1.lat, coords1.lng, coords2.lat, coords2.lng);
}

// Validation functions
function validateSearchCriteria() {
  const fromCountryEl = document.querySelector('#fromCountry');
  const toCountryEl = document.querySelector('#toCountry');
  const fromCityEl = document.querySelector('#fromCity');
  const toCityEl = document.querySelector('#toCity');
  
  const fromCountry = fromCountryEl ? fromCountryEl.value : '';
  const toCountry = toCountryEl ? toCountryEl.value : '';
  const fromCity = fromCityEl ? fromCityEl.value : '';
  const toCity = toCityEl ? toCityEl.value : '';
  
  // Require both from and to locations to be filled
  const hasFromLocation = fromCountry && fromCity;
  const hasToLocation = toCountry && toCity;
  
  return hasFromLocation && hasToLocation;
}

function showSearchValidationMessage() {
  const message = window.translateText 
    ? window.translateText('searchValidationMessage')
    : 'Prosimo izberite mesta "Od" in "Do" za iskanje prevoza.';
    
  // Create or update validation message
  let messageEl = document.querySelector('.search-validation-message');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'search-validation-message';
    
    const searchButtons = document.querySelector('.search-buttons');
    if (searchButtons) {
      searchButtons.parentNode.insertBefore(messageEl, searchButtons);
    }
  }
  
  messageEl.innerHTML = `
    <div style="background-color: #fff3cd; color: #856404; padding: 10px; border-radius: 8px; margin: 10px 0; text-align: center; border: 1px solid #ffeaa7;">
      <strong>⚠️ ${message}</strong>
    </div>
  `;
  
  // Hide message after 4 seconds
  setTimeout(() => {
    if (messageEl) {
      messageEl.remove();
    }
  }, 4000);
}

function setupValidationListeners() {
  const fields = ['#fromCountry', '#toCountry', '#fromCity', '#toCity'];
  
  fields.forEach(selector => {
    const field = document.querySelector(selector);
    if (field) {
      // Listen to both change and input events for better coverage
      field.addEventListener('change', updateSearchButtonState);
      field.addEventListener('input', updateSearchButtonState);
    }
  });
  
  // Initial state check
  updateSearchButtonState();
}

function updateSearchButtonState() {
  const searchBtn = document.querySelector('.search-btn');
  if (!searchBtn) return;
  
  const isValid = validateSearchCriteria();
  
  if (isValid) {
    searchBtn.disabled = false;
    searchBtn.style.opacity = '1';
    searchBtn.style.cursor = 'pointer';
    searchBtn.title = '';
  } else {
    searchBtn.disabled = true;
    searchBtn.style.opacity = '0.5';
    searchBtn.style.cursor = 'not-allowed';
    searchBtn.title = window.translateText 
      ? window.translateText('searchValidationTooltip')
      : 'Izberi mesta za iskanje prevoza';
  }
}

// Parse search date time (utility function)
function parseSearchDateTime(dateTimeString) {
  try {
    if (dateTimeString.includes(' ob ')) {
      const parts = dateTimeString.split(' ob ');
      const dateParts = parts[0].split('.');
      
      if (dateParts.length === 3) {
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        
        return {
          date: `${year}-${month}-${day}`,
          time: parts[1]
        };
      }
    } else {
      const dateParts = dateTimeString.split('.');
      if (dateParts.length === 3) {
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        
        return {
          date: `${year}-${month}-${day}`,
          time: null
        };
      }
    }
    
    return null;
  } catch (error) {
    console.warn('Error parsing date time:', error);
    return null;
  }
}

// Make functions available globally for translations
window.updateSearchResults = updateSearchResults;