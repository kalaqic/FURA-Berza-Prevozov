/**
 * Search-related functions for FURA website
 * Updated to work with Firestore
 */

// Dodajte ovu funkciju u search.js


// Function to find approximate rides when no exact matches are found
// Modificirani performSearch u search.js
async function performSearch() {
  try {
    console.log('Performing search');
    
    // Show loading state
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
    
    // Get search parameters
    const activeTab = document.querySelector('.tab-btn.active');
    const rideType = activeTab ? activeTab.getAttribute('data-tab') : 'all';
    
    const fromCountry = document.querySelector('#fromCountry').value;
    const toCountry = document.querySelector('#toCountry').value;
    const fromCity = document.querySelector('#fromCity').value;
    const toCity = document.querySelector('#toCity').value;
    
    console.log('Search parameters:', { rideType, fromCountry, fromCity, toCountry, toCity });
    
    // Get all rides from Firestore first (for both exact and approximate matches)
    const allRides = await getAllRidesFromFirebase();
    console.log(`Retrieved ${allRides.length} total rides from database`);
    
    // Procesiranje će se raditi paralelno za točne i približne fure
    let exactMatches = [];
    let approximateMatches = [];
    
    // Paralelno procesiranje točnih fura
    const processExactMatches = async () => {
      let exactResults = [...allRides];
      
      // Filter by ride type if not "all"
      if (rideType !== 'all') {
        exactResults = exactResults.filter(ride => ride.type === rideType);
      }
      
      // Filter by countries
      if (fromCountry) {
        exactResults = exactResults.filter(ride => 
          ride.fromCountry && ride.fromCountry.toLowerCase() === fromCountry.toLowerCase());
      }
      
      if (toCountry) {
        exactResults = exactResults.filter(ride => 
          ride.toCountry && ride.toCountry.toLowerCase() === toCountry.toLowerCase());
      }
      
      // Filter by cities (exact match)
      if (fromCity) {
        exactResults = exactResults.filter(ride => 
          ride.fromCity && ride.fromCity.toLowerCase() === fromCity.toLowerCase());
      }
      
      if (toCity) {
        exactResults = exactResults.filter(ride => 
          ride.toCity && ride.toCity.toLowerCase() === toCity.toLowerCase());
      }
      
      return exactResults;
    };
    
    // Paralelno procesiranje približnih fura
    const processApproximateMatches = async () => {
      // Traži približne samo ako imamo dovoljno podataka o lokaciji
      if (fromCountry && fromCity && toCountry && toCity) {
        return findApproximateRidesSimple(allRides, fromCountry, fromCity, toCountry, toCity);
      }
      return [];
    };
    
    // Izvršavanje oba procesiranja paralelno
    [exactMatches, approximateMatches] = await Promise.all([
      processExactMatches(),
      processApproximateMatches()
    ]);
    
    console.log(`Found ${exactMatches.length} exact matches`);
    console.log(`Found ${approximateMatches.length} approximate matches`);
    
    // Uklanjanje duplikata: ne prikazujemo iste fure i u točnim i u približnim rezultatima
    if (approximateMatches.length > 0 && exactMatches.length > 0) {
      const exactIds = new Set(exactMatches.map(ride => ride.id));
      approximateMatches = approximateMatches.filter(ride => !exactIds.has(ride.id));
      console.log(`After removing duplicates, have ${approximateMatches.length} unique approximate matches`);
    }
    
    // Sortiranje rezultata
    const sortSelect = document.querySelector('.results-sort select');
    const sortOption = sortSelect ? sortSelect.value : 'date-asc';
    
    exactMatches = sortResults(exactMatches, sortOption);
    
    // Prvo sortirati po udaljenosti, a zatim po istom kriteriju kao točne fure
    approximateMatches.sort((a, b) => a.approximateDistance - b.approximateDistance);
    approximateMatches = sortResults(approximateMatches, sortOption);
    
    // Now update the UI with both exact and approximate matches
    if (exactMatches.length > 0) {
      if (approximateMatches.length > 0) {
        // We have both exact and approximate matches
        showCombinedResults(exactMatches, approximateMatches);
      } else {
        // We only have exact matches
        updateSearchResults(exactMatches);
      }
    } else if (approximateMatches.length > 0) {
      // We only have approximate matches
      showApproximateResults(approximateMatches);
    } else {
      // No matches at all
      showNoResultsMessage();
    }
    
    // Scroll to results
    scrollToResults();
    
  } catch (error) {
    console.error('Error during search:', error);
    showErrorMessage(error.message);
  }
}

// New function to show combined results
// Funkcija za prikaz kombiniranih rezultata
function showCombinedResults(exactMatches, approximateMatches) {
  // Get the results container
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (!resultsTable) return;
  
  // Clear previous results
  resultsTable.innerHTML = '';
  
  // Update results count
  if (resultsCount) {
    resultsCount.textContent = `Prikazujem ${exactMatches.length + approximateMatches.length} prevozov (${exactMatches.length} točnih, ${approximateMatches.length} približnih)`;
  }
  
  // First add the exact matches
  exactMatches.forEach(ride => {
    addRideToResultsTable(ride, resultsTable, false);
  });
  
  // Add a header row for approximate rides if we have any
  if (approximateMatches.length > 0) {
    const headerRow = document.createElement('tr');
    headerRow.className = 'approximate-header-row';
    headerRow.innerHTML = `
      <td colspan="6" style="text-align: center; padding: 10px; background-color: #f0f4ff; color: #5C6BC0; font-weight: bold;">
        Dodatne fure v bližini vaše iskalne poti (${approximateMatches.length})
      </td>
    `;
    resultsTable.appendChild(headerRow);
    
    // Then add the approximate matches
    approximateMatches.forEach(ride => {
      addRideToResultsTable(ride, resultsTable, true);
    });
  }
  
  // Add CSS for styling if not already added
  if (!document.getElementById('combined-results-styles')) {
    const style = document.createElement('style');
    style.id = 'combined-results-styles';
    style.innerHTML = `
      .approximate-badge {
        display: inline-block;
        padding: 2px 5px;
        background-color: #f0ad4e;
        color: white;
        border-radius: 4px;
        font-size: 0.8em;
        margin-left: 5px;
        font-weight: bold;
      }
      
      .approximate-ride {
        background-color: #f0f4ff !important;
      }
      
      .approximate-ride:hover {
        background-color: #e1e7ff !important;
      }
      
      .approximate-header-row {
        background-color: #f0f4ff !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Helper function to add a ride to results table
function addRideToResultsTable(ride, resultsTable, isApproximate = false) {
  const tableRow = document.createElement('tr');
  
  // Add class based on ride type
  if (ride.type === 'offering') {
    tableRow.classList.add('offering-ride');
  } else {
    tableRow.classList.add('looking-ride');
  }
  
  // If it's an approximate ride, add that class
  if (isApproximate || ride.isApproximate) {
    tableRow.classList.add('approximate-ride');
  }
  
  // Add click handler to show details
  tableRow.addEventListener('click', function() {
    showRideDetails(ride.id);
  });
  
  // Set ride type text and class
  const typeText = ride.type === 'offering' ? 'Nudim prevoz' : 'Iščem prevoz';
  const typeClass = ride.type === 'offering' ? 'offering' : 'looking';
  
  // Format time with "Prilagodljivo" for rides without time
  const timeDisplay = ride.formattedTime || ride.displayTime || 'Prilagodljivo';
  
  // Ensure we have all required fields
  const fromCity = ride.fromCity || 'N/A';
  const fromCountry = ride.fromCountry || '';
  const toCity = ride.toCity || 'N/A';
  const toCountry = ride.toCountry || '';
  const formattedDate = ride.formattedDate || ride.displayDate || 'Ni datuma';
  const vehicleTypeDisplay = ride.vehicleTypeDisplay || ride.vehicleType || 'N/A';
  
  // Add info about approximate location if applicable
  let fromLocationText = `${fromCity}${fromCountry ? ', ' + fromCountry : ''}`;
  let toLocationText = `${toCity}${toCountry ? ', ' + toCountry : ''}`;
  
  if (isApproximate || ride.isApproximate) {
    if (ride.approximateType === 'departure' || ride.approximateType === 'both') {
      fromLocationText += ` <span class="approximate-badge" title="Približno ${ride.approximateDistance.toFixed(1)}km od iskane lokacije">~${ride.approximateDistance.toFixed(1)}km</span>`;
    }
    
    if (ride.approximateType === 'destination' || ride.approximateType === 'both') {
      toLocationText += ` <span class="approximate-badge" title="Približno ${ride.approximateDistance.toFixed(1)}km od iskane lokacije">~${ride.approximateDistance.toFixed(1)}km</span>`;
    }
  }
  
  // Populate the row
  tableRow.innerHTML = `
    <td>${fromLocationText}</td>
    <td>${toLocationText}</td>
    <td>${formattedDate}</td>
    <td>${timeDisplay}</td>
    <td>${vehicleTypeDisplay}</td>
    <td><div class="ride-type-badge ${typeClass}">${typeText}</div></td>
  `;
  
  resultsTable.appendChild(tableRow);
  return tableRow;
}

// Helper function to add a ride to the results table
function addRideToResults(ride, resultsTable) {
  const tableRow = document.createElement('tr');
  
  // Add class based on ride type
  if (ride.type === 'offering') {
    tableRow.classList.add('offering-ride');
  } else {
    tableRow.classList.add('looking-ride');
  }
  
  // Add click handler to show details
  tableRow.addEventListener('click', function() {
    showRideDetails(ride.id);
  });
  
  // Set ride type text and class
  const typeText = ride.type === 'offering' ? 'Nudim prevoz' : 'Iščem prevoz';
  const typeClass = ride.type === 'offering' ? 'offering' : 'looking';
  
  // Format time with "Prilagodljivo" for rides without time
  const timeDisplay = ride.formattedTime || ride.displayTime || 'Prilagodljivo';
  
  // Ensure we have all required fields
  const fromCity = ride.fromCity || 'N/A';
  const fromCountry = ride.fromCountry || '';
  const toCity = ride.toCity || 'N/A';
  const toCountry = ride.toCountry || '';
  const formattedDate = ride.formattedDate || ride.displayDate || 'Ni datuma';
  const vehicleTypeDisplay = ride.vehicleTypeDisplay || ride.vehicleType || 'N/A';
  
  // Add info about approximate location if applicable
  let fromLocationText = `${fromCity}${fromCountry ? ', ' + fromCountry : ''}`;
  let toLocationText = `${toCity}${toCountry ? ', ' + toCountry : ''}`;
  
  if (ride.isApproximate) {
    if (ride.approximateType === 'departure' || ride.approximateType === 'both') {
      fromLocationText += ` <span class="approximate-badge" title="Približno ${ride.approximateDistance.toFixed(1)}km od iskane lokacije">~${ride.approximateDistance.toFixed(1)}km</span>`;
    }
    
    if (ride.approximateType === 'destination' || ride.approximateType === 'both') {
      toLocationText += ` <span class="approximate-badge" title="Približno ${ride.approximateDistance.toFixed(1)}km od iskane lokacije">~${ride.approximateDistance.toFixed(1)}km</span>`;
    }
  }
  
  // Populate the row
  tableRow.innerHTML = `
    <td>${fromLocationText}</td>
    <td>${toLocationText}</td>
    <td>${formattedDate}</td>
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
  
  // Add event listener to search button
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
      searchBtn.addEventListener('click', performSearch);
  }
  
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
              resultsCount.textContent = 'Prikazujem 0 prevozov';
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
      alert(`Napaka pri filtriranju prevozov: ${error.message}`);
  }
}

// Perform the search based on form inputs
// Update the performSearch function
async function performSearch() {
  try {
      console.log('Performing search');
      
      // Show loading state
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
      
      // Get selected ride type
      const activeTab = document.querySelector('.tab-btn.active');
      const rideType = activeTab ? activeTab.getAttribute('data-tab') : 'all';
      
      // Get basic search parameters
      const fromCountry = document.querySelector('#fromCountry').value;
      const toCountry = document.querySelector('#toCountry').value;
      const fromCity = document.querySelector('#fromCity').value;
      const toCity = document.querySelector('#toCity').value;
      
      // Get date and time from the date picker button text
      let dateTime = null;
      const dateTimePickerButton = document.getElementById('dateTimePicker');
      if (dateTimePickerButton) {
          // Get the text content excluding the SVG
          const textElement = dateTimePickerButton.querySelector('.date-text');
          const buttonText = textElement ? textElement.textContent.trim() : '';
          // Check if a date has been selected (not the default text)
          if (buttonText !== 'Datum in ura' && buttonText !== 'Datum') {
              dateTime = buttonText;
          }
      }
      
      // Get advanced search parameters (if visible)
      let vehicleType = '';
      let vehicleSize = '';
      let refrigerated = false;
      
      const advancedFilters = document.getElementById('advancedFilters');
      if (advancedFilters && advancedFilters.style.display === 'block') {
          const vehicleTypeSelect = document.getElementById('vehicleTypeFilter');
          if (vehicleTypeSelect) {
              vehicleType = vehicleTypeSelect.value;
          }
          
          const vehicleSizeSelect = document.getElementById('vehicleSizeFilter');
          if (vehicleSizeSelect) {
              vehicleSize = vehicleSizeSelect.value;
          }
          
          const refrigeratedCheckbox = document.getElementById('refrigerated');
          if (refrigeratedCheckbox) {
              refrigerated = refrigeratedCheckbox.checked;
          }
      }
      
      // Start with base Firestore query
      let query = firebase.firestore().collection('rides');
      
      // Apply type filter if not "all"
      if (rideType !== 'all') {
          query = query.where('type', '==', rideType);
      }
      
      // Execute the query
      const snapshot = await query.get();
      
      // Process results for client-side filtering
      let results = [];
      snapshot.forEach(doc => {
          results.push({
              id: doc.id,
              ...doc.data()
          });
      });
      
      console.log(`Base query returned ${results.length} results`);
      
      // Apply client-side filters
      // Country filters
      if (fromCountry) {
          results = results.filter(ride => 
              ride.fromCountry && ride.fromCountry.toLowerCase().includes(fromCountry.toLowerCase()));
      }
      
      if (toCountry) {
          results = results.filter(ride => 
              ride.toCountry && ride.toCountry.toLowerCase().includes(toCountry.toLowerCase()));
      }
      
      // City filters
      if (fromCity) {
          results = results.filter(ride => 
              ride.fromCity && ride.fromCity.toLowerCase().includes(fromCity.toLowerCase()));
      }
      
      if (toCity) {
          results = results.filter(ride => 
              ride.toCity && ride.toCity.toLowerCase().includes(toCity.toLowerCase()));
      }
      
      // Date filter
      if (dateTime) {
          const dateInfo = parseSearchDateTime(dateTime);
          if (dateInfo && dateInfo.date) {
              results = results.filter(ride => ride.date === dateInfo.date);
          }
      }
      
      // Vehicle type filter
      if (vehicleType) {
          results = results.filter(ride => ride.vehicleType === vehicleType);
      }
      
      // Vehicle size filter
      if (vehicleSize) {
          results = results.filter(ride => ride.vehicleSize === vehicleSize);
      }
      
      // Refrigerator filter
      if (refrigerated) {
          results = results.filter(ride => ride.hasRefrigerator === true);
      }
      
      console.log(`After filtering, ${results.length} results remain`);
      
      // Sort results based on current sort option
      const sortSelect = document.querySelector('.results-sort select');
      const sortOption = sortSelect ? sortSelect.value : 'date-asc';
      results = sortResults(results, sortOption);
      
      // If no results found and we have location parameters, try to find approximate rides
      let approximateRides = [];
      if (results.length === 0 && fromCountry && fromCity && toCountry && toCity) {
          console.log('No exact matches found, searching for approximate rides');
          
          // Show searching message
          if (resultsTable) {
              resultsTable.innerHTML = `
                  <tr>
                      <td colspan="6" style="text-align: center; padding: 20px;">
                          Iskanje približnih prevozov...
                      </td>
                  </tr>
              `;
          }
          
          // Search for approximate rides
          approximateRides = await findApproximateRides(fromCountry, fromCity, toCountry, toCity, 20);
          console.log(`Found ${approximateRides.length} approximate rides`);
      }
      
      // Update the UI with the results
      if (results.length > 0) {
          // Display normal search results
          updateSearchResults(results);
      } else if (approximateRides.length > 0) {
          // Display approximate results with header
          showApproximateResults(approximateRides);
      } else {
          // No results found
          if (resultsTable) {
              resultsTable.innerHTML = `
                  <tr>
                      <td colspan="6" style="text-align: center; padding: 20px;">
                          Ni najdenih prevozov z izbranimi filtri.
                      </td>
                  </tr>
              `;
          }
          
          // Update results count
          const resultsCount = document.querySelector('.results-count');
          if (resultsCount) {
              resultsCount.textContent = 'Prikazujem 0 prevozov';
          }
      }
      
      scrollToResults();
  } catch (error) {
      console.error('Error during search:', error);
      alert('Napaka pri iskanju: ' + error.message);
      
      // Show error in results table
      const resultsTable = document.querySelector('.results-table tbody');
      if (resultsTable) {
          resultsTable.innerHTML = `
              <tr>
                  <td colspan="6" style="text-align: center; padding: 20px; color: red;">
                      Napaka pri iskanju prevozov. ${error.message}
                  </td>
              </tr>
          `;
      }
  }
}

// Function to display approximate results
function showApproximateResults(approximateRides) {
  // Get the results container
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (!resultsTable) return;
  
  // Clear previous results
  resultsTable.innerHTML = '';
  
  // Add approximate header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <td colspan="6" style="text-align: center; padding: 10px; background-color: #fcf8e3; color: #8a6d3b; font-weight: bold;">
          Nismo našli točnih prevozov za vašo pot. Prikazujemo približne prevoze v bližini.
      </td>
  `;
  resultsTable.appendChild(headerRow);
  
  // Update results count
  if (resultsCount) {
      resultsCount.textContent = `Prikazujem ${approximateRides.length} približnih prevozov`;
  }
  
  // Add each ride to the table
  approximateRides.forEach(ride => {
      const tableRow = document.createElement('tr');
      
      // Add class based on ride type
      if (ride.type === 'offering') {
          tableRow.classList.add('offering-ride');
      } else {
          tableRow.classList.add('looking-ride');
      }
      
      // Add approximate class
      tableRow.classList.add('approximate-ride');
      
      // Add click handler to show details
      tableRow.addEventListener('click', function() {
          showRideDetails(ride.id);
      });
      
      // Set ride type text and class
      const typeText = ride.type === 'offering' ? 'Nudim prevoz' : 'Iščem prevoz';
      const typeClass = ride.type === 'offering' ? 'offering' : 'looking';
      
      // Format time with "Prilagodljivo" for rides without time
      const timeDisplay = ride.formattedTime || ride.displayTime || 'Prilagodljivo';
      
      // Ensure we have all required fields
      const fromCity = ride.fromCity || 'N/A';
      const fromCountry = ride.fromCountry || '';
      const toCity = ride.toCity || 'N/A';
      const toCountry = ride.toCountry || '';
      const formattedDate = ride.formattedDate || ride.displayDate || 'Ni datuma';
      const vehicleTypeDisplay = ride.vehicleTypeDisplay || ride.vehicleType || 'N/A';
      
      // Add info about approximate location
      let fromLocationText = `${fromCity}${fromCountry ? ', ' + fromCountry : ''}`;
      let toLocationText = `${toCity}${toCountry ? ', ' + toCountry : ''}`;
      
      if (ride.approximateType === 'departure' || ride.approximateType === 'both') {
          fromLocationText += ` <span class="approximate-badge" title="Približno ${ride.approximateDistance.toFixed(1)}km od iskane lokacije">~${ride.approximateDistance.toFixed(1)}km</span>`;
      }
      
      if (ride.approximateType === 'destination' || ride.approximateType === 'both') {
          toLocationText += ` <span class="approximate-badge" title="Približno ${ride.approximateDistance.toFixed(1)}km od iskane lokacije">~${ride.approximateDistance.toFixed(1)}km</span>`;
      }
      
      // Populate the row
      tableRow.innerHTML = `
          <td>${fromLocationText}</td>
          <td>${toLocationText}</td>
          <td>${formattedDate}</td>
          <td>${timeDisplay}</td>
          <td>${vehicleTypeDisplay}</td>
          <td><div class="ride-type-badge ${typeClass}">${typeText}</div></td>
      `;
      
      resultsTable.appendChild(tableRow);
  });
  
  // Add CSS for approximate badges if not already added
  if (!document.getElementById('approximate-styles')) {
      const style = document.createElement('style');
      style.id = 'approximate-styles';
      style.innerHTML = `
          .approximate-badge {
              display: inline-block;
              padding: 2px 5px;
              background-color: #f0ad4e;
              color: white;
              border-radius: 4px;
              font-size: 0.8em;
              margin-left: 5px;
              font-weight: bold;
          }
          
          .approximate-ride {
              background-color: #fcf8e3 !important;
          }
          
          .approximate-ride:hover {
              background-color: #f7f3d7 !important;
          }
      `;
      document.head.appendChild(style);
  }
}

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
      
      // Reset country fields to empty
      const countryInputs = document.querySelectorAll('.country-input');
      countryInputs.forEach(input => input.value = '');
      
      // Reset city fields to empty
      const cityInputs = document.querySelectorAll('.city-input');
      cityInputs.forEach(input => input.value = '');
      
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
      alert('Napaka pri ponastavljanju filtrov: ' + error.message);
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
function updateSearchResults(results) {
  console.log('Updating UI with results:', results);
  
  const resultsTable = document.querySelector('.results-table tbody');
  const resultsCount = document.querySelector('.results-count');
  
  if (!resultsTable || !resultsCount) {
    console.error('Results table or count element not found');
    return;
  }
  
  // Clear existing results
  resultsTable.innerHTML = '';
  
  // Update results count
  resultsCount.textContent = `Prikazujem ${results.length} prevozov`;
  
  // If no results, show message
  if (results.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="5" style="text-align: center; padding: 20px;">
        Ni najdenih prevozov z izbranimi filtri.
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
      ? `<span class="ride-type-badge offering">Nudim prevoz</span>`
      : `<span class="ride-type-badge looking">Iščem prevoz</span>`;
    
    // Format date and time for display
    let displayDate = '';
    let displayTime = 'Prilagodljivo'; // Default to "Adjustable"
    
    // If the ride has proper displayDate, use it
    if (ride.displayDate) {
      displayDate = ride.displayDate;
    } else if (ride.formattedDate) {
      displayDate = ride.formattedDate;
    } else if (ride.date) {
      // Format from date field
      displayDate = formatDisplayDate(ride.date);
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
    
    row.innerHTML = `
      <td>${fromLocation}</td>
      <td>${toLocation}</td>
      <td>${displayDate}</td>
      <td>${displayTime}</td>
      <td class="vehicle-icon">
        ${vehicleIcon}
        ${ride.vehicleTypeDisplay || ride.vehicleType}
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
  `;
  
  document.head.appendChild(style);
  
  // Add event listener to close button
  const closeBtn = loginMessage.querySelector('.close-message');
  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          document.body.removeChild(loginMessage);
      });
  }
  
  // Automatically remove after 5 seconds
  setTimeout(() => {
      if (document.body.contains(loginMessage)) {
          document.body.removeChild(loginMessage);
      }
  }, 5000);
}

// Set up real-time updates for rides
function setupRealTimeUpdates() {
  console.log('Setting up real-time updates for rides');
  
  const unsubscribe = firebase.firestore().collection('rides')
      .onSnapshot((snapshot) => {
          console.log('Real-time update received');
          
          if (snapshot.docChanges().length > 0) {
              console.log(`${snapshot.docChanges().length} changes detected`);
              
              // Only reload if there are actual changes
              const sortSelect = document.querySelector('.results-sort select');
              const sortOption = sortSelect ? sortSelect.value : 'date-asc';
              
              // Load all rides and apply current sort
              loadInitialResults();
          }
      }, (error) => {
          console.error('Error listening to real-time updates:', error);
      });
  
  // Store the unsubscribe function in window for cleanup if needed
  window.rideUpdatesUnsubscribe = unsubscribe;
}
// Dodajte ovo u search.js

// Globalna varijabla za debugiranje
window.debugSearchResults = {
  exact: [],
  approximate: []
};

// Function to perform search and include approximate results
async function performSearch() {
  try {
    console.log('Performing search');
    
    // Show loading state
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
    
    // Get search parameters
    const activeTab = document.querySelector('.tab-btn.active');
    const rideType = activeTab ? activeTab.getAttribute('data-tab') : 'all';
    
    const fromCountry = document.querySelector('#fromCountry').value;
    const toCountry = document.querySelector('#toCountry').value;
    const fromCity = document.querySelector('#fromCity').value;
    const toCity = document.querySelector('#toCity').value;
    
    console.log('Search parameters:', { rideType, fromCountry, fromCity, toCountry, toCity });
    
    // Get all rides from Firestore first (for both exact and approximate matches)
    const allRides = await getAllRidesFromFirebase();
    console.log(`Retrieved ${allRides.length} total rides from database`);
    
    // Filter for exact matches first
    let exactMatches = [...allRides];
    
    // Filter by ride type if not "all"
    if (rideType !== 'all') {
      exactMatches = exactMatches.filter(ride => ride.type === rideType);
    }
    
    // Filter by countries
    if (fromCountry) {
      exactMatches = exactMatches.filter(ride => 
        ride.fromCountry && ride.fromCountry.toLowerCase() === fromCountry.toLowerCase());
    }
    
    if (toCountry) {
      exactMatches = exactMatches.filter(ride => 
        ride.toCountry && ride.toCountry.toLowerCase() === toCountry.toLowerCase());
    }
    
    // Filter by cities (exact match)
    if (fromCity) {
      exactMatches = exactMatches.filter(ride => 
        ride.fromCity && ride.fromCity.toLowerCase() === fromCity.toLowerCase());
    }
    
    if (toCity) {
      exactMatches = exactMatches.filter(ride => 
        ride.toCity && ride.toCity.toLowerCase() === toCity.toLowerCase());
    }
    
    console.log(`Found ${exactMatches.length} exact matches`);
    window.debugSearchResults.exact = exactMatches;
    
    // If we have exact matches, show them
    if (exactMatches.length > 0) {
      updateSearchResults(exactMatches);
      return;
    }
    
    // If no exact matches and we have location data, try to find approximate matches
    console.log('No exact matches, looking for approximate matches');
    
    // Check if we have enough info for approximate search
    if (!fromCountry || !fromCity || !toCountry || !toCity) {
      console.log('Not enough location info for approximate search');
      showNoResultsMessage();
      return;
    }
    
    // Update UI to show we're looking for approximate matches
    if (resultsTable) {
      resultsTable.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 20px;">
            Iskanje približnih prevozov...
          </td>
        </tr>
      `;
    }
    
    // Now find approximate matches using ALL rides
    const approximateMatches = await findApproximateRidesSimple(allRides, fromCountry, fromCity, toCountry, toCity);
    console.log(`Found ${approximateMatches.length} approximate matches`);
    window.debugSearchResults.approximate = approximateMatches;
    
    if (approximateMatches.length > 0) {
      showApproximateResults(approximateMatches);
    } else {
      showNoResultsMessage();
    }
    
  } catch (error) {
    console.error('Error during search:', error);
    showErrorMessage(error.message);
  }
}

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
    resultsCount.textContent = 'Prikazujem 0 prevozov';
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

// Simplified function to find approximate rides
async function findApproximateRidesSimple(allRides, fromCountry, fromCity, toCountry, toCity, maxDistance = 100) {
  try {
    console.log('Finding approximate rides with params:', { fromCountry, fromCity, toCountry, toCity });
    
    // Make sure location data is available
    if (!window.locationData || !window.locationData.cityCoordinates) {
      console.error('Location data not available');
      return [];
    }
    
    // Check if we have coordinates for the cities
    const haveFromCoords = window.locationData.cityCoordinates[fromCountry] && 
                          window.locationData.cityCoordinates[fromCountry][fromCity];
    
    const haveToCoords = window.locationData.cityCoordinates[toCountry] && 
                        window.locationData.cityCoordinates[toCountry][toCity];
    
    if (!haveFromCoords || !haveToCoords) {
      console.error('Missing coordinates for cities:', { 
        haveFromCoords, 
        haveToCoords,
        fromCity, 
        fromCountry, 
        toCity, 
        toCountry 
      });
      return [];
    }
    
    const fromCoords = window.locationData.cityCoordinates[fromCountry][fromCity];
    const toCoords = window.locationData.cityCoordinates[toCountry][toCity];
    
    console.log('Search coordinates:', { fromCoords, toCoords });
    
    // Check each ride to see if it's approximately what we're looking for
    const approximateMatches = [];
    
    for (const ride of allRides) {
      // Skip if we don't have enough location data
      if (!ride.fromCountry || !ride.fromCity || !ride.toCountry || !ride.toCity) {
        continue;
      }
      
      // Skip exact matches (these would have been shown already)
      if (ride.fromCountry.toLowerCase() === fromCountry.toLowerCase() && 
          ride.fromCity.toLowerCase() === fromCity.toLowerCase() &&
          ride.toCountry.toLowerCase() === toCountry.toLowerCase() && 
          ride.toCity.toLowerCase() === toCity.toLowerCase()) {
        continue;
      }
      
      // Check if we have coordinates for this ride's locations
      const haveRideFromCoords = window.locationData.cityCoordinates[ride.fromCountry] && 
                               window.locationData.cityCoordinates[ride.fromCountry][ride.fromCity];
      
      const haveRideToCoords = window.locationData.cityCoordinates[ride.toCountry] && 
                             window.locationData.cityCoordinates[ride.toCountry][ride.toCity];
      
      if (!haveRideFromCoords || !haveRideToCoords) {
        console.log('Missing coordinates for ride:', { 
          rideId: ride.id,
          fromCity: ride.fromCity, 
          fromCountry: ride.fromCountry, 
          toCity: ride.toCity, 
          toCountry: ride.toCountry 
        });
        continue;
      }
      
      const rideFromCoords = window.locationData.cityCoordinates[ride.fromCountry][ride.fromCity];
      const rideToCoords = window.locationData.cityCoordinates[ride.toCountry][ride.toCity];
      
      // Calculate distances
      const fromDistance = window.locationData.calculateDistance(
        fromCoords.lat, fromCoords.lng,
        rideFromCoords.lat, rideFromCoords.lng
      );
      
      const toDistance = window.locationData.calculateDistance(
        toCoords.lat, toCoords.lng,
        rideToCoords.lat, rideToCoords.lng
      );
      
      console.log(`Ride ${ride.id} distances:`, { fromDistance, toDistance });
      
      // Check if either the FROM or TO location is within our distance threshold
      let isApproximate = false;
      let approximateType = '';
      let approximateDistance = 0;
      
      // If FROM location matches exactly, but TO location is approximate
      if (ride.fromCountry.toLowerCase() === fromCountry.toLowerCase() && 
          ride.fromCity.toLowerCase() === fromCity.toLowerCase() && 
          toDistance <= maxDistance) {
        isApproximate = true;
        approximateType = 'destination';
        approximateDistance = toDistance;
      }
      // If TO location matches exactly, but FROM location is approximate
      else if (ride.toCountry.toLowerCase() === toCountry.toLowerCase() && 
               ride.toCity.toLowerCase() === toCity.toLowerCase() && 
               fromDistance <= maxDistance) {
        isApproximate = true;
        approximateType = 'departure';
        approximateDistance = fromDistance;
      }
      // Both locations are approximate but within threshold
      else if (fromDistance <= maxDistance && toDistance <= maxDistance) {
        isApproximate = true;
        approximateType = 'both';
        approximateDistance = fromDistance + toDistance;
      }
      
      if (isApproximate) {
        approximateMatches.push({
          ...ride,
          isApproximate: true,
          approximateType: approximateType,
          approximateDistance: approximateDistance
        });
        
        console.log(`Found approximate ride ${ride.id}:`, {
          from: `${ride.fromCity}, ${ride.fromCountry}`,
          to: `${ride.toCity}, ${ride.toCountry}`,
          type: approximateType,
          distance: approximateDistance
        });
      }
    }
    
    // Sort by approximate distance
    approximateMatches.sort((a, b) => a.approximateDistance - b.approximateDistance);
    
    return approximateMatches;
  } catch (error) {
    console.error('Error finding approximate rides:', error);
    return [];
  }
}